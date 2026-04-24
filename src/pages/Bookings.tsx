import { motion, AnimatePresence } from "motion/react";
import { Layout } from "../components/layout/Layout";
import { fadeUp } from "../lib/animations";
import { Calendar, Video, Clock, MessageSquare, Trash2, AlertCircle } from "lucide-react";
import { cn } from "../lib/utils";
import { useBookings } from "../lib/BookingContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Bookings() {
  const { bookings, cancelBooking } = useBookings();
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col gap-8">
        <header>
          <motion.h1 
            initial="hidden" 
            animate="visible" 
            variants={fadeUp(0.1)}
            className="text-4xl font-display font-black text-white mb-2"
          >
            My Bookings
          </motion.h1>
          <p className="text-zinc-500">Manage your upcoming and past mentorship sessions.</p>
        </header>

        <div className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {bookings.map((booking: any, i: number) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "glass-morphism p-6 rounded-3xl flex flex-col md:flex-row items-center gap-6 group transition-all",
                  booking.status === 'cancelled' ? "opacity-50 grayscale" : "hover:border-brand-primary/20"
                )}
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center border",
                  booking.status === 'confirmed' ? "bg-brand-primary/10 border-brand-primary/20 text-brand-primary" : "bg-zinc-800 border-zinc-700 text-zinc-500"
                )}>
                  <Video size={32} />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                    <h3 className="text-lg font-display font-bold text-white">{booking.title}</h3>
                    <span className={cn(
                      "text-[10px] font-black uppercase px-2 py-0.5 rounded-md w-fit mx-auto md:mx-0",
                      booking.status === "confirmed" ? "bg-brand-primary/10 text-brand-primary" : "bg-zinc-800 text-zinc-500"
                    )}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 font-medium">with {booking.mentorName}</p>
                </div>

                <div className="flex gap-6 items-center border-t border-white/5 md:border-t-0 pt-4 md:pt-0 w-full md:w-auto justify-center md:justify-end">
                  <div className="flex flex-col items-center md:items-end">
                    <div className="flex items-center gap-2 text-zinc-300 text-sm font-bold">
                      <Calendar size={14} className="text-zinc-500" /> {booking.date}
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500 text-xs mt-1">
                      <Clock size={12} /> {booking.time} ({booking.duration} min)
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {booking.status === 'confirmed' && (
                      <>
                        <button 
                          onClick={() => navigate('/chat')}
                          className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-zinc-400 hover:text-white transition-colors"
                        >
                          <MessageSquare size={20} />
                        </button>
                        <button className="btn-primary py-2.5 px-5 flex items-center gap-2 text-sm shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-brand-primary/40">
                          <Video size={16} /> Join Call
                        </button>
                        <button 
                          onClick={() => setCancellingId(booking.id)}
                          className="p-2.5 bg-red-500/10 hover:bg-red-500/20 rounded-xl border border-red-500/20 text-red-500 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {bookings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <Calendar size={48} className="text-zinc-700 mb-4" />
            <h3 className="text-xl font-bold text-zinc-500">No sessions booked yet</h3>
            <button onClick={() => navigate('/discover')} className="btn-primary mt-6">Discover Mentors</button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {cancellingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCancellingId(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm glass-morphism rounded-3xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-xl font-display font-black text-white mb-2">Cancel Booking?</h3>
              <p className="text-zinc-500 text-sm mb-8">This action cannot be undone. You will need to book again if you change your mind.</p>
              
              <div className="flex gap-3">
                <button onClick={() => setCancellingId(null)} className="btn-secondary flex-1">Keep it</button>
                <button 
                  onClick={() => {
                    cancelBooking(cancellingId);
                    setCancellingId(null);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl transition-all flex-1"
                >
                  Yes, Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
