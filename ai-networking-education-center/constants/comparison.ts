
import { ComparisonRow } from '../types';

export const COMPARISON_TABLE: ComparisonRow[] = [
  {
    feature: 'Packet Delivery',
    legacy: 'Rigid in-order, inefficient load balancing',
    pinnacle: 'Packet spraying, out-of-order delivery, high efficiency',
  },
  {
    feature: 'Packet Loss Recovery',
    legacy: 'Costly Go-Back-N (retransmit everything)',
    pinnacle: 'Selective retransmission of dropped packets',
  },
  {
    feature: 'Congestion Control',
    legacy: 'Complex, manual management',
    pinnacle: 'Receiver-based credits, fast incast management',
  },
  {
    feature: 'Scale',
    legacy: '10s of Thousands of hosts',
    pinnacle: 'Up to 1 Million simultaneous hosts (design target)',
  },
];
