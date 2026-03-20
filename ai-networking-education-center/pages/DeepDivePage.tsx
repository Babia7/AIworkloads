import React, { Suspense } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import SearchPalette from '../components/SearchPalette';
import { useSearchPalette } from '../hooks/useSearchPalette';
import { MODULE_REGISTRY } from '../app/moduleRegistry';

/**
 * DeepDivePage
 *
 * Standalone page rendered at "/deep-dive".
 * Renders only the ProtocolDeepDive section — no HomeDashboard, no TOC.
 */
const DeepDivePage: React.FC = () => {
  const palette = useSearchPalette();
  const deepDiveModule = MODULE_REGISTRY.find(m => m.id === 'deep-dive');

  return (
    <div className="min-h-screen bg-[#0F1117] text-slate-100 selection:bg-blue-500/30 pb-32">
      <Navigation onSearchClick={palette.open} />
      <SearchPalette palette={palette} />

      <main>
        {deepDiveModule && (
          <FadeIn>
            <Suspense
              fallback={<div className="container mx-auto px-6 py-10 text-sm text-slate-500">Loading section...</div>}
            >
              <deepDiveModule.component />
            </Suspense>
          </FadeIn>
        )}
      </main>

      <Footer onAdminClick={() => {}} />
    </div>
  );
};

export default DeepDivePage;
