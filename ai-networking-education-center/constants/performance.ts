import { ChartData } from '../types';
import { claim } from '../utils/sourceClaims';
import { claimNumberById } from '../content/claims/performanceClaims';

const ARISTA_ETHERLINK_BRIEF = {
  sourceUrl:
    'https://www.arista.com/assets/data/pdf/Whitepapers/Arista-Etherlink-AI-Networking-Architecture-Whitepaper.pdf',
  sourceTitle: 'Arista Etherlink AI Networking Architecture Whitepaper',
  sourceRevisionOrDate: '2024',
  verificationStatus: 'vendor-claim' as const,
};

export const PERFORMANCE_DATA: ChartData[] = [
  {
    name: claim('Standard Ethernet', ARISTA_ETHERLINK_BRIEF, 'chartStandardEthernetLabel'),
    efficiency: claimNumberById('chartStandardEthernetEfficiency'),
    fill: '#64748b',
  },
  {
    name: claim('Arista Etherlink', ARISTA_ETHERLINK_BRIEF, 'chartAristaEtherlinkLabel'),
    efficiency: claimNumberById('chartAristaEtherlinkEfficiency'),
    fill: '#38bdf8',
  },
];

export const FAILOVER_DATA: ChartData[] = [
  {
    name: claim('InfiniBand (multi-hop)', ARISTA_ETHERLINK_BRIEF, 'chartInfiniBandLabel'),
    delay: claimNumberById('chartInfiniBandFailoverMs'),
    fill: '#ef4444',
  },
  {
    name: claim('Arista Ethernet', ARISTA_ETHERLINK_BRIEF, 'chartAristaEthernetLabel'),
    delay: claimNumberById('chartAristaEthernetFailoverMs'),
    fill: '#22c55e',
  },
];
