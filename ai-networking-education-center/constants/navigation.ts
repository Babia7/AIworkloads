
import { Home, Layout, Lightbulb, Network, Microscope, GitCompare, BarChart2, HardDrive, Grid, BookOpen, ClipboardList } from 'lucide-react';

export const NAVIGATION = [
  { id: 'intro', label: 'Home', icon: Home },
  { id: 'etherlink', label: 'Architecture', icon: Layout },
  { id: 'concepts', label: 'Concepts', icon: Lightbulb },
  { id: 'protocols', label: 'Protocols', icon: Network },
  { id: 'deep-dive', label: 'Deep Dive', icon: Microscope },
  { id: 'uec', label: 'Comparison', icon: GitCompare },
  { id: 'performance', label: 'Performance', icon: BarChart2 },
  { id: 'operations', label: 'Ops Playbooks', icon: ClipboardList },
  { id: 'hardware', label: 'Platforms', icon: HardDrive },
  { id: 'hpc', label: 'AI vs HPC', icon: Grid },
  { id: 'glossary', label: 'Glossary', icon: BookOpen },
];
