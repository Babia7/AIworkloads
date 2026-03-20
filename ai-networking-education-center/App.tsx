import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';
import ErrorBoundary from './components/ErrorBoundary';
import MainPage from './pages/MainPage';
import OperationsPage from './pages/OperationsPage';

/**
 * Root App Component
 *
 * Wraps the application in ErrorBoundary, DataProvider, and BrowserRouter.
 * Routes split the app into two pages:
 *   "/" — main scrollable page (all modules except operations)
 *   "/operations" — standalone Operations Playbooks page
 */
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/operations" element={<OperationsPage />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </ErrorBoundary>
  );
};

export default App;
