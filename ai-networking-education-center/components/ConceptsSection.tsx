
import React from 'react';
import { useData } from '../contexts/DataContext';
import { ICON_MAP } from '../constants';
import { Cpu, Database, Server, MessageSquare, ArrowLeftRight, CheckCircle2, Network, Layers, ArrowRight } from 'lucide-react';
import GlossaryTerm from './GlossaryTerm';
import { CONCEPTS_SECTION_CONTENT } from '../content/concepts';
import SourceBadge from './SourceBadge';
import { claimText, hasSourceMetadata } from '../utils/sourceClaims';

const ConceptsSection: React.FC = () => {
  const { coreConcepts } = useData();
  
  // Safe access to concepts array with fallbacks
  const rdma = (coreConcepts || []).find(c => c.id === 'rdma');
  const nvme = (coreConcepts || []).find(c => c.id === 'nvme');
  const roce = (coreConcepts || []).find(c => c.id === 'roce_intro');

  if (!rdma || !nvme) return null;

  const RdmaIcon = ICON_MAP[rdma.iconKey] || Cpu;
  const NvmeIcon = ICON_MAP[nvme.iconKey] || Database;
  const RoceIcon = roce ? (ICON_MAP[roce.iconKey] || Network) : Network;

  return (
    <section id="concepts" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-purple-500 font-mono text-xs uppercase tracking-widest mb-4">{CONCEPTS_SECTION_CONTENT.moduleLabel}</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{CONCEPTS_SECTION_CONTENT.title}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {claimText(CONCEPTS_SECTION_CONTENT.subtitle)}{hasSourceMetadata(CONCEPTS_SECTION_CONTENT.subtitle) && <SourceBadge claim={CONCEPTS_SECTION_CONTENT.subtitle} className="ml-2" />}
          </p>
        </div>

        {/* Top row: RDMA + RoCEv2 side by side */}
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
                    {claimText(rdma.description)}
                    {hasSourceMetadata(rdma.description) && <SourceBadge claim={rdma.description} className="ml-2 align-middle" />}
                </p>

                {/* RDMA Animation Visual */}
                <div
                  className="bg-slate-950 rounded-xl p-6 border border-slate-800 mb-8"
                  role="img"
                  aria-label={CONCEPTS_SECTION_CONTENT.rdmaVisualization.ariaLabel}
                >
                    <div className="flex justify-between items-center text-xs text-slate-500 font-mono mb-2">
                        <span>{CONCEPTS_SECTION_CONTENT.rdmaVisualization.sourceLabel}</span>
                        <span>{CONCEPTS_SECTION_CONTENT.rdmaVisualization.destinationLabel}</span>
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
                    <div className="text-center text-xs text-green-400 mt-2 font-semibold">{claimText(CONCEPTS_SECTION_CONTENT.rdmaVisualization.bypassCaption)} {hasSourceMetadata(CONCEPTS_SECTION_CONTENT.rdmaVisualization.bypassCaption) && <SourceBadge claim={CONCEPTS_SECTION_CONTENT.rdmaVisualization.bypassCaption} />}</div>
                </div>

                <ul className="space-y-3">
                    {rdma.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-300">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                            {claimText(feature)}{hasSourceMetadata(feature) && <SourceBadge claim={feature} className="ml-2" />}
                        </li>
                    ))}
                </ul>
            </div>
          </div>

          {/* RoCEv2 Visual & Content */}
          {roce && (
            <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 relative overflow-hidden group hover:border-green-500/30 transition-colors">
              <div className="absolute top-0 right-0 p-32 bg-green-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-green-900/30 rounded-lg text-green-400">
                    <RoceIcon size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{roce.title}</h3>
                    <p className="text-green-400 text-sm font-semibold uppercase tracking-wider">{roce.fullName}</p>
                  </div>
                </div>

                <p className="text-slate-300 mb-8 leading-relaxed">{claimText(roce.description)}{hasSourceMetadata(roce.description) && <SourceBadge claim={roce.description} className="ml-2 align-middle" />}</p>

                {/* Protocol Stack Visual */}
                <div
                  className="bg-slate-950 rounded-xl p-6 border border-slate-800 mb-8"
                  role="img"
                  aria-label="Diagram showing RoCEv2 as the bridge layer between RDMA and Ethernet. RDMA verbs are encapsulated into UDP/IP by RoCEv2 and carried over a lossless Ethernet fabric."
                >
                  <div className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-4 text-center">Protocol Stack</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                      <Cpu size={16} className="text-blue-400 shrink-0" />
                      <span className="text-blue-300 text-sm font-semibold">RDMA Verbs</span>
                      <span className="text-slate-500 text-xs ml-auto">Application layer</span>
                    </div>
                    <div className="flex justify-center">
                      <ArrowRight size={14} className="text-slate-600 rotate-90" />
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-900/20 border border-green-500/40 rounded-lg">
                      <Network size={16} className="text-green-400 shrink-0" />
                      <span className="text-green-300 text-sm font-semibold">RoCEv2 / UDP / IP</span>
                      <span className="text-slate-500 text-xs ml-auto">Transport layer</span>
                    </div>
                    <div className="flex justify-center">
                      <ArrowRight size={14} className="text-slate-600 rotate-90" />
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-800/60 border border-slate-700 rounded-lg">
                      <Layers size={16} className="text-slate-400 shrink-0" />
                      <span className="text-slate-300 text-sm font-semibold">Lossless Ethernet Fabric</span>
                      <span className="text-slate-500 text-xs ml-auto">Physical layer</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-800/50 text-xs text-slate-400 text-center">
                    Lossless behavior (PFC + ECN) required at the Ethernet layer
                  </div>
                </div>

                <ul className="space-y-3">
                  {roce.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      {claimText(feature)}{hasSourceMetadata(feature) && <SourceBadge claim={feature} className="ml-2" />}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* NVMe — Full-width card below */}
        <div className="mt-12 bg-slate-900 rounded-2xl p-8 border border-slate-800 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
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

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <p className="text-slate-300 mb-6 leading-relaxed">{claimText(nvme.description)}{hasSourceMetadata(nvme.description) && <SourceBadge claim={nvme.description} className="ml-2 align-middle" />}</p>

                {/* NVMe-oF Expansion */}
                <div className="bg-purple-900/10 p-5 rounded-xl border border-purple-500/20 mb-6">
                  <h4 className="text-purple-300 font-bold mb-3 flex items-center gap-2">
                    <Network size={18} /> {CONCEPTS_SECTION_CONTENT.nvmeExpansion.title} (<GlossaryTerm term="NVMe-oF">NVMe-oF</GlossaryTerm>)
                  </h4>
                  <div className="space-y-4 text-sm text-slate-300">
                    <p>
                      <span className="text-white font-medium">{CONCEPTS_SECTION_CONTENT.nvmeExpansion.goalLabel}</span> {claimText(CONCEPTS_SECTION_CONTENT.nvmeExpansion.goalBody)} {hasSourceMetadata(CONCEPTS_SECTION_CONTENT.nvmeExpansion.goalBody) && <SourceBadge claim={CONCEPTS_SECTION_CONTENT.nvmeExpansion.goalBody} />}
                    </p>
                    <p>
                      <span className="text-white font-medium">{CONCEPTS_SECTION_CONTENT.nvmeExpansion.mechanismLabel}</span> {CONCEPTS_SECTION_CONTENT.nvmeExpansion.mechanismBodyPrefix} <span className="text-purple-200">FibreChannel</span>, <GlossaryTerm term="RoCEv2"><span className="text-purple-200">RoCE</span></GlossaryTerm>, {CONCEPTS_SECTION_CONTENT.nvmeExpansion.mechanismBodySuffix} <span className="text-purple-200">TCP/IP</span>.
                    </p>
                    <div className="flex items-center gap-2 p-2 bg-slate-950/50 rounded border border-purple-500/10 text-xs">
                      <Layers size={14} className="text-purple-400 shrink-0" />
                      <span>{claimText(CONCEPTS_SECTION_CONTENT.nvmeExpansion.abstractionNote)}</span>{hasSourceMetadata(CONCEPTS_SECTION_CONTENT.nvmeExpansion.abstractionNote) && <SourceBadge claim={CONCEPTS_SECTION_CONTENT.nvmeExpansion.abstractionNote} />}
                    </div>
                  </div>
                </div>

                <ul className="space-y-3">
                  {nvme.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      {claimText(feature)}{hasSourceMetadata(feature) && <SourceBadge claim={feature} className="ml-2" />}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Packet Flow Section */}
              <div
                className="bg-slate-950 rounded-xl border border-slate-800 p-6"
                role="list"
                aria-label={CONCEPTS_SECTION_CONTENT.packetFlow.ariaLabel}
              >
                <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider" aria-hidden="true">
                  <ArrowLeftRight size={16} className="text-purple-400" />
                  {CONCEPTS_SECTION_CONTENT.packetFlow.title}
                </h4>

                <div className="relative pl-6 border-l border-slate-800 space-y-6">
                  <div className="relative" role="listitem">
                    <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-slate-800 border-2 border-purple-500/50"></div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-purple-400"><Server size={14} aria-hidden="true"/></div>
                      <div>
                        <div className="text-xs text-purple-300 font-bold mb-1">HOST <span className="text-slate-500 mx-1">→</span> CONTROLLER</div>
                        <div className="text-white text-sm font-medium">{CONCEPTS_SECTION_CONTENT.packetFlow.connectionRequestTitle}</div>
                        <div className="text-xs text-slate-500">{claimText(CONCEPTS_SECTION_CONTENT.packetFlow.connectionRequestBody)}{hasSourceMetadata(CONCEPTS_SECTION_CONTENT.packetFlow.connectionRequestBody) && <SourceBadge claim={CONCEPTS_SECTION_CONTENT.packetFlow.connectionRequestBody} className="ml-2" />}</div>
                      </div>
                    </div>
                  </div>

                  <div className="relative" role="listitem">
                    <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-slate-800 border-2 border-purple-500/50"></div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-purple-400"><Database size={14} aria-hidden="true"/></div>
                      <div>
                        <div className="text-xs text-purple-300 font-bold mb-1">CONTROLLER <span className="text-slate-500 mx-1">→</span> HOST</div>
                        <div className="text-white text-sm font-medium">{CONCEPTS_SECTION_CONTENT.packetFlow.connectionResponseTitle}</div>
                        <div className="text-xs text-slate-500">{claimText(CONCEPTS_SECTION_CONTENT.packetFlow.connectionResponseBody)}{hasSourceMetadata(CONCEPTS_SECTION_CONTENT.packetFlow.connectionResponseBody) && <SourceBadge claim={CONCEPTS_SECTION_CONTENT.packetFlow.connectionResponseBody} className="ml-2" />}</div>
                      </div>
                    </div>
                  </div>

                  <div className="relative" role="listitem">
                    <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-slate-800 border-2 border-purple-500/50"></div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-purple-400"><MessageSquare size={14} aria-hidden="true"/></div>
                      <div>
                        <div className="text-xs text-purple-300 font-bold mb-1">{CONCEPTS_SECTION_CONTENT.packetFlow.exchangePduLabel}</div>
                        <div className="text-white text-sm font-medium">{CONCEPTS_SECTION_CONTENT.packetFlow.initConfirmTitle}</div>
                        <div className="text-xs text-slate-500">{claimText(CONCEPTS_SECTION_CONTENT.packetFlow.initConfirmBody)}{hasSourceMetadata(CONCEPTS_SECTION_CONTENT.packetFlow.initConfirmBody) && <SourceBadge claim={CONCEPTS_SECTION_CONTENT.packetFlow.initConfirmBody} className="ml-2" />}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/50 flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-xs text-slate-400">
                    {CONCEPTS_SECTION_CONTENT.packetFlow.transparencyPrefix} <strong>{CONCEPTS_SECTION_CONTENT.packetFlow.transparentWord}</strong> {claimText(CONCEPTS_SECTION_CONTENT.packetFlow.transparencySuffix)} {hasSourceMetadata(CONCEPTS_SECTION_CONTENT.packetFlow.transparencySuffix) && <SourceBadge claim={CONCEPTS_SECTION_CONTENT.packetFlow.transparencySuffix} className="ml-2" />}
                  </p>
                </div>
              </div>
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
