import React from 'react';
import Sidebar from './Sidebar';
import RightPanel from './RightPanel';
import MobileNav from './MobileNav';
import { Bell } from 'lucide-react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

function MobileHeader() {
  const navigate = useNavigate();
  return (
    <div className="lg:hidden flex items-center justify-between px-6 py-4 bg-surface-bg/50 backdrop-blur-xl sticky top-0 z-40 border-b border-white/5">
      <div className="flex items-center gap-2" onClick={() => navigate('/dashboard')}>
         <div className="w-8 h-8 bg-brand-primary rounded flex items-center justify-center font-bold text-black text-xs">CI</div>
         <span className="font-display font-black text-white tracking-widest text-xs">INSIDERS</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="text-zinc-500 hover:text-white transition-colors"><Bell size={18} /></button>
        <img 
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" 
          className="w-8 h-8 rounded-full border border-white/10 object-cover" 
          alt="User"
        />
      </div>
    </div>
  );
}

export function Layout() {
  const location = useLocation();

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-surface-bg selection:bg-brand-primary selection:text-black antialiased relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="hidden lg:flex h-screen z-50">
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col h-screen relative overflow-y-auto overflow-x-hidden no-scrollbar">
        <MobileHeader />
        
        <main className="flex-1 p-6 md:p-10 lg:p-12 pb-32 lg:pb-12 w-full">
          <div className="max-w-6xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        <MobileNav />
      </div>

      <div className="hidden xl:flex h-screen z-50">
        <RightPanel />
      </div>
    </div>
  );
}
