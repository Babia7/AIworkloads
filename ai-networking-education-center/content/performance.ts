export const PERFORMANCE_SECTION_CONTENT = {
  moduleLabel: 'Module 05',
  title: 'Performance Metrics',
  subtitle:
    'Telemetry showing the impact of congestion control and failover on Job Completion Time (JCT).',
  systemStatusLabel: 'System Active',
  stats: [
    {
      label: 'Effective Throughput',
      value: '98.4',
      unit: '%',
      trend: '+12% vs Standard',
      iconKey: 'activity',
    },
    {
      label: 'Failover Time',
      value: '3.3',
      unit: 'ms',
      trend: '30x Faster',
      iconKey: 'zap',
    },
    {
      label: 'Buffer Usage',
      value: '42',
      unit: 'MB',
      trend: 'Optimized',
      iconKey: 'zap',
    },
    {
      label: 'JCT Reduction',
      value: '15',
      unit: '%',
      trend: 'Consistent',
      iconKey: 'trendingUp',
    },
  ],
  charts: {
    bandwidth: {
      title: 'Bandwidth Efficiency',
      subtitle: 'Cluster Load Balancing (CLB) vs Standard ECMP',
    },
    failover: {
      title: 'Failover Convergence',
      subtitle: 'Time to recover from link failure (ms)',
    },
  },
} as const;
