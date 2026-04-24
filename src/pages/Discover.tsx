import { useState, useMemo } from "react";
import { Search, Filter, SlidersHorizontal, ArrowUpDown, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MOCK_MENTORS } from "../lib/mock-data";
import MentorCard from "../components/dashboard/MentorCard";
import { fadeUp } from "../lib/animations";
import { Layout } from "../components/layout/Layout";
import { useNavigate } from "react-router-dom";

export default function Discover() {
  const [search, setSearch] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("All");
  const [sortBy, setSortBy] = useState("rating"); // "rating" | "price"
  const navigate = useNavigate();

  const colleges = ["All", ...Array.from(new Set(MOCK_MENTORS.map(m => m.college)))];

  const filteredMentors = useMemo(() => {
    return MOCK_MENTORS.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || 
                           m.college.toLowerCase().includes(search.toLowerCase()) ||
                           m.branch.toLowerCase().includes(search.toLowerCase()) ||
                           m.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCollege = selectedCollege === "All" || m.college === selectedCollege;
      return matchesSearch && matchesCollege;
    }).sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price") return a.price - b.price;
      return 0;
    });
  }, [search, selectedCollege, sortBy]);

  return (
    <div className="flex flex-col gap-8">
        <header className="flex flex-col gap-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp(0.1)}>
            <h1 className="text-4xl font-display font-black tracking-tight text-white mb-2">Find your Insider</h1>
            <p className="text-zinc-500">Connect with students who have been where you want to go.</p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-brand-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search by name, college, subject or tag..." 
                className="input-field pl-12"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <div className="relative">
                <select 
                  className="input-field pr-10 appearance-none min-w-[160px]"
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                >
                  {colleges.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
              </div>

              <div className="relative">
                <select 
                  className="input-field pr-10 appearance-none min-w-[160px]"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="rating">Top Rated</option>
                  <option value="price">Lowest Price</option>
                </select>
                <ArrowUpDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
              </div>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {filteredMentors.length > 0 ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredMentors.map((mentor, i) => (
                <MentorCard key={mentor.id} mentor={mentor} delay={i * 0.05} onClick={() => navigate(`/mentor/${mentor.id}`)} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-20 text-center glass-morphism rounded-3xl"
            >
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                <XCircle size={40} className="text-zinc-600" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-2">No Mentors Found</h3>
              <p className="text-zinc-500 max-w-sm mb-8">
                We couldn't find any mentors matching your criteria. Try adjusting your filters or search terms.
              </p>
              <button 
                onClick={() => { setSearch(""); setSelectedCollege("All"); }}
                className="btn-secondary"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}
