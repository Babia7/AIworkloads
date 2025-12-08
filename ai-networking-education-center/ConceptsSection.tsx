
import React from 'react';
import { useData } from '../contexts/DataContext';
import { ICON_MAP } from '../constants';
import { Cpu, Database, Server, MessageSquare, ArrowLeftRight, CheckCircle2, Network, Layers, ArrowRight } from 'lucide-react';
import GlossaryTerm from './GlossaryTerm';

const ConceptsSection: React.FC = () => {
  const { coreConcepts } = useData();
  
  // Safe access to concepts array with fallbacks
  const rdma = (coreConcepts || []).find(c => c.id === 'rdma');
  const nvme = (coreConcepts || []).find(c => c.id === 'nvme');

  if (!rdma || !nvme) return null;

  const RdmaIcon = ICON_MAP[rdma.iconKey] || Cpu;
  const NvmeIcon = ICON_MAP[nvme.iconKey] || Database;

  return (
    <section id="concepts" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-purple-500 font-mono text-xs uppercase tracking-widest mb-4">Module 02</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Core Technologies</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            High-performance AI networking relies on foundational technologies that minimize latency 
            and maximize data throughput between XPUs and storage.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* RDMA Visual & Content */}
          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
            <div className="absolute top-0 right-0 p-32 bg-blue-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400">
                        <RdmaIcon size={32} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white">{rdma.title}</h3>
                        <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider">{rdma.fullName}</p>
                    </div>
                </div>

                <p className="text-slate-300 mb-8 leading-relaxed">
                    {rdma.description}
                </p>

                {/* RDMA Animation Visual */}
                <div 
                  className="bg-slate-950 rounded-xl p-6 border border-slate-800 mb-8"
                  role="img"
                  aria-label="Animation demonstrating RDMA Zero-Copy networking. A blue packet moves directly from Server A memory to Server B memory, visually traversing a bypass path that avoids the CPU and OS kernel layers."
                >
                    <div className="flex justify-between items-center text-xs text-slate-500 font-mono mb-2">
                        <span>Server A Memory</span>
                        <span>Server B Memory</span>
                    </div>
                    <div className="flex justify-between items-center h-20 relative">
                        {/* Server A */}
                        <div className="w-16 h-full bg-slate-800 rounded border border-slate-700 flex flex-col items-center justify-center z-10">
                            <div className="w-12 h-1 bg-slate-600 mb-1"></div>
                            <div className="w-12 h-1 bg-slate-600 mb-1"></div>
                            <div className="w-12 h-1 bg-slate-600"></div>
                        </div>

                        {/* Bypass Path */}
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800"></div>
                        
                        {/* Moving Packet */}
                        <div className="absolute top-1/2 left-0 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6] -translate-y-1/2 animate-[moveLeftRight_2s_ease-in-out_infinite]"></div>

                        {/* Server B */}
                        <div className="w-16 h-full bg-slate-800 rounded border border-slate-700 flex flex-col items-center justify-center z-10">
                            <div className="w-12 h-1 bg-slate-600 mb-1"></div>
                            <div className="w-12 h-1 bg-slate-600 mb-1"></div>
                            <div className="w-12 h-1 bg-slate-600"></div>
                        </div>
                    </div>
                    <div className="text-center text-xs text-green-400 mt-2 font-semibold">Bypassing CPU & OS Kernel</div>
                </div>

                <ul className="space-y-3">
                    {rdma.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-300">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
          </div>

          {/* NVMe Visual & Content */}
          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
            <div className="absolute top-0 right-0 p-32 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-purple-900/30 rounded-lg text-purple-400">
                        <NvmeIcon size={32} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white">{nvme.title}</h3>
                        <p className="text-purple-400 text-sm font-semibold uppercase tracking-wider">{nvme.fullName}</p>
                    </div>
                </div>

                <p className="text-slate-300 mb-6 leading-relaxed">
                    {nvme.description}
                </p>
                
                {/* NVMe-oF Expansion */}
                <div className="bg-purple-900/10 p-5 rounded-xl border border-purple-500/20 mb-6">
                    <h4 className="text-purple-300 font-bold mb-3 flex items-center gap-2">
                        <Network size={18} /> NVMe over Fabrics (<GlossaryTerm term="NVMe-oF">NVMe-oF</GlossaryTerm>)
                    </h4>
                    <div className="space-y-4 text-sm text-slate-300">
                        <p>
                            <span className="text-white font-medium">The Goal:</span> Build a fabric to disaggregate NVMe SSDs and compute without compromising on latency. This allows for <span className="text-white">independent scaling</span> of storage and compute resources.
                        </p>
                        <p>
                            <span className="text-white font-medium">Mechanism:</span> The fabric can be built using different transport mechanisms such as <span className="text-purple-200">FibreChannel</span>, <span className="text-purple-200">RoCE</span>, and <span className="text-purple-200">TCP/IP</span>.
                        </p>
                        <div className="flex items-center gap-2 p-2 bg-slate-950/50 rounded border border-purple-500/10 text-xs">
                           <Layers size={14} className="text-purple-400 shrink-0" />
                           <span>Requires Controller-side and Host-side abstraction layers to support the specific transport.</span>
                        </div>
                    </div>
                </div>

                {/* Packet Flow Section */}
                <div 
                  className="bg-slate-950 rounded-xl border border-slate-800 p-6 mb-8"
                  role="list"
                  aria-label="Diagram illustrating the NVMe connection sequence"
                >
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider" aria-hidden="true">
                        <ArrowLeftRight size={16} className="text-purple-400" /> 
                        NVMe Packet Flow
                    </h4>
                    
                    <div className="relative pl-6 border-l border-slate-800 space-y-6">
                        {/* Step 1 */}
                        <div className="relative" role="listitem">
                            <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-slate-800 border-2 border-purple-500/50"></div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 text-purple-400"><Server size={14} aria-hidden="true"/></div>
                                <div>
                                    <div className="text-xs text-purple-300 font-bold mb-1">HOST <span className="text-slate-500 mx-1">→</span> CONTROLLER</div>
                                    <div className="text-white text-sm font-medium">Connection Request</div>
                                    <div className="text-xs text-slate-500">Host initiates connection message. Controller listens.</div>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative" role="listitem">
                            <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-slate-800 border-2 border-purple-500/50"></div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 text-purple-400"><Database size={14} aria-hidden="true"/></div>
                                <div>
                                    <div className="text-xs text-purple-300 font-bold mb-1">CONTROLLER <span className="text-slate-500 mx-1">→</span> HOST</div>
                                    <div className="text-white text-sm font-medium">Connection Response</div>
                                    <div className="text-xs text-slate-500">Controller acknowledges initial communications.</div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative" role="listitem">
                            <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-slate-800 border-2 border-purple-500/50"></div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 text-purple-400"><MessageSquare size={14} aria-hidden="true"/></div>
                                <div>
                                    <div className="text-xs text-purple-300 font-bold mb-1">EXCHANGE PDU</div>
                                    <div className="text-white text-sm font-medium">Initialization & Confirm</div>
                                    <div className="text-xs text-slate-500">Host requests Init. Controller confirms.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-slate-800/50 flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="text-xs text-slate-400">
                            Regardless of transport (NVMeoTCP or NVMeoRoCE), this connection setup is <strong>transparent</strong> to the networking side.
                        </p>
                    </div>
                </div>

                <ul className="space-y-3">
                    {nvme.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-300">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes moveLeftRight {
            0% { left: 10%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { left: 90%; opacity: 0; }
          }
          @keyframes pulseHeight {
            0%, 100% { height: 30%; }
            50% { height: 90%; }
          }
        `}</style>
      </div>
    </section>
  );
};

export default ConceptsSection;
