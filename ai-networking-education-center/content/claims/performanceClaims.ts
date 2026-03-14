import type { SourceLinkedValue } from '../../types';
import { claim } from '../../utils/sourceClaims';

const ETHERLINK_WHITEPAPER_SOURCE = {
  sourceUrl:
    'https://www.arista.com/assets/data/pdf/Whitepapers/Arista-Etherlink-AI-Networking-Architecture-Whitepaper.pdf',
  sourceTitle: 'Arista Etherlink AI Networking Architecture Whitepaper',
  sourceRevisionOrDate: '2024',
  verificationStatus: 'vendor-claim' as const,
};

const AI_NETWORKING_SOURCE = {
  sourceUrl: 'https://www.arista.com/en/solutions/ai-networking',
  sourceTitle: 'Arista AI Networking Solutions',
  sourceRevisionOrDate: 'Accessed 2026-03',
  verificationStatus: 'vendor-claim' as const,
};

const PRODUCT_DATASHEET_SOURCE = {
  sourceUrl: 'https://www.arista.com/en/products/ethernet-switches',
  sourceTitle: 'Arista Ethernet Switch Portfolio',
  sourceRevisionOrDate: 'Accessed 2026-03',
  verificationStatus: 'vendor-claim' as const,
};

export const PERFORMANCE_CLAIMS = {
  perfEffectiveThroughputPercent: claim(
    '98.4',
    ETHERLINK_WHITEPAPER_SOURCE,
    'perfEffectiveThroughputPercent'
  ),
  perfThroughputTrendDelta: claim(
    '+12% vs Standard',
    ETHERLINK_WHITEPAPER_SOURCE,
    'perfThroughputTrendDelta'
  ),
  perfFailoverTimeMs: claim('3.3', ETHERLINK_WHITEPAPER_SOURCE, 'perfFailoverTimeMs'),
  perfFailoverTrendMultiplier: claim(
    '30x Faster',
    ETHERLINK_WHITEPAPER_SOURCE,
    'perfFailoverTrendMultiplier'
  ),
  perfBufferUsageMb: claim('42', ETHERLINK_WHITEPAPER_SOURCE, 'perfBufferUsageMb'),
  perfJctReductionPercent: claim('15', ETHERLINK_WHITEPAPER_SOURCE, 'perfJctReductionPercent'),
  chartStandardEthernetEfficiency: claim(
    '60',
    ETHERLINK_WHITEPAPER_SOURCE,
    'chartStandardEthernetEfficiency'
  ),
  chartAristaEtherlinkEfficiency: claim(
    '99',
    ETHERLINK_WHITEPAPER_SOURCE,
    'chartAristaEtherlinkEfficiency'
  ),
  chartInfiniBandFailoverMs: claim('100', ETHERLINK_WHITEPAPER_SOURCE, 'chartInfiniBandFailoverMs'),
  chartAristaEthernetFailoverMs: claim(
    '3.3',
    ETHERLINK_WHITEPAPER_SOURCE,
    'chartAristaEthernetFailoverMs'
  ),
  hpcScaleOutGpuCount: claim('10k+', AI_NETWORKING_SOURCE, 'hpcScaleOutGpuCount'),
  product7060PowerEfficiency: claim('-25%', PRODUCT_DATASHEET_SOURCE, 'product7060PowerEfficiency'),
  product7060LpoReduction: claim('-50%', PRODUCT_DATASHEET_SOURCE, 'product7060LpoReduction'),
  product7060Capacity: claim('51.2T', PRODUCT_DATASHEET_SOURCE, 'product7060Capacity'),
  product7060CapacityHalf: claim('25.6T', PRODUCT_DATASHEET_SOURCE, 'product7060CapacityHalf'),
  product7060Ports64x800g: claim('64x 800G', PRODUCT_DATASHEET_SOURCE, 'product7060Ports64x800g'),
  product7060Ports32x800g: claim('32x 800G', PRODUCT_DATASHEET_SOURCE, 'product7060Ports32x800g'),
  product7800CapacityTbps: claim('460 Tbps', PRODUCT_DATASHEET_SOURCE, 'product7800CapacityTbps'),
  product7800Ports576x800g: claim(
    '576x 800G',
    PRODUCT_DATASHEET_SOURCE,
    'product7800Ports576x800g'
  ),
  product7800Capacity460t: claim('460T', PRODUCT_DATASHEET_SOURCE, 'product7800Capacity460t'),
  product7800LinecardCapacity: claim(
    '28.8T/slot',
    PRODUCT_DATASHEET_SOURCE,
    'product7800LinecardCapacity'
  ),
  product7800LinecardPorts: claim('36x 800G', PRODUCT_DATASHEET_SOURCE, 'product7800LinecardPorts'),
  product7800FabricFairness: claim(
    '100% fair, non-blocking',
    PRODUCT_DATASHEET_SOURCE,
    'product7800FabricFairness'
  ),
  product7700SpecNonBlocking: claim(
    '100% Non-blocking',
    PRODUCT_DATASHEET_SOURCE,
    'product7700SpecNonBlocking'
  ),
  product7700OpticPowerReduction: claim(
    'Reduce optic power by 50%',
    PRODUCT_DATASHEET_SOURCE,
    'product7700OpticPowerReduction'
  ),
  product7700Scale: claim('32k XPUs', PRODUCT_DATASHEET_SOURCE, 'product7700Scale'),
  product7700Ports18x800gHost: claim(
    '18x 800G Host',
    PRODUCT_DATASHEET_SOURCE,
    'product7700Ports18x800gHost'
  ),
  product7700Ports128x800g: claim(
    '128x 800G',
    PRODUCT_DATASHEET_SOURCE,
    'product7700Ports128x800g'
  ),
  product7700Ports16kx800g: claim(
    '16k x 800G',
    PRODUCT_DATASHEET_SOURCE,
    'product7700Ports16kx800g'
  ),
  product7280BufferUpTo8gb: claim(
    'up to 8GB',
    PRODUCT_DATASHEET_SOURCE,
    'product7280BufferUpTo8gb'
  ),
  product7280Spec100g400g: claim('100G/400G', PRODUCT_DATASHEET_SOURCE, 'product7280Spec100g400g'),
  product7280Capacity96t: claim('9.6T', PRODUCT_DATASHEET_SOURCE, 'product7280Capacity96t'),
  product7280Ports100g25g: claim('100G/25G', PRODUCT_DATASHEET_SOURCE, 'product7280Ports100g25g'),
  product7280aSpec400g: claim(
    '400G High Density',
    PRODUCT_DATASHEET_SOURCE,
    'product7280aSpec400g'
  ),
  product7280aCapacity144t: claim('14.4T', PRODUCT_DATASHEET_SOURCE, 'product7280aCapacity144t'),
  product7280aPorts36x400g: claim('36x 400G', PRODUCT_DATASHEET_SOURCE, 'product7280aPorts36x400g'),
  product7280aPorts24x100g12x400g: claim(
    '24x 100G + 12x 400G',
    PRODUCT_DATASHEET_SOURCE,
    'product7280aPorts24x100g12x400g'
  ),
  product7280aPorts48x100g6x400g: claim(
    '48x 100G + 6x 400G',
    PRODUCT_DATASHEET_SOURCE,
    'product7280aPorts48x100g6x400g'
  ),
  product7280aCapacity72t: claim('7.2T', PRODUCT_DATASHEET_SOURCE, 'product7280aCapacity72t'),
  product7280aPorts72x100g: claim('72x 100G', PRODUCT_DATASHEET_SOURCE, 'product7280aPorts72x100g'),
  product7280aCapacity32t: claim('3.2T', PRODUCT_DATASHEET_SOURCE, 'product7280aCapacity32t'),
  product7280aPorts32x100g: claim('32x 100G', PRODUCT_DATASHEET_SOURCE, 'product7280aPorts32x100g'),
  product7280aPorts48x25g8x100g: claim(
    '48x 25G + 8x 100G',
    PRODUCT_DATASHEET_SOURCE,
    'product7280aPorts48x25g8x100g'
  ),
} as const satisfies Record<string, SourceLinkedValue>;

export type PerformanceClaimId = keyof typeof PERFORMANCE_CLAIMS;

export const getPerformanceClaim = (claimId: PerformanceClaimId): SourceLinkedValue =>
  PERFORMANCE_CLAIMS[claimId];

export const claimTextById = (claimId: PerformanceClaimId): string =>
  PERFORMANCE_CLAIMS[claimId].value;

export const claimNumberById = (claimId: PerformanceClaimId): number =>
  Number.parseFloat(claimTextById(claimId));
