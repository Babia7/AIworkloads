
export interface SourceLinkedValue {
  value: string;
  sourceUrl: string;
  sourceTitle: string;
  sourceRevisionOrDate: string;
  verificationStatus: 'verified' | 'vendor-claim' | 'estimated';
}

/** SKU variant row for a product */
export interface ProductVariant {
  name: string;
  chip: string;
  capacity: string;
  ports: string;
  formFactor: string;
}

/** Highlighted feature metric on a product card */
export interface ProductFeature {
  label: string;
  value: string;
  subtext: string;
  iconKey?: string;
}

/** Full product/platform data definition */
export interface ProductData {
  id: string;
  series: string;
  role: string;
  iconKey: string;
  desc: string | SourceLinkedValue;
  specs: Array<string | SourceLinkedValue>;
  scale: string;
  variants?: ProductVariant[];
  keyFeatures?: ProductFeature[];
  datasheetUrl?: string;
}

/** Single data point for Recharts bar/line charts */
export interface ChartData {
  name: string | SourceLinkedValue;
  value?: number;
  time?: number;
  efficiency?: number;
  delay?: number;
  fill?: string;
}

/** Core concept card (RDMA / NVMe / RoCEv2) */
export interface ConceptData {
  id: string;
  title: string;
  fullName: string;
  description: string | SourceLinkedValue;
  iconKey: string;
  features: Array<string | SourceLinkedValue>;
}

/** Scale Up / Out / Across architecture card */
export interface ScalingConcept {
  title: string;
  desc: string | SourceLinkedValue;
  details: string | SourceLinkedValue;
  iconKey: string;
}

/** Row in the Legacy vs Modern comparison table */
export interface ComparisonRow {
  feature: string;
  legacy: string;
  pinnacle: string;
}

/** Single mechanism within a protocol (e.g. PFC, ECN) */
export interface ProtocolMechanism {
  name: string;
  desc: string;
  iconKey: string;
}

/** Protocol concept card (RoCEv2 vs UET) */
export interface ProtocolConcept {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconKey: string;
  color: string;
  mechanisms: ProtocolMechanism[];
}

/** AI vs HPC checklist card */
export interface HPCItem {
  title: string;
  iconKey: string;
  points: Array<string | SourceLinkedValue>;
}

/** Individual roadmap improvement item */
export interface FutureItem {
  title: string;
  desc: string;
  iconKey: string;
}

/** Category grouping future improvement items */
export interface FutureCategory {
  category: string;
  color: string;
  iconKey: string;
  items: FutureItem[];
}
