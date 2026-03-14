import React from 'react';
import { useData } from '../contexts/DataContext';
import { Activity, Zap, TrendingUp, AlertTriangle } from 'lucide-react';
import {
  MetricStatCard,
  ChartPanel,
  HorizontalBarComparisonChart
} from '../shared/visualization';

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
          <MetricStatCard label="Effective Throughput" value="98.4" unit="%" trend="+12% vs Standard" icon={Activity} />
          <MetricStatCard label="Failover Time" value="3.3" unit="ms" trend="30x Faster" icon={Zap} />
          <MetricStatCard label="Buffer Usage" value="42" unit="MB" trend="Optimized" icon={Zap} />
          <MetricStatCard label="JCT Reduction" value="15" unit="%" trend="Consistent" icon={TrendingUp} />
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          <ChartPanel
            title="Bandwidth Efficiency"
            subtitle="Cluster Load Balancing (CLB) vs Standard ECMP"
          >
            <HorizontalBarComparisonChart
              data={performanceData}
              dataKey="efficiency"
              valueUnit="%"
              xDomain={[0, 100]}
            />
          </ChartPanel>

          <ChartPanel
            title="Failover Convergence"
            subtitle="Time to recover from link failure (ms)"
            icon={AlertTriangle}
          >
            <HorizontalBarComparisonChart
              data={failoverData}
              dataKey="delay"
              valueUnit="ms"
            />
          </ChartPanel>
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;
