
import { ProductData } from '../types';
import { claim } from '../utils/sourceClaims';


const PRODUCT_DATASHEET_SOURCE = {
  sourceUrl: 'https://www.arista.com/en/products/ethernet-switches',
  sourceTitle: 'Arista Ethernet Switch Portfolio',
  sourceRevisionOrDate: 'Accessed 2026-03',
  verificationStatus: 'vendor-claim' as const,
};

export const PRODUCTS: ProductData[] = [
  {
    id: '7060X',
    series: '7060X Series',
    role: 'AI Leaf or Spine',
    iconKey: "Server",
    desc: claim('High-capacity, low-latency Ethernet switching deployable as an AI leaf or spine in smaller fabrics. Fixed form factors ideal for high-scale AI clusters and high-radix topologies. Support for LPO and PCIe integration.', PRODUCT_DATASHEET_SOURCE),
    specs: [claim('51.2T Capacity', PRODUCT_DATASHEET_SOURCE), claim('Tomahawk5', PRODUCT_DATASHEET_SOURCE), claim('800G OSFP', PRODUCT_DATASHEET_SOURCE), claim('LPO Support', PRODUCT_DATASHEET_SOURCE)],
    scale: 'AI Leaf & Spine Fabrics',
    datasheetUrl: 'https://www.arista.com/assets/data/pdf/Datasheets/7060X6-Datasheet.pdf',
    keyFeatures: [
      { label: "Power Efficiency", value: "-25%", subtext: "Lower power per Gbps vs prior gen", iconKey: "Zap" },
      { label: "LPO Optics", value: "-50%", subtext: "Add'l power reduction with Linear Drive", iconKey: "Leaf" },
      { label: "Silicon", value: "Tomahawk5", subtext: "Latest Broadcom chipset architecture", iconKey: "Cpu" },
    ],
    variants: [
      { name: "7060X6-64PE", chip: "Tomahawk", capacity: "51.2T", ports: "64x 800G", formFactor: "2RU" },
      { name: "7060X6-64PE-B", chip: "Tomahawk", capacity: "51.2T", ports: "64x 800G", formFactor: "2RU" },
      { name: "7060X6-32PE", chip: "Tomahawk", capacity: "25.6T", ports: "32x 800G", formFactor: "1RU" },
    ],
  },
  {
    id: '7800R',
    series: '7800R Series',
    role: 'Modular AI Spine',
    iconKey: "Layers",
    desc: claim('The definitive modular platform for large-scale AI spines. Delivers up to 460 Tbps system capacity with a lossless, cell-based fabric and Virtual Output Queuing (VOQ) to eliminate head-of-line blocking.', PRODUCT_DATASHEET_SOURCE),
    specs: [claim('Jericho Silicon', PRODUCT_DATASHEET_SOURCE), claim('460 Tbps Capacity', PRODUCT_DATASHEET_SOURCE), claim('576x 800G Ports', PRODUCT_DATASHEET_SOURCE), claim('Deep Buffers', PRODUCT_DATASHEET_SOURCE)],
    scale: 'Large Scale Clusters',
    datasheetUrl: 'https://www.arista.com/assets/data/pdf/Datasheets/7800R4-Series-AI-Spine-Datasheet.pdf',
    keyFeatures: [
      { label: "Fabric", value: "Cell-Based", subtext: "100% fair, non-blocking", iconKey: "CircuitBoard" },
      { label: "Throughput", value: "460 Tbps", subtext: "Max system capacity", iconKey: "Activity" },
      { label: "Buffering", value: "Deep Buffers", subtext: "Virtual Output Queuing", iconKey: "Layers" },
    ],
    variants: [
      { name: "DCS-7816L", chip: "Chassis", capacity: "460T", ports: "576x 800G", formFactor: "16-Slot" },
      { name: "DCS-7812", chip: "Chassis", capacity: "High Scale", ports: "Modular", formFactor: "12-Slot" },
      { name: "DCS-7808", chip: "Chassis", capacity: "High Scale", ports: "Modular", formFactor: "8-Slot" },
      { name: "DCS-7804", chip: "Chassis", capacity: "High Scale", ports: "Modular", formFactor: "4-Slot" },
      { name: "7800R4C-36PE", chip: "Linecard", capacity: "28.8T/slot", ports: "36x 800G", formFactor: "Linecard" },
      { name: "7800R4-36PE", chip: "Linecard", capacity: "28.8T/slot", ports: "36x 800G", formFactor: "Linecard" },
      { name: "7800R4K-36PE", chip: "Linecard", capacity: "28.8T/slot", ports: "36x 800G", formFactor: "Linecard" },
    ],
  },
  {
    id: '7700R',
    series: '7700R DES',
    role: 'Distributed Switch',
    iconKey: "CircuitBoard",
    desc: claim('Distributed Etherlink Switch (DES) enables the scale of a multi-stage CLOS fabric with the simplicity of a single logical node. Provides a single-hop, predictable, and lossless interconnect for massive AI clusters.', PRODUCT_DATASHEET_SOURCE),
    specs: [claim('Single-Hop Architecture', PRODUCT_DATASHEET_SOURCE), claim('100% Non-blocking', PRODUCT_DATASHEET_SOURCE), claim('Auto-tuned fabric', PRODUCT_DATASHEET_SOURCE), claim('Reduce optic power by 50%', PRODUCT_DATASHEET_SOURCE)],
    scale: 'Ultra-Large Scale (Single Hop)',
    datasheetUrl: 'https://www.arista.com/assets/data/pdf/Datasheets/7800R4-Series-AI-Spine-Datasheet.pdf',
    keyFeatures: [
      { label: "Topology", value: "Single Hop", subtext: "Logical single-tier design", iconKey: "Network" },
      { label: "Scale", value: "32k XPUs", subtext: "Supports 32,000+ endpoints", iconKey: "Globe" },
      { label: "Scheduling", value: "Scheduled", subtext: "Lossless fabric behavior", iconKey: "ShieldCheck" },
    ],
    variants: [
      { name: "DES Leaf", chip: "Jericho", capacity: "N/A", ports: "18x 800G Host", formFactor: "Fixed" },
      { name: "DES Fabric", chip: "Fabric", capacity: "N/A", ports: "128x 800G", formFactor: "Fixed" },
      { name: "Cluster Limit", chip: "Distributed", capacity: "High Scale", ports: "16k x 800G", formFactor: "Logical" },
    ],
  },
  {
    id: '7280R3',
    series: '7280R3 Series',
    role: 'Universal Leaf for Storage',
    iconKey: "HardDrive",
    desc: claim('Purpose-built for IP storage and data-intensive workloads. Features dynamic deep packet buffers (up to 8GB) that absorb microbursts common in storage environments (NVMe-oF, iSCSI). Utilizes VOQ to ensure lossless behavior under congestion.', PRODUCT_DATASHEET_SOURCE),
    specs: [claim('Jericho 2', PRODUCT_DATASHEET_SOURCE), claim('Deep Buffers', PRODUCT_DATASHEET_SOURCE), claim('100G/400G', PRODUCT_DATASHEET_SOURCE), claim('VOQ Architecture', PRODUCT_DATASHEET_SOURCE)],
    scale: 'Storage & WAN Edge',
    datasheetUrl: 'https://www.arista.com/assets/data/pdf/Datasheets/7280R3-Datasheet.pdf',
    keyFeatures: [
      { label: "Buffering", value: "Dynamic", subtext: "Absorbs storage microbursts", iconKey: "Layers" },
      { label: "Storage", value: "Optimized", subtext: "Ideal for NVMe/RoCE", iconKey: "Database" },
      { label: "Reliability", value: "Lossless", subtext: "VOQ eliminates HOL blocking", iconKey: "ShieldCheck" },
    ],
    variants: [
      { name: "7280CR3", chip: "Jericho 2", capacity: "9.6T", ports: "Fixed 400G", formFactor: "1RU/2RU" },
      { name: "7280SR3", chip: "Jericho 2", capacity: "Various", ports: "100G/25G", formFactor: "1RU" },
    ],
  },
  {
    id: '7280R3A',
    series: '7280R3A Series',
    role: 'Universal Leaf for Storage',
    iconKey: "Database",
    desc: claim('Evolution of the R3 series delivering higher density and power efficiency for AI storage fabrics. Features ultra-deep buffers and deeper buffer pools for lossless AI training data retrieval and high-density storage fabrics.', PRODUCT_DATASHEET_SOURCE),
    specs: [claim('Jericho 2C+', PRODUCT_DATASHEET_SOURCE), claim('Algorithmic ACLs', PRODUCT_DATASHEET_SOURCE), claim('400G High Density', PRODUCT_DATASHEET_SOURCE), claim('In-band Telemetry', PRODUCT_DATASHEET_SOURCE)],
    scale: 'AI Storage Fabrics',
    datasheetUrl: 'https://www.arista.com/assets/data/pdf/Datasheets/7280R3A-Modular-Datasheet.pdf',
    keyFeatures: [
      { label: "Architecture", value: "VOQ", subtext: "Eliminates HOL blocking", iconKey: "ShieldCheck" },
      { label: "Telemetry", value: "INT", subtext: "In-band Network Telemetry", iconKey: "Activity" },
      { label: "Security", value: "MACsec", subtext: "Line rate encryption", iconKey: "Lock" },
    ],
    variants: [
      { name: "7280DR3A-54", chip: "Jericho 2C+", capacity: "High Scale", ports: "400G Optimized", formFactor: "Fixed" },
      { name: "7280DR3A-36", chip: "Jericho 2C+", capacity: "14.4T", ports: "36x 400G", formFactor: "1RU" },
      { name: "7280CR3A-24D12", chip: "Jericho 2C+", capacity: "Mix", ports: "24x 100G + 12x 400G", formFactor: "1RU" },
      { name: "7280CR3A-48D6", chip: "Jericho 2C+", capacity: "Mix", ports: "48x 100G + 6x 400G", formFactor: "1RU" },
      { name: "7280CR3A-72", chip: "Jericho 2C+", capacity: "7.2T", ports: "72x 100G", formFactor: "2RU" },
      { name: "7280CR3A-32S", chip: "Jericho 2C+", capacity: "3.2T", ports: "32x 100G", formFactor: "1RU" },
      { name: "7280SR3A-48YC8", chip: "Jericho 2C+", capacity: "Low Latency", ports: "48x 25G + 8x 100G", formFactor: "1RU" },
    ],
  },
];
