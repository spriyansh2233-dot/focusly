import { AppLayout } from "@/components/layout/AppLayout";
import { MoodSelector } from "@/components/dashboard/MoodSelector";
import { ForgettingForecastCard } from "@/components/dashboard/ForgettingForecastCard";
import { LearningDnaCard } from "@/components/dashboard/LearningDnaCard";
import { ActivePathsCard } from "@/components/dashboard/ActivePathsCard";
import { SmartNotesCard } from "@/components/dashboard/SmartNotesCard";
import { H1, Body } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

import { CircularProgressSection } from "@/components/dashboard/CircularProgressSection";
import { CalendarSection } from "@/components/dashboard/CalendarSection";
import { DailyMissionCard } from "@/components/dashboard/DailyMissionCard";

import { useNavigate } from 'react-router-dom';
import { Trophy, Target, Zap, Rocket, Brain, Flame, Star, Search } from "lucide-react";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useNavigate();

  const handleStartChallenge = () => {
    toast.success("Analyzing your Smart Notes...", {
      description: "Generating a custom challenge for you.",
      duration: 3000,
    });
    setTimeout(() => {
      router("/quiz/daily-challenge");
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-10 pb-20">
        
        {/* Row 1: Welcome & Quick Stats */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <H1 className="text-3xl md:text-4xl font-black tracking-tight">
              Hey Focus Hero
            </H1>
            <Body className="text-muted-foreground text-lg">
              Level up your brain today.
            </Body>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Streak Card */}
            <Card className="bg-background border-border/50 shadow-sm flex items-center px-4 py-3 gap-3 min-w-[160px]">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                <Flame className="w-5 h-5 fill-current" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">STREAK</p>
                <p className="text-xl font-black leading-none">14 Days</p>
              </div>
            </Card>

            {/* AI Tutor Card */}
            <Card className="bg-background border-border/50 shadow-sm flex items-center px-4 py-3 gap-3 min-w-[160px]">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">AI TUTOR</p>
                <p className="text-xl font-black leading-none flex items-center gap-2">
                  Ready <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
                </p>
              </div>
            </Card>

            {/* Next Milestone Card */}
            <Card className="bg-background border-border/50 shadow-sm flex items-center px-4 py-3 gap-3 min-w-[160px]">
              <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">LEVEL</p>
                <p className="text-xl font-black leading-none">Elite 4</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Row 2: Feeling Today & Your Learning DNA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="flex flex-col h-full">
            <MoodSelector />
          </div>
          <div className="flex flex-col h-full">
            <LearningDnaCard />
          </div>
        </div>

        {/* Row 3: Circular Progress & Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <CircularProgressSection />
            <DailyMissionCard />
          </div>
          <div className="lg:col-span-5 flex flex-col h-full">
            <CalendarSection />
          </div>
        </div>

        {/* Row 4: Active Learning Paths, Smart Notes, Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          <div className="flex flex-col h-full">
            <ActivePathsCard />
          </div>
          <div className="flex flex-col h-full">
            <SmartNotesCard />
          </div>
          <div className="flex flex-col h-full">
            <ForgettingForecastCard />
          </div>
        </div>

        {/* Challenge Section (Full Width) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary to-blue-700 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-primary/20 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group"
        >
          <div className="relative z-10 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Trophy className="w-6 h-6 text-yellow-300" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">DAILY MISSION</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black mb-4">Brain Challenge</h3>
            <p className="text-white/80 mb-8 max-w-sm text-lg">
              Start your custom revision quiz based on your Smart Notes.
            </p>
            <Button 
              onClick={handleStartChallenge}
              size="lg"
              className="rounded-full h-14 px-10 bg-white text-primary font-black shadow-xl hover:bg-yellow-50 hover:scale-105 transition-all group"
            >
              Start Challenge <Rocket className="w-5 h-5 ml-2 transition-transform" />
            </Button>
          </div>
          <div className="mt-10 md:mt-0 relative z-10 w-32 h-32 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center border border-white/20">
            <Target className="w-16 h-16 text-white" />
          </div>
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-yellow-400/20 blur-[100px] rounded-full" />
        </motion.div>
      </div>
    </AppLayout>
  );
}
