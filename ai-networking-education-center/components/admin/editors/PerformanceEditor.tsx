import React from 'react';
import { ChartData } from '../../../types';
import { claimText, updateClaimText } from '../../../utils/sourceClaims';

interface PerformanceEditorProps {
  perfData: ChartData[];
  failData: ChartData[];
  onUpdatePerf: (data: ChartData[]) => void;
  onUpdateFail: (data: ChartData[]) => void;
}

export const PerformanceEditor: React.FC<PerformanceEditorProps> = ({
  perfData = [],
  failData = [],
  onUpdatePerf,
  onUpdateFail,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="border-b border-white/5 pb-4">
        <h3 className="text-3xl font-bold text-white mb-2">Performance Charts</h3>
        <p className="text-slate-400 text-sm">Edit bandwidth and failover comparison values.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-[#0d1117] p-6 rounded-2xl border border-white/5">
          <h4 className="text-white font-bold mb-4">Bandwidth Efficiency</h4>
          <div className="space-y-4">
            {perfData.map((item, i) => (
              <div key={i} className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="text-xs text-slate-500 uppercase">Label</label>
                  <input
                    value={claimText(item.name ?? '')}
                    onChange={(e) => {
                      const next = [...perfData];
                      next[i].name = updateClaimText(item.name ?? '', e.target.value);
                      onUpdatePerf(next);
                    }}
                    className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-white"
                  />
                </div>
                <div className="w-24">
                  <label className="text-xs text-slate-500 uppercase">Efficiency %</label>
                  <input
                    type="number"
                    value={item.efficiency}
                    onChange={(e) => {
                      const next = [...perfData];
                      next[i].efficiency = Number(e.target.value);
                      onUpdatePerf(next);
                    }}
                    className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-white"
                  />
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
                  <input
                    value={claimText(item.name ?? '')}
                    onChange={(e) => {
                      const next = [...failData];
                      next[i].name = updateClaimText(item.name ?? '', e.target.value);
                      onUpdateFail(next);
                    }}
                    className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-white"
                  />
                </div>
                <div className="w-24">
                  <label className="text-xs text-slate-500 uppercase">Time (ms)</label>
                  <input
                    type="number"
                    value={item.delay}
                    onChange={(e) => {
                      const next = [...failData];
                      next[i].delay = Number(e.target.value);
                      onUpdateFail(next);
                    }}
                    className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
