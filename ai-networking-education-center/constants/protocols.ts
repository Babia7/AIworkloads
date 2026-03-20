
import { ProtocolConcept, CongestionStep } from '../types';

export const CONGESTION_PROCEDURE: CongestionStep[] = [
  {
    step: 1,
    title: 'Classify Workload',
    details: [
      'AllReduce-heavy → synchronous, tight timing, ECN tuning critical',
      'MoE / mixture-of-experts → asynchronous fan-out, incast risk dominant',
      'Checkpoint-heavy → burst isolation required, separate storage QoS class',
    ],
  },
  {
    step: 2,
    title: 'ECN Threshold Baseline',
    details: [
      'AllReduce-heavy: set ECN marking threshold at 30–40% of buffer',
      'MoE: set threshold at 20–30% (lower = faster response to incast)',
    ],
  },
  {
    step: 3,
    title: 'PFC Scope',
    details: [
      'Enable PFC on Q3 only (RoCEv2 priority class)',
      'Never extend PFC to best-effort queues',
    ],
  },
  {
    step: 4,
    title: 'Load Balancing Selection',
    details: [
      'Strata-based leaf: enable DLB',
      'Jericho-based spine: enable CLB (requires multi-agent)',
      'UET NICs: enable Packet Spraying end-to-end',
    ],
  },
  {
    step: 5,
    title: 'DCQCN Validation',
    details: [
      'Verify NIC ECN response via EOS counter checks',
      'Confirm CNP (Congestion Notification Packet) generation',
      'Check rate reduction under sustained load',
    ],
  },
];

export const PROTOCOL_CONCEPTS: ProtocolConcept[] = [
  {
    id: 'roce',
    title: "RoCEv2",
    subtitle: "",
    description: "RDMA over Converged Ethernet. Relies on lossless network behavior to function efficiently.",
    iconKey: "Activity",
    color: "blue",
    mechanisms: [
      {
        name: "PFC (Priority Flow Control)",
        desc: "Prevents packet loss by pausing traffic when buffers fill.",
        iconKey: "AlertCircle",
      },
      {
        name: "ECN (Explicit Congestion Notification)",
        desc: "Marks packets to signal incipient congestion to the sender.",
        iconKey: "Radio",
      },
      {
        name: "DCQCN",
        desc: "End-to-end congestion management algorithm for RoCE.",
        iconKey: "ShieldCheck",
      },
    ],
  },
  {
    id: 'uec',
    title: "UET",
    subtitle: "",
    description: "Ultra Ethernet Transport. Designed specifically for AI to tolerate loss and maximize bandwidth.",
    iconKey: "Zap",
    color: "green",
    mechanisms: [
      {
        name: "Packet Spraying",
        desc: "Distributes packets across all available paths simultaneously.",
        iconKey: "GitMerge",
      },
      {
        name: "Out-of-Order Delivery",
        desc: "Packets can arrive in any order and are reassembled at destination.",
        iconKey: "ArrowLeftRight",
      },
      {
        name: "Selective Retry",
        desc: "Retransmits only specific dropped packets, not the whole window.",
        iconKey: "CircuitBoard",
      },
    ],
  },
  {
    id: 'load-balancing',
    title: "Load Balancing",
    subtitle: "ECMP → DLB → CLB → Packet Spraying",
    description: "In AI fabrics, load balancing determines how flows distribute across equal-cost paths. Choice of algorithm directly affects JCT variance and GPU utilization.",
    iconKey: "GitMerge",
    color: "purple",
    mechanisms: [
      {
        name: "ECMP: Flow-hash baseline",
        desc: "Stateless, deterministic, vulnerable to hash collisions on all-reduce collective operations.",
        iconKey: "Network",
      },
      {
        name: "DLB: Dynamic Load Balancing",
        desc: "Per-packet rebalancing at Strata leaf ASICs; reduces hot-spot formation during bursty collective ops.",
        iconKey: "Activity",
      },
      {
        name: "CLB: Cluster Load Balancing",
        desc: "Spine-level, multi-agent coordination; corrects persistent imbalances across multiple leaf uplinks.",
        iconKey: "Layers",
      },
      {
        name: "Packet Spraying (UET mechanism)",
        desc: "Distributes individual packets across all paths; pairs with UET's out-of-order delivery tolerance to eliminate hash collision entirely.",
        iconKey: "GitMerge",
      },
    ],
  },
];
