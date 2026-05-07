import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';

import { ArrowRight, BrainCircuit, Sparkles, Flame, FileText, Calendar, Smile, HelpCircle, BarChart3, Layers, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { id: 1, name: "14 Days Streak", icon: <Flame className="w-5 h-5 text-orange-500" />, color: "bg-orange-500/10 border-orange-500/20" },
  { id: 2, name: "Forgetting Forecast", icon: <Sparkles className="w-5 h-5 text-emerald-500" />, color: "bg-emerald-500/10 border-emerald-500/20" },
  { id: 3, name: "AI Tutor", icon: <BrainCircuit className="w-5 h-5 text-blue-500" />, color: "bg-blue-500/10 border-blue-500/20" },
  { id: 4, name: "Smart Notes", icon: <FileText className="w-5 h-5 text-indigo-500" />, color: "bg-indigo-500/10 border-indigo-500/20" },
  { id: 5, name: "Quiz Generator", icon: <HelpCircle className="w-5 h-5 text-rose-500" />, color: "bg-rose-500/10 border-rose-500/20" },
  { id: 6, name: "Mood Tracker", icon: <Smile className="w-5 h-5 text-amber-500" />, color: "bg-amber-500/10 border-amber-500/20" },
  { id: 7, name: "Study Planner", icon: <Calendar className="w-5 h-5 text-purple-500" />, color: "bg-purple-500/10 border-purple-500/20" },
  { id: 8, name: "Focus Timer", icon: <Clock className="w-5 h-5 text-cyan-500" />, color: "bg-cyan-500/10 border-cyan-500/20" },
  { id: 9, name: "Progress Score", icon: <BarChart3 className="w-5 h-5 text-pink-500" />, color: "bg-pink-500/10 border-pink-500/20" },
  { id: 10, name: "Flashcards", icon: <Layers className="w-5 h-5 text-teal-500" />, color: "bg-teal-500/10 border-teal-500/20" },
];

export function HeroSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const orbitRadius = isMobile ? (isExpanded ? 140 : 80) : (isExpanded ? 220 : 120);

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32 min-h-[850px]">
      {/* Decorative gradient background */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-primary/10 via-background to-background -z-10 blur-3xl opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8 font-semibold text-sm tracking-wide">
            <Sparkles className="w-4 h-4" />
            AI-Powered Study Assistant
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-8 leading-[1.1]">
            Study Smarter.<br />
            <span className="text-primary">Remember Longer.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Focusly stays consistent, revises better, and learns faster with AI-powered study tools built for real students.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-lg rounded-full font-bold shadow-lg shadow-primary/25 hover:scale-105 transition-all">
                Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="lg" className="w-full sm:w-auto h-14 px-10 text-lg rounded-full border border-border hover:bg-muted transition-all">
                Log In
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Interactive Feature Hub */}
        {mounted && (
          <div className="relative mt-24 md:mt-32 max-w-5xl mx-auto h-[400px] md:h-[500px] w-full flex items-center justify-center overflow-visible">
            
            {/* Swires (Animated connection wires) - Hidden on mobile if not expanded to save space */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="-250 -250 500 500">
              {features.map((_, i) => {
                const angle = (i / features.length) * 2 * Math.PI;
                const radius = orbitRadius + (i % 2 === 0 ? 0 : isMobile ? 10 : 20);
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <g key={`wire-${i}`} className="text-primary/20 dark:text-primary/10">
                    <motion.path
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      d={`M 0 0 Q ${Math.cos(angle) * (radius/2)} ${Math.sin(angle) * (radius/2)} ${x} ${y}`}
                      animate={{ pathLength: 1, opacity: 0.8 }}
                      transition={{ duration: 1, delay: i * 0.05 }}
                    />
                    <motion.circle r="2.5" className="fill-primary">
                      <animateMotion
                        dur={`${3 + i * 0.5}s`}
                        repeatCount="indefinite"
                        path={`M 0 0 Q ${Math.cos(angle) * (radius/2)} ${Math.sin(angle) * (radius/2)} ${x} ${y}`}
                      />
                    </motion.circle>
                  </g>
                );
              })}
            </svg>

            {/* Orbiting Feature Nodes */}
            <AnimatePresence>
              {features.map((feature, i) => {
                const angle = (i / features.length) * 2 * Math.PI;
                const radius = orbitRadius + (i % 2 === 0 ? 0 : isMobile ? 10 : 20);
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                // Hide alternate ones on mobile if not expanded
                if (isMobile && !isExpanded && i % 2 !== 0) return null;

                return (
                  <motion.div
                    key={feature.id}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{ 
                      x, 
                      y, 
                      opacity: 1, 
                      scale: 1,
                    }}
                    exit={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 70, 
                      damping: 15, 
                      delay: i * 0.03,
                    }}
                    whileHover={{ scale: 1.1, zIndex: 50 }}
                    className={`absolute flex items-center gap-2 p-1.5 md:p-2 rounded-full border bg-background/95 backdrop-blur-md cursor-pointer shadow-lg border-border ${feature.color}`}
                    onClick={toggleExpand}
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-background flex items-center justify-center border border-border">
                      {feature.icon}
                    </div>
                    {(isExpanded || !isMobile) && (
                      <motion.span 
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        className={`pr-3 md:pr-4 text-[10px] md:text-sm font-bold text-foreground whitespace-nowrap ${isMobile && !isExpanded ? 'hidden' : ''}`}
                      >
                        {feature.name}
                      </motion.span>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Center Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: isExpanded ? 1.1 : 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              onClick={toggleExpand}
              whileHover={{ scale: 1.15 }}
              className="relative z-40 cursor-pointer"
            >
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
              <div className="w-24 h-24 md:w-32 md:h-32 bg-background rounded-full flex items-center justify-center shadow-2xl border-2 border-primary/40 relative z-10 overflow-hidden group">
                <img src="/logo.png" 
                  alt="Focusly Logo" 
                  width={isMobile ? 64 : 80} 
                  height={isMobile ? 64 : 80} 
                  className="object-contain transition-transform duration-500 group-hover:rotate-12" 
                />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
