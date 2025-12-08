
import { 
  CircuitBoard, Server, Network, ShieldCheck, Activity, Zap, Layers, Globe, Radio, GitMerge, AlertCircle, ArrowLeftRight, Database, Cpu, Leaf, Palette, Code, Lightbulb, Grid, Home, Layout, GitCompare, BarChart2, HardDrive, Rocket, Microscope, Terminal, BookOpen, Smartphone, Search, Download, Eye, Keyboard, Settings, Lock, Check, X, Save, Trash2, Plus, RotateCcw, LogOut, Edit, Moon, Sun, Type, MousePointer, Maximize, Minimize, List, CheckSquare, Video, Mic, Cloud, Flag, Share2, Clock, MessageSquare, Users, FileText, Printer, Bookmark, WifiOff, Image, TriangleAlert, CircleHelp, ArrowUp, Menu, Info, Pen, Box
} from 'lucide-react';
import { AppConfig, HomeModule } from './types';

/**
 * ICON MAPPING
 * 
 * Why this exists:
 * We cannot save React Components (functions) to LocalStorage via JSON.stringify().
 * Instead, we store a string key (e.g., "Server") in the data.
 * Components use this map to resolve the string key back to the actual Lucide Icon component at runtime.
 */
export const ICON_MAP: Record<string, any> = {
  CircuitBoard, Server, Network, ShieldCheck, Activity, Zap, Layers, Globe, Radio, GitMerge, AlertCircle, ArrowLeftRight, Database, Cpu, Leaf, Palette, Code, Lightbulb, Grid, Home, Layout, GitCompare, BarChart2, HardDrive, Rocket, Microscope, Terminal, BookOpen, Smartphone, Search, Download, Eye, Keyboard, Settings, Moon, Sun, Type, MousePointer, Maximize, Minimize, List, CheckSquare, Video, Mic, Cloud, Flag, Share2, Save, Clock, MessageSquare, Users, FileText, Printer, Bookmark, WifiOff, Image, TriangleAlert, CircleHelp, ArrowUp, Menu, Info, Edit, Pen, AlertTriangle: TriangleAlert, HelpCircle: CircleHelp, Edit2: Edit, Box
};

// --- Initial Data States ---
// These constants are loaded into the DataContext on first launch or reset.

export const DEFAULT_APP_CONFIG: AppConfig = {
  heroLabel: "Interactive Learning Module",
  heroTitle: "Networking for",
  heroHighlight: "AI Workloads",
  heroSubtitle: "Master modern AI fabrics, RoCE, congestion control, and data-plane behavior through interactive visuals and engineering breakdowns."
};

export const DEFAULT_HOME_MODULES: HomeModule[] = [
  { 
    id: 'mod_1', title: "Fundamentals", subtitle: "AI Fabric Basics, Unified Ethernet Architecture, and the shift from InfiniBand.", 
    iconKey: "Layers", progress: 100, href: "#etherlink", color: "blue" 
  },
  { 
    id: 'mod_2', title: "Core Technologies", subtitle: "RDMA, NVMe-oF, and the mechanics of Zero-Copy networking.", 
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

export const NAVIGATION = [
  { id: 'intro', label: 'Home', icon: Home },
  { id: 'etherlink', label: 'Architecture', icon: Layout },
  { id: 'concepts', label: 'Concepts', icon: Lightbulb },
  { id: 'protocols', label: 'Protocols', icon: Network },
  { id: 'deep-dive', label: 'Deep Dive', icon: Microscope },
  { id: 'uec', label: 'Comparison', icon: GitCompare },
  { id: 'performance', label: 'Performance', icon: BarChart2 },
  { id: 'hardware', label: 'Platforms', icon: HardDrive },
  { id: 'hpc', label: 'AI vs HPC', icon: Grid },
  { id: 'glossary', label: 'Glossary', icon: BookOpen },
];

export const GLOSSARY: Record<string, string> = {
  // --- Architecture & Topology ---
  "Radix": "The number of ports on a switch. High radix switches (e.g., 64-port 800G) allow for flatter network topologies with fewer hops, reducing latency.",
  "Leaf-Spine": "A two-tier network topology where every leaf switch connects to every spine switch, minimizing latency and ensuring consistent bandwidth.",
  "Clos": "A multistage circuit-switching network which represents a theoretical ideal for non-blocking networks, the foundation of modern AI fabrics.",
  "Fat-Tree": "A network topology where bandwidth increases closer to the root, maintaining 1:1 subscription ratio at all levels to prevent bottlenecks.",
  "Dragonfly": "A direct-connect topology used in HPC that groups routers into groups, minimizing the diameter of the network but often requiring adaptive routing.",
  "Torus": "A ring-based topology where nodes are connected to their nearest neighbors in multiple dimensions (2D, 3D), common in traditional supercomputing.",
  "Superpod": "A cluster unit in NVIDIA architectures (e.g., 32 DGX nodes) connected via NVLink/Infiniband, representing a building block for larger AI data centers.",
  "Rail-Optimized": "A topology design where specific GPUs in a node (e.g., GPU 0) communicate with corresponding GPUs in other nodes via dedicated network rails.",
  "Non-Blocking": "A network property where any input port can be connected to any free output port without internal contention.",
  "Bisection Bandwidth": "The bandwidth available between two equal-sized partitions of a network; a key measure of network capacity for all-to-all communication.",
  "Oversubscription": "The ratio of downstream bandwidth to upstream bandwidth. AI networks typically demand 1:1 (zero oversubscription) to prevent congestion.",
  "East-West Traffic": "Network traffic flows between servers within a data center (e.g., GPU-to-GPU training), as opposed to North-South traffic (Client-to-Server).",
  "North-South Traffic": "Network traffic entering or leaving the data center (e.g., User requests to Web Server).",

  // --- Protocols & Transport ---
  "RoCE": "RDMA over Converged Ethernet. A network protocol that allows remote direct memory access over an Ethernet network, requiring a lossless fabric.",
  "RoCEv2": "Version 2 of RoCE, which routes packets over Layer 3 (IP/UDP) networks, enabling scalability across data centers.",
  "InfiniBand": "A high-speed, low-latency networking standard historically used in HPC, utilizing credit-based flow control to ensure lossless transmission.",
  "UEC": "Ultra Ethernet Consortium. An organization defining new Ethernet standards (UET) specifically optimized for AI and HPC to handle packet loss gracefully.",
  "UET": "Ultra Ethernet Transport. The upcoming transport protocol from UEC featuring packet spraying, flexible ordering, and selective recovery.",
  "TCP/IP": "Transmission Control Protocol/Internet Protocol. The backbone of the internet. Reliable but often too high-latency and CPU-intensive for internal AI fabric communication.",
  "NVMe-oF": "NVMe over Fabrics. Extending the NVMe storage protocol over networks (TCP, RoCE, FC) to access remote SSDs with local-like performance.",
  "GPUDirect": "NVIDIA technology enabling direct communication between GPUs, or between GPUs and network adapters (RDMA), bypassing the host CPU.",
  "NVLink": "A high-bandwidth, energy-efficient proprietary interconnect developed by NVIDIA for peer-to-peer GPU communication within a node or rack.",

  // --- Traffic & Congestion ---
  "PFC": "Priority Flow Control. A Layer 2 mechanism that pauses traffic for specific classes of service to prevent buffer overflow, essential for lossless Ethernet.",
  "ECN": "Explicit Congestion Notification. A Layer 3 mechanism where switches mark packets to signal incipient congestion, prompting the sender to slow down.",
  "DCQCN": "Data Center Quantized Congestion Notification. A congestion control algorithm for RoCE combining ECN and PFC concepts.",
  "Incast": "A traffic pattern where many senders communicate with a single receiver simultaneously, often causing microbursts and buffer exhaustion.",
  "Microburst": "A sudden, intense spike in traffic lasting microseconds. Too fast for SNMP polling to detect, but large enough to overflow shallow buffers.",
  "Head-of-Line Blocking": "A performance issue where a line of packets is held up by the first packet, preventing subsequent packets (even those going to other destinations) from moving.",
  "Tail Latency": "The latency experienced by the slowest percentage (e.g., 99th percentile) of requests. In AI, the tail latency defines the step time for the entire cluster.",
  "Goodput": "The number of useful information bits delivered by the network per unit of time, excluding retransmissions and protocol overhead.",
  "Packet Spraying": "A load balancing technique that distributes packets of a single flow across multiple paths simultaneously to maximize bandwidth utilization.",
  "Entropy": "Randomness introduced into packet headers (e.g., source UDP port) to help hash-based load balancers (ECMP) distribute traffic evenly.",
  "Jitter": "The variation in packet delay (latency). High jitter can disrupt synchronization in AI training collectives.",
  "ECMP": "Equal-Cost Multi-Path. A routing strategy where next-hop packet forwarding to a single destination can occur over multiple best paths.",

  // --- Hardware & Silicon ---
  "ASIC": "Application-Specific Integrated Circuit. The silicon chip inside a switch (e.g., Broadcom Tomahawk, Jericho) that performs packet forwarding logic.",
  "VOQ": "Virtual Output Queuing. A buffering architecture where packets are queued at the ingress based on their egress destination, eliminating Head-of-Line blocking.",
  "Deep Buffers": "Large memory pools (GBs) on switches/routers designed to absorb traffic bursts without dropping packets, crucial for WAN and lossless fabrics.",
  "SerDes": "Serializer/Deserializer. Functional blocks that convert parallel data to serial data for transmission over high-speed links.",
  "PAM4": "Pulse Amplitude Modulation 4-level. A modulation technique used in modern high-speed Ethernet (400G/800G) to encode two bits per symbol.",
  "LPO": "Linear Pluggable Optics. Optical modules that remove the DSP (Digital Signal Processor) to reduce power consumption and latency by up to 50%.",
  "CPO": "Co-Packaged Optics. Optics integrated directly onto the switch package substrate to maximize density and minimize electrical drive distance.",
  "SmartNIC": "A Network Interface Card with programmable compute resources (ARM cores, FPGA) to offload networking tasks (OVS, Encryption, RDMA) from the host CPU.",
  "DPU": "Data Processing Unit. An evolved SmartNIC specialized for infrastructure offloading, isolating the tenant OS from the infrastructure control plane.",
  "PCIe": "Peripheral Component Interconnect Express. A high-speed serial computer expansion bus standard for connecting GPUs, NICS, and SSDs to the host CPU.",
  "Switch Fabric": "The internal mesh of connections within a switch or router that directs traffic from input ports to output ports.",
  "Retimer": "A mixed-signal device used to extend the reach of high-speed signals by recovering the clock and regenerating the data.",
  "OSFP": "Octal Small Form-factor Pluggable. A large pluggable transceiver format used for 400G and 800G optical modules, designed for better thermal management.",
  "QSFP-DD": "Quad Small Form-factor Pluggable Double Density. A high-density transceiver module format backwards compatible with QSFP.",

  // --- AI Workloads ---
  "All-Reduce": "A collective operation where data is aggregated from all nodes (Reduce) and the result is distributed back to all nodes (Broadcast). The workhorse of LLM training.",
  "All-Gather": "A collective operation where every node gathers data from every other node, resulting in every node having a complete copy of the dataset.",
  "Scatter-Gather": "A pattern where a primary node distributes chunks of data to workers (Scatter) and collects results back (Gather).",
  "Barrier Synchronization": "A checkpoint in distributed computing where all tasks must wait until every member of the group has reached the point before any can proceed.",
  "Straggler": "A slow task, node, or link that delays the completion of a synchronized workload, causing the entire cluster to idle.",
  "Checkpointing": "The process of saving the current state of an AI model to persistent storage (NVMe/S3) so training can resume after a failure.",
  "Gradient Descent": "An optimization algorithm used to minimize the loss function in AI training by iteratively adjusting model parameters.",
  "Model Parallelism": "Splitting a single large AI model across multiple GPUs because it doesn't fit in the memory of a single device.",
  "Data Parallelism": "Replicating the entire model across multiple GPUs, where each GPU processes a different batch of training data.",
  "JCT": "Job Completion Time. The total time taken to train an AI model. In distributed training, JCT is directly impacted by network tail latency.",
  "Inference": "The phase where a trained AI model is used to generate predictions or content based on new input data.",
  "Training": "The computational process of teaching an AI model by feeding it massive datasets to adjust its internal weights.",
  "Parameter": "A configuration variable that is internal to the model and whose value can be estimated from data. LLMs have billions or trillions of parameters.",
  "Epoch": "One complete pass of the training algorithm through the entire training dataset.",
  "Batch Size": "The number of training examples utilized in one iteration.",
  "Floating Point Operations": "FLOPs. A measure of computer performance, critical for quantifying AI training compute requirements.",
  "GPU": "Graphics Processing Unit. A specialized electronic circuit designed to manipulate and alter memory to accelerate the creation of images, now the standard for AI compute.",
  "TPU": "Tensor Processing Unit. An AI accelerator application-specific integrated circuit (ASIC) developed by Google specifically for neural network machine learning."
};

export const PERFORMANCE_DATA = [
  { name: 'Standard Ethernet', efficiency: 60, fill: '#64748b' },
  { name: 'Arista Etherlink', efficiency: 99, fill: '#38bdf8' },
];

export const FAILOVER_DATA = [
  { name: 'InfiniBand', delay: 100, fill: '#ef4444' },
  { name: 'Arista Ethernet', delay: 3.3, fill: '#22c55e' }, // Approx 30x faster
];

export const COMPARISON_TABLE = [
  {
    feature: 'Packet Delivery',
    legacy: 'Rigid in-order, inefficient load balancing',
    pinnacle: 'Packet spraying, out-of-order delivery, high efficiency'
  },
  {
    feature: 'Packet Loss Recovery',
    legacy: 'Costly Go-Back-N (retransmit everything)',
    pinnacle: 'Selective retransmission of dropped packets'
  },
  {
    feature: 'Congestion Control',
    legacy: 'Complex, manual management',
    pinnacle: 'Receiver-based credits, fast incast management'
  },
  {
    feature: 'Scale',
    legacy: '10s of Thousands of hosts',
    pinnacle: 'Up to 1 Million simultaneous hosts'
  }
];

export const PRODUCTS = [
  {
    id: '7060X',
    series: '7060X Series',
    role: 'Fixed AI Leaf',
    iconKey: "Server",
    desc: 'High-capacity, low-latency Ethernet switching optimized for AI leaf roles. Featuring fixed form factors ideal for high-scale AI clusters and high radix topologies. Support for LPO and PCIe integration.',
    specs: ['51.2T Capacity', 'Tomahawk', '800G OSFP', 'LPO Support'],
    scale: 'High-Scale AI Clusters',
    datasheetUrl: 'https://www.arista.com/assets/data/pdf/Datasheets/7060X6-Datasheet.pdf',
    keyFeatures: [
        { label: "Power Efficiency", value: "-25%", subtext: "Lower power per Gbps vs prior gen", iconKey: "Zap" },
        { label: "LPO Optics", value: "-50%", subtext: "Add'l power reduction with Linear Drive", iconKey: "Leaf" },
        { label: "Silicon", value: "Tomahawk", subtext: "Latest Broadcom chipset architecture", iconKey: "Cpu" }
    ],
    variants: [
        { name: "7060X6-64PE", chip: "Tomahawk", capacity: "51.2T", ports: "64x 800G", formFactor: "2RU" },
        { name: "7060X6-64PE-B", chip: "Tomahawk", capacity: "51.2T", ports: "64x 800G", formFactor: "2RU" },
        { name: "7060X6-32PE", chip: "Tomahawk", capacity: "25.6T", ports: "32x 800G", formFactor: "1RU" }
    ]
  },
  {
    id: '7800R',
    series: '7800R Series',
    role: 'Modular AI Spine',
    iconKey: "Layers",
    desc: 'The definitive modular platform for large-scale AI spines. Delivers up to 460 Tbps system capacity with a lossless, cell-based fabric and Virtual Output Queuing (VOQ) to eliminate head-of-line blocking.',
    specs: ['Jericho Silicon', '460 Tbps Capacity', '576x 800G Ports', 'Deep Buffers'],
    scale: 'Large Scale Clusters',
    datasheetUrl: 'https://www.arista.com/assets/data/pdf/Datasheets/7800R4-Series-AI-Spine-Datasheet.pdf',
    keyFeatures: [
        { label: "Fabric", value: "Cell-Based", subtext: "100% fair, non-blocking", iconKey: "CircuitBoard" },
        { label: "Throughput", value: "460 Tbps", subtext: "Max system capacity", iconKey: "Activity" },
        { label: "Buffering", value: "Deep Buffers", subtext: "Virtual Output Queuing", iconKey: "Layers" }
    ],
    variants: [
        { name: "DCS-7816L", chip: "Chassis", capacity: "460T", ports: "576x 800G", formFactor: "16-Slot" },
        { name: "DCS-7812", chip: "Chassis", capacity: "High Scale", ports: "Modular", formFactor: "12-Slot" },
        { name: "DCS-7808", chip: "Chassis", capacity: "High Scale", ports: "Modular", formFactor: "8-Slot" },
        { name: "DCS-7804", chip: "Chassis", capacity: "High Scale", ports: "Modular", formFactor: "4-Slot" },
        { name: "7800R4C-36PE", chip: "Linecard", capacity: "28.8T/slot", ports: "36x 800G", formFactor: "Linecard" },
        { name: "7800R4-36PE", chip: "Linecard", capacity: "28.8T/slot", ports: "36x 800G", formFactor: "Linecard" },
        { name: "7800R4K-36PE", chip: "Linecard", capacity: "28.8T/slot", ports: "36x 800G", formFactor: "Linecard" }
    ]
  },
  {
    id: '7700R',
    series: '7700R DES',
    role: 'Distributed Switch',
    iconKey: "CircuitBoard",
    desc: 'Distributed Etherlink Switch (DES) enables the scale of a multi-stage CLOS fabric with the simplicity of a single logical node. Provides a single-hop, predictable, and lossless interconnect for massive AI clusters.',
    specs: ['Single-Hop Architecture', '100% Non-blocking', 'Auto-tuned fabric', 'Reduce optic power by 50%'],
    scale: 'Ultra-Large Scale (Single Hop)',
    datasheetUrl: 'https://www.arista.com/assets/data/pdf/Datasheets/7800R4-Series-AI-Spine-Datasheet.pdf',
    keyFeatures: [
        { label: "Topology", value: "Single Hop", subtext: "Logical single-tier design", iconKey: "Network" },
        { label: "Scale", value: "32k XPUs", subtext: "Supports 32,000+ endpoints", iconKey: "Globe" },
        { label: "Scheduling", value: "Scheduled", subtext: "Lossless fabric behavior", iconKey: "ShieldCheck" }
    ],
    variants: [
        { name: "DES Leaf", chip: "Jericho", capacity: "N/A", ports: "18x 800G Host", formFactor: "Fixed" },
        { name: "DES Fabric", chip: "Fabric", capacity: "N/A", ports: "128x 800G", formFactor: "Fixed" },
        { name: "Cluster Limit", chip: "Distributed", capacity: "High Scale", ports: "16k x 800G", formFactor: "Logical" }
    ]
  },
  {
    id: '7280R3',
    series: '7280R3 Series',
    role: 'Universal Leaf',
    iconKey: "HardDrive",
    desc: 'Purpose-built for IP storage and data-intensive workloads. Features dynamic deep packet buffers (up to 8GB) that absorb microbursts common in storage environments (NVMe-oF, iSCSI). Utilizes VOQ to ensure lossless behavior under congestion.',
    specs: ['Jericho 2', 'Deep Buffers', '100G/400G', 'Internet Peering'],
    scale: 'Storage & WAN Edge',
    datasheetUrl: 'https://www.arista.com/assets/data/pdf/Datasheets/7280R3-Datasheet.pdf',
    keyFeatures: [
        { label: "Buffering", value: "Dynamic", subtext: "Absorbs storage microbursts", iconKey: "Layers" },
        { label: "Storage", value: "Optimized", subtext: "Ideal for NVMe/RoCE", iconKey: "Database" },
        { label: "Routing", value: "High Scale", subtext: "Internet table support", iconKey: "Globe" }
    ],
    variants: [
        { name: "7280CR3", chip: "Jericho 2", capacity: "9.6T", ports: "Fixed 400G", formFactor: "1RU/2RU" },
        { name: "7280SR3", chip: "Jericho 2", capacity: "Various", ports: "100G/25G", formFactor: "1RU" }
    ]
  },
  {
    id: '7280R3A',
    series: '7280R3A Series',
    role: 'High Perf AI/Storage',
    iconKey: "Database",
    desc: 'Evolution of the R3 series delivering higher density and power efficiency for AI storage fabrics. Features ultra-deep buffers for lossless AI training data retrieval and massive table scale for modern data centers.',
    specs: ['Jericho 2C+', 'Algorithmic ACLs', '400G High Density', 'In-band Telemetry'],
    scale: 'AI Data Lakes',
    datasheetUrl: 'https://www.arista.com/assets/data/pdf/Datasheets/7280R3-Datasheet.pdf',
    keyFeatures: [
        { label: "Architecture", value: "VOQ", subtext: "Eliminates HOL blocking", iconKey: "ShieldCheck" },
        { label: "Telemetry", value: "INT", subtext: "In-band Network Telemetry", iconKey: "Activity" },
        { label: "Security", value: "MACsec", subtext: "Line rate encryption", iconKey: "Lock" }
    ],
    variants: [
        { name: "7280DR3A-54", chip: "Jericho 2C+", capacity: "High Scale", ports: "400G Optimized", formFactor: "Fixed" },
        { name: "7280DR3A-36", chip: "Jericho 2C+", capacity: "14.4T", ports: "36x 400G", formFactor: "1RU" },
        { name: "7280CR3A-24D12", chip: "Jericho 2C+", capacity: "Mix", ports: "24x 100G + 12x 400G", formFactor: "1RU" },
        { name: "7280CR3A-48D6", chip: "Jericho 2C+", capacity: "Mix", ports: "48x 100G + 6x 400G", formFactor: "1RU" },
        { name: "7280CR3A-72", chip: "Jericho 2C+", capacity: "7.2T", ports: "72x 100G", formFactor: "2RU" },
        { name: "7280CR3A-32S", chip: "Jericho 2C+", capacity: "3.2T", ports: "32x 100G", formFactor: "1RU" },
        { name: "7280SR3A-48YC8", chip: "Jericho 2C+", capacity: "Low Latency", ports: "48x 25G + 8x 100G", formFactor: "1RU" }
    ]
  }
];

export const SCALING_CONCEPTS = [
  {
    title: "Scale Up",
    desc: "Inside the Rack",
    details: "Massive bandwidth for XPU-to-XPU interconnects (memory sharing) within a single rack.",
    iconKey: "Zap"
  },
  {
    title: "Scale Out",
    desc: "Across the Data Center",
    details: "Connecting thousands of compute servers using Leaf/Spine fabrics.",
    iconKey: "Network"
  },
  {
    title: "Scale Across",
    desc: "Between Buildings",
    details: "Connecting geographically distributed AI centers (DCI) with encryption.",
    iconKey: "Globe"
  }
];

export const CORE_CONCEPTS = [
  {
    id: 'rdma',
    title: "RDMA",
    fullName: "Remote Direct Memory Access",
    description: "A technology that allows computers to exchange data in main memory without involving the processor, cache, or operating system of either computer. This releases resources for the actual application (AI Training).",
    iconKey: "Cpu",
    features: ["Zero-Copy Networking", "Kernel Bypass", "CPU Offload"]
  },
  {
    id: 'nvme',
    title: "NVMe",
    fullName: "Non-Volatile Memory Express",
    description: "A storage interface protocol designed to accelerate the transfer of data between enterprise and client systems and solid-state drives (SSDs). It utilizes high-speed PCIe lanes to maximize parallelism.",
    iconKey: "Database",
    features: ["64K I/O Queues", "Massive Parallelism", "Low Latency Access"]
  }
];

export const PROTOCOL_CONCEPTS = [
  {
    id: 'roce',
    title: "RoCEv2",
    subtitle: "Current Standard",
    description: "RDMA over Converged Ethernet. Relies on lossless network behavior to function efficiently.",
    iconKey: "Activity",
    color: "blue",
    mechanisms: [
      { 
        name: "PFC (Priority Flow Control)", 
        desc: "Prevents packet loss by pausing traffic when buffers fill.",
        iconKey: "AlertCircle" 
      },
      { 
        name: "ECN (Explicit Congestion Notification)", 
        desc: "Marks packets to signal incipient congestion to the sender.",
        iconKey: "Radio" 
      },
      { 
        name: "DCQCN", 
        desc: "End-to-end congestion management algorithm for RoCE.",
        iconKey: "ShieldCheck" 
      }
    ]
  },
  {
    id: 'uec',
    title: "UET (UEC)",
    subtitle: "Future Standard",
    description: "Ultra Ethernet Transport. Designed specifically for AI to tolerate loss and maximize bandwidth.",
    iconKey: "Zap",
    color: "green",
    mechanisms: [
      { 
        name: "Packet Spraying", 
        desc: "Distributes packets across all available paths simultaneously.",
        iconKey: "GitMerge" 
      },
      { 
        name: "Out-of-Order Delivery", 
        desc: "Packets can arrive in any order and are reassembled at destination.",
        iconKey: "ArrowLeftRight" 
      },
      { 
        name: "Selective Retry", 
        desc: "Retransmits only specific dropped packets, not the whole window.",
        iconKey: "CircuitBoard" 
      }
    ]
  }
];

export const FUTURE_IMPROVEMENTS = [
  {
    category: "User Experience (UX) & Design",
    color: "blue",
    iconKey: "Eye",
    items: [
      { title: "High Contrast Mode", desc: "Toggleable themes for users with visual impairments.", iconKey: "Palette" },
      { title: "Keyboard Navigation", desc: "Full tab support for all interactive protocol simulations.", iconKey: "Keyboard" },
      { title: "Screen Reader Optimization", desc: "ARIA labels and detailed descriptions for graphics.", iconKey: "Smartphone" },
      { title: "Adaptive Theme System", desc: "Sync with OS light/dark/dim preferences automatically.", iconKey: "Moon" },
      { title: "Color Blindness Themes", desc: "Protanopia and Deuteranopia accessible color palettes.", iconKey: "Eye" },
      { title: "Custom Accent Picker", desc: "Allow users to choose their preferred UI highlight color.", iconKey: "Palette" },
      { title: "Layout Density Control", desc: "Toggle between Compact and Comfortable viewing modes.", iconKey: "Maximize" },
      { title: "Font Size Controls", desc: "Global typography scaling for better readability.", iconKey: "Type" },
      { title: "Zen Reading Mode", desc: "Distraction-free interface for long-form glossary reading.", iconKey: "BookOpen" },
      { title: "Sticky TOC (Mobile)", desc: "Bottom-sheet table of contents for small screens.", iconKey: "List" },
      { title: "Global Progress Bar", desc: "Visual reading progress indicator at the top of the viewport.", iconKey: "BarChart2" },
      { title: "Interactive Onboarding", desc: "Guided tour for new users explaining dashboard features.", iconKey: "HelpCircle" },
      { title: "Breadcrumb Navigation", desc: "Hierarchical path links for deep glossary pages.", iconKey: "GitMerge" },
      { title: "4K Layout Support", desc: "Optimized grid spacing for ultrawide monitors.", iconKey: "Maximize" },
      { title: "Haptic Feedback", desc: "Vibration feedback on mobile interaction triggers.", iconKey: "Smartphone" },
      { title: "Glassmorphism Slider", desc: "User control over UI transparency and blur effects.", iconKey: "Settings" },
      { title: "Floating Action Button", desc: "Quick access to Search and Glossary from anywhere.", iconKey: "MousePointer" },
      { title: "Contextual Hover Cards", desc: "Rich previews when hovering over technical terms.", iconKey: "Maximize" },
      { title: "Skeleton Loading", desc: "Polished loading states for smoother perceived performance.", iconKey: "Layout" },
      { title: "Back-to-Top Button", desc: "Quick return interaction for long scrolling pages.", iconKey: "ArrowUp" },
      { title: "Section Collapsing", desc: "Ability to fold module sections to save screen space.", iconKey: "Minimize" },
      { title: "Dynamic Cursor Effects", desc: "Subtle visual feedback following mouse movement.", iconKey: "MousePointer" },
      { title: "Mega Menu", desc: "Expanded navigation menu for direct glossary access.", iconKey: "Menu" }
    ]
  },
  {
    category: "Content Depth & Resources",
    color: "emerald",
    iconKey: "BookOpen",
    items: [
      { title: "Expanded Glossary", desc: "Comprehensive 50+ term dictionary with direct links.", iconKey: "Search" },
      { title: "Downloadable Cheatsheets", desc: "PDF summaries of RoCEv2 headers and Congestion Control.", iconKey: "Download" },
      { title: "Real-World Case Studies", desc: "Architectural breakdowns of famous AI clusters.", iconKey: "Globe" },
      { title: "Topology Designer", desc: "Drag-and-drop sandbox to build Spine-Leaf networks.", iconKey: "Grid" },
      { title: "Packet Header Visualizer", desc: "Bit-level explorer for Ethernet/IP/UDP/IB headers.", iconKey: "Code" },
      { title: "Latency Budget Calc", desc: "Estimator for serialization, propagation, and queue delay.", iconKey: "Activity" },
      { title: "Power Estimator", desc: "Calculator for cluster power usage (Optics + Switches).", iconKey: "Zap" },
      { title: "Cabling Guide", desc: "Comparison of DAC, AOC, LPO, and CPO technologies.", iconKey: "Network" },
      { title: "ROI Calculator", desc: "Cost benefit analysis tool for Ethernet vs InfiniBand.", iconKey: "BarChart2" },
      { title: "Certification Quiz", desc: "Interactive tests to validate networking knowledge.", iconKey: "CheckSquare" },
      { title: "Architecture Trees", desc: "Decision flowcharts for choosing network topologies.", iconKey: "GitMerge" },
      { title: "History of HPC", desc: "Timeline of evolution from Beowulf clusters to AI Superpods.", iconKey: "Clock" },
      { title: "Vendor Config Gen", desc: "Snippet generator for Arista EOS and SONiC.", iconKey: "Terminal" },
      { title: "Meta LLaMA 3 Study", desc: "Deep dive into the 24k GPU cluster architecture.", iconKey: "Server" },
      { title: "Tesla Dojo Study", desc: "Analysis of custom transport and D1 chip networking.", iconKey: "Cpu" },
      { title: "OpenAI GPT-4 Fabric", desc: "Speculative breakdown of the Azure InfiniBand backend.", iconKey: "Cloud" },
      { title: "AI Expert Bot", desc: "LLM-powered chat interface for technical Q&A.", iconKey: "MessageSquare" },
      { title: "Community Forum", desc: "Discussion board for network engineers.", iconKey: "Users" },
      { title: "Whitepaper Library", desc: "Curated collection of IEEE and ACM research papers.", iconKey: "FileText" },
      { title: "Video Explainers", desc: "Animated video series for complex protocol concepts.", iconKey: "Video" },
      { title: "Protocol State Machines", desc: "Visual flowcharts of TCP and RoCE state transitions.", iconKey: "Activity" },
      { title: "Optical Physics", desc: "Deep dive into PAM4, SerDes, and Signal Integrity.", iconKey: "Zap" },
      { title: "Telemetry Lab", desc: "Sandboxed environment to analyze INT data packets.", iconKey: "Microscope" },
      { title: "Vendor Comparisons", desc: "Side-by-side spec sheets for Nvidia, Arista, and Cisco.", iconKey: "GitCompare" },
      { title: "Podcast Integration", desc: "Embedded player for 'Packet Pushers' and AI network podcasts.", iconKey: "Mic" },
      { title: "Flashcard Mode", desc: "Spaced repetition system for memorizing acronyms.", iconKey: "BookOpen" },
      { title: "Lab Exercises", desc: "Step-by-step GNS3/EVE-NG topology files for practice.", iconKey: "Terminal" }
    ]
  },
  {
    category: "Technical Performance",
    color: "purple",
    iconKey: "Terminal",
    items: [
      { title: "Offline Learning (PWA)", desc: "Access course materials without an internet connection.", iconKey: "Smartphone" },
      { title: "Global Search", desc: "Cmd+K instant search for protocols and specs.", iconKey: "Search" },
      { title: "Reduced Motion", desc: "Respect user OS settings to disable animations.", iconKey: "Eye" },
      { title: "WebGL Visualization", desc: "3D accelerated graphics for topology rendering.", iconKey: "Box" },
      { title: "Server-Side Rendering", desc: "Migration to Next.js for SEO and faster First Paint.", iconKey: "Server" },
      { title: "Edge Caching", desc: "Global CDN distribution for low-latency asset delivery.", iconKey: "Globe" },
      { title: "Vector Search", desc: "Semantic search engine for natural language queries.", iconKey: "Search" },
      { title: "Internationalization", desc: "Multi-language support (i18n) for global access.", iconKey: "Globe" },
      { title: "Print Stylesheets", desc: "Optimized CSS for printing glossary and guides.", iconKey: "Printer" },
      { title: "User Progress Sync", desc: "Cloud persistence of course completion status.", iconKey: "Cloud" },
      { title: "Local Note Taking", desc: "Browser-based markdown notes for each module.", iconKey: "Edit2" },
      { title: "Bookmark System", desc: "Save specific sections or terms for later review.", iconKey: "Bookmark" },
      { title: "Database Integration", desc: "Supabase backend for dynamic content management.", iconKey: "Database" },
      { title: "CI/CD Pipeline", desc: "Visualizer for the deployment process of this app.", iconKey: "GitMerge" },
      { title: "Automated A11y", desc: "Integration of Axe for continuous accessibility testing.", iconKey: "CheckCircle" },
      { title: "Image Optimization", desc: "Auto-conversion to AVIF/WebP formats.", iconKey: "Image" },
      { title: "Code Splitting", desc: "Dynamic imports to reduce initial bundle size.", iconKey: "Code" },
      { title: "Service Worker", desc: "Advanced caching strategies for offline resilience.", iconKey: "WifiOff" },
      { title: "WebAssembly Sim", desc: "High-performance physics engine for packet simulation.", iconKey: "Cpu" },
      { title: "Analytics Dashboard", desc: "Privacy-focused usage metrics and heatmaps.", iconKey: "BarChart2" },
      { title: "Error Logging", desc: "Sentry integration for production crash tracking.", iconKey: "AlertTriangle" },
      { title: "JSON Data Export", desc: "Allow users to export their notes and progress.", iconKey: "Download" },
      { title: "Real-time Collab", desc: "Multi-user cursors for shared topology editing.", iconKey: "Users" },
      { title: "GraphQL API", desc: "Expose educational data via a public API endpoint.", iconKey: "Code" },
      { title: "Lighthouse CI", desc: "Automated performance regression testing.", iconKey: "Zap" },
      { title: "Dark Mode Optimization", desc: "OLED-black theme for mobile battery savings.", iconKey: "Moon" },
      { title: "Keyboard Shortcuts", desc: "Vim-style navigation bindings for power users.", iconKey: "Keyboard" }
    ]
  }
];
