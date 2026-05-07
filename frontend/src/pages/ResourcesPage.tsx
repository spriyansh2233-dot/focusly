import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { H1, H2, Body } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { fetchWithAuth } from "@/lib/api";
import { ExternalLink, Play, FileText, Clock, BookMarked } from "lucide-react";

const MOCK_RESOURCES = [
  {
    id: "1",
    title: "React Hooks — Official Documentation",
    url: "https://react.dev/reference/react",
    resourceType: "article",
    source: "React.dev",
    estimatedDurationMinutes: 20,
    qualityRating: 0.98,
    summary: "The definitive reference for all built-in React Hooks with interactive examples.",
    conceptName: "React Hooks",
  },
  {
    id: "2",
    title: "Spring Security JWT Tutorial",
    url: "https://www.baeldung.com/spring-security-oauth-jwt",
    resourceType: "article",
    source: "Baeldung",
    estimatedDurationMinutes: 35,
    qualityRating: 0.92,
    summary: "Step-by-step guide to implementing JWT authentication with Spring Security.",
    conceptName: "Spring Security",
  },
  {
    id: "3",
    title: "React Hooks Crash Course",
    url: "https://www.youtube.com/watch?v=TNhaISOUy6Q",
    resourceType: "video",
    source: "YouTube",
    estimatedDurationMinutes: 45,
    qualityRating: 0.89,
    summary: "Complete crash course covering useState, useEffect, useContext, and custom hooks.",
    conceptName: "React Hooks",
  },
  {
    id: "4",
    title: "Spaced Repetition: A Guide to the Technique",
    url: "https://ncase.me/remember/",
    resourceType: "article",
    source: "ncase.me",
    estimatedDurationMinutes: 15,
    qualityRating: 0.95,
    summary: "An interactive essay on how spaced repetition works and why it's so powerful for learning.",
    conceptName: "Study Techniques",
  },
];

export default function ResourcesPage() {
  const [resources, setResources] = useState(MOCK_RESOURCES);
  const [filter, setFilter] = useState<"all" | "article" | "video">("all");

  useEffect(() => {
    fetchWithAuth("/resources").then(setResources).catch(() => {
      setResources(MOCK_RESOURCES);
    });
  }, []);

  const filtered = filter === "all" ? resources : resources.filter((r) => r.resourceType === filter);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto pb-16 space-y-8">
        <div>
          <H1>Learning Resources</H1>
          <Body className="text-muted-foreground mt-1">Curated articles, videos, and guides for your learning path</Body>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {(["all", "article", "video"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize
                ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80 text-muted-foreground"}`}
            >
              {f === "all" ? "All" : f === "article" ? "📄 Articles" : "▶ Videos"}
            </button>
          ))}
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((resource) => (
            <a key={resource.id} href={resource.url} target="_blank" rel="noopener noreferrer" className="group">
              <Card variant="elevated" className="p-5 hover:border-primary/40 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-primary/5">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${resource.resourceType === "video" ? "bg-red-500/10 text-red-400" : "bg-blue-500/10 text-blue-400"}`}>
                    {resource.resourceType === "video" ? <Play className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold group-hover:text-primary transition-colors">{resource.title}</p>
                      <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <Body className="text-muted-foreground text-sm line-clamp-2">{resource.summary}</Body>
                    <div className="flex items-center gap-3 pt-1 flex-wrap">
                      <Badge variant="default">{resource.conceptName}</Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" /> {resource.estimatedDurationMinutes} min
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <BookMarked className="w-3 h-3" /> {resource.source}
                      </span>
                      <span className="text-xs text-yellow-400">
                        {"★".repeat(Math.round(resource.qualityRating * 5))} {(resource.qualityRating * 5).toFixed(1)}/5
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
