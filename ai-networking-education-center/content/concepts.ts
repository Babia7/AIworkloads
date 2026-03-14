export const CONCEPTS_SECTION_CONTENT = {
  moduleLabel: 'Module 02',
  title: 'Core Technologies',
  subtitle:
    'High-performance AI networking relies on foundational technologies that minimize latency and maximize data throughput between XPUs and storage.',
  rdmaVisualization: {
    ariaLabel:
      'Animation demonstrating RDMA Zero-Copy networking. A blue packet moves directly from Server A memory to Server B memory, visually traversing a bypass path that avoids the CPU and OS kernel layers.',
    sourceLabel: 'Server A Memory',
    destinationLabel: 'Server B Memory',
    bypassCaption: 'Bypassing CPU & OS Kernel'
  },
  nvmeExpansion: {
    title: 'NVMe over Fabrics',
    goalLabel: 'The Goal:',
    goalBody:
      'Build a fabric to disaggregate NVMe SSDs and compute without compromising on latency. This allows for independent scaling of storage and compute resources.',
    mechanismLabel: 'Mechanism:',
    mechanismBodyPrefix: 'The fabric can be built using different transport mechanisms such as',
    mechanismBodySuffix: 'and',
    abstractionNote:
      'Requires Controller-side and Host-side abstraction layers to support the specific transport.'
  },
  packetFlow: {
    ariaLabel: 'Diagram illustrating the NVMe connection sequence',
    title: 'NVMe Packet Flow',
    connectionRequestTitle: 'Connection Request',
    connectionRequestBody: 'Host initiates connection message. Controller listens.',
    connectionResponseTitle: 'Connection Response',
    connectionResponseBody: 'Controller acknowledges initial communications.',
    exchangePduLabel: 'EXCHANGE PDU',
    initConfirmTitle: 'Initialization & Confirm',
    initConfirmBody: 'Host requests Init. Controller confirms.',
    transparencyPrefix: 'Regardless of transport (NVMeoTCP or NVMeoRoCE), this connection setup is',
    transparentWord: 'transparent',
    transparencySuffix: 'to the networking side.'
  }
} as const;
