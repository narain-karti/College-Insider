import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  ArrowRight, 
  Users, 
  ShieldCheck, 
  Zap, 
  Video, 
  MessageSquare, 
  Trophy, 
  Star,
  ChevronRight,
  Globe,
  Sparkles,
  Command,
  ExternalLink,
  Lock,
  Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] }
  }
});

const sectionFadeIn = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  }
};

const SectionTitle = ({ subtitle, title, description, centered = false }: any) => (
    <div className={cn("max-w-4xl mb-32", centered && "mx-auto text-center")}>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-3 px-4 py-1.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-10"
      >
        <Sparkles size={14} className="animate-pulse" /> {subtitle}
      </motion.div>
    <motion.h2 
      variants={fadeUp(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white mb-12 leading-[0.85] tracking-tighter"
    >
      {title}
    </motion.h2>
    <motion.p 
      variants={fadeUp(0.2)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-xl md:text-2xl text-zinc-500 leading-relaxed max-w-3xl mx-auto"
      style={!centered ? { marginLeft: 0 } : {}}
    >
      {description}
    </motion.p>
  </div>
);

const ParallaxElement = ({ children, offset = 50, className }: any) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

export default function Landing() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 200], { clamp: true });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2], { clamp: true });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0], { clamp: true });

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-brand-primary selection:text-black antialiased overflow-x-hidden text-zinc-300 relative">
      {/* Dynamic Background Blurs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>
      
      {/* Navigation Pill */}
      <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] w-full max-w-fit px-6">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-black/40 backdrop-blur-3xl border border-white/10 p-2 rounded-full flex items-center gap-4 md:gap-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-center gap-3 pl-4 pr-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center font-bold text-black shadow-lg shadow-brand-primary/20 group-hover:scale-110 transition-transform">
              <Command size={18} />
            </div>
            <span className="hidden md:block font-display font-black text-white tracking-[0.2em] text-sm uppercase">Insiders</span>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {['Features', 'Marketplace', 'Community'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="px-6 py-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 font-bold text-xs tracking-tight transition-all">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 pr-2">
            <button onClick={() => navigate('/dashboard')} className="text-zinc-400 hover:text-white font-bold text-xs px-4">Sign In</button>
            <button onClick={() => navigate('/dashboard')} className="bg-white text-black px-6 py-2.5 rounded-full font-black text-xs tracking-widest uppercase transition-all hover:scale-105 active:scale-95">
              Join Waitlist
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Hero Section - 3D Multi-layered SVG Parallax */}
      <section ref={heroRef} className="relative h-screen min-h-[900px] flex items-center justify-center px-6 overflow-hidden pt-20">
        <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-30 blur-[150px] bg-[radial-gradient(circle_at_center,var(--color-brand-primary)_0%,transparent_70%)]" />
          <div className="absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"
            style={{ 
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: '100px 100px'
            }} 
          />
          <ParallaxElement offset={150} className="absolute top-1/4 -left-20 group">
             <motion.div
               animate={{ 
                 y: [0, -20, 0],
                 rotate: [0, 5, 0]
               }}
               transition={{
                 duration: 10,
                 repeat: Infinity,
                 ease: "easeInOut"
               }}
             >
               <svg width="400" height="400" viewBox="0 0 200 200" className="text-brand-primary opacity-20 filter blur-sm group-hover:blur-0 transition-all duration-700">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
                  <path d="M100 20 L100 180 M20 100 L180 100" stroke="currentColor" strokeWidth="0.5" />
               </svg>
             </motion.div>
          </ParallaxElement>
          <ParallaxElement offset={-200} className="absolute bottom-1/4 -right-20">
             <motion.div
               animate={{ 
                 y: [0, 30, 0],
                 scale: [1, 1.1, 1]
               }}
               transition={{
                 duration: 15,
                 repeat: Infinity,
                 ease: "easeInOut"
               }}
             >
               <svg width="500" height="500" viewBox="0 0 200 200" className="text-emerald-400 opacity-10">
                  <rect x="40" y="40" width="120" height="120" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 5" />
                  <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
               </svg>
             </motion.div>
          </ParallaxElement>
        </motion.div>
        
    <motion.div style={{ y: textY, opacity }} className="relative z-10 max-w-7xl mx-auto text-center pt-48 md:pt-60">
          <motion.h1
            variants={fadeUp(0.1)}
            initial="hidden"
            animate="visible"
            className="text-[12vw] sm:text-[10vw] md:text-[112px] font-display font-black text-white leading-[1] tracking-[-0.04em] mb-24 uppercase drop-shadow-2xl"
          >
            The Future is<br/>
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-400 to-white animate-text-shimmer bg-[length:200%_auto]">
              Collaborative.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp(0.2)}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-xl md:text-2xl text-zinc-500 mb-24 leading-relaxed font-medium px-4"
          >
            Stop navigating in the dark. Connect with Seniors who have mastered your target colleges. Pure insights, zero gatekeeping.
          </motion.p>

          <motion.div
            variants={fadeUp(0.3)}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-12 mb-40"
          >
            <button onClick={() => navigate('/dashboard')} className="btn-primary py-8 px-16 text-2xl group relative overflow-hidden bg-brand-primary border-none text-black transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-3 font-black">
                Find Your Insider <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button onClick={() => navigate('/mentor-onboarding')} className="bg-white/5 backdrop-blur-xl border border-white/10 py-8 px-16 text-2xl rounded-[2.5rem] font-black text-white hover:bg-white/10 transition-all">
              Apply as Mentor
            </button>
          </motion.div>

          {/* Marquee Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="relative overflow-hidden"
          >
            <div className="flex whitespace-nowrap marquee-container py-16 opacity-30 hover:opacity-60 transition-opacity border-y border-white/5 overflow-hidden">
              <div className="flex shrink-0 gap-40 animate-marquee items-center min-w-full">
                {['IIT BOMBAY', 'BITS PILANI', 'SRCC DELHI', 'IIT KANPUR', 'NIT TRICHY', 'VIT VELLORE', 'DTU', 'ST. STEPHENS'].map((uni) => (
                  <span key={uni} className="text-4xl md:text-7xl font-display font-black text-white italic tracking-tighter opacity-80">{uni}</span>
                ))}
              </div>
              <div className="flex shrink-0 gap-40 animate-marquee items-center min-w-full" aria-hidden="true">
                {['IIT BOMBAY', 'BITS PILANI', 'SRCC DELHI', 'IIT KANPUR', 'NIT TRICHY', 'VIT VELLORE', 'DTU', 'ST. STEPHENS'].map((uni) => (
                  <span key={uni} className="text-4xl md:text-7xl font-display font-black text-white italic tracking-tighter opacity-80">{uni}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
           <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Scroll to Explore</span>
           <div className="w-[1px] h-12 bg-gradient-to-b from-brand-primary to-transparent" />
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section className="py-80 px-6 border-y border-white/10 bg-[#080808] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 via-transparent to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-20 md:gap-40 relative z-10">
          {[
            { label: "Verified Mentors", value: "1.2k+" },
            { label: "Successful Calls", value: "24k+" },
            { label: "Top Institutions", value: "500+" },
            { label: "Avg Rating", value: "4.9/5" }
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              variants={fadeUp(i * 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center group"
            >
              <h3 className="text-6xl md:text-8xl font-display font-black text-white mb-4 tracking-tighter group-hover:text-brand-primary transition-colors duration-500">{stat.value}</h3>
              <p className="text-[11px] uppercase font-black tracking-[0.3em] text-zinc-600 group-hover:text-zinc-400 transition-colors">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-60 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            subtitle="The Ecosystem"
            title="Beyond simple conversations."
            description="We've architected a dedicated layer for high-trust peer transactions. Scalable, secure, and insightful."
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
             {/* Feature 1: Large Bento */}
             <motion.div 
               variants={sectionFadeIn}
               initial="hidden"
               whileInView="visible"
               whileHover={{ y: -10 }}
               viewport={{ once: true }}
               className="md:col-span-8 md:row-span-2 glass-morphism rounded-[40px] p-12 overflow-hidden group relative border border-white/5 hover:border-brand-primary/20 transition-colors"
             >
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700">
                   <ShieldCheck size={200} className="text-brand-primary" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-8 border border-brand-primary/20">
                     <Lock size={32} />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-display font-black text-white mb-6 leading-none">Vetted by Identity.</h3>
                  <p className="text-lg text-zinc-500 max-w-md leading-relaxed mb-12">
                    Our rigorous multi-step verification process ensures that every mentor is exactly who they say they are. No exceptions, no proxies.
                  </p>
                  <div className="mt-auto flex items-center gap-4">
                    <button className="flex items-center gap-2 text-white font-black text-sm uppercase tracking-widest hover:text-brand-primary transition-colors">
                      Learn about verification <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
             </motion.div>

             {/* Feature 2: Small Bento */}
             <motion.div 
               variants={sectionFadeIn}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               whileHover={{ scale: 1.02 }}
               className="md:col-span-4 glass-morphism rounded-[40px] p-10 group bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-blue-500/20 transition-all"
             >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
                   <Video size={24} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">Native Video</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  High-fidelity WebRTC powered slots for zero-latency face-to-face sessions.
                </p>
             </motion.div>

             {/* Feature 3: Small Bento */}
             <motion.div 
               variants={sectionFadeIn}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               whileHover={{ scale: 1.02 }}
               className="md:col-span-4 glass-morphism rounded-[40px] p-10 group active:scale-95 transition-transform border border-white/5 hover:border-purple-500/20"
             >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-6 border border-purple-500/20 group-hover:scale-110 transition-transform">
                   <Zap size={24} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">Instant Chat</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Real-time direct messaging for quick clarifications before you commit.
                </p>
             </motion.div>

             {/* Feature 4: Medium Bento */}
             <motion.div 
               variants={sectionFadeIn}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="md:col-span-12 glass-morphism rounded-[40px] p-12 flex flex-col md:flex-row items-center gap-12 overflow-hidden border-brand-primary/10"
             >
                <div className="flex-1">
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full text-[10px] font-black uppercase text-emerald-500 mb-6">Marketplace</div>
                   <h3 className="text-4xl font-display font-black text-white mb-6">Peer-Trust Marketplace.</h3>
                   <p className="text-zinc-500 leading-relaxed max-w-lg mb-8">
                     Browse through a dynamic catalog of insiders across engineering, commerce, arts, and medical fields. Use advanced filters to find the perfect match.
                   </p>
                   <button className="btn-primary px-8 py-3 text-sm">Explore Marketplace</button>
                </div>
                <div className="flex-1 w-full max-w-md aspect-video rounded-3xl bg-zinc-900 border border-white/5 flex items-center justify-center relative group">
                   <Target size={64} className="text-zinc-700 group-hover:text-brand-primary transition-colors duration-700" />
                   <div className="absolute inset-0 bg-brand-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Immersive Visual Section */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-primary/5 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />
        <div className="max-w-[1400px] mx-auto px-6">
           <motion.div 
             initial={{ opacity: 0, y: 100 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="relative aspect-[21/9] rounded-[80px] overflow-hidden border border-white/10 group shadow-[0_0_100px_rgba(0,0,0,0.5)]"
           >
              <img 
                src="https://images.unsplash.com/photo-1523240715632-d984bb4b3154?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s] pointer-events-none opacity-40 grayscale"
                alt="Insider Experience"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center p-6">
                 <motion.h2 className="text-5xl md:text-8xl font-display font-black text-white mb-8 leading-none tracking-tighter">THE INSIDER EDGE.</motion.h2>
                 <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl font-medium mb-12">Information is the only currency that matters in high-stakes decisions.</p>
                 <button className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-500 group/play">
                    <ArrowRight size={32} className="group-hover/play:translate-x-1 transition-transform" />
                 </button>
              </div>
           </motion.div>
        </div>
      </section>

      {/* College Spotlight */}
      <section id="marketplace" className="py-60 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            subtitle="College Spotlight"
            title="Where our Insiders live."
            description="Explore institutions through the eyes of those who call them home. Professional insights for every major campus."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "IIT Bombay", location: "Mumbai", img: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=800&q=80", tags: ["Tech", "Research"] },
              { name: "BITS Pilani", location: "Pilani", img: "https://images.unsplash.com/photo-1541339907198-e08756eaa539?w=800&q=80", tags: ["Culture", "Startup"] },
              { name: "SRCC", location: "Delhi", img: "https://images.unsplash.com/photo-1523050335192-ce67a276ec08?w=800&q=80", tags: ["Commerce", "Legacy"] },
              { name: "IIM Ahmedabad", location: "Vastrapur", img: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&q=80", tags: ["Management", "Elite"] }
            ].map((college, i) => (
              <motion.div
                key={college.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -20 }}
                className="group relative h-[500px] rounded-[3rem] overflow-hidden cursor-pointer border border-white/5"
              >
                <img src={college.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-80 grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                <div className="absolute inset-x-0 bottom-0 p-8 z-20">
                  <p className="text-zinc-400 text-xs font-black uppercase tracking-widest mb-2">{college.location}</p>
                  <h4 className="text-3xl font-display font-black text-white group-hover:text-brand-primary transition-colors">{college.name}</h4>
                  <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500">
                    {college.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-black uppercase text-white backdrop-blur-md border border-white/10">{tag}</span>
                    ))}
                  </div>
                </div>
                {/* Background Glow on Hover */}
                <div className="absolute -inset-24 bg-brand-primary/20 blur-[100px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 rounded-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Marquee */}
      <section id="testimonials" className="py-60 px-6 relative overflow-hidden border-y border-white/5 bg-[#050505]">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto mb-20">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-6 font-display">Success Stories</div>
           <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter">THE INSIDER IMPACT.</h2>
        </div>

        <div className="flex whitespace-nowrap overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
           <div className="flex shrink-0 gap-8 animate-marquee-slow py-10 min-w-full">
             {[
               { name: "Rahul S.", role: "Joined IIT B", text: "Verified insights on the hostel culture changed my perspective completely.", avatar: "https://i.pravatar.cc/150?u=rahul" },
               { name: "Aditi G.", role: "Joined BITS P", text: "The senior I talked to gave me better placement data than any website.", avatar: "https://i.pravatar.cc/150?u=aditi" },
               { name: "Kartik M.", role: "Joined SRCC", text: "Talking to an actual insider helped me nail my entrance interview.", avatar: "https://i.pravatar.cc/150?u=kartik" },
               { name: "Sneha L.", role: "Joined VIT", text: "I was confused between 3 branches. One call cleared it all.", avatar: "https://i.pravatar.cc/150?u=sneha" },
               { name: "Aman K.", role: "Joined DTU", text: "Pure excellence. Reliable, fast, and high-impact guidance.", avatar: "https://i.pravatar.cc/150?u=aman" }
             ].map((tweet, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="min-w-[400px] glass-morphism p-10 rounded-[3rem] border-white/5 hover:border-brand-primary/20 transition-all group"
                >
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-zinc-800 overflow-hidden border border-white/10 group-hover:border-brand-primary/50 transition-colors">
                        <img src={tweet.avatar} className="w-full h-full object-cover" alt={tweet.name} />
                      </div>
                      <div>
                         <h5 className="text-white font-black text-sm">{tweet.name}</h5>
                         <p className="text-brand-primary font-black text-[10px] uppercase tracking-widest">{tweet.role}</p>
                      </div>
                      <div className="ml-auto text-brand-primary group-hover:scale-125 transition-transform">
                         <Star size={16} fill="currentColor" />
                      </div>
                   </div>
                   <p className="text-zinc-400 font-medium leading-relaxed italic text-lg line-clamp-2">"{tweet.text}"</p>
                </motion.div>
             ))}
           </div>
           {/* Duplicate for seamless loop */}
           <div className="flex shrink-0 gap-8 animate-marquee-slow py-10 min-w-full" aria-hidden="true">
             {[
               { name: "Rahul S.", role: "Joined IIT B", text: "Verified insights on the hostel culture changed my perspective completely.", avatar: "https://i.pravatar.cc/150?u=rahul" },
               { name: "Aditi G.", role: "Joined BITS P", text: "The senior I talked to gave me better placement data than any website.", avatar: "https://i.pravatar.cc/150?u=aditi" },
               { name: "Kartik M.", role: "Joined SRCC", text: "Talking to an actual insider helped me nail my entrance interview.", avatar: "https://i.pravatar.cc/150?u=kartik" },
               { name: "Sneha L.", role: "Joined VIT", text: "I was confused between 3 branches. One call cleared it all.", avatar: "https://i.pravatar.cc/150?u=sneha" },
               { name: "Aman K.", role: "Joined DTU", text: "Pure excellence. Reliable, fast, and high-impact guidance.", avatar: "https://i.pravatar.cc/150?u=aman" }
             ].map((tweet, i) => (
                <div key={i} className="min-w-[400px] glass-morphism p-10 rounded-[3rem] border-white/5 hover:border-brand-primary/20 transition-all group">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-zinc-800 overflow-hidden border border-white/10 group-hover:border-brand-primary/50 transition-colors">
                        <img src={tweet.avatar} className="w-full h-full object-cover" alt={tweet.name} />
                      </div>
                      <div>
                         <h5 className="text-white font-black text-sm">{tweet.name}</h5>
                         <p className="text-brand-primary font-black text-[10px] uppercase tracking-widest">{tweet.role}</p>
                      </div>
                      <div className="ml-auto text-brand-primary group-hover:scale-125 transition-transform">
                         <Star size={16} fill="currentColor" />
                      </div>
                   </div>
                   <p className="text-zinc-400 font-medium leading-relaxed italic text-lg line-clamp-2">"{tweet.text}"</p>
                </div>
             ))}
           </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </section>

      {/* Final Call to Action */}
      <section className="py-60 px-6 relative overflow-hidden mb-20 bg-[#030303]">
        {/* Massive Backdrop Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-primary/10 blur-[180px] rounded-full animate-pulse" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="w-24 h-24 bg-brand-primary/10 border border-brand-primary/20 rounded-[32px] flex items-center justify-center mx-auto mb-16 shadow-[0_0_60px_rgba(206,255,10,0.2)]"
          >
            <Sparkles size={40} className="text-brand-primary animate-pulse" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-[8vw] lg:text-[120px] font-display font-black text-white mb-16 leading-[0.85] tracking-tighter uppercase"
          >
            Unlock your<br/>Potential.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-10"
          >
            <button onClick={() => navigate('/dashboard')} className="btn-primary py-8 px-16 text-3xl group min-w-[320px]">
              Join the Network <ArrowRight className="inline ml-3 group-hover:translate-x-2 transition-transform" />
            </button>
            <div className="flex -space-x-4">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="w-14 h-14 rounded-full border-4 border-black bg-zinc-800 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} className="w-full h-full object-cover" />
                 </div>
               ))}
               <div className="w-14 h-14 rounded-full border-4 border-black bg-brand-primary text-black flex items-center justify-center font-black text-xs">99+</div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-20 text-zinc-500 font-black text-xs tracking-[0.4em] uppercase"
          >
            Trusted by students across 28 states
          </motion.p>
        </div>
      </section>

      {/* Elite Footer */}
      <footer className="pt-40 pb-20 px-6 border-t border-white/5 bg-[#030303] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 mb-32">
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 mb-12">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-bold text-black border border-whiteShadow-2xl shadow-white/10">
                  <Command size={28} />
                </div>
                <span className="font-display font-black text-white tracking-[0.2em] text-2xl uppercase">Insiders</span>
              </div>
              <p className="text-zinc-500 text-lg leading-relaxed mb-12 max-w-sm">
                Redefining college research through a verified network of human intelligence.
              </p>
              <div className="flex gap-8">
                <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 hover:bg-brand-primary hover:text-black transition-all duration-500">
                  <Globe size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 hover:bg-brand-primary hover:text-black transition-all duration-500">
                  <MessageSquare size={20} />
                </a>
              </div>
            </div>

            <div className="md:col-span-2">
               <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-12">Product</h4>
               <ul className="space-y-6">
                 {['Features', 'Marketplace', 'University Search', 'How it works'].map(item => (
                   <li key={item}><a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm font-bold">{item}</a></li>
                 ))}
               </ul>
            </div>

            <div className="md:col-span-2">
               <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-12">Company</h4>
               <ul className="space-y-6">
                 {['Our Vision', 'Partner with us', 'Impact Report', 'Contact'].map(item => (
                   <li key={item}><a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm font-bold">{item}</a></li>
                 ))}
               </ul>
            </div>

            <div className="md:col-span-4">
               <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-12">Stay Informed</h4>
               <div className="flex gap-2">
                  <input type="text" placeholder="Email Address" className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-primary/50 text-white transition-all outline-none" />
                  <button className="bg-white text-black p-4 rounded-2xl hover:scale-105 active:scale-95 transition-all">
                     <ArrowRight size={20} />
                  </button>
               </div>
            </div>
          </div>

          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
             <p className="text-zinc-600 text-xs font-black tracking-widest uppercase">© 2026 COLLEGE INSIDERS / ALL RIGHTS RESERVED.</p>
             <div className="flex gap-12">
                <a href="#" className="text-zinc-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Privacy</a>
                <a href="#" className="text-zinc-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Terms</a>
                <a href="#" className="text-zinc-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Cookies</a>
             </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles for Marquee */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-slow {
          animation: marquee 60s linear infinite;
        }
        .animate-marquee:hover, .animate-marquee-slow:hover {
          animation-play-state: paused;
        }
        @keyframes text-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-text-shimmer {
          animation: text-shimmer 3s linear infinite;
        }
      `}} />
    </div>
  );
}
