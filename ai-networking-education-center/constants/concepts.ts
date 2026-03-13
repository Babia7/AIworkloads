
import { ConceptData, ScalingConcept } from '../types';

export const SCALING_CONCEPTS: ScalingConcept[] = [
  {
    title: "Scale Up",
    desc: "Inside the Rack",
    details: "Massive bandwidth for XPU-to-XPU interconnects (memory sharing) within a single rack.",
    iconKey: "Zap",
  },
  {
    title: "Scale Out",
    desc: "Across the Data Center",
    details: "Connecting thousands of compute servers using Leaf/Spine fabrics.",
    iconKey: "Network",
  },
  {
    title: "Scale Across",
    desc: "Between Buildings",
    details: "Connecting geographically distributed AI centers (DCI) with encryption.",
    iconKey: "Globe",
  },
];

export const CORE_CONCEPTS: ConceptData[] = [
  {
    id: 'rdma',
    title: "RDMA",
    fullName: "Remote Direct Memory Access",
    description: "A technology that allows a host to directly read or write data in a remote host's memory without involving the CPU or OS kernel of either machine. The data plane bypasses the OS entirely, freeing CPU resources for the actual application (AI Training).",
    iconKey: "Cpu",
    features: ["Zero-Copy Networking", "Kernel Bypass", "GPUDirect RDMA"],
  },
  {
    id: 'nvme',
    title: "NVMe",
    fullName: "Non-Volatile Memory Express (NVMe / NVMe-oF)",
    description: "A storage interface protocol designed to accelerate the transfer of data between enterprise and client systems and solid-state drives (SSDs). It utilizes high-speed PCIe lanes to maximize parallelism. Extended as NVMe over Fabrics (NVMe-oF), this protocol enables disaggregated storage over Ethernet, RoCE, or Fibre Channel with near-local latency.",
    iconKey: "Database",
    features: ["65K I/O Queues", "Massive Parallelism", "Low Latency Access"],
  },
  {
    id: 'roce_intro',
    title: "RoCEv2",
    fullName: "RDMA over Converged Ethernet v2",
    description: "The transport that carries RDMA traffic over standard Ethernet. RoCEv2 encapsulates RDMA packets in UDP/IP, enabling kernel-bypass, zero-copy transfers between hosts on an Ethernet fabric. It depends on a lossless network (via PFC and ECN) to function correctly — making lossless fabric design the foundation of AI networking.",
    iconKey: "Network",
    features: ["UDP/IP Encapsulation", "Lossless Fabric Required", "PFC & ECN Dependent"],
  },
];
