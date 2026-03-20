
import React from 'react';
import { ComparisonRow } from '../../../types';
import { arraySet } from '../../../utils/arrayMutate';

export const ComparisonEditor: React.FC<{ table: ComparisonRow[]; onUpdate: (t: ComparisonRow[]) => void }> = ({ table = [], onUpdate }) => {
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
              <input value={row.feature} onChange={e => onUpdate(arraySet(table, idx, 'feature', e.target.value))} className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-white font-bold" />
            </div>
            <div className="col-span-4">
              <label className="text-[10px] uppercase font-bold text-red-500/70 block mb-1">Legacy</label>
              <input value={row.legacy} onChange={e => onUpdate(arraySet(table, idx, 'legacy', e.target.value))} className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-slate-400" />
            </div>
            <div className="col-span-5">
              <label className="text-[10px] uppercase font-bold text-emerald-500/70 block mb-1">Modern (UEC)</label>
              <input value={row.pinnacle} onChange={e => onUpdate(arraySet(table, idx, 'pinnacle', e.target.value))} className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-emerald-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
