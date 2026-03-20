import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';
import ErrorBoundary from './components/ErrorBoundary';
import MainPage from './pages/MainPage';
import OperationsPage from './pages/OperationsPage';
import GlossaryPage from './pages/GlossaryPage';
import DeepDivePage from './pages/DeepDivePage';

/**
 * Root App Component
 *
 * Wraps the application in ErrorBoundary, DataProvider, and BrowserRouter.
 * Routes split the app into multiple pages:
 *   "/" — main scrollable page (all modules except operations/glossary/deep-dive)
 *   "/operations" — standalone Operations Playbooks page
 *   "/glossary" — standalone Glossary page
 *   "/deep-dive" — standalone Protocol Deep Dive page
 *   "*" — catch-all redirects to "/"
 */
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/operations" element={<OperationsPage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route path="/deep-dive" element={<DeepDivePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </ErrorBoundary>
  );
};

export default App;
