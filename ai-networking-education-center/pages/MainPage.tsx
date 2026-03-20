import React, { Suspense, useState } from 'react';
import Navigation from '../components/Navigation';
import HomeDashboard from '../components/HomeDashboard';
import TableOfContents from '../components/TableOfContents';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import AdminDashboard from '../components/AdminDashboard';
import { MODULE_REGISTRY } from '../app/moduleRegistry';

/**
 * MainPage
 *
 * The primary scrollable page rendered at "/".
 * Renders all modules with page === 'main' sequentially via MODULE_REGISTRY.
 */
const MainPage: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const mainModules = MODULE_REGISTRY.filter(m => m.page === 'main');

  return (
    <div className="min-h-screen bg-[#0F1117] text-slate-100 selection:bg-blue-500/30 pb-32">
      {/* Global Navigation Elements */}
      <Navigation />
      <TableOfContents />

      <main>
        {/* Interactive Bento-Grid Dashboard */}
        <HomeDashboard />

        {/* Educational Modules (Scrollable) */}
        {mainModules.map(({ id, component: SectionComponent }) => (
          <FadeIn key={id}>
            <Suspense
              fallback={<div className="container mx-auto px-6 py-10 text-sm text-slate-500">Loading section...</div>}
            >
              <SectionComponent />
            </Suspense>
          </FadeIn>
        ))}
      </main>

      {/* Footer & Admin Triggers */}
      <Footer onAdminClick={() => setIsAdminOpen(true)} />
      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
};

export default MainPage;
