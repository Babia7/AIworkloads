import React from 'react';
import type { SourceLinkedValue } from '../types';

interface SourceBadgeProps {
  claim: SourceLinkedValue;
  className?: string;
}

const SourceBadge: React.FC<SourceBadgeProps> = ({ claim, className = '' }) => {
  return (
    <a
      href={claim.sourceUrl}
      target="_blank"
      rel="noreferrer"
      title={`${claim.sourceTitle} (${claim.sourceRevisionOrDate})`}
      className={`inline-flex items-center gap-1 rounded border border-cyan-500/20 bg-cyan-950/20 px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wide text-cyan-300 hover:border-cyan-500/40 ${className}`}
    >
      src
    </a>
  );
};

export default SourceBadge;
