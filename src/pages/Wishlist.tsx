import { motion } from "motion/react";
import { Layout } from "../components/layout/Layout";
import { fadeUp } from "../lib/animations";
import { Heart, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-8 min-h-[60vh] items-center justify-center text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp(0.1)} className="w-20 h-20 bg-pink-500/10 text-pink-500 rounded-3xl flex items-center justify-center mb-6">
          <Heart size={40} className="fill-current" />
        </motion.div>
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp(0.2)} className="text-4xl font-display font-black text-white mb-4">Your Wishlist is Empty</motion.h1>
        <motion.p initial="hidden" animate="visible" variants={fadeUp(0.3)} className="text-zinc-500 max-w-sm mb-8">Save mentors you are interested in and book them later when you are ready.</motion.p>
        <motion.button 
          initial="hidden" animate="visible" variants={fadeUp(0.4)}
          onClick={() => navigate('/discover')}
          className="btn-primary"
        >
          Discover Mentors <Search size={18} className="inline ml-2" />
        </motion.button>
      </div>
  );
}
