
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  GLOSSARY, PRODUCTS, FUTURE_IMPROVEMENTS, DEFAULT_APP_CONFIG, DEFAULT_HOME_MODULES,
  PERFORMANCE_DATA, FAILOVER_DATA, PROTOCOL_CONCEPTS, SCALING_CONCEPTS, CORE_CONCEPTS, COMPARISON_TABLE
} from '../constants';
import { ProductData, AppConfig, HomeModule, ChartData, FeedbackItem, ScalingConcept, ConceptData, ComparisonRow } from '../types';

/**
 * DataContext Architecture
 * 
 * This context acts as a "Client-Side CMS". 
 * 1. Initialization: It loads data from LocalStorage if available.
 * 2. Fallback: If no data exists (or version mismatch), it falls back to `constants.ts`.
 * 3. Persistence: Any changes made via the Admin Dashboard are saved to LocalStorage.
 * 
 * This allows the Admin to edit the site live in the browser without a real backend database.
 */

interface DataContextType {
  // Global Config
  appConfig: AppConfig;
  updateAppConfig: (config: AppConfig) => void;
  
  // Home Page
  homeModules: HomeModule[];
  updateHomeModules: (modules: HomeModule[]) => void;
  
  // Glossary Module
  glossary: Record<string, string>;
  updateGlossary: (newGlossary: Record<string, string>) => void;
  
  // Architecture Module (Scaling)
  scalingConcepts: ScalingConcept[];
  updateScalingConcepts: (data: ScalingConcept[]) => void;

  // Concepts Module (RDMA/NVMe)
  coreConcepts: ConceptData[];
  updateCoreConcepts: (data: ConceptData[]) => void;

  // Protocols Module
  protocolConcepts: any[];
  updateProtocolConcepts: (data: any[]) => void;

  // Comparison Module
  comparisonTable: ComparisonRow[];
  updateComparisonTable: (data: ComparisonRow[]) => void;

  // Performance Module
  performanceData: ChartData[];
  failoverData: ChartData[];
  updatePerformanceData: (data: ChartData[]) => void;
  updateFailoverData: (data: ChartData[]) => void;

  // Hardware Module
  products: ProductData[];
  updateProducts: (newProducts: ProductData[]) => void;

  // HPC Module
  hpcChecklist: any[];
  updateHpcChecklist: (data: any[]) => void;

  // Roadmap Module
  futureImprovements: typeof FUTURE_IMPROVEMENTS;
  updateFutureImprovements: (newImprovements: typeof FUTURE_IMPROVEMENTS) => void;
  
  // Feedback
  feedbackList: FeedbackItem[];
  submitFeedback: (item: Omit<FeedbackItem, 'id' | 'timestamp'>) => void;
  deleteFeedback: (id: string) => void;

  // System
  resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial HPC Checklist Data (Default State)
const INITIAL_HPC_CHECKLIST = [
    {
        title: "Collective Acceleration",
        iconKey: "Zap",
        points: [
            "UEC 1.0 & adaptive routing reduce completion times.",
            "Consistent step times = Higher GPU utilization.",
            "Less idle GPU time = Real dollar savings."
        ]
    },
    {
        title: "Lossless Fabric",
        iconKey: "Layers",
        points: [
            "Jobs don't stall due to microbursts or queue buildup.",
            "Tuned ECN + AQM for tail latency under collective load.",
            "Predictable per-flow fairness."
        ]
    },
    {
        title: "GPU Scale-Out",
        iconKey: "Network",
        points: [
            "Scale to 10k+ GPUs with deterministic latency.",
            "Ultra-high radix switches = fewer hops.",
            "Faster collectives across the fabric."
        ]
    },
    {
        title: "Visibility for Debugging",
        iconKey: "BarChart2",
        points: [
            "Pinpoint exactly which link or host caused a slowdown.",
            "Identify stragglers instantly.",
            "Eliminate step-time variance."
        ]
    },
    {
        title: "Storage-to-GPU Pipeline",
        iconKey: "Database",
        points: [
            "Balanced performance for object storage & shuffle phases.",
            "Smooth checkpointing without network stalls.",
            "Mix of RDMA + TCP workloads."
        ]
    }
];

/**
 * Helper: Safely load state with Versioning and Type Checking.
 * 
 * Checks 'app_version' in localStorage. If it doesn't match the current code version,
 * it ignores the stored data and returns the default fallback. 
 * This prevents white-screen crashes when we update the data schema.
 */
const loadState = <T,>(key: string, fallback: T): T => {
  try {
    const version = localStorage.getItem('app_version');
    if (version !== '3.10') { // Bumped version for new schema
      return fallback;
    }
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    
    const parsed = JSON.parse(saved);
    
    // Critical Safety Check: JSON.parse("null") returns null, which crashes map() functions
    if (parsed === null || parsed === undefined) return fallback;
    
    // Type Safety: If fallback is array, ensure parsed is array
    if (Array.isArray(fallback) && !Array.isArray(parsed)) return fallback;
    
    // Type Safety: If fallback is object (not array), ensure parsed is object
    if (typeof fallback === 'object' && !Array.isArray(fallback) && (typeof parsed !== 'object' || Array.isArray(parsed))) return fallback;

    return parsed;
  } catch (e) {
    console.warn(`Failed to load ${key}, using fallback.`, e);
    return fallback;
  }
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  // Initialize state using the safe loader
  const [glossary, setGlossary] = useState<Record<string, string>>(() => loadState('app_glossary', GLOSSARY));
  const [products, setProducts] = useState<ProductData[]>(() => loadState('app_products', PRODUCTS));
  const [futureImprovements, setFutureImprovements] = useState<typeof FUTURE_IMPROVEMENTS>(() => loadState('app_future', FUTURE_IMPROVEMENTS));
  const [appConfig, setAppConfig] = useState<AppConfig>(() => loadState('app_config', DEFAULT_APP_CONFIG));
  const [homeModules, setHomeModules] = useState<HomeModule[]>(() => loadState('app_home_modules', DEFAULT_HOME_MODULES));
  const [performanceData, setPerformanceData] = useState<ChartData[]>(() => loadState('app_perf_data', PERFORMANCE_DATA));
  const [failoverData, setFailoverData] = useState<ChartData[]>(() => loadState('app_failover_data', FAILOVER_DATA));
  const [protocolConcepts, setProtocolConcepts] = useState<any[]>(() => loadState('app_protocols', PROTOCOL_CONCEPTS));
  const [hpcChecklist, setHpcChecklist] = useState<any[]>(() => loadState('app_hpc_checklist', INITIAL_HPC_CHECKLIST));
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>(() => loadState('app_feedback', []));
  
  // New State for Architecture, Concepts, Comparison
  const [scalingConcepts, setScalingConcepts] = useState<ScalingConcept[]>(() => loadState('app_scaling', SCALING_CONCEPTS));
  const [coreConcepts, setCoreConcepts] = useState<ConceptData[]>(() => loadState('app_core_concepts', CORE_CONCEPTS));
  const [comparisonTable, setComparisonTable] = useState<ComparisonRow[]>(() => loadState('app_comparison', COMPARISON_TABLE));

  // Persistence Effects: Save to LocalStorage on every change
  useEffect(() => { localStorage.setItem('app_glossary', JSON.stringify(glossary)); }, [glossary]);
  useEffect(() => { localStorage.setItem('app_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('app_future', JSON.stringify(futureImprovements)); }, [futureImprovements]);
  useEffect(() => { localStorage.setItem('app_config', JSON.stringify(appConfig)); }, [appConfig]);
  useEffect(() => { localStorage.setItem('app_home_modules', JSON.stringify(homeModules)); }, [homeModules]);
  useEffect(() => { localStorage.setItem('app_perf_data', JSON.stringify(performanceData)); }, [performanceData]);
  useEffect(() => { localStorage.setItem('app_failover_data', JSON.stringify(failoverData)); }, [failoverData]);
  useEffect(() => { localStorage.setItem('app_protocols', JSON.stringify(protocolConcepts)); }, [protocolConcepts]);
  useEffect(() => { localStorage.setItem('app_hpc_checklist', JSON.stringify(hpcChecklist)); }, [hpcChecklist]);
  useEffect(() => { localStorage.setItem('app_feedback', JSON.stringify(feedbackList)); }, [feedbackList]);
  
  // New Persistence
  useEffect(() => { localStorage.setItem('app_scaling', JSON.stringify(scalingConcepts)); }, [scalingConcepts]);
  useEffect(() => { localStorage.setItem('app_core_concepts', JSON.stringify(coreConcepts)); }, [coreConcepts]);
  useEffect(() => { localStorage.setItem('app_comparison', JSON.stringify(comparisonTable)); }, [comparisonTable]);

  // Set version on mount to confirm successful load for next visit
  useEffect(() => {
    localStorage.setItem('app_version', '3.10');
  }, []);

  // Update Actions
  const updateGlossary = (val: any) => setGlossary(val);
  const updateProducts = (val: any) => setProducts(val);
  const updateFutureImprovements = (val: any) => setFutureImprovements(val);
  const updateAppConfig = (val: any) => setAppConfig(val);
  const updateHomeModules = (val: any) => setHomeModules(val);
  const updatePerformanceData = (val: any) => setPerformanceData(val);
  const updateFailoverData = (val: any) => setFailoverData(val);
  const updateProtocolConcepts = (val: any) => setProtocolConcepts(val);
  const updateHpcChecklist = (val: any) => setHpcChecklist(val);
  const updateScalingConcepts = (val: any) => setScalingConcepts(val);
  const updateCoreConcepts = (val: any) => setCoreConcepts(val);
  const updateComparisonTable = (val: any) => setComparisonTable(val);

  const submitFeedback = (item: Omit<FeedbackItem, 'id' | 'timestamp'>) => {
    const newItem: FeedbackItem = {
      ...item,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    };
    setFeedbackList(prev => [newItem, ...prev]);
  };

  const deleteFeedback = (id: string) => {
    setFeedbackList(prev => prev.filter(item => item.id !== id));
  };

  /**
   * Reset System
   * Clears LocalStorage and reloads the page to restore initial 'constants.ts' state.
   */
  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all data to factory defaults? This cannot be undone.')) {
      localStorage.clear();
      localStorage.setItem('app_version', '3.10');
      window.location.reload();
    }
  };

  return (
    <DataContext.Provider value={{
      glossary, updateGlossary,
      products, updateProducts,
      futureImprovements, updateFutureImprovements,
      appConfig, updateAppConfig,
      homeModules, updateHomeModules,
      performanceData, updatePerformanceData,
      failoverData, updateFailoverData,
      protocolConcepts, updateProtocolConcepts,
      hpcChecklist, updateHpcChecklist,
      scalingConcepts, updateScalingConcepts,
      coreConcepts, updateCoreConcepts,
      comparisonTable, updateComparisonTable,
      feedbackList, submitFeedback, deleteFeedback,
      resetToDefaults
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
