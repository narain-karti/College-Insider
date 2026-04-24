import { LucideIcon, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { fadeUp } from '@/lib/animations';

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  trend: string;
  trendType?: 'positive' | 'negative';
  delay?: number;
}

export default function StatCard({ icon: Icon, value, label, trend, trendType = 'positive', delay = 0 }: StatCardProps) {
  return (
    <motion.div 
      variants={fadeUp(delay)}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-morphism p-6 flex flex-col gap-4 group hover:border-brand-primary/20 transition-all duration-300 rounded-3xl cursor-default relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-center justify-between relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white/5 group-hover:bg-brand-primary/10 group-hover:border-brand-primary/20">
          <Icon className="text-zinc-400 group-hover:text-brand-primary transition-colors" size={24} />
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg ${
          trendType === 'positive' ? 'bg-brand-primary/10 text-brand-primary' : 'bg-red-500/10 text-red-500'
        }`}>
          <TrendingUp size={12} className={trendType === 'negative' ? 'rotate-180' : ''} />
          {trend}
        </div>
      </div>
      
      <div>
        <h3 className="text-3xl font-display font-black text-white">{value}</h3>
        <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider mt-1">{label}</p>
      </div>
    </motion.div>
  );
}
