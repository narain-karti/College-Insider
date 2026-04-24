import { Bell, Search, ChevronDown, Video, Calendar, MoreVertical, Plus, MessageSquare, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { fadeUp, fadeIn } from '@/lib/animations';
import { useNavigate } from 'react-router-dom';
import { useBookings } from '@/lib/BookingContext';
import { cn } from '@/lib/utils';

const recommendations = [
  { id: '1', name: 'Ishaan Gupta', college: 'BITS Pilani', branch: 'Computer Science', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop' },
  { id: '2', name: 'Megha Reddy', college: 'NIT Trichy', branch: 'Electronics', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
];

export default function RightPanel() {
  const navigate = useNavigate();
  const { bookings } = useBookings();
  
  const upcomingBooking = bookings.find(b => b.status === 'confirmed');

  return (
    <motion.aside 
      variants={fadeIn(0.2)}
      initial="hidden"
      animate="visible"
      className="w-96 border-l border-white/5 p-8 flex flex-col gap-10 h-full overflow-y-auto bg-surface-bg z-20 shadow-[-20px_0_40px_rgba(0,0,0,0.4)] no-scrollbar"
    >
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/chat')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer relative">
          <MessageSquare size={20} className="text-zinc-400" />
          <div className="absolute top-0 right-0 w-3 h-3 bg-brand-primary rounded-full border-2 border-surface-bg" />
        </button>
        
        <div className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full cursor-pointer transition-all border border-white/5 group">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" alt="User" className="w-8 h-8 rounded-full object-cover" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-primary rounded-full border-2 border-surface-bg flex items-center justify-center text-black">
              <ShieldCheck size={8} fill="currentColor" />
            </div>
          </div>
          <div className="text-left">
            <h4 className="text-xs font-bold font-display text-white group-hover:text-brand-primary transition-colors">Arjun Patel</h4>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              <p className="text-[10px] text-zinc-500 font-medium">Verified Insider</p>
            </div>
          </div>
          <ChevronDown size={14} className="text-zinc-400" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-black text-lg tracking-tight text-white">Upcoming Session</h2>
          <button onClick={() => navigate('/bookings')} className="text-[10px] font-bold text-brand-primary hover:underline">View All</button>
        </div>

        {upcomingBooking ? (
          <div className="glass-morphism p-6 rounded-3xl bg-gradient-to-br from-brand-primary/10 to-transparent relative overflow-hidden group">
            <Video className="absolute -right-4 -bottom-4 text-brand-primary/10 rotate-12 group-hover:scale-125 transition-transform duration-700" size={100} />
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex flex-col items-center justify-center w-14 h-16 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">{upcomingBooking.date.split(' ')[0]}</span>
                <span className="text-2xl font-display font-black text-white">{upcomingBooking.date.split(' ')[1]?.replace(',', '')}</span>
              </div>
              <div className="flex-1 ml-4 overflow-hidden">
                <h3 className="text-sm font-bold text-white mb-1 truncate">{upcomingBooking.title}</h3>
                <p className="text-[11px] text-zinc-400 font-medium truncate">with {upcomingBooking.mentorName}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-bold bg-white/5 px-2 py-0.5 rounded-md">
                    <Calendar size={10} /> {upcomingBooking.time}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 relative z-10">
              <button className="w-full py-3 bg-brand-primary text-black rounded-xl text-xs font-black flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform cursor-pointer">
                <Video size={16} /> Join Session
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-morphism p-8 rounded-3xl border border-dashed border-white/10 text-center flex flex-col items-center gap-3">
             <Calendar size={32} className="text-zinc-800" />
             <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">No active sessions</p>
             <button onClick={() => navigate('/discover')} className="btn-primary py-2 px-6 text-[10px]">Browse Mentors</button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-black text-lg tracking-tight text-white">Recent Activity</h2>
        </div>
        
        <div className="flex flex-col gap-5">
          {bookings.slice(0, 3).map((item, i) => (
            <motion.div 
              key={item.id}
              variants={fadeUp(0.4 + i * 0.1)}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-4 group cursor-pointer"
              onClick={() => navigate('/bookings')}
            >
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full transition-transform",
                  item.status === 'confirmed' ? "bg-brand-primary shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-zinc-700"
                )} />
                <div className="w-[1px] h-10 bg-white/5 mt-1" />
              </div>
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-brand-primary transition-colors">
                <Video size={18} />
              </div>
              <div className="flex-1 overflow-hidden">
                <h4 className="text-[11px] font-black text-white group-hover:text-brand-primary transition-colors truncate">{item.title}</h4>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter mt-0.5">{item.status}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-zinc-500">{item.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 bg-brand-primary/5 p-6 rounded-3xl border border-brand-primary/10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/10 blur-[40px] -mr-12 -mt-12 group-hover:bg-brand-primary/20 transition-colors" />
        <div className="relative z-10">
          <h2 className="font-display font-black text-base tracking-tight text-white mb-2">Share your status</h2>
          <p className="text-[10px] text-zinc-500 font-medium mb-4">Let others know you are learning with the best insiders.</p>
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all text-[10px] font-black uppercase text-zinc-400 hover:text-white">Copy Link</button>
            <button className="px-3 py-2 bg-brand-primary text-black rounded-xl transition-all text-xs font-black">Share</button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 bg-brand-primary/5 p-6 rounded-3xl border border-brand-primary/10">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-black text-base tracking-tight text-white">Recommendations</h2>
          <button onClick={() => navigate('/discover')} className="text-[11px] font-bold text-brand-primary hover:underline cursor-pointer">Explore</button>
        </div>
        
        <div className="flex flex-col gap-4">
          {recommendations.map((item, i) => (
            <motion.div 
              key={item.id}
              variants={fadeUp(0.6 + i * 0.1)}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-4 group"
            >
              <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover shadow-lg" />
              <div className="flex-1">
                <h4 className="text-xs font-bold text-white group-hover:text-brand-primary transition-colors">{item.name}</h4>
                <p className="text-[10px] text-zinc-500 font-medium">{item.college} • {item.branch}</p>
              </div>
              <button 
                onClick={() => navigate('/discover')}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-primary hover:text-black transition-all cursor-pointer"
              >
                <Plus size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
