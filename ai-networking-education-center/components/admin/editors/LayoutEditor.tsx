
import React from 'react';
import { ICON_MAP } from '../../../constants';
import { Layout } from 'lucide-react';
import { HomeModule } from '../../../types';

export const LayoutEditor: React.FC<{ modules: HomeModule[]; onUpdate: (m: HomeModule[]) => void }> = ({ modules = [], onUpdate }) => {
  const handleChange = (idx: number, field: keyof HomeModule, val: any) => {
    const next = [...modules];
    next[idx] = { ...next[idx], [field]: val };
    onUpdate(next);
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const next = [...modules];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    onUpdate(next);
  };

  const moveDown = (idx: number) => {
    if (idx === modules.length - 1) return;
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
