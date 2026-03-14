import React from 'react';
import { Activity, Zap, TrendingUp, AlertTriangle } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { PERFORMANCE_SECTION_CONTENT } from '../content/performance';
import { MetricStatCard, ChartPanel, HorizontalBarComparisonChart } from '../shared/visualization';
import SourceBadge from './SourceBadge';
import { claimText, hasSourceMetadata } from '../utils/sourceClaims';

const ICON_BY_KEY = {
  activity: Activity,
  zap: Zap,
  trendingUp: TrendingUp,
} as const;

const PerformanceSection: React.FC = () => {
  const { performanceData, failoverData } = useData();

  return (
    <section id="performance" className="py-32 bg-[#0F1117] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <div className="text-red-500 font-mono text-xs uppercase tracking-widest mb-4">
              {PERFORMANCE_SECTION_CONTENT.moduleLabel}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {PERFORMANCE_SECTION_CONTENT.title}
            </h2>
            <p
              className="text-slate-400 max-w-2xl"
              data-claim-id={
                hasSourceMetadata(PERFORMANCE_SECTION_CONTENT.subtitle)
                  ? PERFORMANCE_SECTION_CONTENT.subtitle.claimId
                  : undefined
              }
            >
              {claimText(PERFORMANCE_SECTION_CONTENT.subtitle)}
              {hasSourceMetadata(PERFORMANCE_SECTION_CONTENT.subtitle) && (
                <SourceBadge claim={PERFORMANCE_SECTION_CONTENT.subtitle} className="ml-2" />
              )}
            </p>
          </div>
          <div className="flex items-center gap-2 text-red-500 animate-pulse">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="font-mono text-xs font-bold uppercase">
              {PERFORMANCE_SECTION_CONTENT.systemStatusLabel}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {PERFORMANCE_SECTION_CONTENT.stats.map((stat) => (
            <MetricStatCard
              key={`${stat.label}-${hasSourceMetadata(stat.trend) ? stat.trend.claimId : 'no-claim-id'}`}
              label={stat.label}
              value={stat.value}
              unit={stat.unit}
              trend={claimText(stat.trend)}
              icon={ICON_BY_KEY[stat.iconKey]}
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <ChartPanel
            title={PERFORMANCE_SECTION_CONTENT.charts.bandwidth.title}
            subtitle={claimText(PERFORMANCE_SECTION_CONTENT.charts.bandwidth.subtitle)}
            footer={
              hasSourceMetadata(PERFORMANCE_SECTION_CONTENT.charts.bandwidth.subtitle) ? (
                <SourceBadge claim={PERFORMANCE_SECTION_CONTENT.charts.bandwidth.subtitle} />
              ) : undefined
            }
          >
            <HorizontalBarComparisonChart
              data={performanceData.map((item) => ({ ...item, name: claimText(item.name) }))}
              dataKey="efficiency"
              valueUnit="%"
              xDomain={[0, 100]}
            />
          </ChartPanel>

          <ChartPanel
            title={PERFORMANCE_SECTION_CONTENT.charts.failover.title}
            subtitle={claimText(PERFORMANCE_SECTION_CONTENT.charts.failover.subtitle)}
            footer={
              hasSourceMetadata(PERFORMANCE_SECTION_CONTENT.charts.failover.subtitle) ? (
                <SourceBadge claim={PERFORMANCE_SECTION_CONTENT.charts.failover.subtitle} />
              ) : undefined
            }
            icon={AlertTriangle}
          >
            <HorizontalBarComparisonChart
              data={failoverData.map((item) => ({ ...item, name: claimText(item.name) }))}
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
