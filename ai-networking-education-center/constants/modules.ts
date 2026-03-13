
import { AppConfig, HomeModule } from '../types';

export const DEFAULT_APP_CONFIG: AppConfig = {
  heroLabel: "Interactive Learning Module",
  heroTitle: "Networking for",
  heroHighlight: "AI Workloads",
  heroSubtitle: "Master modern AI fabrics, RoCE, congestion control, and data-plane behavior through interactive visuals and engineering breakdowns.",
};

export const DEFAULT_HOME_MODULES: HomeModule[] = [
  {
    id: 'mod_1', title: "Fundamentals", subtitle: "AI Fabric Basics, Unified Ethernet Architecture, and the shift from InfiniBand.",
    iconKey: "Layers", progress: 100, href: "#etherlink", color: "blue"
  },
  {
    id: 'mod_2', title: "Core Technologies", subtitle: "RDMA, RoCEv2, and NVMe-oF — the foundation of lossless AI fabrics.",
    iconKey: "Cpu", progress: 45, href: "#concepts", color: "purple"
  },
  {
    id: 'mod_3', title: "Protocols & Data Flow", subtitle: "RoCEv2 vs Ultra Ethernet (UET), Packet Spraying, and Selective Retry.",
    iconKey: "Network", progress: 70, href: "#protocols", color: "indigo"
  },
  {
    id: 'mod_4', title: "Congestion & Performance", subtitle: "ECN, PFC, Head-of-Line blocking, and job completion time optimization.",
    iconKey: "Activity", progress: 30, href: "#performance", color: "red"
  },
  {
    id: 'mod_5', title: "Hardware Platforms", subtitle: "Deep buffers, VOQ, Tomahawk Silicon, and Modular Spines.",
    iconKey: "Server", progress: 15, href: "#hardware", color: "cyan"
  },
  {
    id: 'mod_6', title: "AI vs HPC", subtitle: "Traffic patterns, synchronization barriers, and scale priorities compared.",
    iconKey: "GitMerge", progress: 85, href: "#hpc", color: "emerald"
  },
];
