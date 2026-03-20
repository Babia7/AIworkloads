import { OperationsRunbook } from '../types';

/**
 * Operations Playbooks — AI Fabric Troubleshooting Runbooks
 *
 * Content sourced from PolymathOS vault:
 *   - PFC Troubleshooting for RoCE Fabrics
 *   - ECN and PFC Troubleshooting Decision Tree
 *   - PFC Watchdog
 *   - ECN Tuning Workflow for RoCE Fabrics
 *   - DCQCN
 *   - AllReduce Patterns
 *   - Job Completion Time Drivers
 *   - Collective Communication Topology Sensitivity
 *   - Congestion Collapse Scenarios
 *   - Checkpoint Burst Isolation
 *   - ASIC Queueing Models for AI Fabrics
 *   - Switch and Host Counter Interpretation for RoCE Fabrics
 *
 * EOS-specific CLI is flagged with eosSpecific: true.
 * Vendor-neutral readers should focus on the telemetry intent rather than the exact syntax.
 */

export const OPERATIONS_RUNBOOKS: OperationsRunbook[] = [
  {
    id: 'pfc-storm',
    title: 'PFC Storm / Head-of-Line Blocking',
    severity: 'Critical',
    symptom:
      'RoCE job throughput drops and PFC pause frames increment beyond the expected congestion point, stalling flows that are unrelated to the original congestion.',
    rootCause:
      'A pathological host NIC floods pause frames that propagate through the fabric when PFC Watchdog is absent or misconfigured, allowing a single edge event to pause the entire priority class across multiple switches. A secondary cause is queue trust misconfiguration placing traffic on the wrong priority class, triggering pause on a class that should have been best-effort.',
    inspect: [
      {
        text: 'show interfaces Ethernet<N> counters pfc — confirm pause is only incrementing on the intended RDMA priority class (e.g., priority 3 or 4), not on best-effort or control classes.',
        eosSpecific: true,
      },
      {
        text: 'show queue-monitor length interfaces all — identify which egress ports are building queue depth during the event. LANZ must be enabled first (queue-monitor length on Strata platforms).',
        eosSpecific: true,
      },
      {
        text: 'show qos interface <N> — verify trust mode and queue-to-priority mapping at the suspected source port to catch classification failures early.',
        eosSpecific: true,
      },
      {
        text: 'show interfaces Ethernet<N> counters pfc detail — check whether PFC Watchdog triggered and which containment action it took (drop, no-pause, or pass-through).',
        eosSpecific: true,
      },
      {
        text: 'Host NIC RDMA counters — confirm that send/receive queue stalls at the NIC correlate in time with switch pause frame timestamps to rule out a host-only issue.',
        eosSpecific: false,
      },
    ],
    actions: [
      'Confirm PFC pause is only incrementing on the intended lossless priority. If the wrong priority shows pause, fix trust and queue mapping before any further tuning — threshold changes will not help a classification error.',
      'Identify the edge port where pause frame counts grew fastest — the host connected there is the likely pathological source. Compare PFC counters across all GPU-connected leaf ports to isolate the outlier.',
      'Verify PFC Watchdog is enabled on all GPU-connected leaf ports. Without it, a single bad NIC can spread pause frames to the wider fabric, stalling flows on hosts unrelated to the congestion point.',
      'If Watchdog triggered, confirm it contained the event at the source: PFC counters on non-edge (spine-facing) ports should return to near-zero after the pathological host is isolated. If pause persists on spine ports, Watchdog did not contain the event.',
      'Quarantine the offending host, inspect the NIC driver version and RDMA queue state, then re-test fabric recovery by running a synthetic RDMA benchmark before returning the host to the cluster.',
    ],
  },
  {
    id: 'ecn-instability',
    title: 'ECN Mark Rate Instability',
    severity: 'Medium Priority',
    symptom:
      'ECN marks are either absent when the fabric is clearly congested — so PFC becomes the first congestion signal — or constant under moderate load with no visible improvement in job throughput.',
    rootCause:
      'ECN thresholds are misconfigured relative to queue headroom: set too high, the fabric absorbs entire bursts before marking, forcing PFC to act first; set too low, constant marks desensitize DCQCN at the NICs. A secondary failure is CNP (Congestion Notification Packets) not assigned to a strict-priority queue, which delays the DCQCN feedback loop so the sender\'s rate reduction arrives after PFC has already dominated.',
    inspect: [
      {
        text: 'ECN mark counters per queue class — on Strata (Tomahawk), requires per-interface enablement until EOS 4.31.x; from 4.31.x, set in the QoS profile. On Jericho, additionally requires: hardware counter feature ecn out (global).',
        eosSpecific: true,
      },
      {
        text: 'show queue-monitor length detail — observe queue depth during a controlled congestion test to determine whether ECN fires before the queue reaches buffer headroom limits.',
        eosSpecific: true,
      },
      {
        text: 'show interfaces Ethernet<N> counters pfc — compare PFC pause growth timeline against ECN mark count; ECN marks should appear and grow before sustained PFC increment, not after.',
        eosSpecific: true,
      },
      {
        text: 'Host NIC CNP generation counter — confirm CNPs are being generated at the receiver NIC in response to ECN-marked packets arriving from the switch.',
        eosSpecific: false,
      },
      {
        text: 'Sender NIC rate reduction counter (DCQCN RP statistics) — confirm the sending NIC is reducing its injection rate after receiving CNPs; if not, DCQCN is not functioning end-to-end.',
        eosSpecific: false,
      },
    ],
    actions: [
      'Confirm queue mapping is correct before tuning ECN thresholds — marking on the wrong class produces misleading telemetry and will not improve job performance.',
      'Run a controlled leaf-local congestion test and record baseline ECN mark rate alongside PFC pause counter growth to establish the starting behavior before changing anything.',
      'If ECN is absent before PFC: lower the ECN marking threshold (KMIN) toward 20–30% of queue headroom on the RDMA data class. This ensures marking begins during burst onset, not after the buffer is nearly full.',
      'If ECN marks are constant under moderate load with no throughput improvement: raise KMIN and verify that endpoint DCQCN reaction actually improves step time before concluding the threshold is wrong. Constant marking with no host response points to a CNP delivery or DCQCN configuration problem, not solely a threshold problem.',
      'Change one threshold at a time and re-run the same traffic pattern; compare counter trends before adjusting a second variable — overlapping changes make root cause correlation impossible.',
      'If ECN tuning does not improve the feedback loop: confirm CNP is assigned to the strict-priority control class. A CNP queued behind RDMA data arrives late at the sender, making DCQCN rate reduction consistently slower than PFC onset.',
    ],
  },
  {
    id: 'allreduce-tail-latency',
    title: 'High Tail Latency During All-Reduce',
    severity: 'High Priority',
    symptom:
      'Training step time is higher than expected and inconsistent run-to-run, even when average link utilization appears healthy across the fabric.',
    rootCause:
      'AllReduce collectives are bounded by the slowest participant at each synchronization point. One degraded rail, NIC, or path introduces a straggler that forces all participating GPUs to idle until it completes. Ring-style AllReduce amplifies this: the slow link is traversed repeatedly each step, translating a small path impairment into disproportionate job completion time expansion.',
    inspect: [
      {
        text: 'show interfaces Ethernet<N> counters rates — compare uplink utilization across all leaf switches during training; a persistent outlier rail indicates uneven load and a likely straggler path.',
        eosSpecific: true,
      },
      {
        text: 'show queue-monitor length detail — check whether one uplink repeatedly builds queue depth during AllReduce phases while other uplinks remain quiet.',
        eosSpecific: true,
      },
      {
        text: 'show interfaces Ethernet<N> counters errors — elevated CRC, FCS, or symbol errors on a leaf-to-NIC port indicate a physical layer problem that will slow only one participant\'s flows.',
        eosSpecific: true,
      },
      {
        text: 'show interfaces Ethernet<N> counters pfc — confirm whether ECN/PFC activity is concentrated on the suspected slow rail rather than distributed across all uplinks.',
        eosSpecific: true,
      },
      {
        text: 'Host-side NCCL trace or RDMA completion timing — identify which GPU\'s AllReduce send completes last relative to the collective median; this confirms whether the straggler is network-side or compute-side.',
        eosSpecific: false,
      },
    ],
    actions: [
      'Use NCCL trace output or per-GPU step time logs to identify which node\'s AllReduce finishes last. This tells you whether the straggler is a specific host, NIC, or rail — the switch telemetry then confirms or rules out the network as the cause.',
      'Inspect the rail connecting the straggler GPU: check uplink utilization imbalance, ECN/PFC counter activity, and physical layer error counters on both the leaf port and NIC side.',
      'If one ECMP path is persistently hotter than alternatives: verify source UDP port entropy for RDMA flows. Insufficient entropy collapses multiple flows onto the same uplink. On Strata (Tomahawk) platforms, consider enabling DLB (Dynamic Load Balancing) if available on the platform generation.',
      'If path entropy is correct but a spine or uplink shows elevated error counters: reroute traffic away from the degraded path using ECMP weight adjustment or static routing, and schedule hardware replacement.',
      'Validate recovery: after fixing the straggler source, run the same workload and confirm that step time variance narrows and the JCT median decreases. A narrowed P99-to-P50 ratio is the clearest sign the straggler was eliminated.',
    ],
  },
  {
    id: 'incast-collapse',
    title: 'Throughput Collapse During Incast',
    severity: 'High Priority',
    symptom:
      'Aggregate throughput drops sharply when many senders converge on a single receiver or small receiver group simultaneously — typical during AllGather collectives, checkpoint bursts, or storage ingestion phases.',
    rootCause:
      'Incast concentrates traffic at the egress port of the destination leaf switch, rapidly filling queue headroom faster than steady-state congestion. If ECN thresholds are tuned for steady-state rather than burst speed, buffers exhaust before marking fires, triggering PFC pause or tail drops. On Strata (Tomahawk) platforms, the default shared-buffer alpha allocation may not give the RDMA class enough headroom to absorb the burst before pausing or dropping.',
    inspect: [
      {
        text: 'show queue-monitor length interfaces all — identify egress port queue depth spikes at the destination leaf. On Strata platforms, LANZ must first be enabled: queue-monitor length.',
        eosSpecific: true,
      },
      {
        text: 'ECN mark counter at the destination leaf egress port — a sharp ECN spike before PFC growth indicates ECN fired in time; PFC arriving before meaningful ECN marks means the buffer filled too fast for ECN to signal first.',
        eosSpecific: true,
      },
      {
        text: 'show interfaces Ethernet<dest-port> counters — check tail drop or pause frame counters on the destination-facing port to confirm whether loss or backpressure is the dominant failure mode.',
        eosSpecific: true,
      },
      {
        text: 'LANZ event log — microsecond-scale burst events shorter than typical polling intervals confirm microburst-driven incast that standard SNMP counters will miss entirely.',
        eosSpecific: true,
      },
      {
        text: 'PFC propagation depth — confirm whether pause frames are limited to the immediate ingress-facing port or have spread upstream to neighboring leaf or spine switches; spread indicates the burst exceeded the local headroom budget.',
        eosSpecific: false,
      },
    ],
    actions: [
      '[EOS-specific] Enable LANZ if not already active: queue-monitor length on Strata (Tomahawk) platforms. Jericho platforms have LANZ enabled by default. Enable streaming for telemetry export on both: queue-monitor streaming / no shutdown.',
      '[EOS-specific — Strata only] Set alpha=1 for the RDMA queue on GPU-facing interfaces to give those queues first priority access to the shared buffer pool. This is not required or applicable on Jericho platforms, which use VOQ-based architecture with larger buffers.',
      'Verify the ECN marking threshold is low enough to mark before queue headroom exhaustion. Incast fills buffers faster than steady-state congestion, so conservative thresholds tuned for gradual buildup will consistently miss the incast window.',
      'If checkpoint bursts are the incast source: coordinate checkpoint timing with the job scheduler to avoid simultaneous checkpoint writes from all nodes converging during active AllReduce phases.',
      'If storage and training traffic share the same backend fabric: evaluate routing checkpoint and storage traffic to a separate traffic class or a dedicated frontend fabric path to prevent incast from impacting training collective latency.',
    ],
  },
];

export const OPERATIONS_PRINCIPLES = [
  {
    title: 'Design for Predictability Over Peak Throughput',
    detail:
      'Favor stable tail latency and bounded jitter over occasional benchmark highs. Distributed training converges faster with consistent step times — one slow synchronization point slows the entire cluster.',
  },
  {
    title: 'Control Congestion at Multiple Layers',
    detail:
      'Combine endpoint behavior (DCQCN), queue management (ECN thresholds, buffer headroom), and pathing strategy (ECMP entropy, DLB). No single control loop is sufficient at large AI cluster scale.',
  },
  {
    title: 'Instrument First, Tune Second',
    detail:
      'Define baseline telemetry and observe counter behavior under controlled load before changing any threshold. Without a baseline, rollback criteria and validation are guesswork.',
  },
];

export const OPERATIONS_MIGRATION_ROWS = [
  {
    profile: 'Small clusters (<512 GPUs), early ops maturity',
    recommendation: 'RoCEv2 baseline with conservative congestion policy',
    why: 'Fastest operational path while the team is building telemetry coverage and runbook discipline. PFC Watchdog and ECN are required minimums.',
  },
  {
    profile: 'Mid-scale clusters (512–4k GPUs), mixed workloads',
    recommendation: 'RoCEv2 + incremental traffic engineering (DLB or CLB where supported)',
    why: 'Balances predictability and migration risk while preserving existing tooling. Add advanced load balancing after baseline congestion telemetry is validated.',
  },
  {
    profile: 'Large clusters (4k+ GPUs), strict step-time SLOs',
    recommendation: 'Evaluate advanced Ethernet transport capabilities with staged rollout',
    why: 'Stronger multi-path control and selective retry strategy improve collective completion consistency at scale. Requires mature observability before migration.',
  },
];

export const OPERATIONS_CHECKS = [
  'Can you map each observed symptom to at least two telemetry signals before changing a policy?',
  'Do you have rollback criteria and a re-test procedure for every congestion-control tuning change?',
  'Is your lossless PFC domain scoped only to traffic classes that genuinely require it?',
];
