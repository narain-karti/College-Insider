import { Star, CheckCircle2, ArrowRight } from 'lucide-react';
import { Mentor } from '@/types';
import { motion } from 'motion/react';
import { fadeUp } from '@/lib/animations';

interface MentorCardProps {
  mentor: Mentor;
  delay?: number;
  onClick?: () => void;
  key?: string | number;
}

export default function MentorCard({ mentor, delay = 0, onClick }: MentorCardProps) {
  return (
    <motion.div 
      variants={fadeUp(delay)}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5, scale: 1.01 }}
      onClick={onClick}
      className="glass-card min-w-[280px] p-6 flex flex-col items-center text-center group hover:border-brand-primary/30 transition-all duration-500 relative overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      {mentor.isTopMentor && (
        <div className="absolute top-4 left-4 flex items-center gap-1 bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-full text-[10px] font-bold border border-yellow-500/20">
          <Star size={10} fill="currentColor" />
          Top Mentor
        </div>
      )}
      
      <div className="absolute top-4 right-4 flex items-center gap-1.5 text-zinc-300 text-[11px] font-black bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
        <Star size={12} className="text-yellow-500 fill-yellow-500" />
        {mentor.rating}
      </div>

      <div className="relative mt-4">
        <div className="w-24 h-24 rounded-3xl border-2 border-white/10 p-1 group-hover:border-brand-primary/50 transition-all duration-500 rotate-3 group-hover:rotate-0 overflow-hidden">
          <img 
            src={mentor.avatarUrl} 
            alt={mentor.name} 
            className="w-full h-full rounded-[20px] object-cover transition-all duration-700 group-hover:scale-110"
          />
        </div>
        {mentor.isVerified && (
          <CheckCircle2 className="absolute -bottom-1 -right-1 text-brand-primary bg-black rounded-full p-0.5" size={24} />
        )}
      </div>

      <h3 className="font-display font-black text-lg mt-6 text-white group-hover:text-brand-primary transition-colors">{mentor.name}</h3>
      <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mt-1">{mentor.college}</p>
      <p className="text-[12px] font-medium text-zinc-400 mt-0.5">{mentor.branch}</p>

      <div className="flex flex-wrap justify-center gap-1.5 mt-6">
        {mentor.tags.slice(0, 2).map(tag => (
          <span key={tag} className="text-[10px] font-black text-zinc-400 px-3 py-1 rounded-lg bg-white/5 border border-white/5 uppercase tracking-tighter">
            {tag}
          </span>
        ))}
      </div>

      <div className="w-full h-px bg-white/5 my-6" />

      <div className="flex items-center justify-between w-full">
        <div className="text-left">
          <p className="text-[10px] uppercase font-bold text-zinc-600 tracking-tighter">Price starts at</p>
          <p className="text-lg font-black text-white">₹{mentor.price} <span className="text-[10px] font-medium text-zinc-500">/{mentor.duration}m</span></p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center group-hover:bg-brand-primary group-hover:text-black transition-all duration-300">
          <ArrowRight size={18} />
        </div>
      </div>
    </motion.div>
  );
}
