import { motion } from 'motion/react';
import { Zap, Video, Calendar, MessageSquare, Share2 } from 'lucide-react';

export default function QuickActions() {
  const actions = [
    { icon: Video, label: 'Start Meet', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { icon: Calendar, label: 'Schedule', color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { icon: MessageSquare, label: 'New Chat', color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
    { icon: Share2, label: 'Share profile', color: 'text-orange-400', bg: 'bg-orange-400/10' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-2">
        <Zap size={16} className="text-brand-primary fill-current" />
        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {actions.map((action, i) => (
          <motion.button
            key={i}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="glass-morphism p-4 rounded-2xl flex flex-col items-center gap-3 border-white/5 hover:border-brand-primary/20 transition-all group"
          >
            <div className={`p-3 rounded-xl ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
              <action.icon size={20} />
            </div>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter group-hover:text-white transition-colors">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
