import React from 'react';
import { AlertTriangle, BookCheck, ClipboardList, Gauge, Network, Workflow } from 'lucide-react';

const PRINCIPLES = [
  {
    title: 'Design for Predictability Over Peak Throughput',
    detail: 'Favor stable tail latency and bounded jitter over occasional benchmark highs. Distributed training converges faster with consistent step times.'
  },
  {
    title: 'Control Congestion at Multiple Layers',
    detail: 'Combine endpoint behavior, queue management, and pathing strategies. No single control loop is enough at large AI cluster scale.'
  },
  {
    title: 'Instrument First, Tune Second',
    detail: 'Define baseline telemetry and SLO thresholds before making policy changes so rollbacks and validation are fast and deterministic.'
  }
];

const RUNBOOKS = [
  {
    title: 'High Tail Latency During All-Reduce',
    severity: 'High Priority',
    symptom: 'Iteration time variance spikes and synchronized jobs stall near gradient exchange phases.',
    inspect: ['Queue depth and ECN mark distribution', 'Per-flow retransmit/selective retry counters', 'Hot links from topology-aware path analytics'],
    actions: ['Reduce burst synchronization where possible', 'Rebalance path selection to avoid persistent hot spots', 'Validate endpoint pacing and retry timer settings']
  },
  {
    title: 'PFC Storm / Head-of-Line Blocking',
    severity: 'Critical',
    symptom: 'Large groups of flows pause simultaneously; unrelated traffic classes degrade.',
    inspect: ['PFC pause frame rates by priority', 'Queue occupancy growth and drain patterns', 'Lossless class scoping and priority mappings'],
    actions: ['Contain the lossless domain to required traffic only', 'Tune queue thresholds to prevent prolonged pause cascades', 'Segment noisy workloads into separate traffic classes']
  },
  {
    title: 'ECN Mark Rate Instability',
    severity: 'Medium Priority',
    symptom: 'Throughput oscillates in waves with alternating overreaction and underutilization.',
    inspect: ['Mark probability versus queue depth curves', 'Sender reaction timing', 'Feedback delay across fabric tiers'],
    actions: ['Smooth AQM policy to reduce abrupt threshold transitions', 'Align sender response windows with RTT expectations', 'Validate policy consistency across all fabric tiers']
  },
  {
    title: 'Throughput Collapse During Incast',
    severity: 'High Priority',
    symptom: 'Many-to-one bursts trigger sudden throughput drops and packet recovery overhead.',
    inspect: ['Fan-in burst windows from application traces', 'Ingress buffer pressure at receivers', 'Flow completion time outliers by source group'],
    actions: ['Introduce pacing/shaping at fan-in sources', 'Distribute receiver pressure across alternate paths where feasible', 'Stagger synchronized transfer windows in job orchestration']
  }
];

const MIGRATION_ROWS = [
  {
    profile: 'Small clusters (<512 GPUs), early ops maturity',
    recommendation: 'RoCEv2 baseline with conservative congestion policy',
    why: 'Fastest operational path when team is building telemetry and runbook discipline.'
  },
  {
    profile: 'Mid-scale clusters (512–4k GPUs), mixed workloads',
    recommendation: 'RoCEv2 + incremental advanced traffic engineering',
    why: 'Balances predictability and migration risk while preserving existing tooling.'
  },
  {
    profile: 'Large clusters (4k+ GPUs), strict step-time SLOs',
    recommendation: 'Evaluate advanced Ethernet transport capabilities with staged rollout',
    why: 'Stronger control over multi-path behavior and retry strategy can improve completion consistency.'
  }
];

const CHECKS = [
  'Can you map each symptom to at least two telemetry signals before changing a policy?',
  'Do you have rollback criteria for congestion-control tuning changes?',
  'Is your lossless domain limited only to traffic classes that require it?'
];

const OperationsPlaybooksSection: React.FC = () => {
  return (
    <section id="operations" className="py-32 bg-[#0F1117] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <div className="text-amber-400 font-mono text-xs uppercase tracking-widest mb-4">Module 08 · Intermediate / Deep Dive</div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Operations Playbooks</h2>
            <p className="text-slate-400 max-w-3xl">
              Turn networking concepts into repeatable day-2 operations with vendor-neutral design principles,
              incident runbooks, and migration decision guidance.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-amber-300 text-xs font-mono uppercase tracking-wide">
            <BookCheck size={14} /> Implementation Ready
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {PRINCIPLES.map((item) => (
            <div key={item.title} className="bg-[#161b22] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-cyan-300 mb-3"><Network size={14} /> <span className="text-xs font-mono uppercase">Vendor-Neutral Principle</span></div>
              <h3 className="text-lg text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {RUNBOOKS.map((book) => (
            <article key={book.title} className="bg-[#161b22] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-lg">{book.title}</h3>
                <span className="text-[10px] font-mono uppercase px-2 py-1 rounded-full bg-red-500/10 text-red-300 border border-red-500/20">{book.severity}</span>
              </div>

              <div className="space-y-3 text-sm">
                <p className="text-slate-300"><span className="text-amber-300 font-semibold inline-flex items-center gap-1"><AlertTriangle size={12} /> Symptom:</span> {book.symptom}</p>
                <div>
                  <p className="text-blue-300 font-semibold inline-flex items-center gap-1 mb-1"><Gauge size={12} /> Inspect:</p>
                  <ul className="list-disc list-inside text-slate-400 space-y-1">
                    {book.inspect.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-emerald-300 font-semibold inline-flex items-center gap-1 mb-1"><Workflow size={12} /> Actions:</p>
                  <ul className="list-disc list-inside text-slate-400 space-y-1">
                    {book.actions.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="bg-[#161b22] border border-white/5 rounded-2xl p-6 mb-10 overflow-x-auto">
          <h3 className="text-xl text-white font-semibold mb-4 inline-flex items-center gap-2"><ClipboardList size={18} /> Migration Decision Matrix</h3>
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="text-left border-b border-white/10 text-slate-300">
                <th className="py-3 pr-4">Current Profile</th>
                <th className="py-3 pr-4">Recommended Path</th>
                <th className="py-3">Why</th>
              </tr>
            </thead>
            <tbody>
              {MIGRATION_ROWS.map((row) => (
                <tr key={row.profile} className="border-b last:border-b-0 border-white/5 text-slate-400 align-top">
                  <td className="py-3 pr-4">{row.profile}</td>
                  <td className="py-3 pr-4 text-slate-200">{row.recommendation}</td>
                  <td className="py-3">{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-[#0d1117] border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-3">Module Check (Quick Self-Assessment)</h3>
          <ul className="space-y-2 text-slate-300 text-sm">
            {CHECKS.map((check) => (
              <li key={check} className="flex gap-2"><span className="text-emerald-400">✓</span>{check}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OperationsPlaybooksSection;
