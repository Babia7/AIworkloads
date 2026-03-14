import { ChartData } from '../types';
import { claim } from '../utils/sourceClaims';

const ARISTA_ETHERLINK_BRIEF = {
  sourceUrl: 'https://www.arista.com/assets/data/pdf/Whitepapers/Arista-Etherlink-AI-Networking-Architecture-Whitepaper.pdf',
  sourceTitle: 'Arista Etherlink AI Networking Architecture Whitepaper',
  sourceRevisionOrDate: '2024',
  verificationStatus: 'vendor-claim' as const,
};

export const PERFORMANCE_DATA: ChartData[] = [
  { name: claim('Standard Ethernet', ARISTA_ETHERLINK_BRIEF), efficiency: 60, fill: '#64748b' },
  { name: claim('Arista Etherlink', ARISTA_ETHERLINK_BRIEF), efficiency: 99, fill: '#38bdf8' },
];

export const FAILOVER_DATA: ChartData[] = [
  {
    name: claim('InfiniBand (multi-hop)', ARISTA_ETHERLINK_BRIEF),
    delay: 100,
    fill: '#ef4444',
  },
  { name: claim('Arista Ethernet', ARISTA_ETHERLINK_BRIEF), delay: 3.3, fill: '#22c55e' },
];
