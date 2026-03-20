import React from 'react';
import { ICON_MAP } from '../../../constants';
import { HPCItem } from '../../../types';
import { claimText, updateClaimText } from '../../../utils/sourceClaims';
import { arraySet } from '../../../utils/arrayMutate';

export const HPCEditor: React.FC<{ checklist: HPCItem[]; onUpdate: (c: HPCItem[]) => void }> = ({
  checklist = [],
  onUpdate,
}) => {
  const availableIcons = Object.keys(ICON_MAP).sort();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="border-b border-white/5 pb-4">
        <h3 className="text-3xl font-bold text-white mb-2">HPC Engineer's Checklist</h3>
        <p className="text-slate-400 text-sm">Edit checklist cards and bullet points.</p>
      </div>

      <div className="space-y-6">
        {checklist.map((item, idx) => (
          <div key={idx} className="bg-[#0d1117] p-6 rounded-2xl border border-white/5">
            <div className="flex gap-3 mb-4">
              <select
                value={item.iconKey}
                onChange={(e) => onUpdate(arraySet(checklist, idx, 'iconKey', e.target.value))}
                className="bg-[#161b22] border border-white/10 rounded px-3 py-2 text-xs text-white"
              >
                {availableIcons.map((ic) => (
                  <option key={ic} value={ic}>
                    {ic}
                  </option>
                ))}
              </select>

              <input
                value={item.title}
                onChange={(e) => onUpdate(arraySet(checklist, idx, 'title', e.target.value))}
                className="flex-1 font-bold bg-transparent text-white border-b border-white/10 focus:border-blue-500 outline-none"
              />
            </div>

            <div className="space-y-2">
              {item.points.map((pt, pIdx) => (
                <input
                  key={pIdx}
                  value={claimText(pt)}
                  onChange={(e) => {
                    const next = [...checklist];
                    next[idx].points[pIdx] = updateClaimText(pt, e.target.value);
                    onUpdate(next);
                  }}
                  className="w-full bg-transparent text-sm text-slate-400 border-b border-transparent hover:border-white/10 focus:border-blue-500 outline-none"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
