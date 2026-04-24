import { LayoutDashboard, Search, Calendar, MessageSquare, Heart, GraduationCap, Crown, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { slideInLeft } from '@/lib/animations';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Search, label: 'Find Mentors', path: '/discover' },
  { icon: Calendar, label: 'My Bookings', path: '/bookings' },
  { icon: MessageSquare, label: 'Messages', badge: 3, path: '/chat' },
  { icon: Heart, label: 'Wishlist', path: '/wishlist' },
  { icon: GraduationCap, label: 'Become a Mentor', path: '/mentor-onboarding' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.aside 
      variants={slideInLeft()}
      initial="hidden"
      animate="visible"
      className="w-72 border-r border-white/5 p-6 flex flex-col gap-8 bg-surface-bg z-20 h-full overflow-y-auto no-scrollbar"
    >
      <div className="flex items-center gap-2 mb-4 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center font-bold text-xl text-black">
          CI
        </div>
        <div>
          <h1 className="font-display font-black text-lg leading-tight tracking-tight text-white">COLLEGE</h1>
          <h1 className="font-display font-medium text-lg leading-tight tracking-tight text-zinc-500">INSIDERS</h1>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item, i) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group cursor-pointer relative overflow-hidden",
                isActive 
                  ? 'bg-brand-primary/10 text-brand-primary' 
                  : 'text-zinc-500 hover:text-zinc-100'
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute inset-0 bg-brand-primary/10 border-l-2 border-brand-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon size={20} className={cn("relative z-10 transition-transform duration-300 group-hover:scale-110", isActive ? 'text-brand-primary' : 'text-zinc-500 group-hover:text-brand-primary')} />
              <span className="relative z-10 font-semibold text-sm">{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-brand-primary text-black text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-6">
        <div className="glass-morphism p-5 relative overflow-hidden group rounded-2xl">
          <Crown className="absolute -right-2 -top-2 text-brand-secondary/20 rotate-12 transition-transform group-hover:scale-125 group-hover:rotate-6 duration-500" size={80} />
          <div className="relative z-10">
            <h3 className="font-display font-bold text-sm mb-1 text-white">Go Premium</h3>
            <p className="text-[11px] text-zinc-400 mb-4 leading-relaxed">Unlock exclusive mentors and priority sessions.</p>
            <button className="w-full py-2 bg-brand-secondary text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-brand-secondary/90 transition-colors cursor-pointer">
              Upgrade Now <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 px-2">
          <div className="relative w-12 h-12">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={125.6} strokeDashoffset={125.6 * (1 - 0.75)} className="text-brand-primary" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">75%</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Profile Strength</h4>
            <p className="text-[10px] text-zinc-500">Very Good</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
