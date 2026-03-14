import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface HorizontalBarComparisonChartProps {
  data: Array<{ name: string; fill: string; [key: string]: string | number }>;
  dataKey: string;
  valueUnit: string;
  xDomain?: [number, number];
}

interface TooltipPayloadItem {
  value?: number | string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  unit: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, unit }) => {
  if (active && payload && payload.length > 0) {
    return (
      <div className="bg-[#1e293b] border border-slate-700 p-3 rounded shadow-2xl">
        <p className="text-slate-200 font-mono text-xs mb-1">{label}</p>
        <p className="text-blue-400 font-bold font-mono">
          {payload[0]?.value} {unit}
        </p>
      </div>
    );
  }

  return null;
};

const HorizontalBarComparisonChart: React.FC<HorizontalBarComparisonChartProps> = ({
  data,
  dataKey,
  valueUnit,
  xDomain,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ left: 0, right: 30 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} horizontal={false} />
        <XAxis
          type="number"
          domain={xDomain}
          stroke="#475569"
          fontSize={10}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          dataKey="name"
          type="category"
          stroke="#94a3b8"
          width={110}
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip unit={valueUnit} />} cursor={{ fill: '#ffffff', opacity: 0.05 }} />
        <Bar dataKey={dataKey} radius={[0, 4, 4, 0]} barSize={24}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalBarComparisonChart;
