
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface AppConfig {
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroLabel: string;
}

export interface HomeModule {
  id: string;
  title: string;
  subtitle: string;
  iconKey: string; // String reference to ICON_MAP
  progress: number;
  href: string;
  color: string;
  colSpan?: number; 
}

export interface ProductVariant {
  name: string;
  chip: string;
  capacity: string;
  ports: string;
  formFactor: string;
}

export interface ProductFeature {
  label: string;
  value: string;
  subtext: string;
  iconKey?: string;
}

export interface ProductData {
  id: string;
  series: string;
  role: string;
  iconKey: string;
  desc: string;
  specs: string[];
  scale: string;
  variants?: ProductVariant[];
  keyFeatures?: ProductFeature[];
}

export interface ChartData {
  name: string;
  value?: number;
  time?: number;
  efficiency?: number;
  delay?: number;
  fill?: string;
}

export interface ConceptData {
  id: string;
  title: string;
  fullName: string;
  description: string;
  iconKey: string;
  features: string[];
}

// --- New Interfaces for Strict Typing ---

export interface ProtocolMechanism {
  name: string;
  desc: string;
  iconKey: string;
}

export interface ProtocolConcept {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconKey: string;
  color: string;
  mechanisms: ProtocolMechanism[];
}

export interface HPCItem {
  title: string;
  iconKey: string;
  points: string[];
}

export interface FutureItem {
  title: string;
  desc: string;
  iconKey: string;
}

export interface FutureCategory {
  category: string;
  color: string;
  iconKey: string;
  items: FutureItem[];
}
