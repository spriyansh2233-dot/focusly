import { motion, Variants } from "framer-motion";
import { Brain, FileText, Calendar, Smile, HelpCircle, BarChart3, Layers, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "AI Tutor",
    description: "Your 24/7 personal tutor that explains complex concepts simply.",
    icon: <Brain className="w-6 h-6" />,
    color: "bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500/20",
  },
  {
    title: "Smart Notes",
    description: "Upload docs and get instant AI summaries and revision bullets.",
    icon: <FileText className="w-6 h-6" />,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  {
    title: "Study Planner",
    description: "Auto-generated daily paths based on what you need to focus on.",
    icon: <Calendar className="w-6 h-6" />,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
  {
    title: "Mood Tracker",
    description: "Adaptive learning that changes pace based on how you feel today.",
    icon: <Smile className="w-6 h-6" />,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  {
    title: "Quiz Generator",
    description: "Test your knowledge instantly to reinforce your memory.",
    icon: <HelpCircle className="w-6 h-6" />,
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  },
  {
    title: "Progress Analytics",
    description: "Track your Learning DNA and see your growth over time.",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  },
  {
    title: "Flashcards",
    description: "Quick bite-sized revision cards generated from your notes.",
    icon: <Layers className="w-6 h-6" />,
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: "spring", stiffness: 100 } },
};

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Everything you need to succeed.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Focusly combines proven learning techniques with cutting-edge AI to create the ultimate study experience.
          </p>
        </div>

        {/* Featured Card: Forgetting Forecast */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="mb-16 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/10 to-transparent rounded-3xl -z-10 blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-50" />
          <Card className="p-8 md:p-12 rounded-3xl border-2 border-primary/30 bg-background/80 backdrop-blur-xl overflow-hidden relative shadow-2xl hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] transition-all duration-300">
            <div className="absolute top-0 right-0 p-6 opacity-5 text-primary z-0 pointer-events-none">
              <Sparkles className="w-48 h-48" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary mb-6 font-bold text-xs uppercase tracking-wider border border-primary/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                <Sparkles className="w-3 h-3 text-primary" /> Featured Tool
              </div>
              <h3 className="text-3xl md:text-5xl font-bold mb-6 text-foreground drop-shadow-sm">Forgetting Forecast™</h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Never cram again. Our intelligent spaced repetition engine predicts exactly when you are about to forget a concept and prompts you to review it at the perfect moment.
              </p>
              
              <div className="bg-muted/50 p-4 rounded-2xl border border-border backdrop-blur-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-muted-foreground">Memory Strength Indicator</span>
                  <span className="text-xs font-bold text-emerald-500">Optimal Review Time</span>
                </div>
                <div className="flex gap-2 h-3 overflow-hidden rounded-full bg-background/50">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "33%" }} transition={{ duration: 1, delay: 0.2 }} className="bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "33%" }} transition={{ duration: 1, delay: 0.6 }} className="bg-orange-400/80 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "34%" }} transition={{ duration: 1, delay: 1 }} className="bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants} 
              className="h-full"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className="relative h-full p-6 flex flex-col items-start border border-border bg-card hover:border-primary/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 cursor-pointer group rounded-2xl overflow-hidden">
                {/* Hover Shimmer Effect */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-primary/5 to-transparent skew-x-12" />
                
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] ${feature.color}`}>
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">{feature.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  {feature.description}
                </p>
                
                {/* Bottom Border Accent */}
                <div className="absolute bottom-0 left-0 h-1 bg-primary w-0 group-hover:w-full transition-all duration-500" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
