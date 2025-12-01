
import React from 'react';
import { useData } from '../contexts/DataContext';
import { Rocket } from 'lucide-react';
import { ICON_MAP } from '../constants';

const COLOR_STYLES: Record<string, { headerFrom: string, iconBg: string, iconText: string, dot: string }> = {
    blue: { headerFrom: 'from-blue-500/10', iconBg: 'bg-blue-500/20', iconText: 'text-blue-400', dot: 'bg-blue-500' },
    emerald: { headerFrom: 'from-emerald-500/10', iconBg: 'bg-emerald-500/20', iconText: 'text-emerald-400', dot: 'bg-emerald-500' },
    purple: { headerFrom: 'from-purple-500/10', iconBg: 'bg-purple-500/20', iconText: 'text-purple-400', dot: 'bg-purple-500' },
};

const FutureSection: React.FC = () => {
  const { futureImprovements } = useData();

  return (
    <section id="future" className="py-32 bg-[#0F1117] border-t border-white/5 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-full max-w-2xl h-64 bg-emerald-500/5 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-mono uppercase tracking-widest mb-6">
                <Rocket size={12} className="text-emerald-400" />
                <span>Module 09</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Future Enhancements</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
                We are committed to making this the gold standard for AI Networking education.
                Here is our prioritized list of improvements to platform accessibility, content, and performance.
            </p>
        </div>

        {/* Improvement Grid */}
        <div className="grid md:grid-cols-3 gap-8">
            {futureImprovements.map((category, idx) => {
                const style = COLOR_STYLES[category.color] || COLOR_STYLES.blue;
                const Icon = ICON_MAP[category.iconKey] || Rocket;

                return (
                    <div key={idx} className="bg-[#161b22] rounded-2xl border border-white/5 overflow-hidden flex flex-col h-full hover:border-white/10 transition-colors">
                        {/* Category Header */}
                        <div className={`p-6 bg-gradient-to-r ${style.headerFrom} to-transparent border-b border-white/5`}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`p-2 rounded-lg ${style.iconBg} ${style.iconText}`}>
                                    <Icon size={20} />
                                </div>
                                <h3 className="text-lg font-bold text-white">{category.category}</h3>
                            </div>
                        </div>

                        {/* Items List */}
                        <div className="p-6 space-y-6 flex-1">
                            {category.items.map((item, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="mt-1">
                                        <div className={`w-1.5 h-1.5 rounded-full ${style.dot} group-hover:scale-150 transition-transform`}></div>
                                    </div>
                                    <div>
                                        <h4 className="text-slate-200 font-bold text-sm mb-1 flex items-center gap-2">
                                            {item.title}
                                        </h4>
                                        <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer Status */}
                        <div className="px-6 py-4 bg-[#0d1117] border-t border-white/5 flex items-center gap-2 text-[10px] font-mono text-slate-600 uppercase tracking-wider">
                            <div className="w-2 h-2 rounded-full border border-slate-600"></div>
                            Future
                        </div>
                    </div>
                );
            })}
        </div>

        {/* Call to Action (Mock) */}
        <div className="mt-20 text-center">
            <p className="text-sm text-slate-500 mb-4">Have a suggestion?</p>
            <button className="px-6 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-sm font-bold hover:bg-slate-700 transition-colors">
                Submit Feedback
            </button>
        </div>

      </div>
    </section>
  );
};

export default FutureSection;
