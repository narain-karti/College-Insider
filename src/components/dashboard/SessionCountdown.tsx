import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SessionCountdownProps {
  startTime: string; // e.g., "7:00 PM"
  onJoin?: () => void;
}

export default function SessionCountdown({ startTime, onJoin }: SessionCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // Mock countdown logic - in real app would use actual timestamp
    const timer = setInterval(() => {
      const now = new Date();
      const minutes = 59 - now.getSeconds(); // fake countdown for demo
      const seconds = 59 - (now.getMilliseconds() % 60);
      
      if (minutes <= 0 && seconds <= 0) {
        setIsLive(true);
        setTimeLeft('LIVE NOW');
        clearInterval(timer);
      } else {
        setTimeLeft(`${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "glass-morphism p-6 rounded-3xl border-l-4 overflow-hidden relative group",
        isLive ? "border-brand-primary" : "border-yellow-500/50"
      )}
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
        <Clock size={40} />
      </div>
      
      <div className="flex items-center justify-between relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={cn(
              "w-2 h-2 rounded-full",
              isLive ? "bg-brand-primary animate-pulse" : "bg-yellow-500"
            )} />
            <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest leading-none">
              {isLive ? 'Session is live' : 'Starts in'}
            </span>
          </div>
          <h2 className="text-3xl font-display font-black text-white">{timeLeft}</h2>
        </div>
        
        <button 
          onClick={onJoin}
          disabled={!isLive}
          className={cn(
            "px-6 py-3 rounded-2xl font-display font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2",
            isLive 
              ? "bg-brand-primary text-black shadow-lg shadow-brand-primary/20 hover:scale-105" 
              : "bg-white/5 text-zinc-500 cursor-not-allowed"
          )}
        >
          <Play size={14} className={isLive ? "fill-current" : ""} />
          Join Room
        </button>
      </div>
    </motion.div>
  );
}
