import { claim } from '../utils/sourceClaims';

const ETHERLINK_SOURCE = {
  sourceUrl: 'https://www.arista.com/assets/data/pdf/Whitepapers/Arista-Etherlink-AI-Networking-Architecture-Whitepaper.pdf',
  sourceTitle: 'Arista Etherlink AI Networking Architecture Whitepaper',
  sourceRevisionOrDate: '2024',
  verificationStatus: 'vendor-claim' as const,
};

export const PERFORMANCE_SECTION_CONTENT = {
  moduleLabel: 'Module 05',
  title: 'Performance Metrics',
  subtitle: claim(
    'Telemetry showing the impact of congestion control and failover on Job Completion Time (JCT).',
    ETHERLINK_SOURCE
  ),
  systemStatusLabel: 'System Active',
  stats: [
    {
      label: 'Effective Throughput',
      value: '98.4',
      unit: '%',
      trend: claim('+12% vs Standard', ETHERLINK_SOURCE),
      iconKey: 'activity',
    },
    {
      label: 'Failover Time',
      value: '3.3',
      unit: 'ms',
      trend: claim('30x Faster', ETHERLINK_SOURCE),
      iconKey: 'zap',
    },
    {
      label: 'Buffer Usage',
      value: '42',
      unit: 'MB',
      trend: claim('Optimized', ETHERLINK_SOURCE),
      iconKey: 'zap',
    },
    {
      label: 'JCT Reduction',
      value: '15',
      unit: '%',
      trend: claim('Consistent', ETHERLINK_SOURCE),
      iconKey: 'trendingUp',
    },
  ],
  charts: {
    bandwidth: {
      title: 'Bandwidth Efficiency',
      subtitle: claim('Cluster Load Balancing (CLB) vs Standard ECMP', ETHERLINK_SOURCE),
    },
    failover: {
      title: 'Failover Convergence',
      subtitle: claim('Time to recover from link failure (ms)', ETHERLINK_SOURCE),
    },
  },
} as const;
