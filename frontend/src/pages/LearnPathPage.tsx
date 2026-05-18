import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { H1, H2, Body } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPathDetails, getPathConcepts } from "@/lib/api";
import { Calendar, Target, CheckCircle2, ChevronRight, BookOpen, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function LearnPathPage() {
  const { pathId } = useParams<{ pathId: string }>();
  const router = useNavigate();
  const [path, setPath] = useState<any>(null);
  const [concepts, setConcepts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pathId) return;

    Promise.all([getPathDetails(pathId), getPathConcepts(pathId)])
      .then(([pathData, conceptsData]) => {
        setPath(pathData);
        setConcepts(conceptsData);
      })
      .catch((error) => {
        toast.error("Failed to load learning path details");
      })
      .finally(() => setLoading(false));
  }, [pathId]);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Clock className="w-12 h-12 text-primary animate-spin" />
          <H2>Loading your learning path...</H2>
          <Body className="text-muted-foreground">Gathering your customized curriculum.</Body>
        </div>
      </AppLayout>
    );
  }

  if (!path) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
          <AlertCircle className="w-16 h-16 text-destructive mb-4" />
          <H2>Path Not Found</H2>
          <Body className="text-muted-foreground mb-6">The requested learning path could not be loaded.</Body>
          <Button onClick={() => router("/dashboard")}>Back to Dashboard</Button>
        </div>
      </AppLayout>
    );
  }

  // Parse the roadmap JSON pathway
  let weeks: any[] = [];
  try {
    weeks = typeof path.pathway === "string" ? JSON.parse(path.pathway) : path.pathway;
  } catch (e) {
    weeks = [];
  }

  // Helper to find the concept ID for a topic name
  const findConceptForTopic = (topicName: string) => {
    return concepts.find(
      (c) => c.name.toLowerCase().trim() === topicName.toLowerCase().trim()
    );
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto pb-20 space-y-8 animate-in fade-in duration-300">
        {/* Hero Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <Badge className="bg-primary/20 hover:bg-primary/20 text-primary font-bold px-3 py-1 rounded-full text-xs tracking-wider uppercase">
              ACTIVE ROADMAP
            </Badge>
            <H1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
              {path.goalDescription}
            </H1>
            <div className="flex flex-wrap gap-4 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                Target: {path.targetCompletionDate}
              </div>
              <div className="flex items-center gap-1.5">
                <Target className="w-4 h-4 text-primary" />
                Week {path.currentWeek} of {weeks.length || 6}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center shrink-0 w-20 h-20 bg-primary text-primary-foreground rounded-2xl shadow-xl shadow-primary/20 font-black text-2xl">
            W{path.currentWeek}
          </div>
        </div>

        {/* Pathway Vertical Timeline */}
        <div className="space-y-6">
          <H2 className="text-2xl font-bold flex items-center gap-2 px-2">
            <BookOpen className="text-primary w-6 h-6" />
            Curriculum Breakdown
          </H2>

          <div className="relative border-l-2 border-border/60 ml-4 md:ml-6 space-y-12">
            {weeks.map((weekData: any, idx: number) => {
              const isCurrent = weekData.week === path.currentWeek;
              const isCompleted = weekData.week < path.currentWeek;

              return (
                <div key={idx} className="relative pl-8 md:pl-10 group">
                  {/* Timeline Node */}
                  <div
                    className={`absolute -left-[13px] top-1.5 w-6 h-6 rounded-full border-4 flex items-center justify-center transition-all duration-300
                      ${
                        isCompleted
                          ? "bg-primary border-primary text-white scale-110"
                          : isCurrent
                          ? "bg-background border-primary scale-125 shadow-lg shadow-primary/20"
                          : "bg-background border-muted group-hover:border-primary/50"
                      }`}
                  >
                    {isCompleted && <CheckCircle2 className="w-3 h-3 fill-current" />}
                  </div>

                  {/* Week Card */}
                  <Card
                    className={`border transition-all duration-300 group-hover:border-primary/20
                      ${isCurrent ? "border-primary/40 bg-primary/5 shadow-md shadow-primary/5" : "border-border/50"}`}
                  >
                    <CardHeader className="pb-3 flex flex-row items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                          WEEK {weekData.week}
                        </p>
                        <CardTitle className="text-lg md:text-xl font-extrabold leading-tight">
                          {weekData.title || `Foundations of ${path.goalDescription}`}
                        </CardTitle>
                      </div>
                      {isCurrent && (
                        <Badge className="bg-primary hover:bg-primary font-bold">
                          Current Week
                        </Badge>
                      )}
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(weekData.topics || []).map((topic: string, tIdx: number) => {
                          const matchedConcept = findConceptForTopic(topic);
                          return (
                            <div
                              key={tIdx}
                              className="flex items-center justify-between p-4 border border-border/40 rounded-xl bg-card hover:border-primary/20 hover:bg-secondary/20 transition-all group/item"
                            >
                              <div className="space-y-1 pr-4 min-w-0">
                                <p className="font-bold text-sm leading-tight text-foreground truncate">
                                  {topic}
                                </p>
                                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                                  {matchedConcept?.description ? "Material Ready" : "Study Concept"}
                                </p>
                              </div>
                              <Button
                                size="sm"
                                variant={matchedConcept ? "default" : "outline"}
                                className="rounded-lg h-8 px-3 shrink-0 font-bold text-xs"
                                onClick={() => {
                                  if (matchedConcept) {
                                    router(`/learn/${matchedConcept.id}`);
                                  } else {
                                    // Fallback to searching/generating topic from dashboard or show coming soon
                                    toast.info("Generating study material for this topic...");
                                    router("/dashboard");
                                  }
                                }}
                              >
                                Study <ChevronRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/item:translate-x-1" />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
