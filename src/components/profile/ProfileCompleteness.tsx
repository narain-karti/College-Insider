import React from 'react';
import { motion } from 'motion/react';
import { Trophy, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Milestone {
  id: string;
  label: string;
  completed: boolean;
  points: number;
}

interface ProfileCompletenessProps {
  milestones: Milestone[];
  onAction?: (id: string) => void;
  className?: string;
}

export default function ProfileCompleteness({ milestones, onAction, className }: ProfileCompletenessProps) {
  const completedCount = milestones.filter(m => m.completed).length;
  const totalCount = milestones.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className={cn("glass-morphism rounded-[32px] p-6 relative overflow-hidden group", className)}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-[60px] -mr-16 -mt-16 group-hover:bg-brand-primary/20 transition-colors" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-display font-black text-lg mb-1 flex items-center gap-2">
              <Trophy size={20} className="text-brand-primary" />
              Profile Strength
            </h3>
            <p className="text-zinc-500 text-xs font-medium">Complete your profile to unlock premium benefits</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-display font-black text-brand-primary">{percentage}%</span>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Complete</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-white/5 rounded-full mb-8 overflow-hidden border border-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-brand-primary/50 to-brand-primary rounded-full relative"
          >
            <div className="absolute top-0 right-0 w-1 h-full bg-white blur-[2px]" />
          </motion.div>
        </div>

        {/* Milestones List */}
        <div className="space-y-3">
          {milestones.map((milestone, idx) => (
            <motion.button
              key={milestone.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => !milestone.completed && onAction?.(milestone.id)}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-2xl transition-all border",
                milestone.completed 
                  ? "bg-brand-primary/5 border-brand-primary/10 text-zinc-400" 
                  : "bg-white/5 border-white/5 text-white hover:bg-white/10 hover:border-white/20 active:scale-[0.98]"
              )}
            >
              <div className="flex items-center gap-3">
                {milestone.completed ? (
                  <CheckCircle2 size={16} className="text-brand-primary" />
                ) : (
                  <Circle size={16} className="text-zinc-600" />
                )}
                <span className={cn("text-xs font-semibold", !milestone.completed && "text-white")}>
                  {milestone.label}
                </span>
              </div>
              {!milestone.completed && (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-brand-primary uppercase">+{milestone.points} XP</span>
                  <ArrowRight size={14} className="text-zinc-500" />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
