import { HPCItem } from '../types';
import { claim } from '../utils/sourceClaims';

const AI_NETWORKING_SOURCE = {
  sourceUrl: 'https://www.arista.com/en/solutions/ai-networking',
  sourceTitle: 'Arista AI Networking Solutions',
  sourceRevisionOrDate: 'Accessed 2026-03',
  verificationStatus: 'vendor-claim' as const,
};

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
      claim('Scale to 10k+ GPUs with deterministic latency.', AI_NETWORKING_SOURCE),
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
