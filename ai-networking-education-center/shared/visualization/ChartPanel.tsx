import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ChartPanelProps {
  title: string;
  subtitle: string;
  icon?: LucideIcon;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const ChartPanel: React.FC<ChartPanelProps> = ({ title, subtitle, icon: Icon, footer, children }) => {
  return (
    <div className="bg-[#161b22] p-8 rounded-2xl border border-white/5">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-xs text-slate-500 font-mono">{subtitle}</p>
          {footer ? <div className="mt-2">{footer}</div> : null}
        </div>
        {Icon ? <Icon size={16} className="text-red-500" /> : null}
      </div>

      <div className="h-64 w-full">{children}</div>
    </div>
  );
};

export default ChartPanel;
