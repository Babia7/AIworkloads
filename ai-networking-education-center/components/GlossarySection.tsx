
import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Search, BookOpen } from 'lucide-react';

const GlossarySection: React.FC = () => {
  const { glossary } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  // Sort terms alphabetically
  const sortedTerms = Object.keys(glossary).sort();

  // Filter terms based on search
  const filteredTerms = sortedTerms.filter(term =>
    term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    glossary[term].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="glossary" className="py-32 bg-[#0F1117] border-t border-white/5">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
                <div className="text-teal-500 font-mono text-xs uppercase tracking-widest mb-4">Module 08</div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Technical Glossary</h2>
                <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
                    A comprehensive dictionary of AI networking terminology.
                </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-96">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Search size={18} className="text-slate-500" />
                </div>
                <input 
                    type="text"
                    placeholder="Search definitions (e.g. RoCE, Radix)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#161b22] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all"
                />
            </div>
        </div>

        {/* Terms Grid */}
        {filteredTerms.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTerms.map((term, index) => (
                    <div 
                        key={term} 
                        className="bg-[#161b22] p-6 rounded-2xl border border-white/5 hover:border-teal-500/30 transition-colors group flex flex-col"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-bold text-teal-100 group-hover:text-teal-400 transition-colors">
                                {term}
                            </h3>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-teal-500/50">
                                <BookOpen size={16} />
                            </div>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            {glossary[term]}
                        </p>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl">
                <p className="text-slate-500 mb-2">No terms found for "{searchTerm}"</p>
                <button 
                    onClick={() => setSearchTerm('')}
                    className="text-teal-500 text-sm hover:underline"
                >
                    Clear search
                </button>
            </div>
        )}

      </div>
    </section>
  );
};

export default GlossarySection;
