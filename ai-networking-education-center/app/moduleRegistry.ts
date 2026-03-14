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
  component: ComponentType;
}

export const MODULE_REGISTRY: ModuleRegistryItem[] = [
  { id: 'architecture', component: ArchitectureSection },
  { id: 'concepts', component: ConceptsSection },
  { id: 'protocols', component: ProtocolsSection },
  { id: 'deep-dive', component: ProtocolDeepDive },
  { id: 'comparison', component: ComparisonTable },
  { id: 'performance', component: PerformanceSection },
  { id: 'operations', component: OperationsPlaybooksSection },
  { id: 'hardware', component: HardwareSection },
  { id: 'hpc', component: HPCSection },
  { id: 'glossary', component: GlossarySection }
];
