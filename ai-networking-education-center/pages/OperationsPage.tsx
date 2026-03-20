import React, { Suspense } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import { MODULE_REGISTRY } from '../app/moduleRegistry';

/**
 * OperationsPage
 *
 * Standalone page rendered at "/operations".
 * Renders only the OperationsPlaybooksSection — no HomeDashboard, no TOC.
 */
const OperationsPage: React.FC = () => {
  const opsModule = MODULE_REGISTRY.find(m => m.id === 'operations');

  return (
    <div className="min-h-screen bg-[#0F1117] text-slate-100 selection:bg-blue-500/30 pb-32">
      <Navigation />

      <main>
        {opsModule && (
          <FadeIn>
            <Suspense
              fallback={<div className="container mx-auto px-6 py-10 text-sm text-slate-500">Loading section...</div>}
            >
              <opsModule.component />
            </Suspense>
          </FadeIn>
        )}
      </main>

      <Footer onAdminClick={() => {}} />
    </div>
  );
};

export default OperationsPage;
