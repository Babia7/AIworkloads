
import { ProtocolConcept } from '../types';

export const PROTOCOL_CONCEPTS: ProtocolConcept[] = [
  {
    id: 'roce',
    title: "RoCEv2",
    subtitle: "",
    description: "RDMA over Converged Ethernet. Relies on lossless network behavior to function efficiently.",
    iconKey: "Activity",
    color: "blue",
    mechanisms: [
      {
        name: "PFC (Priority Flow Control)",
        desc: "Prevents packet loss by pausing traffic when buffers fill.",
        iconKey: "AlertCircle",
      },
      {
        name: "ECN (Explicit Congestion Notification)",
        desc: "Marks packets to signal incipient congestion to the sender.",
        iconKey: "Radio",
      },
      {
        name: "DCQCN",
        desc: "End-to-end congestion management algorithm for RoCE.",
        iconKey: "ShieldCheck",
      },
    ],
  },
  {
    id: 'uec',
    title: "UET",
    subtitle: "",
    description: "Ultra Ethernet Transport. Designed specifically for AI to tolerate loss and maximize bandwidth.",
    iconKey: "Zap",
    color: "green",
    mechanisms: [
      {
        name: "Packet Spraying",
        desc: "Distributes packets across all available paths simultaneously.",
        iconKey: "GitMerge",
      },
      {
        name: "Out-of-Order Delivery",
        desc: "Packets can arrive in any order and are reassembled at destination.",
        iconKey: "ArrowLeftRight",
      },
      {
        name: "Selective Retry",
        desc: "Retransmits only specific dropped packets, not the whole window.",
        iconKey: "CircuitBoard",
      },
    ],
  },
];
