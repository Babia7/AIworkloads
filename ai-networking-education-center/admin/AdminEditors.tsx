
import React from 'react';
import { ICON_MAP } from '../../constants';
import { Layout, Plus, Trash2 } from 'lucide-react';
import { 
  AppConfig, HomeModule, ChartData, ProtocolConcept, 
  HPCItem, ProductData, FutureCategory, ScalingConcept, ConceptData, ComparisonRow 
} from '../../types';

/**
 * ADMIN EDITORS
 * 
 * This file contains the sub-components used within the AdminDashboard.
 * Each component corresponds to a specific data slice (Products, Config, etc.)
 * and provides UI for CRUD operations.
 */

// --- Global Config Editor ---
export const ConfigEditor: React.FC<{ config: AppConfig, onUpdate: (c: AppConfig) => void }> = ({ config, onUpdate }) => {
  const handleChange = (key: keyof AppConfig, val: string) => {
    onUpdate({ ...config, [key]: val });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="border-b border-white/5 pb-4">
          <h3 className="text-3xl font-bold text-white mb-2">Global Configuration</h3>
          <p className="text-slate-400 text-sm">Manage site-wide meta information and hero section text.</p>
      </div>
      
      <div className="bg-[#0d1117] border border-white/5 rounded-2xl p-6 space-y-6">
        <div className="grid grid-cols-2 gap-6">
           <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Badge Label</label>
              <input value={config.heroLabel || ''} onChange={e => handleChange('heroLabel', e.target.value)} className="w-full bg-[#161b22] border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none" />
           </div>
           <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Hero Title</label>
              <div className="flex gap-2">
                 <input value={config.heroTitle || ''} onChange={e => handleChange('heroTitle', e.target.value)} className="w-full bg-[#161b22] border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none" />
                 <input value={config.heroHighlight || ''} onChange={e => handleChange('heroHighlight', e.target.value)} className="w-1/3 bg-[#161b22] border border-blue-500/30 rounded-lg p-3 text-blue-400 font-bold focus:border-blue-500 outline-none" placeholder="Highlight" />
              </div>
           </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Hero Description</label>
          <textarea 
            value={config.heroSubtitle || ''} 
            onChange={e => handleChange('heroSubtitle', e.target.value)} 
            className="w-full h-32 bg-[#161b22] border border-white/10 rounded-lg p-3 text-slate-300 focus:border-blue-500 outline-none resize-none leading-relaxed" 
          />
        </div>
      </div>
    </div>
  );
};

// --- Architecture (Scaling) Editor ---
export const ArchitectureEditor: React.FC<{ concepts: ScalingConcept[], onUpdate: (c: ScalingConcept[]) => void }> = ({ concepts = [], onUpdate }) => {
    const availableIcons = Object.keys(ICON_MAP).sort();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="border-b border-white/5 pb-4">
                <h3 className="text-3xl font-bold text-white mb-2">Architecture Concepts</h3>
                <p className="text-slate-400 text-sm">Edit the scaling concepts (Scale Up, Scale Out, Scale Across).</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {concepts.map((item, idx) => (
                    <div key={idx} className="bg-[#0d1117] p-6 rounded-2xl border border-white/5 space-y-4">
                        <select 
                            value={item.iconKey} 
                            onChange={e => {
                                const next = [...concepts]; next[idx].iconKey = e.target.value; onUpdate(next);
                            }}
                            className="w-full bg-[#161b22] text-xs text-white border border-white/10 rounded py-2 px-2"
                        >
                            {availableIcons.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                        </select>
                        
                        <input value={item.title} onChange={e => {
                            const next = [...concepts]; next[idx].title = e.target.value; onUpdate(next);
                        }} className="w-full bg-transparent font-bold text-white text-lg border-b border-white/10 focus:border-blue-500 outline-none" />
                        
                        <input value={item.desc} onChange={e => {
                            const next = [...concepts]; next[idx].desc = e.target.value; onUpdate(next);
                        }} className="w-full bg-transparent text-sm font-bold text-blue-400 border-b border-white/10 outline-none" placeholder="Subtitle" />

                        <textarea value={item.details} onChange={e => {
                            const next = [...concepts]; next[idx].details = e.target.value; onUpdate(next);
                        }} className="w-full bg-[#161b22] border border-white/10 rounded p-3 text-sm text-slate-400 h-24" />
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Core Concepts Editor ---
export const ConceptsEditor: React.FC<{ concepts: ConceptData[], onUpdate: (c: ConceptData[]) => void }> = ({ concepts = [], onUpdate }) => {
    const availableIcons = Object.keys(ICON_MAP).sort();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="border-b border-white/5 pb-4">
                <h3 className="text-3xl font-bold text-white mb-2">Core Technologies (RDMA/NVMe)</h3>
                <p className="text-slate-400 text-sm">Edit the foundational concept cards.</p>
            </div>

            <div className="space-y-6">
                {concepts.map((concept, idx) => (
                    <div key={idx} className="bg-[#0d1117] p-6 rounded-2xl border border-white/5">
                        <div className="flex gap-4 mb-4 items-start">
                             <div className="w-32">
                                <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Icon</label>
                                <select 
                                    value={concept.iconKey} 
                                    onChange={e => {
                                        const next = [...concepts]; next[idx].iconKey = e.target.value; onUpdate(next);
                                    }}
                                    className="w-full bg-[#161b22] text-xs text-white border border-white/10 rounded py-2 px-2"
                                >
                                    {availableIcons.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Title</label>
                                <input value={concept.title} onChange={e => {
                                    const next = [...concepts]; next[idx].title = e.target.value; onUpdate(next);
                                }} className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-white font-bold" />
                            </div>
                            <div className="flex-1">
                                <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Full Name</label>
                                <input value={concept.fullName} onChange={e => {
                                    const next = [...concepts]; next[idx].fullName = e.target.value; onUpdate(next);
                                }} className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-slate-400" />
                            </div>
                        </div>

                        <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Description</label>
                        <textarea value={concept.description} onChange={e => {
                            const next = [...concepts]; next[idx].description = e.target.value; onUpdate(next);
                        }} className="w-full bg-[#161b22] border border-white/10 rounded p-3 text-sm text-slate-300 h-24 mb-4" />

                        <label className="text-[10px] uppercase font-bold text-slate-500 mb-2 block">Key Features</label>
                        <div className="space-y-2">
                            {concept.features.map((feat, fIdx) => (
                                <input key={fIdx} value={feat} onChange={e => {
                                    const next = [...concepts]; next[idx].features[fIdx] = e.target.value; onUpdate(next);
                                }} className="w-full bg-transparent border-b border-white/10 text-sm text-slate-400 focus:border-blue-500 outline-none pb-1" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Comparison Table Editor ---
export const ComparisonEditor: React.FC<{ table: ComparisonRow[], onUpdate: (t: ComparisonRow[]) => void }> = ({ table = [], onUpdate }) => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="border-b border-white/5 pb-4">
                <h3 className="text-3xl font-bold text-white mb-2">Comparison Matrix</h3>
                <p className="text-slate-400 text-sm">Edit the Legacy vs Modern comparison table.</p>
            </div>
            
            <div className="space-y-4">
                {table.map((row, idx) => (
                    <div key={idx} className="bg-[#0d1117] p-4 rounded-xl border border-white/5 grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-3">
                            <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Feature</label>
                            <input value={row.feature} onChange={e => {
                                const next = [...table]; next[idx].feature = e.target.value; onUpdate(next);
                            }} className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-white font-bold" />
                        </div>
                        <div className="col-span-4">
                            <label className="text-[10px] uppercase font-bold text-red-500/70 block mb-1">Legacy</label>
                            <input value={row.legacy} onChange={e => {
                                const next = [...table]; next[idx].legacy = e.target.value; onUpdate(next);
                            }} className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-slate-400" />
                        </div>
                        <div className="col-span-5">
                            <label className="text-[10px] uppercase font-bold text-emerald-500/70 block mb-1">Modern (UEC)</label>
                            <input value={row.pinnacle} onChange={e => {
                                const next = [...table]; next[idx].pinnacle = e.target.value; onUpdate(next);
                            }} className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-emerald-100" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Home Layout Editor ---
export const LayoutEditor: React.FC<{ modules: HomeModule[], onUpdate: (m: HomeModule[]) => void }> = ({ modules = [], onUpdate }) => {
  const handleChange = (idx: number, field: keyof HomeModule, val: any) => {
    const next = [...modules];
    next[idx] = { ...next[idx], [field]: val };
    onUpdate(next);
  };
  
  const moveUp = (idx: number) => {
      if(idx === 0) return;
      const next = [...modules];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      onUpdate(next);
  };

  const moveDown = (idx: number) => {
      if(idx === modules.length - 1) return;
      const next = [...modules];
      [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
      onUpdate(next);
  };

  const availableIcons = Object.keys(ICON_MAP).sort();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="border-b border-white/5 pb-4">
        <h3 className="text-3xl font-bold text-white mb-2">Home Layout</h3>
        <p className="text-slate-400 text-sm">Rearrange and customize the bento-grid cards on the landing page.</p>
      </div>

      <div className="grid gap-4">
         {modules.map((mod, i) => (
           <div key={mod.id || i} className="bg-[#0d1117] p-4 rounded-xl border border-white/5 flex gap-4 group hover:border-white/10 transition-colors">
             <div className="flex flex-col gap-1 justify-center">
                 <button onClick={() => moveUp(i)} disabled={i === 0} className="p-1 hover:bg-white/5 rounded disabled:opacity-20 text-slate-400">▲</button>
                 <button onClick={() => moveDown(i)} disabled={i === modules.length - 1} className="p-1 hover:bg-white/5 rounded disabled:opacity-20 text-slate-400">▼</button>
             </div>
             
             <div className={`w-16 rounded-xl border border-white/10 flex items-center justify-center shrink-0 ${
                mod.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                mod.color === 'purple' ? 'bg-purple-500/10 text-purple-400' :
                mod.color === 'red' ? 'bg-red-500/10 text-red-400' :
                mod.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
                mod.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-800'
             }`}>
               {ICON_MAP[mod.iconKey] ? React.createElement(ICON_MAP[mod.iconKey], { size: 24 }) : <Layout size={24} />}
             </div>
             
             <div className="flex-1 grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-3">
                   <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Title</label>
                   <input value={mod.title || ''} onChange={e => handleChange(i, 'title', e.target.value)} className="w-full bg-[#161b22] border border-white/10 rounded px-2 py-2 text-sm text-white focus:border-blue-500 outline-none" />
                </div>
                <div className="col-span-12 md:col-span-5">
                   <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Subtitle</label>
                   <input value={mod.subtitle || ''} onChange={e => handleChange(i, 'subtitle', e.target.value)} className="w-full bg-[#161b22] border border-white/10 rounded px-2 py-2 text-sm text-slate-300 focus:border-blue-500 outline-none" />
                </div>
                <div className="col-span-6 md:col-span-2">
                   <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Color</label>
                   <select value={mod.color || 'blue'} onChange={e => handleChange(i, 'color', e.target.value)} className="w-full bg-[#161b22] border border-white/10 rounded px-2 py-2 text-sm text-white focus:border-blue-500 outline-none">
                     <option value="blue">Blue</option>
                     <option value="purple">Purple</option>
                     <option value="indigo">Indigo</option>
                     <option value="cyan">Cyan</option>
                     <option value="emerald">Emerald</option>
                     <option value="red">Red</option>
                   </select>
                </div>
                <div className="col-span-6 md:col-span-2">
                   <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Icon</label>
                   <select value={mod.iconKey || ''} onChange={e => handleChange(i, 'iconKey', e.target.value)} className="w-full bg-[#161b22] border border-white/10 rounded px-2 py-2 text-sm text-white focus:border-blue-500 outline-none">
                      {availableIcons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                   </select>
                </div>
             </div>
           </div>
         ))}
      </div>
    </div>
  );
};

// --- Performance Editor ---
export const PerformanceEditor: React.FC<{ perfData: ChartData[], failData: ChartData[], onUpdatePerf: (d: ChartData[]) => void, onUpdateFail: (d: ChartData[]) => void }> = ({ perfData = [], failData = [], onUpdatePerf, onUpdateFail }) => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="border-b border-white/5 pb-4">
                <h3 className="text-3xl font-bold text-white mb-2">Performance Analytics</h3>
                <p className="text-slate-400 text-sm">Update the chart data points for efficiency and failover comparisons.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-[#0d1117] p-6 rounded-2xl border border-white/5">
                    <h4 className="text-white font-bold mb-4">Bandwidth Efficiency</h4>
                    <div className="space-y-4">
                        {perfData.map((item, i) => (
                            <div key={i} className="flex gap-4 items-end">
                                <div className="flex-1">
                                    <label className="text-xs text-slate-500 uppercase">Label</label>
                                    <input value={item.name} onChange={e => {
                                        const next = [...perfData]; next[i].name = e.target.value; onUpdatePerf(next);
                                    }} className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-white" />
                                </div>
                                <div className="w-24">
                                    <label className="text-xs text-slate-500 uppercase">Eff %</label>
                                    <input type="number" value={item.efficiency} onChange={e => {
                                        const next = [...perfData]; next[i].efficiency = Number(e.target.value); onUpdatePerf(next);
                                    }} className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-white" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#0d1117] p-6 rounded-2xl border border-white/5">
                    <h4 className="text-white font-bold mb-4">Failover Convergence</h4>
                    <div className="space-y-4">
                        {failData.map((item, i) => (
                            <div key={i} className="flex gap-4 items-end">
                                <div className="flex-1">
                                    <label className="text-xs text-slate-500 uppercase">Label</label>
                                    <input value={item.name} onChange={e => {
                                        const next = [...failData]; next[i].name = e.target.value; onUpdateFail(next);
                                    }} className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-white" />
                                </div>
                                <div className="w-24">
                                    <label className="text-xs text-slate-500 uppercase">Time (ms)</label>
                                    <input type="number" value={item.delay} onChange={e => {
                                        const next = [...failData]; next[i].delay = Number(e.target.value); onUpdateFail(next);
                                    }} className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-white" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Protocols Editor ---
export const ProtocolEditor: React.FC<{ protocols: ProtocolConcept[], onUpdate: (p: ProtocolConcept[]) => void }> = ({ protocols = [], onUpdate }) => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="border-b border-white/5 pb-4">
                <h3 className="text-3xl font-bold text-white mb-2">Protocols & Concepts</h3>
                <p className="text-slate-400 text-sm">Edit the educational content for RoCEv2 and UET sections.</p>
            </div>

            <div className="space-y-6">
                {protocols.map((proto, idx) => (
                    <div key={idx} className="bg-[#0d1117] p-6 rounded-2xl border border-white/5">
                        <div className="flex gap-4 mb-4">
                            <input value={proto.title} onChange={e => {
                                const next = [...protocols]; next[idx].title = e.target.value; onUpdate(next);
                            }} className="text-xl font-bold bg-transparent text-white border-b border-white/10 focus:border-blue-500 outline-none w-1/3" />
                            <input value={proto.subtitle} onChange={e => {
                                const next = [...protocols]; next[idx].subtitle = e.target.value; onUpdate(next);
                            }} className="text-sm font-medium bg-transparent text-slate-400 border-b border-white/10 focus:border-blue-500 outline-none w-1/4" />
                        </div>
                        <textarea value={proto.description} onChange={e => {
                            const next = [...protocols]; next[idx].description = e.target.value; onUpdate(next);
                        }} className="w-full bg-[#161b22] border border-white/10 rounded p-3 text-sm text-slate-300 mb-6 h-20" />
                        
                        <div className="space-y-2">
                             <div className="text-xs font-bold text-slate-500 uppercase">Mechanisms</div>
                             {proto.mechanisms?.map((mech, mIdx) => (
                                 <div key={mIdx} className="flex gap-4 p-3 bg-[#161b22] rounded border border-white/5">
                                     <input value={mech.name} onChange={e => {
                                         const next = [...protocols]; next[idx].mechanisms[mIdx].name = e.target.value; onUpdate(next);
                                     }} className="bg-transparent font-bold text-white text-sm w-1/3 outline-none" />
                                     <input value={mech.desc} onChange={e => {
                                         const next = [...protocols]; next[idx].mechanisms[mIdx].desc = e.target.value; onUpdate(next);
                                     }} className="bg-transparent text-slate-400 text-sm flex-1 outline-none" />
                                 </div>
                             ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- HPC Checklist Editor ---
export const HPCEditor: React.FC<{ checklist: HPCItem[], onUpdate: (c: HPCItem[]) => void }> = ({ checklist = [], onUpdate }) => {
    const availableIcons = Object.keys(ICON_MAP).sort();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="border-b border-white/5 pb-4">
                <h3 className="text-3xl font-bold text-white mb-2">HPC Engineer's Checklist</h3>
                <p className="text-slate-400 text-sm">Edit the pain-points and solutions cards in the AI vs HPC section.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
                {checklist.map((item, idx) => (
                    <div key={idx} className="bg-[#0d1117] p-6 rounded-2xl border border-white/5">
                        <div className="flex gap-4 mb-4">
                            <div className="w-10">
                                <select 
                                    value={item.iconKey} 
                                    onChange={e => {
                                        const next = [...checklist]; next[idx].iconKey = e.target.value; onUpdate(next);
                                    }}
                                    className="w-full bg-[#161b22] text-xs text-white border border-white/10 rounded py-1"
                                >
                                    {availableIcons.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                                </select>
                            </div>
                            <input value={item.title} onChange={e => {
                                const next = [...checklist]; next[idx].title = e.target.value; onUpdate(next);
                            }} className="flex-1 font-bold bg-transparent text-white border-b border-white/10 focus:border-blue-500 outline-none" />
                        </div>
                        <div className="space-y-2">
                            {item.points?.map((pt, pIdx) => (
                                <div key={pIdx} className="flex gap-2">
                                    <span className="text-cyan-500">•</span>
                                    <input value={pt} onChange={e => {
                                        const next = [...checklist]; next[idx].points[pIdx] = e.target.value; onUpdate(next);
                                    }} className="w-full bg-transparent text-sm text-slate-400 border-b border-transparent hover:border-white/10 focus:border-blue-500 outline-none" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Product Editor ---
export const ProductsEditor: React.FC<{ products: ProductData[], onUpdate: (p: ProductData[]) => void }> = ({ products = [], onUpdate }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="border-b border-white/5 pb-4">
          <h3 className="text-3xl font-bold text-white mb-2">Product Catalog</h3>
          <p className="text-slate-400 text-sm">Edit specs, descriptions, key features, and SKU variants.</p>
      </div>

      <div className="space-y-8">
        {products.map((product, idx) => (
          <div key={product.id} className="bg-[#0d1117] p-6 rounded-2xl border border-white/5">
            {/* Main Info */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Series Name</label>
                    <input value={product.series} onChange={e => {
                        const next = [...products]; next[idx].series = e.target.value; onUpdate(next);
                    }} className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-white" />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Role</label>
                    <input value={product.role} onChange={e => {
                        const next = [...products]; next[idx].role = e.target.value; onUpdate(next);
                    }} className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-white" />
                </div>
            </div>
            
            <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
            <textarea 
              value={product.desc}
              onChange={(e) => {
                const newProducts = [...products];
                newProducts[idx].desc = e.target.value;
                onUpdate(newProducts);
              }}
              className="w-full h-20 bg-[#161b22] border border-white/10 rounded p-3 text-sm text-slate-300 focus:border-blue-500 outline-none mb-6"
            />
            
            <div className="mb-6">
                <label className="text-xs font-bold text-slate-500 uppercase">Datasheet URL</label>
                <input 
                    value={product.datasheetUrl || ''} 
                    onChange={e => {
                        const next = [...products]; 
                        next[idx].datasheetUrl = e.target.value; 
                        onUpdate(next);
                    }} 
                    placeholder="https://..."
                    className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-cyan-400 font-mono mt-1" 
                />
            </div>

            {/* Specs Tags */}
            <div className="mb-6">
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Quick Specs (Comma separated)</label>
                <div className="flex flex-wrap gap-2">
                    {product.specs?.map((spec: string, sIdx: number) => (
                        <input 
                            key={sIdx}
                            value={spec}
                            onChange={e => {
                                const next = [...products]; next[idx].specs[sIdx] = e.target.value; onUpdate(next);
                            }}
                            className="bg-[#161b22] border border-white/10 rounded px-2 py-1 text-xs text-white w-32 text-center"
                        />
                    )) || <div className="text-xs text-slate-500">No specs defined</div>}
                </div>
            </div>

            {/* Variants */}
            <div className="mb-6">
                <h5 className="text-sm font-bold text-white mb-3">Variants</h5>
                <div className="space-y-2">
                    {product.variants?.map((v, vIdx) => (
                        <div key={vIdx} className="grid grid-cols-12 gap-2">
                            <input value={v.name} onChange={e => {
                                const next = [...products]; 
                                if (next[idx].variants) next[idx].variants![vIdx].name = e.target.value; 
                                onUpdate(next);
                            }} className="col-span-4 bg-[#161b22] border border-white/5 rounded px-2 py-1 text-xs text-cyan-400 font-bold" />
                            <input value={v.chip} onChange={e => {
                                const next = [...products]; 
                                if (next[idx].variants) next[idx].variants![vIdx].chip = e.target.value; 
                                onUpdate(next);
                            }} className="col-span-3 bg-[#161b22] border border-white/5 rounded px-2 py-1 text-xs text-slate-400" />
                             <input value={v.ports} onChange={e => {
                                const next = [...products]; 
                                if (next[idx].variants) next[idx].variants![vIdx].ports = e.target.value; 
                                onUpdate(next);
                            }} className="col-span-5 bg-[#161b22] border border-white/5 rounded px-2 py-1 text-xs text-slate-400" />
                        </div>
                    ))}
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Glossary Editor ---
export const GlossaryEditor: React.FC<{ glossary: Record<string, string>, onUpdate: (g: Record<string, string>) => void }> = ({ glossary = {}, onUpdate }) => {
  const [newTerm, setNewTerm] = React.useState('');
  const [newDef, setNewDef] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleAdd = () => {
    if (newTerm && newDef) {
      onUpdate({ ...glossary, [newTerm]: newDef });
      setNewTerm('');
      setNewDef('');
    }
  };

  const filtered = Object.entries(glossary)
    .sort((a,b) => a[0].localeCompare(b[0]))
    .filter(([t, d]) => t.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <div>
            <h3 className="text-3xl font-bold text-white mb-2">Glossary</h3>
            <p className="text-slate-400 text-sm">Manage definitions for the glossary page and automated tooltips.</p>
        </div>
        <input 
          placeholder="Filter..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)}
          className="bg-[#0d1117] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-blue-500 outline-none"
        />
      </div>

      <div className="bg-[#0d1117] p-4 rounded-xl border border-white/5 flex gap-4 items-start">
        <div className="flex-1 space-y-2">
          <input 
            value={newTerm} onChange={e => setNewTerm(e.target.value)}
            placeholder="New Term" 
            className="w-full bg-[#161b22] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-blue-500 outline-none"
          />
          <textarea 
            value={newDef} onChange={e => setNewDef(e.target.value)}
            placeholder="Definition..." 
            className="w-full bg-[#161b22] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-blue-500 outline-none h-16 resize-none"
          />
        </div>
        <button onClick={handleAdd} disabled={!newTerm || !newDef} className="p-3 bg-blue-600 rounded-lg text-white hover:bg-blue-500 disabled:opacity-50">
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-3">
        {filtered.map(([term, def]) => (
          <div key={term} className="bg-[#161b22] border border-white/5 p-4 rounded-xl flex gap-4 group">
            <div className="flex-1">
              <h4 className="text-blue-400 font-bold font-mono text-sm mb-1">{term}</h4>
              <textarea 
                value={def}
                onChange={(e) => onUpdate({ ...glossary, [term]: e.target.value })}
                className="w-full bg-transparent border-none p-0 text-sm text-slate-400 focus:ring-0 resize-none h-auto"
                rows={2}
              />
            </div>
            <button onClick={() => { const n = {...glossary}; delete n[term]; onUpdate(n); }} className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity self-start">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Future Editor ---
export const FutureEditor: React.FC<{ data: FutureCategory[], onUpdate: (d: FutureCategory[]) => void }> = ({ data = [], onUpdate }) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="border-b border-white/5 pb-4">
                <h3 className="text-3xl font-bold text-white mb-2">Platform Improvements</h3>
                <p className="text-slate-400 text-sm">Manage future enhancements and suggested features.</p>
            </div>
            <div className="space-y-8">
                {data.map((category, catIdx) => (
                    <div key={catIdx} className="bg-[#0d1117] p-6 rounded-xl border border-white/5">
                        <h4 className="text-lg font-bold text-white mb-4">{category.category}</h4>
                        <div className="space-y-4">
                            {category.items?.map((item, itemIdx) => (
                                <div key={itemIdx} className="flex gap-4 p-3 bg-[#161b22] rounded border border-white/5">
                                    <div className="flex-1 space-y-1">
                                        <input 
                                            value={item.title}
                                            onChange={(e) => {
                                                const newData = [...data];
                                                newData[catIdx].items[itemIdx].title = e.target.value;
                                                onUpdate(newData);
                                            }}
                                            className="w-full bg-transparent border-none text-sm font-bold text-white focus:ring-0 px-0"
                                        />
                                        <input 
                                            value={item.desc}
                                            onChange={(e) => {
                                                const newData = [...data];
                                                newData[catIdx].items[itemIdx].desc = e.target.value;
                                                onUpdate(newData);
                                            }}
                                            className="w-full bg-transparent border-none text-xs text-slate-500 focus:ring-0 px-0"
                                        />
                                    </div>
                                </div>
                            )) || <div className="text-xs text-slate-500">No items</div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
