import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { H3, Body } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { getPaths } from "@/lib/api";
import { ArrowRight, BookOpen, Layers } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export function ActivePathsCard() {
  const [paths, setPaths] = useState<any[]>([]);
  const router = useNavigate();

  useEffect(() => {
    getPaths().then(setPaths).catch(() => {});
  }, []);

  return (
    <Card className="flex flex-col h-full elevated border-border/50">
      <CardHeader className="pb-3 border-b border-border/50">
        <CardTitle className="text-lg flex items-center gap-2">
          <Layers className="text-primary w-5 h-5" />
          Learning Paths
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        {paths.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold mb-1">No Active Paths</p>
            <p className="text-xs text-muted-foreground mb-4 max-w-[180px]">Start your journey by defining your first learning goal.</p>
            <Button size="sm" className="rounded-full font-bold px-6" onClick={() => router("/onboarding")}>
              Create Path
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {paths.slice(0, 2).map((path) => (
              <div key={path.id} className="border border-border/50 rounded-xl p-4 bg-secondary/30 hover:border-primary/30 transition-colors">
                <p className="font-bold text-sm leading-tight mb-2 truncate">{path.goalDescription}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    Week {path.currentWeek}
                  </span>
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs font-bold text-primary" onClick={() => router(`/learn/path/${path.id}`)}>
                    View <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
