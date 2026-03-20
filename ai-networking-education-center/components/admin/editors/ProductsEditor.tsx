import React from 'react';
import { ProductData } from '../../../types';
import { claimText, updateClaimText } from '../../../utils/sourceClaims';
import { arraySet } from '../../../utils/arrayMutate';

export const ProductsEditor: React.FC<{ products: ProductData[]; onUpdate: (p: ProductData[]) => void }> = ({
  products = [],
  onUpdate,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="border-b border-white/5 pb-4">
        <h3 className="text-3xl font-bold text-white mb-2">Product Catalog</h3>
        <p className="text-slate-400 text-sm">Edit specs, descriptions, key features, and SKU variants.</p>
      </div>

      <div className="space-y-8">
        {products.map((product, idx) => (
          <div key={product.id} className="bg-[#0d1117] p-6 rounded-2xl border border-white/5">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Series Name</label>
                <input
                  value={product.series}
                  onChange={(e) => onUpdate(arraySet(products, idx, 'series', e.target.value))}
                  className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Role</label>
                <input
                  value={product.role}
                  onChange={(e) => onUpdate(arraySet(products, idx, 'role', e.target.value))}
                  className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-white"
                />
              </div>
            </div>

            <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
            <textarea
              value={claimText(product.desc)}
              onChange={(e) => onUpdate(arraySet(products, idx, 'desc', updateClaimText(product.desc, e.target.value)))}
              className="w-full h-20 bg-[#161b22] border border-white/10 rounded p-3 text-sm text-slate-300 focus:border-blue-500 outline-none mb-6"
            />

            <div className="mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase">Datasheet URL</label>
              <input
                value={product.datasheetUrl || ''}
                onChange={(e) => onUpdate(arraySet(products, idx, 'datasheetUrl', e.target.value))}
                placeholder="https://..."
                className="w-full bg-[#161b22] border border-white/10 rounded p-2 text-sm text-cyan-400 font-mono mt-1"
              />
            </div>

            <div className="mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Quick Specs</label>
              <div className="flex flex-wrap gap-2">
                {product.specs?.map((spec, sIdx) => (
                  <input
                    key={sIdx}
                    value={claimText(spec)}
                    onChange={(e) => {
                      const next = [...products];
                      next[idx].specs[sIdx] = updateClaimText(spec, e.target.value);
                      onUpdate(next);
                    }}
                    className="bg-[#161b22] border border-white/10 rounded px-2 py-1 text-xs text-white w-32 text-center"
                  />
                )) || <div className="text-xs text-slate-500">No specs defined</div>}
              </div>
            </div>

            <div className="mb-6">
              <h5 className="text-sm font-bold text-white mb-3">Variants</h5>
              <div className="space-y-2">
                {product.variants?.map((v, vIdx) => (
                  <div key={vIdx} className="grid grid-cols-12 gap-2">
                    <input
                      value={v.name}
                      onChange={(e) => {
                        const next = [...products];
                        if (next[idx].variants) next[idx].variants[vIdx].name = e.target.value;
                        onUpdate(next);
                      }}
                      className="col-span-4 bg-[#161b22] border border-white/5 rounded px-2 py-1 text-xs text-cyan-400 font-bold"
                    />
                    <input
                      value={v.chip}
                      onChange={(e) => {
                        const next = [...products];
                        if (next[idx].variants) next[idx].variants[vIdx].chip = e.target.value;
                        onUpdate(next);
                      }}
                      className="col-span-3 bg-[#161b22] border border-white/5 rounded px-2 py-1 text-xs text-slate-400"
                    />
                    <input
                      value={claimText(v.ports)}
                      onChange={(e) => {
                        const next = [...products];
                        if (next[idx].variants) {
                          next[idx].variants[vIdx].ports = updateClaimText(v.ports, e.target.value);
                        }
                        onUpdate(next);
                      }}
                      className="col-span-5 bg-[#161b22] border border-white/5 rounded px-2 py-1 text-xs text-slate-400"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
