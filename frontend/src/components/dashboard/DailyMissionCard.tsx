import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Zap, ArrowRight, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPaths, getPathConcepts } from "@/lib/api";

export function DailyMissionCard() {
  const router = useNavigate();
  const [activeConceptId, setActiveConceptId] = useState<string | null>(null);

  useEffect(() => {
    getPaths()
      .then((paths) => {
        if (paths && paths.length > 0) {
          getPathConcepts(paths[0].id).then((concepts) => {
            if (concepts && concepts.length > 0) {
              setActiveConceptId(concepts[0].id);
            }
          }).catch(() => {});
        }
      })
      .catch(() => {});
  }, []);

  // Mock data - ready for API integration
  const mission = {
    title: "Revise 10 Flashcards",
    subtitle: "Boost your long-term memory score by 5%",
    progress: 60,
    reward: "+50 XP"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="elevated border-primary/20 h-full overflow-hidden relative group">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
        
        <CardHeader className="pb-3 border-b border-border/50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="text-primary w-5 h-5" />
              Daily Mission
            </CardTitle>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-bold">
              <Zap className="w-3 h-3 mr-1 fill-current" /> ACTIVE
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 flex flex-col justify-between h-[calc(100%-65px)]">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-black text-foreground mb-1">{mission.title}</h3>
              <p className="text-sm text-muted-foreground font-medium">{mission.subtitle}</p>
            </div>
            
            {/* Mini Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-black uppercase tracking-widest text-muted-foreground">
                <span>Progress</span>
                <span>{mission.progress}%</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${mission.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-primary to-blue-400"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-500">
              <Trophy className="w-4 h-4" />
              <span>Reward: {mission.reward}</span>
            </div>
          </div>
          
          <Button 
            onClick={() => router(activeConceptId ? `/quiz/${activeConceptId}` : "/onboarding")}
            className="w-full mt-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 group/btn"
          >
            Start Now 
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </CardContent>
        
        {/* Soft Glow Pulse */}
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-primary/10 blur-3xl rounded-full animate-pulse pointer-events-none" />
      </Card>
    </motion.div>
  );
}
