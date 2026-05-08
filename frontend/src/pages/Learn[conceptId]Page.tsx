import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { H1, H2, H3, Body } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LearnPage() {
  const { conceptId } = useParams<{ conceptId: string }>();
  const router = useNavigate();
  const [concept, setConcept] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConcept = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/study/concept/${conceptId}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch concept");
        const data = await response.json();
        setConcept(data);
      } catch (error) {
        toast.error("Failed to load concept material");
      } finally {
        setLoading(false);
      }
    };

    if (conceptId) fetchConcept();
  }, [conceptId]);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <H2>Generating Study Material...</H2>
          <Body className="text-muted-foreground">AI is crafting your personal lesson.</Body>
        </div>
      </AppLayout>
    );
  }

  if (!concept) return null;

  const difficultyLevel = concept.difficultyLevel || 0.5;
  const difficultyLabel = difficultyLevel < 0.4 ? "Beginner" : difficultyLevel < 0.7 ? "Intermediate" : "Advanced";
  const difficultyColor = difficultyLevel < 0.4 ? "success" : difficultyLevel < 0.7 ? "warning" : "error";

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto pb-16 space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              {concept.subject}
            </div>
            <H1>{concept.name}</H1>
            <Badge variant={difficultyColor as any}>{difficultyLabel}</Badge>
          </div>
          <Button
            className="gap-2 shrink-0"
            onClick={() => router(`/quiz/${conceptId}`)}
          >
            Take Quiz <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Main Content */}
        <Card variant="elevated" className="p-8 space-y-6">
          <div className="space-y-3">
            <H2>Overview</H2>
            <Body className="text-muted-foreground leading-relaxed">{concept.description}</Body>
          </div>

          <hr className="border-border/40" />

          <div className="space-y-4">
            <H3>Key Points</H3>
            <ul className="space-y-3">
              {(concept.keyPoints || ["Core concept mastery", "Practical implementation", "Best practices"]).map((point: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  <Body>{point}</Body>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Action Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-primary/5 border-primary/20 flex flex-col justify-between">
            <div>
              <H3 className="mb-2">Ready for a Quiz?</H3>
              <p className="text-sm text-muted-foreground mb-4">Test your understanding with AI-generated questions.</p>
            </div>
            <Button onClick={() => router(`/quiz/${conceptId}`)} className="w-full">Start Quiz</Button>
          </Card>
          
          <Card className="p-6 bg-secondary border-border/50 flex flex-col justify-between">
            <div>
              <H3 className="mb-2">Review Flashcards</H3>
              <p className="text-sm text-muted-foreground mb-4">Memorize key terms using spaced repetition.</p>
            </div>
            <Button variant="outline" onClick={() => router(`/flashcards/${conceptId}`)} className="w-full">View Flashcards</Button>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
