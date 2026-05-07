import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { getLearningDna } from "@/lib/api";

export function LearningDnaCard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLearningDna()
      .then(data => setProfile(data))
      .catch(() => {
        // Handled by null profile check
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Card className="elevated border-border/50 animate-pulse">
        <CardHeader className="pb-3 border-b border-border/50">
          <div className="h-6 w-32 bg-muted rounded" />
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-muted rounded-lg" />
            <div className="h-12 bg-muted rounded-lg" />
          </div>
          <div className="h-2 bg-muted rounded w-full" />
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-24" />
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-muted rounded-full" />
              <div className="h-6 w-16 bg-muted rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!profile) {
    return (
      <Card className="elevated border-border/50 flex flex-col items-center justify-center p-10 text-center opacity-50">
        <Icon name="Dna" className="w-8 h-8 mb-2" />
        <p className="text-xs font-bold uppercase tracking-wider">Learning DNA Unavailable</p>
      </Card>
    );
  }

  const strongTopics = Array.isArray(profile.strengths) ? profile.strengths : [];
  const weakTopics = Array.isArray(profile.weaknesses) ? profile.weaknesses : [];
  const consistencyScore = Math.round((profile.consistencyScore || 0) * 100);
  const focusSpan = profile.focusSpanMinutes || 0;
  const bestStudyTime = profile.bestStudyTime || "Morning";

  return (
    <Card className="elevated">
      <CardHeader className="pb-3 border-b border-border">
        <CardTitle className="text-lg flex items-center gap-2">
          <Icon name="Dna" className="text-primary" />
          Your Learning DNA
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-secondary rounded-lg p-3">
            <span className="text-xs text-muted-foreground block mb-1">Best Time to Study</span>
            <span className="font-semibold text-sm flex items-center gap-2">
              <Icon name="Clock" size={14} className="text-primary" /> {bestStudyTime}
            </span>
          </div>
          <div className="bg-secondary rounded-lg p-3">
            <span className="text-xs text-muted-foreground block mb-1">Focus Span</span>
            <span className="font-semibold text-sm flex items-center gap-2">
              <Icon name="Timer" size={14} className="text-[#10B981]" /> {focusSpan} min
            </span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-foreground">Consistency Score</span>
            <span className="text-primary font-bold">{consistencyScore}/100</span>
          </div>
          <Progress value={consistencyScore} className="h-2" />
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-xs font-semibold text-muted-foreground mb-2 block uppercase">Strengths</span>
            <div className="flex gap-2 flex-wrap">
              {strongTopics.map((t: string) => <Badge key={t} variant="success">{t}</Badge>)}
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground mb-2 block uppercase">Weak Areas</span>
            <div className="flex gap-2 flex-wrap">
              {weakTopics.map((t: string) => <Badge key={t} variant="warning">{t}</Badge>)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
