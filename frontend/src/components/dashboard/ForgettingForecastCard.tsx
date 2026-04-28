"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ListSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { getTodayRevisions } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Brain, AlertCircle, CheckCircle2 } from "lucide-react";

export function ForgettingForecastCard() {
  const [revisions, setRevisions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getTodayRevisions()
      .then((data) => setRevisions(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card className="flex flex-col h-full elevated border-border/50">
      <CardHeader className="pb-3 border-b border-border/50">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="text-primary w-5 h-5" />
          Forgetting Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <ListSkeleton rows={3} />
        ) : error ? (
          <EmptyState
            icon={<AlertCircle className="w-6 h-6" />}
            title="Load failed"
            description="Check your connection."
          />
        ) : revisions.length === 0 ? (
          <EmptyState
            icon={<CheckCircle2 className="w-6 h-6 text-emerald-500" />}
            title="All caught up!"
            description="No topics due for revision today."
          />
        ) : (
          revisions.map((rev) => (
            <div
              key={rev.id}
              className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="flex flex-col">
                <span className="font-bold text-sm text-foreground">
                  {rev.concept?.name || "Topic"}
                </span>
                <span className="text-xs text-muted-foreground mt-0.5 font-medium">
                  Mastery: {Math.round((rev.masteryScore ?? 0) * 100)}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    rev.reviewPriority === "HIGH"
                      ? "error"
                      : rev.reviewPriority === "MEDIUM"
                      ? "warning"
                      : "success"
                  }
                  className="text-[10px] font-black uppercase tracking-wider h-5"
                >
                  {rev.reviewPriority}
                </Badge>
                <Button
                  size="sm"
                  variant="default"
                  className="text-xs h-8 px-4 font-bold"
                  onClick={() => router.push(`/quiz/${rev.concept?.id ?? "react-hooks"}`)}
                >
                  Review
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
