
import { ChartData } from '../types';

export const PERFORMANCE_DATA: ChartData[] = [
  { name: 'Standard Ethernet', efficiency: 60, fill: '#64748b' },
  { name: 'Arista Etherlink', efficiency: 99, fill: '#38bdf8' },
];

export const FAILOVER_DATA: ChartData[] = [
  { name: 'InfiniBand (multi-hop)', delay: 100, fill: '#ef4444' }, // Worst-case multi-path/multi-hop failover scenario
  { name: 'Arista Ethernet', delay: 3.3, fill: '#22c55e' },       // Approx 30x faster
];
