
import React from 'react';
import { ICON_MAP } from '../../../constants';
import { HPCItem } from '../../../types';

export const HPCEditor: React.FC<{ checklist: HPCItem[]; onUpdate: (c: HPCItem[]) => void }> = ({ checklist = [], onUpdate }) => {
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
                  onChange={e => { const next = [...checklist]; next[idx].iconKey = e.target.value; onUpdate(next); }}
                  className="w-full bg-[#161b22] text-xs text-white border border-white/10 rounded py-1"
                >
                  {availableIcons.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                </select>
              </div>
              <input value={item.title} onChange={e => { const next = [...checklist]; next[idx].title = e.target.value; onUpdate(next); }} className="flex-1 font-bold bg-transparent text-white border-b border-white/10 focus:border-blue-500 outline-none" />
            </div>
            <div className="space-y-2">
              {item.points?.map((pt, pIdx) => (
                <div key={pIdx} className="flex gap-2">
                  <span className="text-cyan-500">•</span>
                  <input value={pt} onChange={e => { const next = [...checklist]; next[idx].points[pIdx] = e.target.value; onUpdate(next); }} className="w-full bg-transparent text-sm text-slate-400 border-b border-transparent hover:border-white/10 focus:border-blue-500 outline-none" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
