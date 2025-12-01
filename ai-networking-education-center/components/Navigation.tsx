
import React from 'react';
import { NAVIGATION } from '../constants';
import { useActiveSection } from '../hooks/useActiveSection';
import { motion } from 'framer-motion';

const Navigation: React.FC = () => {
  const navIds = NAVIGATION.map(n => n.id);
  // Default to 'intro' if no section is active (e.g. top of page)
  const activeId = useActiveSection(navIds) || 'intro';

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Optional: Update URL hash without jumping
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <>
      {/* 1. Minimalist Top-Left Brand Indicator */}
      <motion.a 
        href="#intro" 
        onClick={(e) => handleScroll(e, 'intro')}
        className="fixed top-6 left-6 z-50 mix-blend-difference pointer-events-auto"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-xl font-bold tracking-tighter text-white hover:opacity-80 transition-opacity">
          Networking for AI Workloads
        </div>
      </motion.a>

      {/* 2. Floating Bottom Dock */}
      <motion.div 
        className="fixed bottom-8 left-1/2 z-50 w-auto max-w-[90vw] pointer-events-auto"
        initial={{ y: 100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
      >
        <div className="bg-[#161b22]/80 backdrop-blur-xl border border-white/10 rounded-full p-2 shadow-2xl flex items-center gap-2 overflow-x-auto hide-scrollbar">
          {NAVIGATION.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScroll(e, item.id)}
                className="group relative px-4 py-3 rounded-full transition-colors flex items-center justify-center shrink-0 z-10"
                aria-label={item.label}
              >
                {/* Liquid Active Background */}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Icon */}
                <item.icon 
                  size={20} 
                  className={`relative z-10 transition-colors duration-200 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} 
                />
                
                {/* Tooltip on Hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-3 py-1.5 bg-[#0d1117] border border-white/10 text-xs font-mono font-bold text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl transform scale-95 group-hover:scale-100 origin-bottom">
                  {item.label}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#0d1117]"></div>
                </div>
              </a>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default Navigation;
