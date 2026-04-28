import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon, IconName } from "@/components/ui/icon";
import { getAdaptivePlan, getMoodHistory } from "@/lib/api";
import { toast } from "sonner";

const MOODS: { id: string, label: string, icon: IconName, color: string }[] = [
  { id: "focused", label: "Focused", icon: "Target", color: "text-[#10B981]" },
  { id: "motivated", label: "Motivated", icon: "Rocket", color: "text-primary" },
  { id: "tired", label: "Tired", icon: "BatteryLow", color: "text-[#F59E0B]" },
  { id: "stressed", label: "Stressed", icon: "CloudRain", color: "text-[#EF4444]" },
  { id: "low_energy", label: "Low Energy", icon: "Coffee", color: "text-[#8B5CF6]" },
];

export function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const data = await getMoodHistory();
      setHistory(data.slice(0, 3)); // Only show last 3
      setError(false);
    } catch (e) {
      setError(true);
    }
  };

  const handleMoodSelect = async (moodId: string) => {
    setSelectedMood(moodId);
    setLoading(true);
    try {
      const adaptivePlan = await getAdaptivePlan(moodId);
      setPlan(adaptivePlan);
      toast.success("Adaptive plan generated!");
      loadHistory();
    } catch (e) {
      // Error handled by state or toast removed for silence
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="elevated bg-card/60 backdrop-blur-xl border-primary/20">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-xl font-bold">How are you feeling today?</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-2">
        {!plan ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3" role="group" aria-label="Mood selection">
            {MOODS.map(mood => (
              <motion.button
                key={mood.id}
                onClick={() => handleMoodSelect(mood.id)}
                disabled={loading}
                aria-label={`Select mood: ${mood.label}`}
                aria-pressed={selectedMood === mood.id}
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
                }}
                whileTap={{ scale: 0.95 }}
                className={`btn-press flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-secondary hover:bg-secondary/80 transition-all focus-visible:ring-2 focus-visible:ring-primary ${selectedMood === mood.id ? 'ring-2 ring-primary border-primary bg-primary/5' : ''}`}
              >
                <Icon name={mood.icon} className={`mb-2 ${mood.color} transition-transform group-hover:scale-110`} size={28} />
                <span className="text-sm font-medium">{mood.label}</span>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-5 flex items-start gap-4">
            <div className="bg-primary rounded-full p-3 flex-shrink-0">
              <Icon name="Sparkles" className="text-primary-foreground" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-primary mb-1">Adaptive Plan: {plan.action}</h3>
              <p className="text-sm text-foreground/80 mb-3">{plan.description}</p>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-background"><Icon name="Timer" size={12} className="mr-1"/> {plan.durationMinutes} min</Badge>
                <Button size="sm" onClick={() => setPlan(null)} variant="ghost" className="h-6 text-xs px-2">Reset</Button>
              </div>
            </div>
            <Button className="mt-2">Start Session</Button>
          </div>
        )}
      </CardContent>
      {history.length > 0 && (
        <div className="px-6 pb-4 border-t border-border/50 pt-3 flex items-center gap-3">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Recently:</span>
          <div className="flex gap-2">
            {history.map((h, i) => (
              <Badge key={i} variant="secondary" className="capitalize text-[10px] py-0 px-2 h-5 bg-secondary/50">
                {h.mood.replace('_', ' ')}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
