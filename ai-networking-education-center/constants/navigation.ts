
import { Home, Layout, Lightbulb, Network, Microscope, GitCompare, BarChart2, HardDrive, Grid, BookOpen, ClipboardList } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
}

export const NAVIGATION: NavItem[] = [
  { id: 'intro', label: 'Home', icon: Home },
  { id: 'etherlink', label: 'Architecture', icon: Layout },
  { id: 'concepts', label: 'Concepts', icon: Lightbulb },
  { id: 'protocols', label: 'Protocols', icon: Network },
  { id: 'deep-dive', label: 'Deep Dive', icon: Microscope, href: '/deep-dive' },
  { id: 'uec', label: 'Comparison', icon: GitCompare },
  { id: 'performance', label: 'Performance', icon: BarChart2 },
  { id: 'operations', label: 'Ops Playbooks', icon: ClipboardList, href: '/operations' },
  { id: 'hardware', label: 'Platforms', icon: HardDrive },
  { id: 'hpc', label: 'AI vs HPC', icon: Grid },
  { id: 'glossary', label: 'Glossary', icon: BookOpen, href: '/glossary' },
];
