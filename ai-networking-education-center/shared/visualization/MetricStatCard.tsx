import React from 'react';
import { TrendingUp } from 'lucide-react';

interface MetricStatCardProps {
  label: string;
  value: string;
  unit: string;
  trend: string;
  icon: React.ElementType;
}

const MetricStatCard: React.FC<MetricStatCardProps> = ({ label, value, unit, trend, icon: Icon }) => (
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

export default MetricStatCard;
