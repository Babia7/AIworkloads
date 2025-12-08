
import React, { useState, useEffect } from 'react';
import { useData } from '../contexts/DataContext';
import { ChevronRight, Info, Server, ExternalLink } from 'lucide-react';
import { ICON_MAP } from '../constants';
import GlossaryTerm from './GlossaryTerm';

// Helper component to parse text and auto-wrap known glossary terms
// This ensures that even dynamic content from the admin panel gets tooltips.
const DescriptionRenderer: React.FC<{ text: string }> = ({ text }) => {
  // List of high-value terms to auto-highlight in this specific section
  const termsToHighlight = ['Radix', 'VOQ', 'LPO', 'Deep Buffers', 'Tomahawk', 'Jericho', 'PCIe', 'Fabric', 'Leaf', 'Spine', 'CLOS'];
  
  // Create a regex that finds these words (case insensitive, whole word)
  const regex = new RegExp(`\\b(${termsToHighlight.join('|')})\\b`, 'gi');
  
  const parts = text.split(regex);

  return (
    <p className="text-slate-300 leading-relaxed text-sm">
      {parts.map((part, i) => {
        // Check if this part matches one of our terms (case insensitive)
        const match = termsToHighlight.find(t => t.toLowerCase() === part.toLowerCase());
        if (match) {
          return <GlossaryTerm key={i} term={match}>{part}</GlossaryTerm>;
        }
        return part;
      })}
    </p>
  );
};

const HardwareSection: React.FC = () => {
  const { products } = useData();
  const [activeProduct, setActiveProduct] = useState(products[0]);

  // Update active product if data changes (e.g. from Admin edit)
  useEffect(() => {
    if (products.length > 0 && activeProduct) {
       // Try to keep the same product active by ID, else fallback to first
       const current = products.find(p => p.id === activeProduct.id);
       setActiveProduct(current || products[0]);
    } else if (products.length > 0) {
        setActiveProduct(products[0]);
    }
  }, [products]);

  if (!activeProduct) return null;

  const ProductIcon = ICON_MAP[activeProduct.iconKey] || Server;

  return (
    <section id="hardware" className="py-32 bg-[#0F1117] border-t border-white/5">
      <div className="container mx-auto px-6">
        
        <div className="mb-16">
          <div className="text-cyan-500 font-mono text-xs uppercase tracking-widest mb-4">Module 06</div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Platform Specifications</h2>
          <p className="text-slate-400 max-w-2xl text-lg">
            Hardware designed for high-<GlossaryTerm term="Radix">radix</GlossaryTerm> connectivity and <GlossaryTerm term="Deep Buffers">deep buffering</GlossaryTerm>.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
          
          {/* Sidebar Selector - Dev Tools Style */}
          <div className="lg:w-80 flex flex-col gap-2 shrink-0">
            <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2 px-2">Select Platform</div>
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => setActiveProduct(product)}
                className={`text-left p-4 rounded-lg border transition-all duration-200 group relative overflow-hidden ${
                  activeProduct.id === product.id
                    ? 'bg-cyan-950/30 border-cyan-500/50 text-white'
                    : 'bg-[#161b22] border-white/5 text-slate-400 hover:border-slate-600'
                }`}
                aria-pressed={activeProduct.id === product.id}
              >
                {activeProduct.id === product.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500"></div>}
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold font-mono tracking-tight">{product.series}</span>
                  {activeProduct.id === product.id && <ChevronRight size={14} className="text-cyan-400" />}
                </div>
                <div className="text-xs opacity-70 truncate">{product.role}</div>
              </button>
            ))}
            
            {/* Spec Hint */}
            <div className="mt-8 p-4 bg-[#161b22] border border-white/5 rounded-lg">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <Info size={14} />
                    <span className="text-xs font-bold uppercase">Why Deep Buffers?</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                    AI traffic consists of "<GlossaryTerm term="Incast">incast</GlossaryTerm>" bursts. Shallow buffer switches drop packets during these microbursts. Deep buffers (<GlossaryTerm term="VOQ">VOQ</GlossaryTerm>) absorb them.
                </p>
            </div>
          </div>

          {/* Main Spec Sheet Display */}
          <div className="flex-1 bg-[#161b22] rounded-2xl border border-white/5 p-8 relative overflow-hidden flex flex-col">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-8 mb-8 gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-cyan-500/10 rounded text-cyan-400">
                            <ProductIcon size={24} />
                        </div>
                        <h3 className="text-3xl font-bold text-white">{activeProduct.series}</h3>
                    </div>
                    <div className="text-cyan-500 font-mono text-sm">{activeProduct.role}</div>
                </div>
                <div className="flex gap-2">
                    {activeProduct.specs.slice(0,2).map((spec, i) => (
                        <div key={i} className="px-3 py-1 bg-[#0d1117] border border-white/10 rounded text-xs text-slate-300 font-mono">
                            {spec}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Left: Specs & Features */}
                <div className="space-y-8">
                    <div>
                        <h4 className="text-slate-500 font-mono text-xs uppercase tracking-wider mb-4">Description</h4>
                        {/* Use the new renderer instead of raw string */}
                        <DescriptionRenderer text={activeProduct.desc} />
                        
                        {/* Datasheet Link */}
                        {activeProduct.datasheetUrl && (
                            <a 
                                href={activeProduct.datasheetUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-cyan-950/20 border border-cyan-500/20 rounded hover:bg-cyan-900/30 hover:border-cyan-500/40 transition-colors text-cyan-400 text-xs font-bold font-mono uppercase tracking-wide group"
                            >
                                <ExternalLink size={14} className="group-hover:scale-110 transition-transform"/> View Datasheet
                            </a>
                        )}
                    </div>

                    {activeProduct.variants && (
                        <div>
                            <h4 className="text-slate-500 font-mono text-xs uppercase tracking-wider mb-4">Configuration Variants</h4>
                            <div className="space-y-2">
                                {activeProduct.variants.map((v, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-[#0d1117] border border-white/5 rounded hover:border-cyan-500/30 transition-colors">
                                        <span className="text-cyan-100 font-mono text-xs font-bold">{v.name}</span>
                                        <div className="flex gap-4 text-xs text-slate-500 font-mono">
                                            <span>{v.chip}</span>
                                            <span className="w-px h-4 bg-slate-800"></span>
                                            <span>{v.ports}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Visual Rack Representation */}
                <div 
                  className="bg-[#0d1117] rounded-xl border border-white/5 p-6 flex flex-col items-center justify-center min-h-[300px] relative"
                  role="img"
                  aria-label={`Physical topology view of ${activeProduct.series}. Shows ${activeProduct.id === '7800R' ? 'modular linecards and fabric modules' : 'fixed switch ports'} status.`}
                >
                    <div className="absolute top-4 left-4 text-xs font-mono text-slate-600 uppercase">Physical Topology View</div>
                    
                    {/* CSS Rack Drawing */}
                    <div className="relative w-48">
                        {/* Rack Frame */}
                        <div className="border-x-2 border-slate-700 h-64 w-full flex flex-col justify-end p-1 relative">
                            
                            {/* Device Drawing */}
                            {activeProduct.id === '7800R' ? (
                                <div className="w-full h-56 bg-[#1e293b] border border-slate-600 rounded-sm relative flex flex-col">
                                    {/* Modular Slots */}
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className="flex-1 border-b border-slate-700 w-full flex items-center px-1 gap-1">
                                            <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
                                            <div className="h-1 w-full bg-slate-800 rounded-full"></div>
                                        </div>
                                    ))}
                                    <div className="absolute -right-12 top-10 text-xs text-cyan-400 font-mono">← Linecards</div>
                                    <div className="absolute -left-16 bottom-4 text-xs text-cyan-400 font-mono">Fabric →</div>
                                </div>
                            ) : activeProduct.id === '7700R' ? (
                                <div className="space-y-2 w-full">
                                    <div className="w-full h-8 bg-[#1e293b] border border-slate-600 rounded-sm flex items-center justify-center text-[8px] text-slate-500">Leaf 1</div>
                                    <div className="w-full h-12 border-2 border-dashed border-cyan-900 rounded bg-cyan-900/10 flex items-center justify-center text-[10px] text-cyan-400 font-mono">Distributed Fabric</div>
                                    <div className="w-full h-8 bg-[#1e293b] border border-slate-600 rounded-sm flex items-center justify-center text-[8px] text-slate-500">Leaf 2</div>
                                </div>
                            ) : (
                                <div className="w-full h-8 bg-[#1e293b] border border-slate-600 rounded-sm flex items-center px-2 gap-2 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                                    <div className="flex-1 flex gap-0.5">
                                        {[...Array(12)].map((_,i) => <div key={i} className="w-1 h-2 bg-slate-500"></div>)}
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_5px_#22d3ee]"></div>
                                </div>
                            )}
                        </div>
                        {/* Floor */}
                        <div className="h-1 w-64 bg-slate-700 -ml-8 mt-1"></div>
                    </div>

                    <div className="mt-6 flex gap-4 text-xs text-slate-500 font-mono">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div> Active
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-slate-700 rounded-full"></div> Idle
                        </div>
                    </div>

                </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default HardwareSection;
