
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Zap, ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react';
import GlossaryTerm from './GlossaryTerm';

interface Packet {
  id: number;
  x: number;
  type: 'data' | 'pfc';
}

const ProtocolDeepDive: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // State for UI rendering ONLY
  const [uiState, setUiState] = useState({
      bufferLevel: 20,
      isCongested: false,
      senderPaused: false,
      packets: [] as Packet[]
  });

  // Simulation State (Single Source of Truth)
  const simState = useRef({
    bufferLevel: 20,
    isCongested: false,
    senderPaused: false,
    packets: [] as Packet[]
  });

  const requestRef = useRef<number>(0);
  const packetIdRef = useRef(0);
  const isMounted = useRef(true);

  // Static constants (Reverted from dynamic config)
  const BUFFER_THRESHOLD = 80;
  const BUFFER_DRAIN_RATE = 0.5;
  const PACKET_SPEED = 1.5;
  const PFC_SPEED = 3;

  const animate = () => {
    if (!isMounted.current) return;

    // 1. Physics Step (Mutate Ref directly)
    let state = simState.current;
    
    // Move Packets
    const nextPackets = state.packets.map(p => {
      if (p.type === 'data') return { ...p, x: p.x + PACKET_SPEED };
      if (p.type === 'pfc') return { ...p, x: p.x - PFC_SPEED };
      return p;
    }).filter(p => {
      // Remove packets that hit their destinations
      if (p.type === 'data' && p.x >= 90) {
        state.bufferLevel = Math.min(state.bufferLevel + 5, 100);
        return false;
      }
      if (p.type === 'pfc' && p.x <= 10) {
        state.senderPaused = true;
        return false;
      }
      return true;
    });

    state.packets = nextPackets;

    // Drain Buffer
    state.bufferLevel = Math.max(state.bufferLevel - BUFFER_DRAIN_RATE, 0);

    // Logic: Resume if buffer low
    if (state.senderPaused && state.bufferLevel < 40) {
        state.senderPaused = false;
    }
    
    // Logic: Spawn data packets (Random chance if not paused)
    if (!state.senderPaused && Math.random() < 0.1) {
       packetIdRef.current += 1;
       state.packets.push({ id: packetIdRef.current, x: 5, type: 'data' });
    }
    
    // Logic: Trigger Congestion/PFC
    if (state.bufferLevel > BUFFER_THRESHOLD && !state.senderPaused && !state.isCongested) {
        state.isCongested = true;
        packetIdRef.current += 1;
        state.packets.push({ id: packetIdRef.current, x: 90, type: 'pfc' });
    }
    
    if (state.bufferLevel < BUFFER_THRESHOLD) {
        state.isCongested = false;
    }

    // 2. Sync to UI (Trigger Render)
    if (isMounted.current) {
        setUiState({ ...state });
        requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => {
      isMounted.current = false;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying]);

  const handleBurst = () => {
    const burst = Array.from({ length: 5 }).map((_, i) => ({
        id: packetIdRef.current + i + 1000,
        x: 10 - (i * 5),
        type: 'data' as const
    }));
    
    // Update Ref directly
    simState.current.packets = [...simState.current.packets, ...burst];
    simState.current.bufferLevel = Math.min(simState.current.bufferLevel + 20, 100);
    packetIdRef.current += 5;

    // Update UI immediately (so it reflects even if paused)
    setUiState({ ...simState.current });
  };

  const handleReset = () => {
    setIsPlaying(false);
    // Reset Ref
    simState.current = {
        bufferLevel: 20,
        isCongested: false,
        senderPaused: false,
        packets: []
    };
    // Reset UI
    setUiState({ ...simState.current });
  };

  // Destructure from uiState for rendering
  const { bufferLevel, isCongested, senderPaused, packets } = uiState;

  return (
    <section id="deep-dive" className="py-24 bg-[#0F1117] border-t border-white/5 relative">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
                <div className="text-purple-500 font-mono text-xs uppercase tracking-widest mb-4">Interactive Lab</div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">RoCEv2 Flow Control</h2>
                <p className="text-slate-400 max-w-2xl text-lg">
                    Visualize how Priority Flow Control (PFC) prevents packet loss by pausing specific traffic queues during congestion.
                </p>
            </div>
            
            {/* Controls */}
            <div className="flex gap-4">
                <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                        isPlaying 
                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/50' 
                        : 'bg-green-600 hover:bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                    }`}
                    aria-label={isPlaying ? 'Pause Simulation' : 'Start Simulation'}
                >
                    {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                    {isPlaying ? 'Pause Sim' : 'Start Traffic'}
                </button>
                <button 
                    onClick={handleReset}
                    className="p-3 rounded-lg bg-[#161b22] border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-colors"
                    title="Reset Simulation"
                    aria-label="Reset Simulation"
                >
                    <RotateCcw size={18} />
                </button>
            </div>
        </div>

        {/* Simulation Canvas */}
        <div 
            className="bg-[#161b22] rounded-2xl border border-white/5 p-4 md:p-12 relative overflow-hidden min-h-[400px] select-none"
            role="region"
            aria-label="RoCEv2 Flow Control Simulation Canvas"
        >
            
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {/* Simulation Area */}
            <div className="relative z-10 flex items-center justify-between h-64 mt-8">
                
                {/* SENDER NODE */}
                <div className="w-48 bg-[#0d1117] border border-slate-700 rounded-xl p-4 flex flex-col gap-2 relative shadow-2xl">
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2 flex justify-between">
                        <span>Sender (GPU)</span>
                        <span className="text-slate-600">ID: 0x1A</span>
                    </div>
                    
                    {/* Queues */}
                    <div className="space-y-2">
                        <div className="h-2 bg-slate-800 rounded-full w-full opacity-30"></div>
                        <div className="h-2 bg-slate-800 rounded-full w-3/4 opacity-30"></div>
                        
                        {/* Active Queue 3 */}
                        <div className={`relative h-10 bg-slate-800 rounded border ${senderPaused ? 'border-red-500/50' : 'border-blue-500/30'} overflow-hidden transition-colors duration-300`}>
                             <div className="absolute inset-0 flex items-center justify-center">
                                {senderPaused ? (
                                    <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase animate-pulse">
                                        <Pause size={12} fill="currentColor" /> Queue Paused
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase opacity-50">
                                        Queue 3 (Active)
                                    </div>
                                )}
                             </div>
                             <div className="absolute right-0 top-0 h-full w-2 bg-blue-500/20"></div>
                             <div className="absolute right-3 top-0 h-full w-2 bg-blue-500/20"></div>
                        </div>

                        <div className="h-2 bg-slate-800 rounded-full w-1/2 opacity-30"></div>
                    </div>

                    {/* Burst Trigger */}
                    <button 
                        onClick={handleBurst}
                        disabled={senderPaused}
                        className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded flex items-center justify-center gap-2 transition-all active:scale-95"
                        aria-label="Inject traffic burst"
                    >
                        <Zap size={14} /> Inject Burst
                    </button>
                </div>

                {/* LINK / WIRE */}
                <div className="flex-1 mx-8 relative h-32 flex items-center">
                    <div className="absolute w-full h-px bg-slate-700 top-1/2 -translate-y-4"></div>
                    <div className="absolute w-full h-px bg-slate-700 top-1/2 translate-y-4"></div>
                    
                    {packets.map(p => (
                        <div 
                            key={p.id}
                            className={`absolute top-1/2 w-8 h-8 rounded-lg flex items-center justify-center shadow-lg transition-transform will-change-transform ${
                                p.type === 'data' 
                                ? 'bg-blue-500 text-white -translate-y-8 shadow-blue-500/20' 
                                : 'bg-red-500 text-white translate-y-0 shadow-red-500/40 z-20 border-2 border-white'
                            }`}
                            style={{ left: `${p.x}%` }}
                        >
                            {p.type === 'data' ? (
                                <div className="w-4 h-1 bg-white/50 rounded-full"></div>
                            ) : (
                                <span className="text-[10px] font-bold">PFC</span>
                            )}
                        </div>
                    ))}
                    
                    <div className="absolute left-0 -bottom-8 text-xs text-slate-600 flex items-center gap-1 font-mono">
                        Data <ArrowRight size={12}/>
                    </div>
                    <div className="absolute right-0 -bottom-8 text-xs text-slate-600 flex items-center gap-1 font-mono">
                        <ArrowLeft size={12}/> Control
                    </div>
                </div>

                {/* RECEIVER NODE */}
                <div className="w-48 bg-[#0d1117] border border-slate-700 rounded-xl p-4 flex flex-col gap-2 relative shadow-2xl">
                     <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2 flex justify-between">
                        <span>Receiver (Switch)</span>
                        <span className="text-slate-600">Port: 1/1</span>
                    </div>

                    {/* Buffer Visualization */}
                    <div 
                        className="h-40 bg-slate-800 rounded border border-slate-600 relative overflow-hidden flex flex-col justify-end"
                        role="progressbar"
                        aria-valuenow={Math.round(bufferLevel)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Ingress Buffer Level"
                    >
                        <div 
                            className={`w-full transition-all duration-100 ease-linear ${
                                bufferLevel > BUFFER_THRESHOLD ? 'bg-red-500/80' : 'bg-green-500/60'
                            }`}
                            style={{ height: `${bufferLevel}%` }}
                        >
                            <div className="w-full h-1 bg-white/20 absolute top-0"></div>
                        </div>

                        <div 
                            className="absolute w-full border-t-2 border-dashed border-red-500/50 flex items-end justify-end px-1"
                            style={{ bottom: `${BUFFER_THRESHOLD}%` }}
                        >
                            <span className="text-[9px] text-red-400 font-bold bg-slate-900/80 px-1 rounded -mb-3">PFC Threshold</span>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-2xl font-bold text-white drop-shadow-md">{Math.round(bufferLevel)}%</span>
                        </div>
                    </div>

                    <div className="mt-2 text-center text-xs text-slate-400 font-mono">
                        Ingress Buffer
                    </div>
                </div>

            </div>

            {/* Legend / Status */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
                 <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0d1117] border border-white/10 rounded-lg text-xs font-mono text-slate-300">
                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div> Data Packet
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0d1117] border border-white/10 rounded-lg text-xs font-mono text-slate-300">
                     <div className="w-2 h-2 bg-red-500 rounded-full"></div> PFC Frame
                 </div>
            </div>

            {/* Narrative Overlay - Aria Live Region */}
            <div className="mt-8 grid md:grid-cols-3 gap-4 text-sm" aria-live="polite">
                <div className={`p-4 rounded-lg border ${senderPaused ? 'bg-slate-800/50 border-slate-700 text-slate-500' : 'bg-blue-500/10 border-blue-500/30 text-blue-200'}`}>
                    <strong className="block mb-1">1. Normal Operation</strong>
                    Packets flow from sender queue to receiver. Buffer fills based on arrival rate vs drain rate.
                </div>
                <div className={`p-4 rounded-lg border ${bufferLevel > BUFFER_THRESHOLD ? 'bg-red-500/10 border-red-500/30 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'bg-slate-800/50 border-slate-700 text-slate-500'}`}>
                    <strong className="block mb-1 flex items-center gap-2">
                        2. Congestion Detected {bufferLevel > BUFFER_THRESHOLD && <AlertTriangle size={14} aria-hidden="true" />}
                    </strong>
                    When buffer hits 80%, receiver sends a <GlossaryTerm term="PFC">PFC</GlossaryTerm> frame upstream to prevent packet loss.
                </div>
                <div className={`p-4 rounded-lg border ${senderPaused ? 'bg-amber-500/10 border-amber-500/30 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'bg-slate-800/50 border-slate-700 text-slate-500'}`}>
                    <strong className="block mb-1 flex items-center gap-2">
                        3. Queue Paused {senderPaused && <Pause size={14} aria-hidden="true" />}
                    </strong>
                    Sender halts Queue 3 only. Other queues can continue. Transmission resumes when buffer drops below 40%.
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default ProtocolDeepDive;
