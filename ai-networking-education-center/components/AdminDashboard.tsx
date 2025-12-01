
import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { X, Lock, LogOut, RotateCcw, Layout, Settings, Layers, BarChart2, Server, FileText, Database, Network } from 'lucide-react';
import { 
  ConfigEditor, LayoutEditor, PerformanceEditor, ProtocolEditor, 
  HPCEditor, ProductsEditor, GlossaryEditor, FutureEditor 
} from './admin/AdminEditors';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Admin Dashboard Container
 * 
 * Provides a secure (PIN-protected) environment to edit the application's
 * data via the DataContext.
 * 
 * Features:
 * - Simple client-side authentication.
 * - Tabbed navigation for different data categories.
 * - Integration with sub-editor components (in /admin/AdminEditors.tsx).
 */
const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const { 
    glossary, updateGlossary, 
    products, updateProducts, 
    futureImprovements, updateFutureImprovements, 
    appConfig, updateAppConfig,
    homeModules, updateHomeModules,
    performanceData, updatePerformanceData,
    failoverData, updateFailoverData,
    protocolConcepts, updateProtocolConcepts,
    hpcChecklist, updateHpcChecklist,
    resetToDefaults 
  } = useData();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'config' | 'layout' | 'glossary' | 'products' | 'performance' | 'protocols' | 'hpc' | 'future'>('config');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this should validate against a backend hash.
    if (password === '19901991') {
      setIsAuthenticated(true);
    } else {
      alert('Access Denied');
      setPassword('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#161b22] w-full max-w-7xl h-[90vh] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#0d1117]">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/10 p-2 rounded-lg text-blue-400">
              <Settings size={20} />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Admin Console</h2>
              {isAuthenticated && <p className="text-xs text-slate-500">v2.1 Comprehensive CMS</p>}
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content Area: Auth Form or Main Dashboard */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0F1117] to-[#0F1117]">
            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
              <div className="text-center mb-8">
                <div className="inline-block p-6 bg-slate-800/50 rounded-2xl mb-4 text-blue-400 ring-1 ring-white/10 shadow-xl">
                  <Lock size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Restricted Area</h3>
                <p className="text-slate-400">Authentication is required to edit application data.</p>
              </div>
              <div className="space-y-4">
                <input 
                    type="password" 
                    placeholder="Enter PIN" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-[#0d1117] border border-white/10 rounded-xl px-4 py-4 text-white text-center text-xl tracking-[0.5em] focus:border-blue-500 outline-none transition-all focus:ring-1 focus:ring-blue-500"
                    autoFocus
                />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25">
                    Authenticate
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-72 bg-[#0d1117] border-r border-white/5 flex flex-col overflow-y-auto">
              <nav className="p-4 space-y-8 flex-1">
                
                <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase px-3 mb-2 tracking-wider">General</div>
                    <NavButton icon={Layout} label="Global Config" active={activeTab === 'config'} onClick={() => setActiveTab('config')} />
                    <NavButton icon={Layers} label="Home Layout" active={activeTab === 'layout'} onClick={() => setActiveTab('layout')} />
                </div>

                <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase px-3 mb-2 tracking-wider">Technical Modules</div>
                    <NavButton icon={Network} label="Protocols & Concepts" active={activeTab === 'protocols'} onClick={() => setActiveTab('protocols')} />
                    <NavButton icon={Server} label="Products & Hardware" active={activeTab === 'products'} onClick={() => setActiveTab('products')} />
                    <NavButton icon={Database} label="HPC Checklist" active={activeTab === 'hpc'} onClick={() => setActiveTab('hpc')} />
                </div>

                <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase px-3 mb-2 tracking-wider">Data & Analytics</div>
                    <NavButton icon={BarChart2} label="Performance Charts" active={activeTab === 'performance'} onClick={() => setActiveTab('performance')} />
                    <NavButton icon={FileText} label="Glossary Terms" active={activeTab === 'glossary'} onClick={() => setActiveTab('glossary')} />
                    <NavButton icon={Settings} label="Future Roadmap" active={activeTab === 'future'} onClick={() => setActiveTab('future')} />
                </div>

              </nav>

              {/* System Actions */}
              <div className="p-4 border-t border-white/5 space-y-2 bg-[#0d1117]">
                <button 
                  onClick={resetToDefaults}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wide text-red-400 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20"
                >
                  <RotateCcw size={14} /> Factory Reset
                </button>
                <button 
                  onClick={() => setIsAuthenticated(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wide text-slate-400 hover:bg-white/5 transition-colors"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>

            {/* Main Editor View */}
            <div className="flex-1 bg-[#161b22] overflow-y-auto p-8 relative">
              <div className="max-w-5xl mx-auto pb-20">
                  {activeTab === 'config' && <ConfigEditor config={appConfig} onUpdate={updateAppConfig} />}
                  {activeTab === 'layout' && <LayoutEditor modules={homeModules} onUpdate={updateHomeModules} />}
                  {activeTab === 'glossary' && <GlossaryEditor glossary={glossary} onUpdate={updateGlossary} />}
                  {activeTab === 'products' && <ProductsEditor products={products} onUpdate={updateProducts} />}
                  {activeTab === 'performance' && <PerformanceEditor perfData={performanceData} failData={failoverData} onUpdatePerf={updatePerformanceData} onUpdateFail={updateFailoverData} />}
                  {activeTab === 'protocols' && <ProtocolEditor protocols={protocolConcepts} onUpdate={updateProtocolConcepts} />}
                  {activeTab === 'hpc' && <HPCEditor checklist={hpcChecklist} onUpdate={updateHpcChecklist} />}
                  {activeTab === 'future' && <FutureEditor data={futureImprovements} onUpdate={updateFutureImprovements} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NavButton: React.FC<{ label: string, icon: any, active: boolean, onClick: () => void }> = ({ label, icon: Icon, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-3 ${active ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
  >
    <Icon size={18} className={active ? 'text-white' : 'text-slate-500'} />
    {label}
  </button>
);

export default AdminDashboard;
