import type { ComponentType } from 'react';
import ArchitectureSection from '../components/ArchitectureSection';
import ConceptsSection from '../components/ConceptsSection';
import ProtocolsSection from '../components/ProtocolsSection';
import ProtocolDeepDive from '../components/ProtocolDeepDive';
import ComparisonTable from '../components/ComparisonTable';
import PerformanceSection from '../components/PerformanceSection';
import OperationsPlaybooksSection from '../components/OperationsPlaybooksSection';
import HardwareSection from '../components/HardwareSection';
import HPCSection from '../components/HPCSection';
import GlossarySection from '../components/GlossarySection';

export interface ModuleRegistryItem {
  id: string;
  anchorId: string;
  title: string;
  order: number;
  tocVisible: boolean;
  component: ComponentType;
}

export const MODULE_REGISTRY: ModuleRegistryItem[] = [
  {
    id: 'architecture',
    anchorId: 'etherlink',
    title: 'Architecture',
    order: 1,
    tocVisible: true,
    component: ArchitectureSection,
  },
  {
    id: 'concepts',
    anchorId: 'concepts',
    title: 'Concepts',
    order: 2,
    tocVisible: true,
    component: ConceptsSection,
  },
  {
    id: 'protocols',
    anchorId: 'protocols',
    title: 'Protocols',
    order: 3,
    tocVisible: true,
    component: ProtocolsSection,
  },
  {
    id: 'deep-dive',
    anchorId: 'deep-dive',
    title: 'Deep Dive',
    order: 4,
    tocVisible: true,
    component: ProtocolDeepDive,
  },
  {
    id: 'comparison',
    anchorId: 'uec',
    title: 'Comparison',
    order: 5,
    tocVisible: true,
    component: ComparisonTable,
  },
  {
    id: 'performance',
    anchorId: 'performance',
    title: 'Performance',
    order: 6,
    tocVisible: true,
    component: PerformanceSection,
  },
  {
    id: 'operations',
    anchorId: 'operations',
    title: 'Ops Playbooks',
    order: 7,
    tocVisible: true,
    component: OperationsPlaybooksSection,
  },
  {
    id: 'hardware',
    anchorId: 'hardware',
    title: 'Platforms',
    order: 8,
    tocVisible: true,
    component: HardwareSection,
  },
  {
    id: 'hpc',
    anchorId: 'hpc',
    title: 'AI vs HPC',
    order: 9,
    tocVisible: true,
    component: HPCSection,
  },
  {
    id: 'glossary',
    anchorId: 'glossary',
    title: 'Glossary',
    order: 10,
    tocVisible: true,
    component: GlossarySection,
  },
];
