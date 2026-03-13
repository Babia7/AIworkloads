
import React from 'react';
import { ChartData, StatCardData } from '../../../types';

export const PerformanceEditor: React.FC<{
  perfData: ChartData[];
  failData: ChartData[];
  statCards: StatCardData[];
  onUpdatePerf: (d: ChartData[]) => void;
  onUpdateFail: (d: ChartData[]) => void;
  onUpdateStatCards: (d: StatCardData[]) => void;
}> = ({ perfData = [], failData = [], statCards = [], onUpdatePerf, onUpdateFail, onUpdateStatCards }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="border-b border-white/5 pb-4">
        <h3 className="text-3xl font-bold text-white mb-2">Performance Analytics</h3>
        <p className="text-slate-400 text-sm">Update chart data points and stat card values for Module 04.</p>
      </div>

      {/* Stat Cards */}
      <div className="bg-[#0d1117] p-6 rounded-2xl border border-white/5">
        <h4 className="text-white font-bold mb-4">Key Stats</h4>
        <div className="space-y-4">
          {statCards.map((card, i) => (
            <div key={i} className="grid grid-cols-2 md:grid-cols-4 gap-3 items-end">
              <div>
                <label className="text-xs text-slate-500 uppercase">Label</label>
                <input
                  value={card.label}
                  onChange={e => { const next = [...statCards]; next[i] = { ...next[i], label: e.target.value }; onUpdateStatCards(next); }}
                  className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 uppercase">Value</label>
                <input
                  value={card.value}
                  onChange={e => { const next = [...statCards]; next[i] = { ...next[i], value: e.target.value }; onUpdateStatCards(next); }}
                  className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 uppercase">Unit</label>
                <input
                  value={card.unit}
                  onChange={e => { const next = [...statCards]; next[i] = { ...next[i], unit: e.target.value }; onUpdateStatCards(next); }}
                  className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 uppercase">Trend</label>
                <input
                  value={card.trend}
                  onChange={e => { const next = [...statCards]; next[i] = { ...next[i], trend: e.target.value }; onUpdateStatCards(next); }}
                  className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-[#0d1117] p-6 rounded-2xl border border-white/5">
          <h4 className="text-white font-bold mb-4">Bandwidth Efficiency</h4>
          <div className="space-y-4">
            {perfData.map((item, i) => (
              <div key={i} className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="text-xs text-slate-500 uppercase">Label</label>
                  <input value={item.name} onChange={e => { const next = [...perfData]; next[i].name = e.target.value; onUpdatePerf(next); }} className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-white" />
                </div>
                <div className="w-24">
                  <label className="text-xs text-slate-500 uppercase">Eff %</label>
                  <input type="number" value={item.efficiency} onChange={e => { const next = [...perfData]; next[i].efficiency = Number(e.target.value); onUpdatePerf(next); }} className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-white" />
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
                  <input value={item.name} onChange={e => { const next = [...failData]; next[i].name = e.target.value; onUpdateFail(next); }} className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-white" />
                </div>
                <div className="w-24">
                  <label className="text-xs text-slate-500 uppercase">Time (ms)</label>
                  <input type="number" value={item.delay} onChange={e => { const next = [...failData]; next[i].delay = Number(e.target.value); onUpdateFail(next); }} className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
