import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";

interface ProgressMetricProps {
  label: string;
  value: number;
  subtext: string;
  color: string;
  delay?: number;
}

function ProgressMetric({ label, value, subtext, color, delay = 0 }: ProgressMetricProps) {
  const [count, setCount] = useState(0);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (count / 100) * circumference;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCount(value);
    }, 500 + (delay * 100));
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-24 h-24 mb-3">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-muted/20"
          />
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            stroke={color}
            strokeWidth="6"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut", delay }}
            strokeLinecap="round"
            fill="transparent"
            className="drop-shadow-[0_0_8px_var(--tw-shadow-color)]"
            style={{ "--tw-shadow-color": color } as any}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-black text-foreground">
            {count}%
          </span>
        </div>
      </div>
      <span className="text-xs font-bold text-foreground text-center mb-1 group-hover:text-primary transition-colors uppercase tracking-wider">{label}</span>
      <span className="text-[10px] font-medium text-muted-foreground text-center">{subtext}</span>
    </div>
  );
}

export function CircularProgressSection() {
  const metrics = [
    { label: "Weekly Goal", value: 75, subtext: "3 of 4 hours", color: "#3B82F6" },
    { label: "Learning Path", value: 42, subtext: "Next: AI Basics", color: "#8B5CF6" },
    { label: "Revision", value: 90, subtext: "12 cards left", color: "#10B981" },
    { label: "Quiz Accuracy", value: 85, subtext: "Top 5% student", color: "#F59E0B" },
  ];

  return (
    <Card className="elevated border-border/50">
      <CardContent className="p-6 flex flex-col gap-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, i) => (
            <ProgressMetric key={metric.label} {...metric} delay={i * 0.1} />
          ))}
        </div>
        <div className="border-t border-border/50 pt-3 flex items-center justify-center gap-2 text-lg font-bold">
          <BarChart3 className="text-primary w-5 h-5" />
          Performance Metrics
        </div>
      </CardContent>
    </Card>
  );
}
