import { ConceptData, ScalingConcept } from '../types';
import { claim } from '../utils/sourceClaims';

const RDMA_SOURCE = {
  sourceUrl: 'https://www.infinibandta.org/about-rdma/',
  sourceTitle: 'InfiniBand Trade Association - About RDMA',
  sourceRevisionOrDate: 'Accessed 2026-03',
  verificationStatus: 'verified' as const,
};

const NVME_SOURCE = {
  sourceUrl: 'https://nvmexpress.org/specifications/',
  sourceTitle: 'NVM Express Specifications',
  sourceRevisionOrDate: '2025',
  verificationStatus: 'verified' as const,
};

const ROCE_SOURCE = {
  sourceUrl: 'https://www.rdmamojo.com/2014/06/17/rocev2/',
  sourceTitle: 'RoCE v2 Overview',
  sourceRevisionOrDate: 'Accessed 2026-03',
  verificationStatus: 'verified' as const,
};

const ARISTA_AI_GUIDE_SOURCE = {
  sourceUrl: 'https://www.arista.com/en/solutions/ai-networking',
  sourceTitle: 'Arista AI Networking Solutions',
  sourceRevisionOrDate: 'Accessed 2026-03',
  verificationStatus: 'vendor-claim' as const,
};

export const SCALING_CONCEPTS: ScalingConcept[] = [
  {
    title: 'Scale Up',
    desc: claim('Inside the Rack', ARISTA_AI_GUIDE_SOURCE),
    details: claim(
      'Massive bandwidth for XPU-to-XPU interconnects (memory sharing) within a single rack.',
      ARISTA_AI_GUIDE_SOURCE
    ),
    iconKey: 'Zap',
  },
  {
    title: 'Scale Out',
    desc: claim('Across the Data Center', ARISTA_AI_GUIDE_SOURCE),
    details: claim('Connecting thousands of compute servers using Leaf/Spine fabrics.', ARISTA_AI_GUIDE_SOURCE),
    iconKey: 'Network',
  },
  {
    title: 'Scale Across',
    desc: claim('Between Buildings', ARISTA_AI_GUIDE_SOURCE),
    details: claim('Connecting geographically distributed AI centers (DCI) with encryption.', ARISTA_AI_GUIDE_SOURCE),
    iconKey: 'Globe',
  },
];

export const CORE_CONCEPTS: ConceptData[] = [
  {
    id: 'rdma',
    title: 'RDMA',
    fullName: 'Remote Direct Memory Access',
    description: claim(
      "A technology that allows a host to directly read or write data in a remote host's memory without involving the CPU or OS kernel of either machine. The data plane bypasses the OS entirely, freeing CPU resources for the actual application (AI Training).",
      RDMA_SOURCE
    ),
    iconKey: 'Cpu',
    features: [
      claim('Zero-Copy Networking', RDMA_SOURCE),
      claim('Kernel Bypass', RDMA_SOURCE),
      claim('GPUDirect RDMA', RDMA_SOURCE),
    ],
  },
  {
    id: 'nvme',
    title: 'NVMe',
    fullName: 'Non-Volatile Memory Express (NVMe / NVMe-oF)',
    description: claim(
      'A storage interface protocol designed to accelerate the transfer of data between enterprise and client systems and solid-state drives (SSDs). It utilizes high-speed PCIe lanes to maximize parallelism. Extended as NVMe over Fabrics (NVMe-oF), this protocol enables disaggregated storage over Ethernet, RoCE, or Fibre Channel with near-local latency.',
      NVME_SOURCE
    ),
    iconKey: 'Database',
    features: [
      claim('65K I/O Queues', NVME_SOURCE),
      claim('Massive Parallelism', NVME_SOURCE),
      claim('Low Latency Access', NVME_SOURCE),
    ],
  },
  {
    id: 'roce_intro',
    title: 'RoCEv2',
    fullName: 'RDMA over Converged Ethernet v2',
    description: claim(
      'The transport that carries RDMA traffic over standard Ethernet. RoCEv2 encapsulates RDMA packets in UDP/IP, enabling kernel-bypass, zero-copy transfers between hosts on an Ethernet fabric. It depends on a lossless network (via PFC and ECN) to function correctly — making lossless fabric design the foundation of AI networking.',
      ROCE_SOURCE
    ),
    iconKey: 'Network',
    features: [
      claim('UDP/IP Encapsulation', ROCE_SOURCE),
      claim('Lossless Fabric Required', ROCE_SOURCE),
      claim('PFC & ECN Dependent', ROCE_SOURCE),
    ],
  },
];
