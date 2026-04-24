import { motion } from 'motion/react';
import { Award, Target, Trophy, Flame } from 'lucide-react';

export default function Achievements() {
  const achievements = [
    { icon: Flame, label: '3 Day Streak', color: 'text-orange-500', value: 'Hot!' },
    { icon: Trophy, label: 'Goal Getter', color: 'text-yellow-500', value: '4/5 Bookings' },
    { icon: Target, label: 'Focused', color: 'text-blue-500', value: '12h Mentored' },
    { icon: Award, label: 'Star Student', color: 'text-purple-500', value: 'Top 5%' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-2">
        <Trophy size={16} className="text-zinc-500 fill-current opacity-50" />
        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">My Achievements</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {achievements.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
            className="glass-morphism p-4 rounded-2xl flex items-center gap-4 border-white/5 cursor-default group"
          >
            <div className={cn("p-2 rounded-xl bg-white/5 group-hover:scale-110 transition-transform", item.color)}>
              <item.icon size={20} />
            </div>
            <div>
              <span className="block text-[10px] font-black text-white/40 uppercase tracking-widest">{item.label}</span>
              <span className="text-white text-xs font-bold">{item.value}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
