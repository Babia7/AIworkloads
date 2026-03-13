
import React from 'react';
import { ICON_MAP } from '../../../constants';
import { ScalingConcept } from '../../../types';

export const ArchitectureEditor: React.FC<{ concepts: ScalingConcept[]; onUpdate: (c: ScalingConcept[]) => void }> = ({ concepts = [], onUpdate }) => {
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
              onChange={e => { const next = [...concepts]; next[idx].iconKey = e.target.value; onUpdate(next); }}
              className="w-full bg-[#161b22] text-xs text-white border border-white/10 rounded py-2 px-2"
            >
              {availableIcons.map(ic => <option key={ic} value={ic}>{ic}</option>)}
            </select>

            <input value={item.title} onChange={e => { const next = [...concepts]; next[idx].title = e.target.value; onUpdate(next); }} className="w-full bg-transparent font-bold text-white text-lg border-b border-white/10 focus:border-blue-500 outline-none" />

            <input value={item.desc} onChange={e => { const next = [...concepts]; next[idx].desc = e.target.value; onUpdate(next); }} className="w-full bg-transparent text-sm font-bold text-blue-400 border-b border-white/10 outline-none" placeholder="Subtitle" />

            <textarea value={item.details} onChange={e => { const next = [...concepts]; next[idx].details = e.target.value; onUpdate(next); }} className="w-full bg-[#161b22] border border-white/10 rounded p-3 text-sm text-slate-400 h-24" />
          </div>
        ))}
      </div>
    </div>
  );
};
