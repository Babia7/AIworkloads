
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
    <span className={`group relative inline-block cursor-help border-b border-dashed border-slate-500 hover:border-blue-400 transition-colors ${className}`}>
      {children || term}
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none transform translate-y-1 group-hover:translate-y-0">
        <div className="flex items-center gap-2 mb-1 border-b border-slate-800 pb-1">
          <Info size={12} className="text-blue-400" />
          <span className="text-xs font-bold text-blue-100 uppercase tracking-wide">{term}</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed text-left">
          {definition}
        </p>
        
        {/* Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-700"></div>
      </div>
    </span>
  );
};

export default GlossaryTerm;
