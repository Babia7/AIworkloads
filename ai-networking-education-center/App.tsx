
import React, { useState } from 'react';
import { DataProvider } from './contexts/DataContext';
import Navigation from './components/Navigation';
import HomeDashboard from './components/HomeDashboard';
import TableOfContents from './components/TableOfContents';
import Footer from './components/Footer';
import FadeIn from './components/FadeIn';
import AdminDashboard from './components/AdminDashboard';
import ErrorBoundary from './components/ErrorBoundary';

// Static Imports for Sections
// We use static imports here instead of React.lazy/Suspense to ensure 
// anchor links (#id) work immediately on page load without layout shift.
import ArchitectureSection from './components/ArchitectureSection';
import ConceptsSection from './components/ConceptsSection';
import ProtocolsSection from './components/ProtocolsSection';
import ProtocolDeepDive from './components/ProtocolDeepDive';
import ComparisonTable from './components/ComparisonTable';
import PerformanceSection from './components/PerformanceSection';
import HardwareSection from './components/HardwareSection';
import HPCSection from './components/HPCSection';
import GlossarySection from './components/GlossarySection';

/**
 * AppContent
 * 
 * The main layout container.
 * - Manages the visibility of the Admin Dashboard.
 * - Composes the page sections wrapped in FadeIn animations.
 * - Renders global navigation (Dock + TOC) and Footer.
 */
const AppContent: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F1117] text-slate-100 selection:bg-blue-500/30 pb-32">
      {/* Global Navigation Elements */}
      <Navigation />
      <TableOfContents />
      
      <main>
        {/* Interactive Bento-Grid Dashboard */}
        <HomeDashboard />
        
        {/* Educational Modules (Scrollable) */}
        <FadeIn>
          <ArchitectureSection />
        </FadeIn>
        
        <FadeIn>
          <ConceptsSection />
        </FadeIn>
        
        <FadeIn>
          <ProtocolsSection />
        </FadeIn>
        
        <FadeIn>
          <ProtocolDeepDive />
        </FadeIn>
        
        <FadeIn>
          <ComparisonTable />
        </FadeIn>
        
        <FadeIn>
          <PerformanceSection />
        </FadeIn>
        
        <FadeIn>
          <HardwareSection />
        </FadeIn>
        
        <FadeIn>
          <HPCSection />
        </FadeIn>

        <FadeIn>
          <GlossarySection />
        </FadeIn>
        
      </main>
      
      {/* Footer & Admin Triggers */}
      <Footer onAdminClick={() => setIsAdminOpen(true)} />
      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
};

/**
 * Root App Component
 * 
 * Wraps the application in the DataProvider to expose the
 * "Client-Side CMS" capabilities (dynamic content editing).
 * Now wrapped in ErrorBoundary to catch crashes.
 */
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </ErrorBoundary>
  );
};

export default App;
