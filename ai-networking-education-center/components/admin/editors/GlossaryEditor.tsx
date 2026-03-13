
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export const GlossaryEditor: React.FC<{ glossary: Record<string, string>; onUpdate: (g: Record<string, string>) => void }> = ({ glossary = {}, onUpdate }) => {
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
    .sort((a, b) => a[0].localeCompare(b[0]))
    .filter(([t]) => t.toLowerCase().includes(searchTerm.toLowerCase()));

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
          <input value={newTerm} onChange={e => setNewTerm(e.target.value)} placeholder="New Term" className="w-full bg-[#161b22] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-blue-500 outline-none" />
          <textarea value={newDef} onChange={e => setNewDef(e.target.value)} placeholder="Definition..." className="w-full bg-[#161b22] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-blue-500 outline-none h-16 resize-none" />
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
                onChange={e => onUpdate({ ...glossary, [term]: e.target.value })}
                className="w-full bg-transparent border-none p-0 text-sm text-slate-400 focus:ring-0 resize-none h-auto"
                rows={2}
              />
            </div>
            <button onClick={() => { const n = { ...glossary }; delete n[term]; onUpdate(n); }} className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity self-start">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
