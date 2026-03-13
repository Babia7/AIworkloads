
import React from 'react';
import { FutureCategory } from '../../../types';

export const FutureEditor: React.FC<{ data: FutureCategory[]; onUpdate: (d: FutureCategory[]) => void }> = ({ data = [], onUpdate }) => {
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
                      onChange={e => { const newData = [...data]; newData[catIdx].items[itemIdx].title = e.target.value; onUpdate(newData); }}
                      className="w-full bg-transparent border-none text-sm font-bold text-white focus:ring-0 px-0"
                    />
                    <input
                      value={item.desc}
                      onChange={e => { const newData = [...data]; newData[catIdx].items[itemIdx].desc = e.target.value; onUpdate(newData); }}
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
