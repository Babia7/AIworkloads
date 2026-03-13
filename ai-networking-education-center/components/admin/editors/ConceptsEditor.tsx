
import React from 'react';
import { ICON_MAP } from '../../../constants';
import { ConceptData } from '../../../types';

export const ConceptsEditor: React.FC<{ concepts: ConceptData[]; onUpdate: (c: ConceptData[]) => void }> = ({ concepts = [], onUpdate }) => {
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
                  onChange={e => { const next = [...concepts]; next[idx].iconKey = e.target.value; onUpdate(next); }}
                  className="w-full bg-[#161b22] text-xs text-white border border-white/10 rounded py-2 px-2"
                >
                  {availableIcons.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                </select>
              </div>
              <div className="flex-1">
                <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Title</label>
                <input value={concept.title} onChange={e => { const next = [...concepts]; next[idx].title = e.target.value; onUpdate(next); }} className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-white font-bold" />
              </div>
              <div className="flex-1">
                <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Full Name</label>
                <input value={concept.fullName} onChange={e => { const next = [...concepts]; next[idx].fullName = e.target.value; onUpdate(next); }} className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-slate-400" />
              </div>
            </div>

            <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Description</label>
            <textarea value={concept.description} onChange={e => { const next = [...concepts]; next[idx].description = e.target.value; onUpdate(next); }} className="w-full bg-[#161b22] border border-white/10 rounded p-3 text-sm text-slate-300 h-24 mb-4" />

            <label className="text-[10px] uppercase font-bold text-slate-500 mb-2 block">Key Features</label>
            <div className="space-y-2">
              {concept.features.map((feat, fIdx) => (
                <input key={fIdx} value={feat} onChange={e => { const next = [...concepts]; next[idx].features[fIdx] = e.target.value; onUpdate(next); }} className="w-full bg-transparent border-b border-white/10 text-sm text-slate-400 focus:border-blue-500 outline-none pb-1" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
