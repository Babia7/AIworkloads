
import { ChartData, StatCardData } from '../types';

export const STAT_CARDS: StatCardData[] = [
  { label: 'Effective Throughput', value: '98.4', unit: '%',  trend: '+12% vs Standard',  iconKey: 'Activity' },
  { label: 'Failover Time',        value: '3.3',  unit: 'ms', trend: '30x Faster',        iconKey: 'Zap' },
  { label: 'Buffer Usage',         value: '42',   unit: 'MB', trend: 'Optimized',          iconKey: 'Zap' },
  { label: 'JCT Reduction',        value: '15',   unit: '%',  trend: 'Consistent',         iconKey: 'TrendingUp' },
];

export const PERFORMANCE_DATA: ChartData[] = [
  { name: 'Standard Ethernet', efficiency: 60, fill: '#64748b' },
  { name: 'Arista Etherlink', efficiency: 99, fill: '#38bdf8' },
];

export const FAILOVER_DATA: ChartData[] = [
  { name: 'InfiniBand (multi-hop)', delay: 100, fill: '#ef4444' }, // Worst-case multi-path/multi-hop failover scenario
  { name: 'Arista Ethernet', delay: 3.3, fill: '#22c55e' },       // Approx 30x faster
];
