
export type Suitability = 'poor' | 'good' | 'excellent';

export interface LBMechanism {
  id: string;
  title: string;
  subtitle: string;
  iconKey: string;
  description: string;
  strengths: string[];
  limitations: string[];
  tier: string;
  awareness: string;
  suitability: Suitability;
  suitabilityLabel: string;
}

export interface LBDecisionRow {
  mechanism: string;
  tier: string;
  awareness: string;
  aiSuitability: Suitability;
  aiSuitabilityLabel: string;
  notes: string;
}

export const LB_MECHANISMS: LBMechanism[] = [
  {
    id: 'ecmp',
    title: 'ECMP',
    subtitle: 'Equal-Cost Multi-Path',
    iconKey: 'GitMerge',
    description:
      'The default load-distribution mechanism in AI fabrics. Hashes on packet header fields and spreads traffic across equal-cost paths. Synchronized RDMA elephant flows from AI collectives frequently collide on the same links while adjacent paths stay underused.',
    strengths: [
      'Universal support — works on all switching ASICs',
      'Zero configuration overhead for basic deployment',
      'Consistent and predictable per-flow path selection',
    ],
    limitations: [
      'Hash collisions cause hot-spots with coordinated elephant flows',
      'No awareness of actual link utilization or queue depth',
      'Ineffective when many flows share the same 5-tuple entropy',
    ],
    tier: 'Leaf + Spine',
    awareness: 'Flow Hash',
    suitability: 'good',
    suitabilityLabel: 'Baseline',
  },
  {
    id: 'dlb',
    title: 'DLB',
    subtitle: 'Dynamic Load Balancing',
    iconKey: 'Activity',
    description:
      'An EOS feature that improves on static hash-based ECMP by reacting to observed flow behavior. Evaluates the queue depth and recent data-transmitted load of each ECMP member port and steers new traffic away from congested links. Deployed at the leaf layer.',
    strengths: [
      'Reacts to real queue depth — avoids hot-spot formation',
      'Improves throughput during bursty AI collective operations',
      'Can coexist with CLB on spine switches',
    ],
    limitations: [
      'Supported on fixed-port AI leaf platforms only',
      'Reactive — acts after congestion begins, not before',
      'Does not understand collective communication semantics',
    ],
    tier: 'Leaf',
    awareness: 'Queue Depth',
    suitability: 'good',
    suitabilityLabel: 'Good',
  },
  {
    id: 'clb',
    title: 'CLB',
    subtitle: 'Cluster Load Balancing',
    iconKey: 'Network',
    description:
      'An EOS feature that identifies RoCEv2-based collective communication flows at the spine and allocates them to use all available leaf uplinks evenly. Unlike DLB, CLB is collective-aware — designed specifically for GPU cluster all-reduce traffic patterns. Configured on spine switches only.',
    strengths: [
      'Collective-aware — understands all-reduce traffic patterns',
      'Allocates flows across all leaf uplinks at the spine',
      'Designed specifically for GPU cluster scale',
    ],
    limitations: [
      'Spine-only deployment; does not replace DLB at leaves',
      'Requires multi-agent coordination model',
      'Limited to RoCEv2-identified collective flows',
    ],
    tier: 'Spine',
    awareness: 'Collective-Aware',
    suitability: 'excellent',
    suitabilityLabel: 'Excellent',
  },
];

export const LB_DECISION_TABLE: LBDecisionRow[] = [
  {
    mechanism: 'ECMP',
    tier: 'Leaf + Spine',
    awareness: 'Flow Hash',
    aiSuitability: 'good',
    aiSuitabilityLabel: 'Baseline',
    notes: 'Sufficient for small clusters; hash collisions create hot-spots at AI scale',
  },
  {
    mechanism: 'DLB',
    tier: 'Leaf',
    awareness: 'Queue Depth',
    aiSuitability: 'good',
    aiSuitabilityLabel: 'Good',
    notes: 'Reduces hot-spot formation during bursty collectives; fixed-port AI leaf platforms only',
  },
  {
    mechanism: 'CLB',
    tier: 'Spine',
    awareness: 'Collective-Aware',
    aiSuitability: 'excellent',
    aiSuitabilityLabel: 'Excellent',
    notes: 'Collective-aware spine load distribution; can coexist with DLB on leaves',
  },
  {
    mechanism: 'Packet Spraying',
    tier: 'NIC / UET',
    awareness: 'Per-Packet',
    aiSuitability: 'excellent',
    aiSuitabilityLabel: 'Excellent',
    notes: 'Eliminates hash collision entirely; requires out-of-order tolerant transport (UET)',
  },
];
