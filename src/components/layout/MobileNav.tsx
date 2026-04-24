import { LayoutDashboard, Search, Calendar, MessageSquare } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export default function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { icon: LayoutDashboard, label: 'Dash', path: '/dashboard' },
    { icon: Search, label: 'Search', path: '/discover' },
    { icon: Calendar, label: 'Bookings', path: '/bookings' },
    { icon: MessageSquare, label: 'Chat', path: '/chat' },
  ];

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="lg:hidden fixed bottom-6 left-6 right-6 h-16 glass-morphism rounded-2xl flex items-center justify-around px-4 z-50 shadow-2xl border border-white/10"
    >
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <motion.button
            key={item.label}
            onClick={() => navigate(item.path)}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300 relative",
              isActive ? "text-brand-primary scale-110" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            <item.icon size={22} className={cn(isActive && "drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]")} />
            {isActive && (
              <motion.div 
                layoutId="active-nav"
                className="absolute -bottom-1 w-1 h-1 bg-brand-primary rounded-full"
              />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
