import React from 'react';
import { useData } from '../contexts/DataContext';
import { Info } from 'lucide-react';

interface GlossaryTermProps {
  term: string;
  children?: React.ReactNode;
  className?: string;
}

const GlossaryTerm: React.FC<GlossaryTermProps> = ({ term, children, className = '' }) => {
  const { glossary } = useData();
  const definition = glossary[term];

  if (!definition) {
    return <span className={className}>{children || term}</span>;
  }

  return (
    <span
      className={`group relative inline-block cursor-help border-b border-dashed border-slate-500 hover:border-blue-400 transition-colors ${className}`}
    >
      {children || term}

      <span
        role="tooltip"
        className="absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 translate-y-1 rounded-lg border border-slate-700 bg-slate-900 p-3 opacity-0 invisible shadow-xl transition-all duration-200 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
      >
        <span className="mb-1 flex items-center gap-2 border-b border-slate-800 pb-1">
          <Info size={12} className="text-blue-400" />
          <span className="text-xs font-bold text-blue-100 uppercase tracking-wide">{term}</span>
        </span>
        <span className="text-xs text-slate-400 leading-relaxed text-left block">{definition}</span>

        <span className="absolute top-full left-1/2 -mt-1 -translate-x-1/2 border-4 border-transparent border-t-slate-700" />
      </span>
    </span>
  );
};

export default GlossaryTerm;
