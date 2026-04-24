import { motion } from "motion/react";
import { Layout } from "../components/layout/Layout";
import { fadeUp } from "../lib/animations";
import { GraduationCap, ArrowRight, ShieldCheck, Video, CreditCard, CheckCircle2, UserCircle, Sparkles } from "lucide-react";
import ProfileCompleteness from "@/components/profile/ProfileCompleteness";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export default function MentorOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const onboardingMilestones = [
    { id: "id", label: "Identity Verified", completed: true, points: 50 },
    { id: "college", label: "College Verification", completed: true, points: 100 },
    { id: "video", label: "Introduction Video", completed: false, points: 150 },
    { id: "payout", label: "Payout Connected", completed: false, points: 100 },
  ];

  const steps = [
    { id: 1, label: 'Identity', icon: UserCircle },
    { id: 2, label: 'Expertise', icon: Sparkles },
    { id: 3, label: 'Availability', icon: Video },
  ];

  return (
    <div className="flex flex-col gap-12 py-10">
        <header className="text-center max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {steps.map((step, idx) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center gap-2">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                    currentStep >= step.id 
                      ? "bg-brand-primary border-brand-primary text-black shadow-lg shadow-brand-primary/20" 
                      : "bg-transparent border-white/10 text-zinc-600"
                  )}>
                    <step.icon size={20} />
                  </div>
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    currentStep >= step.id ? "text-brand-primary" : "text-zinc-600"
                  )}>
                    {step.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={cn(
                    "w-12 h-[2px] -mt-6 transition-all duration-500",
                    currentStep > step.id ? "bg-brand-primary" : "bg-white/10"
                  )} />
                )}
              </React.Fragment>
            ))}
          </div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp(0.1)} className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            <GraduationCap size={14} /> Join the network
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp(0.2)} className="text-5xl font-display font-black text-white mb-6 leading-[0.9]">Share your journey. <br/><span className="text-brand-primary">Inspire the next.</span></motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp(0.3)} className="text-zinc-500 text-lg">Help aspiring students get into their dream college while earning for your time.</motion.p>
        </header>

        <div className="max-w-xl mx-auto w-full">
           <ProfileCompleteness milestones={onboardingMilestones} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUp(0.4)}
            whileHover={{ y: -5 }}
            className="glass-morphism p-8 rounded-3xl flex flex-col gap-4 border-white/5 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-display font-bold text-white">Get Verified</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">We verify your college identity to ensure students get advice from real insiders.</p>
            <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase tracking-widest">
              <CheckCircle2 size={12} /> Institutional Email
            </div>
          </motion.div>

          <motion.div 
            initial="hidden" animate="visible" variants={fadeUp(0.5)}
            whileHover={{ y: -5 }}
            className="glass-morphism p-8 rounded-3xl flex flex-col gap-4 border-white/5 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Video size={24} />
            </div>
            <h3 className="text-xl font-display font-bold text-white">Set Your Schedule</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">Choose when you are available. Students book you for 1:1 video consultations.</p>
            <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-black text-brand-secondary uppercase tracking-widest">
              <CheckCircle2 size={12} /> Flexible Hours
            </div>
          </motion.div>

          <motion.div 
            initial="hidden" animate="visible" variants={fadeUp(0.6)}
            whileHover={{ y: -5 }}
            className="glass-morphism p-8 rounded-3xl flex flex-col gap-4 border-white/5 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CreditCard size={24} />
            </div>
            <h3 className="text-xl font-display font-bold text-white">Earn for your time</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">Set your own rates and get paid directly after every session is completed.</p>
            <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-black text-yellow-500 uppercase tracking-widest">
              <CheckCircle2 size={12} /> Instant Payouts
            </div>
          </motion.div>
        </div>

        {/* Earning Calculator Feature */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp(0.65)}
          className="glass-morphism p-10 rounded-[40px] border-white/5 overflow-hidden relative group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[100px] -mr-32 -mt-32" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-display font-black text-white mb-4">Calculate your potential</h2>
              <p className="text-zinc-500 mb-8 leading-relaxed">Most mentors earn between ₹5,000 - ₹15,000 per month sharing just 2 hours a week.</p>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
                    <span>Hours per week</span>
                    <span className="text-brand-primary">4 hours</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-2/5 bg-brand-primary" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
                    <span>Hourly Rate</span>
                    <span className="text-brand-primary">₹1,500</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-3/5 bg-brand-primary" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-brand-primary/5 rounded-3xl p-8 border border-brand-primary/10 text-center">
              <p className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-2">Monthly Potential</p>
              <h3 className="text-6xl font-display font-black text-brand-primary mb-1">₹24,000</h3>
              <p className="text-brand-primary/60 text-[10px] font-bold uppercase tracking-widest">Based on average student demand</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp(0.7)}
          className="glass-morphism p-10 rounded-[40px] bg-gradient-to-br from-brand-primary/20 via-transparent to-transparent flex flex-col items-center gap-8 text-center"
        >
          <h2 className="text-3xl font-display font-black text-white">Ready to become an Insider?</h2>
          <button 
            onClick={() => setCurrentStep(prev => prev < 3 ? prev + 1 : 1)}
            className="btn-primary py-4 px-10 text-lg group"
          >
            {currentStep === 3 ? 'Submit Application' : 'Start Application'} <ArrowRight size={20} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Takes less than 2 minutes to apply</p>
        </motion.div>
      </div>
  );
}
