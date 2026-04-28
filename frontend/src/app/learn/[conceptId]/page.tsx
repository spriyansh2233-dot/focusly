"use client";

import { useParams, useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { H1, H2, H3, Body } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Play, FileText, Clock } from "lucide-react";

const MOCK_CONCEPTS: Record<string, any> = {
  "react-hooks": {
    title: "React Hooks",
    subject: "Frontend Development",
    difficulty: 0.6,
    description:
      "React Hooks are functions that let you 'hook into' React state and lifecycle features from function components. They were introduced in React 16.8 and have fundamentally changed how we write React applications.",
    keyPoints: [
      "useState for managing component state",
      "useEffect for handling side effects",
      "useContext for consuming context",
      "useRef for persisting mutable values",
      "Custom Hooks for reusable logic",
    ],
    resources: [
      { type: "article", title: "Official React Hooks Docs", url: "https://react.dev/reference/react", duration: 20 },
      { type: "video", title: "React Hooks Crash Course", url: "#", duration: 45 },
    ],
  },
  "spring-security": {
    title: "Spring Security",
    subject: "Backend Development",
    difficulty: 0.8,
    description:
      "Spring Security is a powerful and highly customizable authentication and access-control framework. It is the de-facto standard for securing Spring-based applications.",
    keyPoints: [
      "Authentication vs Authorization",
      "Filter Chain Architecture",
      "JWT token-based security",
      "Method-level security with @PreAuthorize",
      "CORS and CSRF configuration",
    ],
    resources: [
      { type: "article", title: "Spring Security Docs", url: "https://spring.io/projects/spring-security", duration: 30 },
      { type: "video", title: "Spring Security JWT Tutorial", url: "#", duration: 60 },
    ],
  },
};

export default function LearnPage() {
  const { conceptId } = useParams<{ conceptId: string }>();
  const router = useRouter();
  const concept = MOCK_CONCEPTS[conceptId as string] ?? MOCK_CONCEPTS["react-hooks"];

  const difficultyLabel = concept.difficulty < 0.4 ? "Beginner" : concept.difficulty < 0.7 ? "Intermediate" : "Advanced";
  const difficultyColor = concept.difficulty < 0.4 ? "success" : concept.difficulty < 0.7 ? "warning" : "error";

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
            <H1>{concept.title}</H1>
            <Badge variant={difficultyColor as any}>{difficultyLabel}</Badge>
          </div>
          <Button
            className="gap-2 shrink-0"
            onClick={() => router.push(`/quiz/${conceptId}`)}
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
            <H3>Key Concepts</H3>
            <ul className="space-y-3">
              {concept.keyPoints.map((point: string, i: number) => (
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

        {/* Resources */}
        <div className="space-y-4">
          <H3>Learning Resources</H3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {concept.resources.map((r: any, i: number) => (
              <a key={i} href={r.url} target="_blank" rel="noopener noreferrer">
                <Card className="p-5 flex items-center gap-4 hover:border-primary/40 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    {r.type === "video" ? <Play className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">{r.title}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Clock className="w-3 h-3" />
                      {r.duration} min
                    </div>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Button size="lg" className="gap-2" onClick={() => router.push(`/quiz/${conceptId}`)}>
            Test Your Knowledge <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
