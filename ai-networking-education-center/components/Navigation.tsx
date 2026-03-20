
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAVIGATION } from '../constants';
import type { NavItem } from '../constants/navigation';
import { useActiveSection } from '../hooks/useActiveSection';
import { motion } from 'framer-motion';
import { smoothScrollTo } from '../utils/scroll';

/**
 * Global Navigation Component
 *
 * Renders a top-left brand indicator and a floating bottom dock.
 * - href-based nav items (e.g. Ops Playbooks) use <Link> for route navigation.
 * - id-based nav items use scroll anchors + smoothScrollTo.
 * - On /operations, the brand area shows a "← Back" link instead of the scroll anchor.
 */
const Navigation: React.FC = () => {
  const { pathname } = useLocation();
  const isOnOperations = pathname === '/operations';

  const scrollIds = NAVIGATION.filter(n => !n.href).map(n => n.id);
  const scrollActiveId = useActiveSection(scrollIds);

  const isItemActive = (item: NavItem): boolean => {
    if (item.href) {
      return pathname === item.href;
    }
    // Scroll-based active state only applies on the main page
    if (pathname !== '/') return false;
    return (scrollActiveId || 'intro') === item.id;
  };

  return (
    <>
      {/* 1. Minimalist Top-Left Brand Indicator */}
      {isOnOperations ? (
        <Link
          to="/"
          className="fixed top-6 left-6 z-50 mix-blend-difference pointer-events-auto"
        >
          <div className="text-xl font-bold tracking-tighter text-white hover:opacity-80 transition-opacity">
            ← Back
          </div>
        </Link>
      ) : (
        <motion.a
          href="#intro"
          onClick={(e) => smoothScrollTo(e, '#intro')}
          className="fixed top-6 left-6 z-50 mix-blend-difference pointer-events-auto"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-xl font-bold tracking-tighter text-white hover:opacity-80 transition-opacity">
            Networking for AI Workloads
          </div>
        </motion.a>
      )}

      {/* 2. Floating Bottom Dock */}
      <motion.div
        className="fixed bottom-8 left-1/2 z-50 w-auto max-w-[90vw] pointer-events-auto"
        initial={{ y: 100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
      >
        <div className="bg-[#161b22]/80 backdrop-blur-xl border border-white/10 rounded-full p-2 shadow-2xl flex items-center gap-2 overflow-x-auto hide-scrollbar">
          {NAVIGATION.map((item) => {
            const isActive = isItemActive(item);
            const commonClass = "group relative px-4 py-3 rounded-full transition-colors flex items-center justify-center shrink-0 z-10";

            const content = (
              <>
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

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-3 py-1.5 bg-[#0d1117] border border-white/10 text-xs font-mono font-bold text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl transform scale-95 group-hover:scale-100 origin-bottom">
                  {item.label}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#0d1117]"></div>
                </div>
              </>
            );

            if (item.href) {
              return (
                <Link key={item.id} to={item.href} className={commonClass} aria-label={item.label}>
                  {content}
                </Link>
              );
            }

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => smoothScrollTo(e, `#${item.id}`)}
                className={commonClass}
                aria-label={item.label}
              >
                {content}
              </a>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default Navigation;
