import { HPCItem, ValidationPhase } from '../types';
import { claim } from '../utils/sourceClaims';
import { claimTextById } from '../content/claims/performanceClaims';

const AI_NETWORKING_SOURCE = {
  sourceUrl: 'https://www.arista.com/en/solutions/ai-networking',
  sourceTitle: 'Arista AI Networking Solutions',
  sourceRevisionOrDate: 'Accessed 2026-03',
  verificationStatus: 'vendor-claim' as const,
};

export const VALIDATION_PHASES: ValidationPhase[] = [
  {
    phase: 1,
    title: 'Infrastructure Baseline',
    days: 'Days 1–3',
    tests: [
      { testId: 'P1-01', name: 'BGP sessions established and stable' },
      { testId: 'P1-02', name: 'Route table correctness verified' },
      { testId: 'P1-03', name: 'QoS class mapping confirmed' },
      { testId: 'P1-04', name: 'PFC pause counters at baseline' },
      { testId: 'P1-05', name: 'LANZ telemetry active and streaming' },
      { testId: 'P1-06', name: 'CloudVision device visibility confirmed' },
      { testId: 'P1-07', name: 'ECN marking fires at test load' },
      { testId: 'P1-08', name: 'MTU end-to-end verified (9214 bytes)' },
    ],
  },
  {
    phase: 2,
    title: 'Congestion and Balancing',
    days: 'Days 4–10',
    tests: [
      { testId: 'P2-01', name: 'Hash distribution across ECMP paths' },
      { testId: 'P2-02', name: 'DLB rebalancing under sustained flow' },
      { testId: 'P2-03', name: 'CLB spine coordination (multi-agent)' },
      { testId: 'P2-04', name: 'Congestion isolation at leaf level' },
      { testId: 'P2-05', name: 'Congestion isolation at spine level' },
      { testId: 'P2-06', name: 'PFC watchdog trigger behavior' },
      { testId: 'P2-07', name: 'DCQCN rate reduction verification' },
      { testId: 'P2-08', name: 'Packet Spraying path variance' },
      { testId: 'P2-09', name: 'JCT measurement baseline established' },
    ],
  },
  {
    phase: 3,
    title: 'Failure and Recovery',
    days: 'Days 11–15',
    tests: [
      { testId: 'P3-01', name: 'Link flap recovery time' },
      { testId: 'P3-02', name: 'Leaf reload convergence' },
      { testId: 'P3-03', name: 'Spine reload traffic reroute' },
      { testId: 'P3-04', name: 'Storage burst isolation from compute traffic' },
      { testId: 'P3-05', name: 'Best-effort burst impact on RoCEv2 queue' },
    ],
  },
];

export const HPC_CHECKLIST_DEFAULT: HPCItem[] = [
  {
    title: 'Collective Acceleration',
    iconKey: 'Zap',
    points: [
      claim('UEC 1.0 & adaptive routing reduce completion times.', AI_NETWORKING_SOURCE),
      claim('Consistent step times = Higher GPU utilization.', AI_NETWORKING_SOURCE),
      claim('Less idle GPU time = Real dollar savings.', AI_NETWORKING_SOURCE),
    ],
  },
  {
    title: 'Lossless Fabric',
    iconKey: 'Layers',
    points: [
      claim("Jobs don't stall due to microbursts or queue buildup.", AI_NETWORKING_SOURCE),
      claim('Tuned ECN + AQM for tail latency under collective load.', AI_NETWORKING_SOURCE),
      claim('Predictable per-flow fairness.', AI_NETWORKING_SOURCE),
    ],
  },
  {
    title: 'GPU Scale-Out',
    iconKey: 'Network',
    points: [
      claim(
        `Scale to ${claimTextById('hpcScaleOutGpuCount')} GPUs with deterministic latency.`,
        AI_NETWORKING_SOURCE
      ),
      claim('Ultra-high radix switches = fewer hops.', AI_NETWORKING_SOURCE),
      claim('Faster collectives across the fabric.', AI_NETWORKING_SOURCE),
    ],
  },
  {
    title: 'Visibility for Debugging',
    iconKey: 'BarChart2',
    points: [
      claim('Pinpoint exactly which link or host caused a slowdown.', AI_NETWORKING_SOURCE),
      claim('Identify stragglers instantly.', AI_NETWORKING_SOURCE),
      claim('Eliminate step-time variance.', AI_NETWORKING_SOURCE),
    ],
  },
  {
    title: 'Storage-to-GPU Pipeline',
    iconKey: 'Database',
    points: [
      claim('Balanced performance for object storage & shuffle phases.', AI_NETWORKING_SOURCE),
      claim('Smooth checkpointing without network stalls.', AI_NETWORKING_SOURCE),
      claim('Mix of RDMA + TCP workloads.', AI_NETWORKING_SOURCE),
    ],
  },
];
