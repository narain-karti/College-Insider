import Sidebar from '@/components/layout/Sidebar';
import RightPanel from '@/components/layout/RightPanel';
import StatCard from '@/components/dashboard/StatCard';
import MentorCard from '@/components/dashboard/MentorCard';
import QuickActions from '@/components/dashboard/QuickActions';
import SessionCountdown from '@/components/dashboard/SessionCountdown';
import { Search, Users, Video, Star, Clock, Quote, ArrowRight, GraduationCap, Trophy, Zap, ShieldCheck, Target, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fadeIn, fadeUp } from '@/lib/animations';
import { MOCK_MENTORS } from '@/lib/mock-data';
import { Layout } from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { useBookings } from '@/lib/BookingContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { bookings } = useBookings();
  const topMentors = MOCK_MENTORS.filter(m => m.isTopMentor).slice(0, 3);
  
  const completedSessions = bookings.filter(b => b.status === 'completed').length;
  const activeSessions = bookings.filter(b => b.status === "confirmed").length;
  const nextSession = bookings.find(b => b.status === "confirmed");

  return (
    <div className="flex flex-col gap-10">
        <header className="flex flex-col gap-8">
          <motion.div variants={fadeIn(0.1)} initial="hidden" animate="visible" className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-brand-primary font-bold text-sm mb-2 flex items-center gap-2">
                Good evening, Arjun 👋
              </h2>
              <h1 className="text-5xl font-display font-black tracking-tight leading-[0.9] text-white">
                Connect. Learn.<br />
                <span className="text-brand-primary">Get Ahead.</span>
              </h1>
              <p className="text-zinc-500 max-w-md mt-6 leading-relaxed font-medium">
                Book 1:1 calls with verified mentors from top colleges and fast-track your future.
              </p>
            </div>

            {nextSession && (
               <SessionCountdown startTime={nextSession.time} onJoin={() => navigate('/bookings')} />
            )}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <div className="flex flex-col gap-6">
              <motion.div 
                variants={fadeUp(0.3)}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-4"
              >
                <div className="relative flex-1 group" onClick={() => navigate('/discover')}>
                  <div className="absolute inset-0 bg-brand-primary/20 blur-2xl group-focus-within:bg-brand-primary/30 transition-all opacity-0 group-focus-within:opacity-100" />
                  <div className="relative glass-morphism px-6 py-4 flex items-center gap-4 rounded-2xl cursor-pointer hover:border-brand-primary/20 transition-all">
                    <Search className="text-zinc-500" size={20} />
                    <input 
                      type="text" 
                      placeholder="Search for colleges, mentors or subjects..." 
                      className="bg-transparent border-none outline-none text-sm w-full font-medium text-white placeholder:text-zinc-600 cursor-pointer"
                      readOnly
                    />
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate('/discover')}
                  className="btn-primary"
                >
                  Search <ArrowRight size={18} className="hidden sm:inline ml-2" />
                </button>
              </motion.div>

              <QuickActions />

              <section className="grid grid-cols-2 gap-4">
                <StatCard icon={Users} value="124+" label="Verified Mentors" trend="12% this month" delay={0.4} />
                <StatCard icon={Video} value={activeSessions.toString()} label="Active Sessions" trend={`${activeSessions > 0 ? "Upcoming soon" : "Book yours now"}`} delay={0.5} />
              </section>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-black text-2xl tracking-tight">Featured Mentors</h2>
              <button onClick={() => navigate('/discover')} className="text-brand-primary font-bold text-sm hover:underline">View all</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {topMentors.map((mentor, i) => (
                <MentorCard 
                  key={mentor.id} 
                  mentor={mentor} 
                  delay={0.6 + i * 0.1} 
                  onClick={() => navigate(`/mentor/${mentor.id}`)}
                />
              ))}
            </div>
          </div>
        </section>

        <motion.section 
          variants={fadeUp(1.2)}
          initial="hidden"
          animate="visible"
          className="glass-morphism p-10 bg-gradient-to-r from-brand-primary/10 via-transparent to-brand-secondary/10 flex flex-col lg:flex-row items-center justify-between mt-auto overflow-hidden relative rounded-3xl"
        >
          <div className="flex-1 max-w-xl text-center lg:text-left">
            <Quote className="text-brand-primary mb-6 mx-auto lg:mx-0" size={40} />
            <p className="text-xl font-display font-bold leading-relaxed text-zinc-200">
              "College Insiders helped me connect with the right mentor. Cracked my dream internship!"
            </p>
            <div className="mt-6 flex flex-col gap-1 items-center lg:items-start">
              <p className="text-brand-primary font-black text-sm">— Kunal Singh</p>
              <p className="text-zinc-500 text-xs font-bold font-mono">IIT Bombay • Class of 2024</p>
            </div>
          </div>
          
          <div className="relative w-64 h-64 flex items-center justify-center mt-10 lg:mt-0">
            <div className="absolute inset-0 bg-brand-primary/20 blur-3xl animate-pulse" />
            <GraduationCap className="relative text-brand-primary drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]" size={120} />
          </div>
        </motion.section>
      </div>
  );
}
