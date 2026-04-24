import { useState, useRef, useEffect } from "react";
import { Send, Search, MoreVertical, Check, CheckCheck, Menu, Paperclip, Smile, User, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Layout } from "../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'mentor';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

const CONTACTS: ChatContact[] = [
  { id: '1', name: 'Ananya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', lastMessage: 'See you in the session!', time: '10:36 AM', unread: 2, online: true },
  { id: '2', name: 'Rohan Verma', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', lastMessage: 'The notes have been uploaded.', time: 'Yesterday', unread: 0, online: false },
  { id: '3', name: 'Muskan Khan', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop', lastMessage: 'Are we still on for 6 PM?', time: 'Tue', unread: 0, online: true },
];

export default function Chat() {
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState(CONTACTS[0]);
  const [showChatArea, setShowChatArea] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hi Arjun! Looking forward to our session tomorrow.', sender: 'mentor', timestamp: '10:30 AM', status: 'read' },
    { id: '2', text: 'Hey Ananya! Yes, I have some doubts regarding the system design approach.', sender: 'user', timestamp: '10:35 AM', status: 'read' },
    { id: '3', text: 'That is great. We will cover that in detail.', sender: 'mentor', timestamp: '10:36 AM', status: 'read' },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };
    setMessages([...messages, newMessage]);
    setInput("");

    // Simulate status update or reply
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, status: 'delivered' } : m));
    }, 1000);

    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, status: 'read' } : m));
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex glass-morphism rounded-[32px] overflow-hidden border border-white/5 relative">
      <div className="absolute inset-0 bg-brand-primary/[0.02] pointer-events-none" />
        
        {/* Sidebar - Chat List */}
        <div className={cn(
          "w-full md:w-80 lg:w-96 border-r border-white/5 flex flex-col bg-black/20 backdrop-blur-xl relative z-10",
          showChatArea && "hidden md:flex"
        )}>
          <header className="p-5 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/dashboard')}
                className="md:hidden p-2 -ml-2 text-zinc-400 hover:text-white transition-colors"
              >
                <Menu size={20} />
              </button>
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <User size={20} />
              </div>
              <h2 className="text-white font-black font-display uppercase tracking-wider text-sm">Chats</h2>
            </div>
          </header>

          <div className="p-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-brand-primary transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search or start new chat" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-primary/30 transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            {CONTACTS.map((contact) => (
              <button 
                key={contact.id}
                onClick={() => {
                  setActiveChat(contact);
                  setShowChatArea(true);
                }}
                className={cn(
                  "w-full flex items-center gap-4 p-4 transition-all hover:bg-white/[0.03]",
                  activeChat.id === contact.id ? "bg-brand-primary/5 border-l-4 border-brand-primary" : "border-l-4 border-transparent"
                )}
              >
                <div className="relative flex-shrink-0">
                  <img src={contact.avatar} className="w-12 h-12 rounded-full object-cover" alt={contact.name} />
                  {contact.online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-brand-primary rounded-full border-2 border-surface-bg" />}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-bold text-sm truncate">{contact.name}</h3>
                    <span className="text-[10px] text-zinc-500 font-bold">{contact.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-zinc-500 truncate">{contact.lastMessage}</p>
                    {contact.unread > 0 && (
                      <span className="bg-brand-primary text-black text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={cn(
          "flex-1 flex flex-col relative z-0",
          !showChatArea && "hidden md:flex"
        )}>
          {/* Chat Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          {/* Header */}
          <header className="px-4 md:px-6 py-4 flex items-center justify-between border-b border-white/5 bg-black/10 backdrop-blur-md relative z-10">
            <div className="flex items-center gap-3 md:gap-4">
              <button 
                onClick={() => setShowChatArea(false)}
                className="md:hidden p-2 -ml-2 text-zinc-400 hover:text-white transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <img src={activeChat.avatar} className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover ring-2 ring-brand-primary/20" alt={activeChat.name} />
              <div>
                <h3 className="text-white font-bold text-sm leading-none mb-1">{activeChat.name}</h3>
                <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest">{activeChat.online ? 'Online' : 'Last seen'}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <button className="p-2 text-zinc-400 hover:text-white transition-colors"><MoreVertical size={18} /></button>
            </div>
          </header>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-8 flex flex-col gap-3 relative z-0 no-scrollbar"
          >
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                layout
                className={cn(
                  "max-w-[75%] flex flex-col relative",
                  msg.sender === 'user' ? "ml-auto" : "mr-auto"
                )}
              >
                <div className={cn(
                  "px-4 py-2.5 rounded-2xl text-sm leading-relaxed relative border",
                  msg.sender === 'user' 
                    ? "bg-brand-primary/10 text-brand-primary border-brand-primary/20 rounded-tr-none" 
                    : "bg-white/5 text-zinc-200 border-white/5 rounded-tl-none"
                )}>
                  {msg.text}
                  <div className="flex items-center justify-end gap-1.5 mt-1">
                    <span className="text-[9px] text-zinc-400 font-bold uppercase">{msg.timestamp}</span>
                    {msg.sender === 'user' && (
                      <span className={cn(
                        "flex items-center",
                        msg.status === 'read' ? "text-blue-400" : "text-zinc-500"
                      )}>
                        {msg.status === 'sent' ? <Check size={12} /> : <CheckCheck size={12} />}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <footer className="p-4 bg-black/10 backdrop-blur-md relative z-10 border-t border-white/5">
            <div className="max-w-4xl mx-auto flex items-center gap-3">
              <button className="p-2.5 text-zinc-400 hover:text-white transition-colors"><Smile size={24} /></button>
              <button className="p-2.5 text-zinc-400 hover:text-white transition-colors"><Paperclip size={24} /></button>
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex-1 flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-1.5 focus-within:bg-white/10 transition-all"
              >
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message" 
                  className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-zinc-600 py-1.5"
                />
              </form>
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                  input.trim() ? "bg-brand-primary text-black" : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                )}
              >
                <Send size={20} />
              </button>
            </div>
          </footer>
        </div>
      </div>
  );
}
