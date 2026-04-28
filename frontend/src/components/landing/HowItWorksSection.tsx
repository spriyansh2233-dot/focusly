"use client";

import { motion } from "framer-motion";
import { ArrowDown, UploadCloud, Cpu, Target } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Add your materials",
    description: "Upload your PDFs, Word docs, or simply type out your class notes. We'll handle the rest.",
    icon: <UploadCloud className="w-8 h-8" />,
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "Focusly's AI breaks down your notes into summaries, key concepts, and custom flashcards.",
    icon: <Cpu className="w-8 h-8" />,
  },
  {
    number: "03",
    title: "Learn & Retain",
    description: "Follow your personalized study path and review concepts right before you forget them.",
    icon: <Target className="w-8 h-8" />,
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-32 bg-background relative overflow-hidden transition-colors duration-300">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to supercharge your learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-border -translate-y-1/2 z-0 overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              whileInView={{ x: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
              className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </div>
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2, type: "spring" }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-card border-4 border-background shadow-lg group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-500 rounded-full flex items-center justify-center text-primary mb-8 relative">
                {/* Number badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-foreground text-background font-bold rounded-full flex items-center justify-center text-sm shadow-md">
                  {step.number}
                </div>
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto group-hover:text-foreground transition-colors">
                {step.description}
              </p>
              
              {/* Connector Arrow (Mobile) */}
              {index < steps.length - 1 && (
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="md:hidden mt-12 text-muted-foreground"
                >
                  <ArrowDown className="w-8 h-8" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
