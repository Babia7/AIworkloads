import React, { Suspense, lazy } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import SearchPalette from '../components/SearchPalette';
import { useSearchPalette } from '../hooks/useSearchPalette';

const GlossarySection = lazy(() => import('../components/GlossarySection'));

/**
 * GlossaryPage
 *
 * Standalone page rendered at "/glossary".
 * Renders only the GlossarySection — no HomeDashboard, no TOC.
 * Reads sessionStorage for a search term pre-filled by the SearchPalette.
 */
const GlossaryPage: React.FC = () => {
  const palette = useSearchPalette();
  const initialSearch = sessionStorage.getItem('glossary_search') ?? '';
  sessionStorage.removeItem('glossary_search');

  return (
    <div className="min-h-screen bg-[#0F1117] text-slate-100 selection:bg-blue-500/30 pb-32">
      <Navigation onSearchClick={palette.open} />
      <SearchPalette palette={palette} />

      <main>
        <FadeIn>
          <Suspense
            fallback={<div className="container mx-auto px-6 py-10 text-sm text-slate-500">Loading section...</div>}
          >
            <GlossarySection initialSearch={initialSearch} />
          </Suspense>
        </FadeIn>
      </main>

      <Footer onAdminClick={() => {}} />
    </div>
  );
};

export default GlossaryPage;
