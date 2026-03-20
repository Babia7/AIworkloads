import React from 'react';
import { AlertTriangle, BookCheck, ClipboardList, Gauge, Network, Terminal, Workflow } from 'lucide-react';
import {
  OPERATIONS_RUNBOOKS,
  OPERATIONS_PRINCIPLES,
  OPERATIONS_MIGRATION_ROWS,
  OPERATIONS_CHECKS,
} from '../constants';

const SEVERITY_STYLES: Record<string, string> = {
  Critical: 'bg-red-500/10 text-red-300 border-red-500/20',
  'High Priority': 'bg-orange-500/10 text-orange-300 border-orange-500/20',
  'Medium Priority': 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20',
};

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
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-amber-300 text-xs font-mono uppercase tracking-wide whitespace-nowrap">
            <BookCheck size={14} /> Implementation Ready
          </div>
        </div>

        {/* Design Principles */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {OPERATIONS_PRINCIPLES.map((item) => (
            <div key={item.title} className="bg-[#161b22] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-cyan-300 mb-3">
                <Network size={14} />
                <span className="text-xs font-mono uppercase">Vendor-Neutral Principle</span>
              </div>
              <h3 className="text-lg text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.detail}</p>
            </div>
          ))}
        </div>

        {/* Runbooks */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {OPERATIONS_RUNBOOKS.map((book) => (
            <article key={book.id} className="bg-[#161b22] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-lg">{book.title}</h3>
                <span
                  className={`text-[10px] font-mono uppercase px-2 py-1 rounded-full border ${
                    SEVERITY_STYLES[book.severity] ?? 'bg-slate-500/10 text-slate-300 border-slate-500/20'
                  }`}
                >
                  {book.severity}
                </span>
              </div>

              <div className="space-y-4 text-sm">
                <p className="text-slate-300">
                  <span className="text-amber-300 font-semibold inline-flex items-center gap-1">
                    <AlertTriangle size={12} /> Symptom:
                  </span>{' '}
                  {book.symptom}
                </p>

                <p className="text-slate-400">
                  <span className="text-purple-300 font-semibold">Root Cause: </span>
                  {book.rootCause}
                </p>

                <div>
                  <p className="text-blue-300 font-semibold inline-flex items-center gap-1 mb-2">
                    <Gauge size={12} /> Telemetry to Inspect:
                  </p>
                  <ul className="space-y-1.5">
                    {book.inspect.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-400">
                        {item.eosSpecific ? (
                          <span
                            className="mt-0.5 inline-flex items-center gap-1 shrink-0 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20"
                            title="Arista EOS-specific CLI"
                          >
                            <Terminal size={8} /> EOS
                          </span>
                        ) : (
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
                        )}
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-emerald-300 font-semibold inline-flex items-center gap-1 mb-2">
                    <Workflow size={12} /> Corrective Actions:
                  </p>
                  <ol className="space-y-1.5 text-slate-400 list-none">
                    {book.actions.map((action, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="shrink-0 text-emerald-500 font-mono text-xs mt-0.5">{i + 1}.</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Migration Decision Matrix */}
        <div className="bg-[#161b22] border border-white/5 rounded-2xl p-6 mb-10 overflow-x-auto">
          <h3 className="text-xl text-white font-semibold mb-4 inline-flex items-center gap-2">
            <ClipboardList size={18} /> Migration Decision Matrix
          </h3>
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="text-left border-b border-white/10 text-slate-300">
                <th className="py-3 pr-4">Current Profile</th>
                <th className="py-3 pr-4">Recommended Path</th>
                <th className="py-3">Why</th>
              </tr>
            </thead>
            <tbody>
              {OPERATIONS_MIGRATION_ROWS.map((row) => (
                <tr key={row.profile} className="border-b last:border-b-0 border-white/5 text-slate-400 align-top">
                  <td className="py-3 pr-4">{row.profile}</td>
                  <td className="py-3 pr-4 text-slate-200">{row.recommendation}</td>
                  <td className="py-3">{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Module Check */}
        <div className="bg-[#0d1117] border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-3">Module Check (Quick Self-Assessment)</h3>
          <ul className="space-y-2 text-slate-300 text-sm">
            {OPERATIONS_CHECKS.map((check) => (
              <li key={check} className="flex gap-2">
                <span className="text-emerald-400">✓</span>
                {check}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OperationsPlaybooksSection;
