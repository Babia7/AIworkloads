import { HPCItem } from '../types';

export const HPC_CHECKLIST_DEFAULT: HPCItem[] = [
  {
    title: 'Collective Acceleration',
    iconKey: 'Zap',
    points: [
      'UEC 1.0 & adaptive routing reduce completion times.',
      'Consistent step times = Higher GPU utilization.',
      'Less idle GPU time = Real dollar savings.',
    ],
  },
  {
    title: 'Lossless Fabric',
    iconKey: 'Layers',
    points: [
      "Jobs don't stall due to microbursts or queue buildup.",
      'Tuned ECN + AQM for tail latency under collective load.',
      'Predictable per-flow fairness.',
    ],
  },
  {
    title: 'GPU Scale-Out',
    iconKey: 'Network',
    points: [
      'Scale to 10k+ GPUs with deterministic latency.',
      'Ultra-high radix switches = fewer hops.',
      'Faster collectives across the fabric.',
    ],
  },
  {
    title: 'Visibility for Debugging',
    iconKey: 'BarChart2',
    points: [
      'Pinpoint exactly which link or host caused a slowdown.',
      'Identify stragglers instantly.',
      'Eliminate step-time variance.',
    ],
  },
  {
    title: 'Storage-to-GPU Pipeline',
    iconKey: 'Database',
    points: [
      'Balanced performance for object storage & shuffle phases.',
      'Smooth checkpointing without network stalls.',
      'Mix of RDMA + TCP workloads.',
    ],
  },
];
