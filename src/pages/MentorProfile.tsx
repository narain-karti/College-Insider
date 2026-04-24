import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Star, CheckCircle2, ShieldCheck, Clock, Calendar, Video, CreditCard, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Layout } from "../components/layout/Layout";
import { MOCK_MENTORS } from "../lib/mock-data";
import { useState } from "react";
import { cn } from "../lib/utils";
import { useBookings } from "../lib/BookingContext";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function MentorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mentor = MOCK_MENTORS.find(m => m.id === id);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { addBooking } = useBookings();

  if (!mentor) return <div>Mentor not found</div>;

  const handleBook = async () => {
    if (!selectedSlot) return;
    
    setIsProcessing(true);
    setShowConfirmModal(false);
    setShowPaymentModal(true);

    try {
      // 1. Create order on the server
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: mentor.price }),
      });
      
      const order = await response.json();

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: order.amount,
        currency: order.currency,
        name: "College Insiders",
        description: `Booking session with ${mentor.name}`,
        image: "https://ais-dev-qyenyupudc4iorekhig5xz-491294013239.asia-southeast1.run.app/favicon.ico", // Placeholder or use your logo
        order_id: order.id,
        handler: async function (response: any) {
          // 3. Verify payment (simulated verification)
          await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          // 4. Update local state and navigate
          addBooking({
            id: Math.random().toString(36).substr(2, 9),
            title: `1:1 Session with ${mentor.name}`,
            mentorName: mentor.name,
            date: selectedSlot.split(' ')[0], 
            time: selectedSlot.split(' ').slice(1).join(' '),
            duration: mentor.duration,
            status: 'confirmed'
          } as any);

          setShowPaymentModal(false);
          setIsProcessing(false);
          navigate("/bookings");
        },
        prefill: {
          name: "Arjun Jha", // Dummy user data
          email: "arjun.jha@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#10b981", // Brand primary color
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
            setShowPaymentModal(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Something went wrong with the payment initialization. Please try again.");
      setIsProcessing(false);
      setShowPaymentModal(false);
    }
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const times = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"];

  return (
    <>
      <div className="flex flex-col gap-8 pb-20">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors w-fit group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Discover
        </button>

        <header className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="relative group mx-auto lg:mx-0">
            <div className="absolute inset-0 bg-brand-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <img 
              src={mentor.avatarUrl} 
              alt={mentor.name} 
              className="relative w-48 h-48 rounded-3xl object-cover ring-1 ring-white/10" 
            />
            {mentor.isVerified && (
              <div className="absolute -bottom-2 -right-2 bg-brand-primary text-black p-1.5 rounded-full ring-4 ring-surface-bg">
                <CheckCircle2 size={24} />
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-display font-black text-white">{mentor.name}</h1>
              {mentor.isTopMentor && (
                <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Top Mentor
                </span>
              )}
            </div>
            <p className="text-xl text-zinc-400 font-medium mb-4">{mentor.college} • {mentor.branch}</p>
            
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-1.5 text-zinc-300 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 text-sm">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span className="font-bold">{mentor.rating}</span>
                <span className="text-zinc-500">(15+ sessions)</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-300 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 text-sm">
                <ShieldCheck size={16} className="text-brand-primary" />
                <span className="font-bold">{mentor.rank}</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-300 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 text-sm">
                <Clock size={16} className="text-zinc-500" />
                <span className="font-bold">CGPA: {mentor.cgpa}</span>
              </div>
            </div>
          </div>

          <div className="glass-morphism p-6 rounded-3xl w-full lg:min-w-[300px] flex flex-col gap-6">
            <div>
              <p className="text-zinc-500 text-xs mb-1">Starting from</p>
              <h3 className="text-3xl font-display font-black text-white">₹{mentor.price} <span className="text-sm font-normal text-zinc-500">per {mentor.duration} min</span></h3>
            </div>
            <button 
              onClick={() => {
                if (!selectedSlot) {
                  alert("Please select a session slot first.");
                  return;
                }
                setShowConfirmModal(true);
              }}
              className="btn-primary w-full py-4 text-base"
            >
              Book Session
            </button>
            <p className="text-[11px] text-zinc-500 text-center flex items-center justify-center gap-1.5">
              <Video size={12} /> 1-on-1 Video Consultation
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-10">
            <section>
              <h2 className="text-xl font-display font-black text-white mb-4">Interactive Calendar</h2>
              <div className="glass-morphism rounded-3xl overflow-hidden border border-white/5">
                <div className="overflow-x-auto no-scrollbar">
                  <div className="min-w-[800px]">
                    <div className="grid grid-cols-8 border-b border-white/10">
                      <div className="p-4 bg-white/5" />
                      {days.map(day => (
                        <div key={day} className="p-4 text-center text-xs font-black text-zinc-500 uppercase tracking-widest border-l border-white/10">{day}</div>
                      ))}
                    </div>
                    {times.map(time => (
                      <div key={time} className="grid grid-cols-8 border-b border-white/10 last:border-0 hover:bg-white/[0.02] transition-colors">
                        <div className="p-4 text-[10px] font-bold text-zinc-500 uppercase text-center flex items-center justify-center">{time}</div>
                        {days.map(day => {
                          const slotKey = `${day} ${time}`;
                          const isAvailable = mentor.availability?.includes(slotKey);
                          const isSelected = selectedSlot === slotKey;
                          
                          return (
                            <div key={day} className="p-1 border-l border-white/10 min-h-[60px] flex items-center justify-center">
                              {isAvailable ? (
                                <button 
                                  onClick={() => setSelectedSlot(slotKey)}
                                  className={cn(
                                    "w-full h-full rounded-xl transition-all flex items-center justify-center text-[10px] font-black uppercase",
                                    isSelected 
                                      ? "bg-brand-primary text-black shadow-lg shadow-brand-primary/20 scale-105" 
                                      : "bg-brand-primary/5 text-brand-primary hover:bg-brand-primary hover:text-black"
                                  )}
                                >
                                  {isSelected ? "Selected" : "Free"}
                                </button>
                              ) : (
                                <div className="w-full h-full rounded-xl bg-white/[0.02]" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-display font-black text-white mb-4">About the Insider</h2>
              <p className="text-zinc-400 leading-loose">
                {mentor.bio}
              </p>
            </section>
          </div>

          <aside>
            <div className="sticky top-10 flex flex-col gap-6">
              <h2 className="text-xl font-display font-black text-white">Student Reviews</h2>
              <div className="flex flex-col gap-4">
                {mentor.reviews && mentor.reviews.length > 0 ? mentor.reviews.map(review => (
                  <div key={review.id} className="glass-morphism p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-white">{review.studentName}</h4>
                      <span className="text-[10px] text-zinc-500">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={cn("fill-current", i < review.rating ? "text-yellow-500" : "text-zinc-700")} />
                      ))}
                    </div>
                    <p className="text-sm text-zinc-400 italic">"{review.comment}"</p>
                  </div>
                )) : (
                  <p className="text-zinc-500 italic text-sm">No reviews yet. Be the first to book!</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowConfirmModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md glass-morphism rounded-[40px] p-10 overflow-hidden shadow-2xl">
              <div className="flex flex-col gap-8">
                <div className="text-center">
                  <h3 className="text-3xl font-display font-black text-white mb-2">Confirm Summary</h3>
                  <p className="text-zinc-500 text-sm">Check your session details before payment</p>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                    <img src={mentor.avatarUrl} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="text-white font-bold">{mentor.name}</h4>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase">{mentor.college}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                      <p className="text-[10px] text-zinc-500 font-black uppercase mb-1">Date & Time</p>
                      <p className="text-xs font-bold text-white">{selectedSlot}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                      <p className="text-[10px] text-zinc-500 font-black uppercase mb-1">Duration</p>
                      <p className="text-xs font-bold text-white">{mentor.duration} Minutes</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-6 border-y border-white/5">
                  <span className="text-zinc-500 font-bold">Total Payout</span>
                  <span className="text-2xl font-display font-black text-white">₹{mentor.price}</span>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setShowConfirmModal(false)} className="btn-secondary flex-1">Go Back</button>
                  <button onClick={handleBook} className="btn-primary flex-1">Confirm & Pay</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Payment Processing Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative text-center flex flex-col items-center">
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 border-4 border-brand-primary/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-brand-primary border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(16,185,129,0.3)]" />
              </div>
              <h3 className="text-3xl font-display font-black text-white mb-2">Processing Payment</h3>
              <p className="text-zinc-500 max-w-xs leading-relaxed">Please do not close this window or refresh the page. Securely connecting to Razorpay...</p>
              
              <div className="mt-12 opacity-50 flex flex-col items-center gap-4">
                <img src="https://razorpay.com/assets/razorpay-logo-white.svg" alt="Razorpay" className="h-4" />
                <div className="flex gap-2">
                  {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />)}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
