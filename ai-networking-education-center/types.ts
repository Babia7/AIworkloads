
import { LucideIcon } from 'lucide-react';

// Navigation Item Structure
export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

// Global Application Configuration
export interface AppConfig {
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroLabel: string;
}

// Home Page Module (Bento Grid Card)
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

// Product Variant (SKU)
export interface ProductVariant {
  name: string;
  chip: string;
  capacity: string;
  ports: string;
  formFactor: string;
}

// Key Feature Highlight
export interface ProductFeature {
  label: string;
  value: string;
  subtext: string;
  iconKey?: string;
}

// Full Product/Platform Data Definition
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
  datasheetUrl?: string;
}

// Performance Chart Data Point
export interface ChartData {
  name: string;
  value?: number;
  time?: number;
  efficiency?: number;
  delay?: number;
  fill?: string;
}

// Core Concept Definition (RDMA/NVMe)
export interface ConceptData {
  id: string;
  title: string;
  fullName: string;
  description: string;
  iconKey: string;
  features: string[];
}

// Scaling Concept (Scale Up/Out/Across)
export interface ScalingConcept {
  title: string;
  desc: string;
  details: string;
  iconKey: string;
}

// Comparison Table Row
export interface ComparisonRow {
  feature: string;
  legacy: string;
  pinnacle: string;
}

// Protocol Mechanism (PFC, ECN, etc.)
export interface ProtocolMechanism {
  name: string;
  desc: string;
  iconKey: string;
}

// Protocol Concept (RoCE vs UET)
export interface ProtocolConcept {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconKey: string;
  color: string;
  mechanisms: ProtocolMechanism[];
}

// HPC Checklist Item
export interface HPCItem {
  title: string;
  iconKey: string;
  points: string[];
}

// Roadmap/Future Improvement Item
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

// User Feedback Item
export interface FeedbackItem {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: number;
}
