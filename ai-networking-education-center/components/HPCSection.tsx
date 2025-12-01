
import React from 'react';
import { Share2, Grid, Clock, AlertTriangle, Zap } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { ICON_MAP } from '../constants';

const HPCSection: React.FC = () => {
  const { hpcChecklist } = useData();

  return (
    <section id="hpc" className="py-32 bg-[#0F1117] border-t border-white/5">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="mb-20 flex flex-col items-center text-center">
          <div className="text-emerald-500 font-mono text-xs uppercase tracking-widest mb-4">Module 07</div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            AI Networking vs. HPC
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Both live in the family of "extreme throughput, low-latency distributed compute," but they diverge in traffic shape, sensitivity, and failure tolerance.
          </p>
        </div>

        {/* The Core Similarity */}
        <div className="bg-[#161b22] rounded-2xl p-8 border border-white/5 mb-24 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
            <h3 className="text-xl font-bold text-white mb-8">The Core Similarity</h3>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {[
                    "Massive East-West Bandwidth", 
                    "Microsecond-Level Latency", 
                    "Lossless Behavior", 
                    "Deterministic Performance",
                    "Scaling to Thousands of Nodes"
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-[#0d1117] px-4 py-3 rounded-lg border border-white/10 text-slate-300 shadow-sm hover:border-emerald-500/30 transition-colors">
                        <div className="w-4 h-4 rounded-full border border-emerald-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        </div>
                        <span className="font-mono text-sm">{item}</span>
                    </div>
                ))}
            </div>
        </div>

        <div className="mb-12 border-b border-white/5 pb-4">
            <h3 className="text-2xl font-bold text-white mb-2">The Big Differences</h3>
            <p className="text-slate-500 text-sm font-mono uppercase">Traffic Patterns & Sensitivity</p>
        </div>

        {/* Traffic Pattern Visuals (Keep Static as they are complex visuals) */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24">
            {/* AI Side */}
            <div className="bg-[#161b22] rounded-2xl border border-white/5 overflow-hidden flex flex-col">
                <div className="p-1 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-20"></div>
                <div className="p-8 flex-1">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <div className="text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">AI Workloads</div>
                            <h3 className="text-2xl font-bold text-white">All-to-All Collective</h3>
                        </div>
                        <div className="p-3 bg-cyan-900/20 rounded-lg text-cyan-400">
                            <Share2 size={24} />
                        </div>
                    </div>
                    {/* Visual: Mesh */}
                    <div 
                        className="h-48 bg-[#0d1117] rounded-xl border border-white/5 mb-8 relative overflow-hidden flex items-center justify-center group"
                        role="img"
                        aria-label="Diagram of All-to-All collective communication. Nodes arranged in a circle with mesh connections indicating every GPU talks to every other GPU."
                    >
                        <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors"></div>
                        <div className="relative w-40 h-40">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <div key={i} className="absolute w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)] z-10"
                                     style={{
                                         top: `${50 + 35 * Math.sin(i * 1.25)}%`,
                                         left: `${50 + 35 * Math.cos(i * 1.25)}%`
                                     }}></div>
                            ))}
                            <svg className="absolute inset-0 w-full h-full opacity-40">
                                <path d="M20,50 L80,50 M20,50 L50,20 M20,50 L50,80" stroke="#22d3ee" strokeWidth="1" className="animate-pulse" />
                                <path d="M80,50 L50,20 M80,50 L50,80" stroke="#22d3ee" strokeWidth="1" className="animate-pulse delay-75" />
                                <path d="M50,20 L50,80" stroke="#22d3ee" strokeWidth="1" className="animate-pulse delay-150" />
                            </svg>
                        </div>
                    </div>
                    <ul className="space-y-4">
                        <li className="flex gap-4 items-start text-sm text-slate-300">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_5px_rgba(34,211,238,0.5)]"></div>
                            <span><strong className="text-white">Heavy Sync:</strong> Every GPU talks to every other GPU.</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* HPC Side */}
            <div className="bg-[#161b22] rounded-2xl border border-white/5 overflow-hidden flex flex-col">
                <div className="p-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-20"></div>
                <div className="p-8 flex-1">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <div className="text-amber-500 font-mono text-xs uppercase tracking-wider mb-2">HPC Workloads</div>
                            <h3 className="text-2xl font-bold text-white">Domain Specific</h3>
                        </div>
                        <div className="p-3 bg-amber-900/20 rounded-lg text-amber-500">
                            <Grid size={24} />
                        </div>
                    </div>
                    {/* Visual: Grid */}
                    <div 
                        className="h-48 bg-[#0d1117] rounded-xl border border-white/5 mb-8 relative overflow-hidden flex items-center justify-center group"
                        role="img"
                        aria-label="Diagram of Domain Specific communication. Nodes arranged in a grid indicating structured, nearest-neighbor traffic patterns."
                    >
                        <div className="absolute inset-0 bg-amber-500/5 group-hover:bg-amber-500/10 transition-colors"></div>
                        <div className="grid grid-cols-4 gap-4 p-4">
                             {[...Array(12)].map((_, i) => (
                                 <div key={i} className="w-2 h-2 bg-amber-600 rounded-sm"></div>
                             ))}
                        </div>
                    </div>
                    <ul className="space-y-4">
                        <li className="flex gap-4 items-start text-sm text-slate-300">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></div>
                            <span><strong className="text-white">Structured:</strong> Nearest-neighbor or predictable grid patterns.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Dynamic Engineer's Checklist (Pain Points) */}
        <div className="mb-24">
             <h3 className="text-2xl font-bold text-white mb-12 text-center">Engineer's Checklist: Addressing the Pain Points</h3>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hpcChecklist.map((card: any, i: number) => {
                    const Icon = ICON_MAP[card.iconKey] || Zap;
                    return (
                    <div key={i} className="bg-[#161b22] p-6 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-colors group">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-[#0d1117] rounded-lg text-cyan-400 group-hover:text-cyan-300 group-hover:bg-cyan-900/20 transition-colors">
                                <Icon size={20} />
                            </div>
                            <h4 className="font-bold text-white text-sm font-mono uppercase tracking-wide">{card.title}</h4>
                        </div>
                        <ul className="space-y-3">
                            {card.points.map((pt: string, j: number) => (
                                <li key={j} className="text-sm text-slate-400 flex items-start gap-2 leading-relaxed">
                                    <span className="text-cyan-500 mt-1.5 w-1 h-1 bg-cyan-500 rounded-full shrink-0"></span>
                                    {pt}
                                </li>
                            ))}
                        </ul>
                    </div>
                )})}
             </div>
        </div>

        {/* Final Story */}
        <div className="bg-gradient-to-r from-blue-900/10 to-cyan-900/10 rounded-2xl p-12 text-center border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest font-mono">The Takeaway</h3>
            <p className="text-2xl text-cyan-100 font-serif italic max-w-4xl mx-auto leading-relaxed">
                "We accelerate distributed training by delivering stable, low-latency, congestion-aware fabrics that maximize GPU utilization and reduce training time."
            </p>
        </div>

      </div>
    </section>
  );
};

export default HPCSection;
