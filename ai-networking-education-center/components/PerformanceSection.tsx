import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useData } from '../contexts/DataContext';
import { AlertTriangle } from 'lucide-react';
import { ICON_MAP } from '../constants';
import FadeIn from './FadeIn';
import GlossaryTerm from './GlossaryTerm';

// ─── Sub-components ──────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }: any) => {
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

const StatCard: React.FC<{ label: string; value: string; unit: string; trend: string; iconKey: string }> = ({
  label, value, unit, trend, iconKey,
}) => {
  const Icon = ICON_MAP[iconKey] ?? ICON_MAP['Activity'];
  return (
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
        ↑ {trend}
      </div>
    </div>
  );
};

// ─── Section A — Tail Latency intro ─────────────────────────────────────────

const TailLatencyCard: React.FC = () => (
  <FadeIn>
    <div className="bg-[#161b22] rounded-2xl border border-amber-500/20 p-8 mb-8">
      <div className="text-amber-400 font-mono text-xs uppercase tracking-widest mb-3">Why It Matters</div>
      <h3 className="text-2xl font-bold text-white mb-6">Tail Latency, Not Average Latency</h3>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Key insight */}
        <div>
          <p className="text-slate-300 leading-relaxed mb-4">
            In AI training, every GPU in a collective operation must wait for the{' '}
            <strong className="text-amber-400">slowest</strong> packet.{' '}
            <GlossaryTerm term="p99 Tail Latency">p99 tail latency</GlossaryTerm> — not average
            latency — determines cluster step time. Averaging masks the outliers that stall training.
          </p>
          <div className="bg-slate-900 rounded-xl p-4 border border-amber-500/10 font-mono text-sm">
            <div className="text-slate-500 text-xs mb-2">Step time formula</div>
            <div className="text-amber-300">
              step_time = <span className="text-white">max</span>(
              <span className="text-emerald-400">compute_time</span>,{' '}
              <span className="text-red-400">network_tail_latency</span>)
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-3 leading-relaxed">
            Source: Arista LANZ Tech Bulletin; <em>Powering All Ethernet AI Networking</em> blog
          </p>
        </div>

        {/* Right: latency percentile CSS bar chart */}
        <div>
          <div className="text-slate-500 text-xs font-mono uppercase mb-3">Latency Percentile Distribution</div>
          <div className="flex items-end gap-3 h-36">
            {[
              { label: 'p50',   heightPct: 22, color: 'bg-emerald-500', textColor: 'text-emerald-400' },
              { label: 'p95',   heightPct: 42, color: 'bg-yellow-500',  textColor: 'text-yellow-400' },
              { label: 'p99',   heightPct: 72, color: 'bg-orange-500',  textColor: 'text-orange-400' },
              { label: 'p99.9', heightPct: 100, color: 'bg-red-500',    textColor: 'text-red-400' },
            ].map(({ label, heightPct, color, textColor }) => (
              <div key={label} className="flex flex-col items-center gap-1 flex-1">
                <div className={`text-xs font-mono ${textColor}`} style={{ fontSize: '10px' }}>
                  {label === 'p99.9' ? '← long tail' : ''}
                </div>
                <div className="w-full flex items-end" style={{ height: '112px' }}>
                  <div
                    className={`w-full rounded-t-md ${color} opacity-80`}
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <div className={`text-xs font-mono ${textColor}`}>{label}</div>
              </div>
            ))}
          </div>
          <p className="text-slate-600 text-xs mt-2 font-mono">
            p99 latency can be 4–10× the median. Training step time is gated by the worst case.
          </p>
        </div>
      </div>
    </div>
  </FadeIn>
);

// ─── Section B — The Congestion Chain ────────────────────────────────────────

const CongestionChainSection: React.FC = () => (
  <FadeIn delay={0.1}>
    <div className="mb-8">
      <h3 className="text-xl font-bold text-white mb-2">The Congestion Chain</h3>
      <p className="text-slate-500 text-sm mb-6 font-mono">
        Three patterns Arista identifies as the root causes of AI fabric congestion
      </p>
      <div className="grid md:grid-cols-3 gap-6">

        {/* Incast */}
        <div className="bg-[#161b22] rounded-xl p-6 border border-white/5">
          <div className="text-2xl mb-3">⬇️</div>
          <h4 className="text-white font-bold mb-2">
            <GlossaryTerm term="Incast">Incast</GlossaryTerm>
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Many GPUs simultaneously send traffic to a single receiver. The last-hop port is
            overwhelmed, buffers overflow, packets are dropped, retransmits spike, and{' '}
            <GlossaryTerm term="JCT">JCT</GlossaryTerm> inflates.
          </p>
          <div className="bg-slate-900 rounded-lg p-3 border border-red-500/20 text-xs text-slate-400 italic leading-relaxed">
            "Common 'incast' problem on the last link of the AI receiver when multiple
            uncoordinated senders simultaneously send traffic to it." — Arista AI Fabric
            Deployment Guide
          </div>
        </div>

        {/* Microburst */}
        <div className="bg-[#161b22] rounded-xl p-6 border border-white/5">
          <div className="text-2xl mb-3">📈</div>
          <h4 className="text-white font-bold mb-2">
            <GlossaryTerm term="Microburst">Microburst</GlossaryTerm>
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Sub-millisecond traffic spikes invisible to SNMP polling. Shallow-buffer switches
            drop packets during the spike; deep-buffer switches absorb it.{' '}
            <GlossaryTerm term="LANZ">Arista LANZ</GlossaryTerm> detects microbursts at
            10 μs resolution.
          </p>
          <div className="bg-amber-500/10 rounded-lg p-3 border border-amber-500/20 text-xs text-amber-300 font-mono">
            {'>'} 200 retransmits/sec on shallow-buffer switches<br />
            {'<'} 50 retransmits/sec on deep-buffer switches
            <div className="text-slate-500 mt-1 not-italic text-xs">
              — Arista "Why Big Data Needs Big Buffer Switches"
            </div>
          </div>
        </div>

        {/* HOL Blocking */}
        <div className="bg-[#161b22] rounded-xl p-6 border border-white/5">
          <div className="text-2xl mb-3">🚧</div>
          <h4 className="text-white font-bold mb-2">
            <GlossaryTerm term="Head-of-Line Blocking">HOL Blocking</GlossaryTerm>
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            In a shared-memory switch, a stuck output queue blocks all ingress traffic behind
            it — even traffic destined for different, uncongested ports. Arista's{' '}
            <GlossaryTerm term="VOQ">VOQ</GlossaryTerm> architecture queues separately per
            egress destination, so only the congested destination's queue stalls.
          </p>
          <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20 text-xs text-blue-300">
            VOQ eliminates cross-flow starvation — unaffected destinations drain freely.
          </div>
        </div>

      </div>
    </div>
  </FadeIn>
);

// ─── Section C — ECN Dual-Mode ────────────────────────────────────────────────

const ECNCard: React.FC = () => (
  <FadeIn delay={0.1}>
    <div className="bg-[#161b22] rounded-2xl border border-white/5 p-8 mb-8">
      <div className="text-blue-400 font-mono text-xs uppercase tracking-widest mb-3">
        Congestion Signaling
      </div>
      <h3 className="text-xl font-bold text-white mb-6">
        <GlossaryTerm term="ECN">ECN</GlossaryTerm> — Dual-Mode Operation
      </h3>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Queue-Length ECN */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
          <div className="text-slate-400 font-mono text-xs uppercase tracking-wider mb-2">
            Queue-Length ECN (Standard)
          </div>
          <h4 className="text-white font-semibold mb-3">Buffer Occupancy Threshold</h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            When buffer occupancy exceeds a configured threshold, the switch sets the CE
            (Congestion Experienced) bit on the packet. The receiver echoes a{' '}
            <GlossaryTerm term="CNP">CNP</GlossaryTerm> back to the sender, which
            rate-limits. Best for absorbing bursts once a queue starts filling.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-2 bg-slate-700 rounded flex-1">
              <div className="h-2 bg-blue-500 rounded" style={{ width: '75%' }} />
            </div>
            <span className="text-xs text-slate-500 font-mono whitespace-nowrap">75% → CE mark</span>
          </div>
        </div>

        {/* Latency-Based ECN */}
        <div className="bg-slate-900 rounded-xl p-6 border border-amber-500/30">
          <div className="text-amber-400 font-mono text-xs uppercase tracking-wider mb-2">
            Latency-Based ECN (AI-Specific)
          </div>
          <h4 className="text-white font-semibold mb-3">Per-Packet Queueing Delay</h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            When a packet waits in a{' '}
            <GlossaryTerm term="VOQ">VOQ</GlossaryTerm> longer than a configured threshold
            (e.g., 500 μs), it is marked regardless of current queue depth. This catches
            slow-drain scenarios that queue-length ECN misses.
          </p>
          <div className="mt-4 bg-amber-500/10 rounded-lg p-2 text-xs text-amber-300 font-mono">
            Arista/AI-specific — standard data center ECN is queue-length only.
          </div>
        </div>
      </div>

      {/* DCQCN Loop */}
      <div className="border-t border-white/5 pt-6">
        <div className="text-slate-500 font-mono text-xs uppercase tracking-wider mb-4">
          <GlossaryTerm term="DCQCN">DCQCN</GlossaryTerm> Congestion Control Loop
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {[
            { step: '1', label: 'ECN Mark',      desc: 'Switch marks CE bit on packet',        color: 'border-red-500/40 bg-red-500/10 text-red-300' },
            { step: '2', label: 'CNP Sent',       desc: 'Receiver sends Congestion Notification Packet', color: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300' },
            { step: '3', label: 'Rate Reduction', desc: 'Sender halves rate × (1 − α/2)',      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' },
          ].map(({ step, label, desc, color }, i) => (
            <React.Fragment key={step}>
              <div className={`flex-1 rounded-xl p-4 border ${color} text-center min-w-0`}>
                <div className="text-xs font-mono opacity-60 mb-1">Step {step}</div>
                <div className="font-bold text-sm mb-1">{label}</div>
                <div className="text-xs opacity-75 leading-snug">{desc}</div>
              </div>
              {i < 2 && <div className="text-slate-600 text-xl hidden sm:block">→</div>}
            </React.Fragment>
          ))}
        </div>
        <p className="text-slate-600 text-xs mt-3">
          Source: Arista-Broadcom AI Networking Deployment Guide; Arista EOS DCBX/Flow Control docs
        </p>
      </div>
    </div>
  </FadeIn>
);

// ─── Section D — HOL vs VOQ Visual ───────────────────────────────────────────

const VOQComparisonCard: React.FC = () => (
  <FadeIn delay={0.1}>
    <div className="bg-[#161b22] rounded-2xl border border-white/5 p-8 mb-8">
      <div className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-3">Architecture</div>
      <h3 className="text-xl font-bold text-white mb-6">
        <GlossaryTerm term="Head-of-Line Blocking">HOL Blocking</GlossaryTerm> vs{' '}
        <GlossaryTerm term="VOQ">Virtual Output Queuing</GlossaryTerm>
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Standard Queuing — bad */}
        <div className="rounded-xl border border-red-500/30 bg-slate-900 p-5">
          <div className="text-red-400 font-mono text-xs uppercase tracking-wider mb-4">
            ✕ Standard Shared-Memory Queuing
          </div>
          <div className="space-y-2 text-sm font-mono">
            {['Port A → free', 'Port B → BLOCKED 🚫', 'Port C → free', 'Port D → free'].map((label, i) => (
              <div
                key={i}
                className={`rounded px-3 py-2 border ${
                  i === 1
                    ? 'border-red-500/50 bg-red-500/10 text-red-300'
                    : 'border-red-500/20 bg-red-500/5 text-slate-500 opacity-60'
                }`}
              >
                {label}
                {i !== 1 && <span className="text-red-500 ml-2 text-xs">← starved</span>}
              </div>
            ))}
          </div>
          <p className="text-slate-600 text-xs mt-4 leading-relaxed">
            One blocked output queue starves all ingress traffic — including flows destined
            for other, uncongested ports.
          </p>
        </div>

        {/* VOQ — good */}
        <div className="rounded-xl border border-emerald-500/30 bg-slate-900 p-5">
          <div className="text-emerald-400 font-mono text-xs uppercase tracking-wider mb-4">
            ✓ Arista Virtual Output Queuing (VOQ)
          </div>
          <div className="space-y-2 text-sm font-mono">
            {[
              { label: 'VOQ → Port A', free: true },
              { label: 'VOQ → Port B', free: false },
              { label: 'VOQ → Port C', free: true },
              { label: 'VOQ → Port D', free: true },
            ].map(({ label, free }, i) => (
              <div
                key={i}
                className={`rounded px-3 py-2 border ${
                  free
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                    : 'border-red-500/40 bg-red-500/10 text-red-300'
                }`}
              >
                {label}{' '}
                <span className="text-xs">{free ? '→ flowing ✓' : '→ stalled (isolated)'}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-600 text-xs mt-4 leading-relaxed">
            Separate ingress queue per egress destination. Only Port B's queue stalls — A,
            C, and D drain freely at line rate.
          </p>
        </div>
      </div>

      {/* Arista buffer stat */}
      <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
        <div className="flex items-center gap-3">
          <div className="text-blue-400 text-2xl">📦</div>
          <div>
            <div className="text-blue-300 font-semibold text-sm">Arista 7800R3 Deep Buffer</div>
            <div className="text-slate-400 text-xs mt-1">
              "Deep buffer VOQ architecture with up to 24 GB of buffer memory — approximately
              50 ms of traffic buffer per ingress port." — Arista 7800R3 Architecture Whitepaper
            </div>
          </div>
        </div>
      </div>
    </div>
  </FadeIn>
);

// ─── Section E — JCT Impact Callout ──────────────────────────────────────────

const JCTCallout: React.FC = () => (
  <FadeIn delay={0.15}>
    <div className="bg-slate-950 rounded-2xl border border-red-500/20 p-8 mb-8">
      <div className="text-red-400 font-mono text-xs uppercase tracking-widest mb-3">Business Impact</div>
      <h3 className="text-xl font-bold text-white mb-6">
        The Cost of Congestion in AI Training
      </h3>

      <div className="space-y-5">
        {[
          {
            num: '01',
            title: 'Step time is gated by the slowest node',
            body: 'All-Reduce waits for every participant. One straggler stalls all 10,000 GPUs in the cluster. The cluster-wide GPU utilization drops for every step that GPU is slow.',
            accent: 'text-red-400',
          },
          {
            num: '02',
            title: 'Elephant flows on shared links → GPU idle time',
            body: '"Elephant flows (collectives, shuffles, large reads) on shared links cause spikes and GPU idle time." — Arista, Powering All Ethernet AI Networking',
            accent: 'text-amber-400',
          },
          {
            num: '03',
            title: 'CLB reduces tail latency at the fabric level',
            body: 'Arista Cluster Load Balancing (CLB) provides RDMA-aware flow placement and global optimization across the fabric, reducing the tail latency that gates step time.',
            accent: 'text-emerald-400',
          },
        ].map(({ num, title, body, accent }) => (
          <div key={num} className="flex gap-5">
            <div className={`font-mono text-3xl font-bold ${accent} opacity-40 shrink-0 w-10`}>{num}</div>
            <div>
              <div className="text-white font-semibold mb-1">{title}</div>
              <div className="text-slate-400 text-sm leading-relaxed">{body}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Chain badge */}
      <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-xs">
        {['JCT improvement', '→', 'GPU utilization ↑', '→', 'Training cost ↓'].map((item, i) => (
          item === '→' ? (
            <span key={i} className="text-slate-600">{item}</span>
          ) : (
            <span key={i} className="bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1 rounded-full">
              {item}
            </span>
          )
        ))}
      </div>
    </div>
  </FadeIn>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const PerformanceSection: React.FC = () => {
  const { performanceData, failoverData, statCards } = useData();

  return (
    <section id="performance" className="py-32 bg-[#0F1117] border-t border-white/5">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <div className="text-red-500 font-mono text-xs uppercase tracking-widest mb-4">Module 04</div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Congestion &amp; Performance</h2>
            <p className="text-slate-400 max-w-2xl">
              How Arista's deep-buffer VOQ architecture and dual-mode ECN eliminate the congestion
              patterns that inflate tail latency and stall GPU training jobs.
            </p>
          </div>
          <div className="flex items-center gap-2 text-red-500 animate-pulse">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="font-mono text-xs font-bold uppercase">System Active</span>
          </div>
        </div>

        {/* Key Stats Row — data-driven */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {statCards.map((card, i) => (
            <StatCard key={i} {...card} />
          ))}
        </div>

        {/* Section A — Tail Latency */}
        <TailLatencyCard />

        {/* Section B — Congestion Chain */}
        <CongestionChainSection />

        {/* Section C — ECN Dual-Mode */}
        <ECNCard />

        {/* Section D — HOL vs VOQ */}
        <VOQComparisonCard />

        {/* Section E — JCT Impact */}
        <JCTCallout />

        {/* Charts Grid */}
        <FadeIn delay={0.1}>
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Chart 1 */}
            <div className="bg-[#161b22] p-8 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-lg font-bold text-white">Bandwidth Efficiency</h3>
                  <p className="text-xs text-slate-500 font-mono">
                    Effective Bandwidth Utilization — AI Fabric vs Standard Ethernet
                  </p>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData} layout="vertical" margin={{ left: 0, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis dataKey="name" type="category" stroke="#94a3b8" width={110} tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff', opacity: 0.05 }} />
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
                    <YAxis dataKey="name" type="category" stroke="#94a3b8" width={110} tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff', opacity: 0.05 }} />
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
        </FadeIn>

      </div>
    </section>
  );
};

export default PerformanceSection;
