
import React from 'react';
import { ProtocolConcept } from '../../../types';

export const ProtocolEditor: React.FC<{ protocols: ProtocolConcept[]; onUpdate: (p: ProtocolConcept[]) => void }> = ({ protocols = [], onUpdate }) => {
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
              <input value={proto.title} onChange={e => { const next = [...protocols]; next[idx].title = e.target.value; onUpdate(next); }} className="text-xl font-bold bg-transparent text-white border-b border-white/10 focus:border-blue-500 outline-none w-1/3" />
              <input value={proto.subtitle} onChange={e => { const next = [...protocols]; next[idx].subtitle = e.target.value; onUpdate(next); }} className="text-sm font-medium bg-transparent text-slate-400 border-b border-white/10 focus:border-blue-500 outline-none w-1/4" />
            </div>
            <textarea value={proto.description} onChange={e => { const next = [...protocols]; next[idx].description = e.target.value; onUpdate(next); }} className="w-full bg-[#161b22] border border-white/10 rounded p-3 text-sm text-slate-300 mb-6 h-20" />

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase">Mechanisms</div>
              {proto.mechanisms?.map((mech, mIdx) => (
                <div key={mIdx} className="flex gap-4 p-3 bg-[#161b22] rounded border border-white/5">
                  <input value={mech.name} onChange={e => { const next = [...protocols]; next[idx].mechanisms[mIdx].name = e.target.value; onUpdate(next); }} className="bg-transparent font-bold text-white text-sm w-1/3 outline-none" />
                  <input value={mech.desc} onChange={e => { const next = [...protocols]; next[idx].mechanisms[mIdx].desc = e.target.value; onUpdate(next); }} className="bg-transparent text-slate-400 text-sm flex-1 outline-none" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
