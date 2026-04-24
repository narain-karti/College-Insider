import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { WordsPullUp } from '../components/animations/WordsPullUp';
import { WordsPullUpMultiStyle } from '../components/animations/WordsPullUpMultiStyle';
import { AnimatedLetter } from '../components/animations/AnimatedLetter';
import { Link } from 'react-router-dom';

export default function Landing() {
  const aboutBody = "Over the last few years, we have worked with ambitious students across the country. Together, we have built a platform that has earned acclaim for connecting aspiring learners with experienced mentors.";
  const aboutBodyChars = aboutBody.split('');

  // Feature cards animation hook
  const card1Ref = useRef(null);
  const card1InView = useInView(card1Ref, { once: true, margin: "-100px" });
  const card2Ref = useRef(null);
  const card2InView = useInView(card2Ref, { once: true, margin: "-100px" });
  const card3Ref = useRef(null);
  const card3InView = useInView(card3Ref, { once: true, margin: "-100px" });
  const card4Ref = useRef(null);
  const card4InView = useInView(card4Ref, { once: true, margin: "-100px" });

  const cardTransition = (delay: number) => ({
    duration: 0.8,
    delay,
    ease: [0.22, 1, 0.36, 1]
  });

  return (
    <div className="bg-black min-h-screen text-primary overflow-x-hidden selection:bg-primary/30">
      {/* SECTION 1: HERO */}
      <section className="h-screen w-full p-4 md:p-6">
        <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-[#101010]">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4" type="video/mp4" />
          </video>
          
          {/* Overlays */}
          <div className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none"></div>

          {/* Navbar */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14 shadow-2xl">
              {['Mentors', 'Students', 'Programs', 'Success Stories', 'Sign In'].map((item, i) => (
                <Link 
                  key={i} 
                  to={item === 'Sign In' ? '/discover' : '#'}
                  style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                  className="text-[10px] sm:text-xs md:text-sm hover:text-[#E1E0CC] transition-colors whitespace-nowrap"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12 pb-8 md:pb-12 z-10 flex flex-col md:flex-row items-end justify-between gap-8">
            {/* Left 8 cols: Heading */}
            <div className="w-full md:w-2/3">
              <h1 className="text-[#E1E0CC] font-medium leading-[0.85] tracking-[-0.07em] text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]">
                <WordsPullUp text="College Insider" showAsterisk={true} />
              </h1>
            </div>

            {/* Right 4 cols: Text + Button */}
            <div className="w-full md:w-1/3 flex flex-col items-start gap-6 md:gap-8 max-w-sm">
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-primary/70 text-xs sm:text-sm md:text-base leading-[1.2]"
              >
                College Insider is a global network of mentors and students bound not by place, status or labels but by passion and hunger to unlock potential through shared experiences.
              </motion.p>
              
              <Link to="/discover">
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-center gap-2 hover:gap-3 bg-primary rounded-full pl-6 pr-1 py-1 transition-all duration-300"
                >
                  <span className="text-black font-medium text-sm sm:text-base">Find a Mentor</span>
                  <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <ArrowRight className="text-[#E1E0CC] w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <section className="py-24 px-4 sm:px-6 md:px-12 lg:px-24 bg-black">
        <div className="max-w-6xl mx-auto bg-[#101010] rounded-3xl p-8 sm:p-12 md:p-16 lg:p-24 flex flex-col items-center text-center">
          <p className="text-primary text-[10px] sm:text-xs uppercase tracking-widest mb-8">
            Peer-to-Peer Network
          </p>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] mb-12">
            <WordsPullUpMultiStyle 
              segments={[
                { text: "We are College Insider, ", className: "font-normal" },
                { text: "a peer-to-peer network. ", className: "font-serif italic" },
                { text: "We have the best mentors from top colleges.", className: "font-normal" }
              ]}
            />
          </h2>

          <div className="max-w-xl mx-auto text-[#DEDBC8] text-xs sm:text-sm md:text-base leading-relaxed">
            {aboutBodyChars.map((char, i) => (
              <AnimatedLetter key={i} index={i} totalChars={aboutBodyChars.length}>
                {char}
              </AnimatedLetter>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURES */}
      <section className="min-h-screen bg-black relative py-24 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal">
              <WordsPullUpMultiStyle 
                segments={[
                  { text: "Expert guidance for ambitious students.", className: "text-primary block" },
                  { text: "Built for success. Powered by community.", className: "text-gray-500 block" }
                ]}
              />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
            {/* Card 1 - Video */}
            <motion.div 
              ref={card1Ref}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={card1InView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
              transition={cardTransition(0)}
              className="relative rounded-2xl overflow-hidden h-[300px] lg:h-full group"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              >
                <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-[#E1E0CC] font-medium">
                Your future campus.
              </div>
            </motion.div>

            {/* Card 2 - Mentor Discovery */}
            <motion.div 
              ref={card2Ref}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={card2InView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
              transition={cardTransition(0.15)}
              className="bg-[#212121] rounded-2xl p-6 flex flex-col h-[300px] lg:h-full"
            >
              <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85" alt="Icon" className="w-10 h-10 sm:w-12 sm:h-12 rounded mb-6" />
              <h3 className="text-primary text-xl font-medium mb-8">Mentor Discovery.<sup className="text-xs ml-1 opacity-50">01</sup></h3>
              <ul className="space-y-4 mb-auto">
                {['Smart recommendations based on goals.', 'Verified alumni from top institutions.', 'Filter by college, major, or expertise.', 'Real-time availability.'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-400 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/discover" className="mt-8 flex items-center gap-2 text-primary text-sm hover:opacity-70 transition-opacity">
                Learn more <ArrowRight className="w-4 h-4 -rotate-45" />
              </Link>
            </motion.div>

            {/* Card 3 - Seamless Bookings */}
            <motion.div 
              ref={card3Ref}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={card3InView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
              transition={cardTransition(0.3)}
              className="bg-[#212121] rounded-2xl p-6 flex flex-col h-[300px] lg:h-full"
            >
              <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85" alt="Icon" className="w-10 h-10 sm:w-12 sm:h-12 rounded mb-6" />
              <h3 className="text-primary text-xl font-medium mb-8">Seamless Bookings.<sup className="text-xs ml-1 opacity-50">02</sup></h3>
              <ul className="space-y-4 mb-auto">
                {['Secure Razorpay integration.', 'Automated calendar invites.', 'Session reminders and notifications.'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-400 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/bookings" className="mt-8 flex items-center gap-2 text-primary text-sm hover:opacity-70 transition-opacity">
                Learn more <ArrowRight className="w-4 h-4 -rotate-45" />
              </Link>
            </motion.div>

            {/* Card 4 - 1-on-1 Sessions */}
            <motion.div 
              ref={card4Ref}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={card4InView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
              transition={cardTransition(0.45)}
              className="bg-[#212121] rounded-2xl p-6 flex flex-col h-[300px] lg:h-full"
            >
              <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85" alt="Icon" className="w-10 h-10 sm:w-12 sm:h-12 rounded mb-6" />
              <h3 className="text-primary text-xl font-medium mb-8">1-on-1 Sessions.<sup className="text-xs ml-1 opacity-50">03</sup></h3>
              <ul className="space-y-4 mb-auto">
                {['Integrated real-time chat.', 'Post-session notes and feedback.', 'Direct career & academic guidance.'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-400 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/discover" className="mt-8 flex items-center gap-2 text-primary text-sm hover:opacity-70 transition-opacity">
                Learn more <ArrowRight className="w-4 h-4 -rotate-45" />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
