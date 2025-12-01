
import React, { useState } from 'react';
import { DataProvider } from './contexts/DataContext';
import Navigation from './components/Navigation';
import HomeDashboard from './components/HomeDashboard';
import TableOfContents from './components/TableOfContents';
import Footer from './components/Footer';
import FadeIn from './components/FadeIn';
import AdminDashboard from './components/AdminDashboard';

// Static Imports
import ArchitectureSection from './components/ArchitectureSection';
import ConceptsSection from './components/ConceptsSection';
import ProtocolsSection from './components/ProtocolsSection';
import ProtocolDeepDive from './components/ProtocolDeepDive';
import ComparisonTable from './components/ComparisonTable';
import PerformanceSection from './components/PerformanceSection';
import HardwareSection from './components/HardwareSection';
import HPCSection from './components/HPCSection';
import GlossarySection from './components/GlossarySection';

const AppContent: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F1117] text-slate-100 selection:bg-blue-500/30 pb-32">
      <Navigation />
      <TableOfContents />
      
      <main>
        <HomeDashboard />
        
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
      
      <Footer onAdminClick={() => setIsAdminOpen(true)} />
      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
};

export default App;
