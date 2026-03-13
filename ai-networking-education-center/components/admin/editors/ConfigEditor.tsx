
import React from 'react';
import { AppConfig } from '../../../types';

export const ConfigEditor: React.FC<{ config: AppConfig; onUpdate: (c: AppConfig) => void }> = ({ config, onUpdate }) => {
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
