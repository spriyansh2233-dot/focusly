"use client";

import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { H1, H2, H3, Body } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getTodayRevisions, getLearningDna } from "@/lib/api";
import { BarChart2, Flame, Brain, TrendingUp, Star, Zap } from "lucide-react";

export default function InsightsPage() {
  const [dna, setDna] = useState<any>(null);
  const [revisions, setRevisions] = useState<any[]>([]);

  useEffect(() => {
    getLearningDna().then(setDna).catch(() => {});
    getTodayRevisions().then(setRevisions).catch(() => {});
  }, []);

  const masteredCount = revisions.filter((r) => r.masteryScore >= 0.8).length;
  const learningCount = revisions.length - masteredCount;

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto pb-16 space-y-8">
        <div>
          <H1>Progress & Insights</H1>
          <Body className="text-muted-foreground mt-1">A bird's-eye view of your learning journey</Body>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Flame, label: "Current Streak", value: dna?.currentStreak ?? "—", color: "text-orange-400" },
            { icon: Star, label: "Topics Mastered", value: masteredCount, color: "text-yellow-400" },
            { icon: Zap, label: "Due Today", value: revisions.length, color: "text-blue-400" },
            { icon: TrendingUp, label: "Consistency", value: dna ? `${Math.round(dna.consistencyScore * 100)}%` : "—", color: "text-green-400" },
          ].map(({ icon: Icon, label, value, color }) => (
            <Card key={label} variant="elevated" className="p-5 flex flex-col gap-2">
              <Icon className={`w-5 h-5 ${color}`} />
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </Card>
          ))}
        </div>

        {/* Learning DNA Breakdown */}
        {dna && (
          <Card variant="elevated" className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <Brain className="w-5 h-5 text-primary" />
              <H2>Your Learning DNA</H2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Focus Span</span>
                    <span className="text-muted-foreground">{dna.focusSpanMinutes} min</span>
                  </div>
                  <Progress value={Math.min((dna.focusSpanMinutes / 60) * 100, 100)} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Consistency Score</span>
                    <span className="text-muted-foreground">{Math.round(dna.consistencyScore * 100)}%</span>
                  </div>
                  <Progress value={dna.consistencyScore * 100} className="h-2" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <H3 className="text-sm mb-2">Strengths</H3>
                  <div className="flex flex-wrap gap-2">
                    {(dna.strengths ?? []).map((s: string) => (
                      <Badge key={s} variant="success">{s}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <H3 className="text-sm mb-2">Areas to Improve</H3>
                  <div className="flex flex-wrap gap-2">
                    {(dna.weaknesses ?? []).map((w: string) => (
                      <Badge key={w} variant="warning">{w}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Topic Status */}
        <Card variant="elevated" className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <BarChart2 className="w-5 h-5 text-primary" />
            <H2>Topic Status</H2>
          </div>
          {revisions.length === 0 ? (
            <Body className="text-muted-foreground text-center py-6">No revision data yet. Start taking quizzes!</Body>
          ) : (
            <div className="space-y-3">
              {revisions.map((r: any) => (
                <div key={r.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                  <Body className="font-medium">{r.conceptName ?? r.concept?.name ?? "Topic"}</Body>
                  <div className="flex items-center gap-3">
                    <Progress value={r.masteryScore * 100} className="w-24 h-2" />
                    <Badge variant={r.masteryScore >= 0.8 ? "success" : r.masteryScore >= 0.5 ? "warning" : "error"}>
                      {r.masteryScore >= 0.8 ? "Mastered" : r.masteryScore >= 0.5 ? "Learning" : "Needs Work"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </AppLayout>
  );
}
