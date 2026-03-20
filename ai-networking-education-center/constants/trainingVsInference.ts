
export interface TrainingVsInferenceRow {
  dimension: string;
  training: string;
  inference: string;
}

export interface TVIDesignNote {
  title: string;
  iconKey: string;
  training: string;
  inference: string;
}

export const TVI_COMPARISON: TrainingVsInferenceRow[] = [
  {
    dimension: 'Primary Traffic Pattern',
    training: 'All-Reduce collective — every GPU to every GPU synchronously',
    inference: 'Request fan-in / fan-out — client → model shards → client',
  },
  {
    dimension: 'Latency Requirement',
    training: 'JCT (Job Completion Time) optimization — minimize training step duration',
    inference: 'Tail latency (P99) — microsecond SLO for token generation',
  },
  {
    dimension: 'Fabric Topology',
    training: 'Fat-tree Clos with DLB, non-blocking, 1:1 oversubscription',
    inference: 'Low-radix leaf-spine, shallow and wide, 4:1–8:1 front-end acceptable',
  },
  {
    dimension: 'Buffer Profile',
    training: 'Deep-buffer spine (absorb AllReduce incast), ECN at 30–40%',
    inference: 'Shallow-buffer, low-latency ASIC; ECN at 10–20% for fast response',
  },
  {
    dimension: 'Oversubscription',
    training: '1:1 backend — no oversubscription tolerated',
    inference: '4:1–8:1 front-end acceptable; backend to KV-cache may be 1:1',
  },
  {
    dimension: 'Storage Integration',
    training: 'Checkpoint writes dominate — burst-isolated storage QoS class',
    inference: 'Model weight serving — high-throughput reads, NVMe-oF or object store',
  },
];

export const TVI_DESIGN_NOTES: TVIDesignNote[] = [
  {
    title: 'Protocol Selection',
    iconKey: 'Activity',
    training: 'RoCEv2 with PFC + ECN + DCQCN; UET where NICs support it',
    inference: 'TCP or RDMA depending on framework; RDMA only if KV-cache disaggregated',
  },
  {
    title: 'Load Balancing',
    iconKey: 'GitMerge',
    training: 'DLB on leaf, CLB on spine — reduce collective hot-spots',
    inference: 'ECMP sufficient for request traffic; WCMP if weight skew exists',
  },
  {
    title: 'Telemetry Priority',
    iconKey: 'BarChart2',
    training: 'LANZ + per-flow JCT tracking; straggler detection per step',
    inference: 'P99 latency histograms per queue; queue depth dashboards per model shard',
  },
  {
    title: 'Hardware Recommendation',
    iconKey: 'Server',
    training: '7800R modular spine + 7060X leaf — deep buffer, high radix',
    inference: '7060X leaf-spine or fixed 1RU — shallow buffer, low-latency forwarding',
  },
];
