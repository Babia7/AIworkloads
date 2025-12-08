import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, TooltipProps } from 'recharts';
import { useData } from '../contexts/DataContext';
import { Activity, Zap, TrendingUp, AlertTriangle } from 'lucide-react';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1e293b] border border-slate-700 p-3 rounded shadow-2xl">
        <p className="text-slate-200 font-mono text-xs mb-1">{label}</p>
        <p className="text-blue-400 font-bold font-mono">
          {payload[0].value} {payload[0].dataKey === 'delay' ? 'ms' : '%'}
        </p>
      </div>
    );
  }
  return null;
};

const StatCard: React.FC<{ label: string; value: string; unit: string; trend: string; icon: any }> = ({ label, value, unit, trend, icon: Icon }) => (
    <div className="bg-[#161b22] p-6 rounded-xl border border-white/5">
        <div className="flex justify-between items-start mb-4">
            <div className="text-slate-500 text-xs font-mono uppercase tracking-wide">{label}</div>
            <Icon size={16} className="text-slate-600" />
        </div>
        <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-white font-mono">{value}</span>
            <span className="text-slate-500 text-sm font-mono">{unit}</span>
        </div>
        <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1 font-mono">
            <TrendingUp size={12} /> {trend}
        </div>
    </div>
);

const PerformanceSection: React.FC = () => {
  const { performanceData, failoverData } = useData();

  return (
    <section id="performance" className="py-32 bg-[#0F1117] border-t border-white/5">
      <div className="container mx-auto px-6">
        
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
                <div className="text-red-500 font-mono text-xs uppercase tracking-widest mb-4">Module 05</div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Performance Metrics</h2>
                <p className="text-slate-400 max-w-2xl">
                    Telemetry showing the impact of congestion control and failover on Job Completion Time (JCT).
                </p>
            </div>
            <div className="flex items-center gap-2 text-red-500 animate-pulse">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="font-mono text-xs font-bold uppercase">System Active</span>
            </div>
        </div>

        {/* Key Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard label="Effective Throughput" value="98.4" unit="%" trend="+12% vs Standard" icon={Activity} />
            <StatCard label="Failover Time" value="3.3" unit="ms" trend="30x Faster" icon={Zap} />
            <StatCard label="Buffer Usage" value="42" unit="MB" trend="Optimized" icon={Zap} />
            <StatCard label="JCT Reduction" value="15" unit="%" trend="Consistent" icon={TrendingUp} />
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Chart 1 */}
          <div className="bg-[#161b22] p-8 rounded-2xl border border-white/5">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-lg font-bold text-white">Bandwidth Efficiency</h3>
                    <p className="text-xs text-slate-500 font-mono">Cluster Load Balancing (CLB) vs Standard ECMP</p>
                </div>
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} layout="vertical" margin={{ left: 0, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#94a3b8" width={110} tick={{fontSize: 11, fill: '#94a3b8'}} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{fill: '#ffffff', opacity: 0.05}} />
                  <Bar dataKey="efficiency" radius={[0, 4, 4, 0]} barSize={24}>
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2 */}
          <div className="bg-[#161b22] p-8 rounded-2xl border border-white/5">
             <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-lg font-bold text-white">Failover Convergence</h3>
                    <p className="text-xs text-slate-500 font-mono">Time to recover from link failure (ms)</p>
                </div>
                <AlertTriangle size={16} className="text-red-500" />
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={failoverData} layout="vertical" margin={{ left: 0, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} horizontal={false} />
                  <XAxis type="number" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#94a3b8" width={110} tick={{fontSize: 11, fill: '#94a3b8'}} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{fill: '#ffffff', opacity: 0.05}} />
                  <Bar dataKey="delay" radius={[0, 4, 4, 0]} barSize={24}>
                    {failoverData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;