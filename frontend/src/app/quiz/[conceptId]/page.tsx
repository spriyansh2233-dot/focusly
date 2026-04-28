"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { H1, H2, H3, Body } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Clock, ArrowRight, Trophy } from "lucide-react";
import { submitQuiz } from "@/lib/api";
import { toast } from "sonner";

const MOCK_QUESTIONS: Record<string, any[]> = {
  "react-hooks": [
    {
      id: "q1",
      questionText: "Which React Hook is used to manage component state?",
      questionType: "MULTIPLE_CHOICE",
      options: ["useEffect", "useState", "useRef", "useContext"],
      correctAnswer: "useState",
    },
    {
      id: "q2",
      questionText: "What does the useEffect hook replace in class components?",
      questionType: "MULTIPLE_CHOICE",
      options: ["render()", "constructor()", "componentDidMount / componentDidUpdate / componentWillUnmount", "setState()"],
      correctAnswer: "componentDidMount / componentDidUpdate / componentWillUnmount",
    },
    {
      id: "q3",
      questionText: "Which hook would you use to access a DOM element directly?",
      questionType: "MULTIPLE_CHOICE",
      options: ["useState", "useCallback", "useRef", "useMemo"],
      correctAnswer: "useRef",
    },
  ],
  "spring-security": [
    {
      id: "q1",
      questionText: "What is the primary purpose of Spring Security?",
      questionType: "MULTIPLE_CHOICE",
      options: ["Database management", "Authentication and Authorization", "HTTP caching", "Dependency injection"],
      correctAnswer: "Authentication and Authorization",
    },
    {
      id: "q2",
      questionText: "Which annotation enables method-level security in Spring?",
      questionType: "MULTIPLE_CHOICE",
      options: ["@EnableWebSecurity", "@PreAuthorize", "@Secured", "@EnableMethodSecurity"],
      correctAnswer: "@EnableMethodSecurity",
    },
  ],
};

type QuizState = "loading" | "answering" | "feedback" | "finished";

export default function QuizPage() {
  const { conceptId } = useParams<{ conceptId: string }>();
  const router = useRouter();

  const questions = MOCK_QUESTIONS[conceptId as string] ?? MOCK_QUESTIONS["react-hooks"];

  const [state, setState] = useState<QuizState>("answering");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());

  const question = questions[currentIdx];
  const isLast = currentIdx === questions.length - 1;
  const options: string[] = JSON.parse(
    typeof question.options === "string" ? question.options : JSON.stringify(question.options)
  );

  const handleSelect = (option: string) => {
    if (state !== "answering") return;
    setSelectedAnswer(option);
    const correct = option === question.correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore((s) => s + 1);
    setState("feedback");

    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    submitQuiz(question.id, option, timeSpent).catch(() => {});
  };

  const handleNext = () => {
    if (isLast) {
      setState("finished");
    } else {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setStartTime(Date.now());
      setState("answering");
    }
  };

  if (state === "finished") {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6 text-center">
          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-primary" />
          </div>
          <H1>Quiz Complete!</H1>
          <H2 className="text-muted-foreground">
            You scored{" "}
            <span className={pct >= 70 ? "text-green-400" : "text-amber-400"}>
              {score}/{questions.length}
            </span>{" "}
            ({pct}%)
          </H2>
          <Body className="text-muted-foreground max-w-sm">
            {pct >= 70
              ? "Great job! Your spaced repetition schedule has been updated."
              : "Keep it up! Review the material and try again soon."}
          </Body>
          <div className="flex gap-3 mt-4">
            <Button variant="ghost" onClick={() => router.push(`/learn/${conceptId}`)}>
              Review Material
            </Button>
            <Button onClick={() => router.push("/dashboard")}>
              Back to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto py-8 space-y-6">
        {/* Progress Header */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Question {currentIdx + 1} of {questions.length}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> Timed
            </span>
          </div>
          <Progress value={((currentIdx) / questions.length) * 100} className="h-2" />
        </div>

        {/* Question Card */}
        <Card variant="elevated" className="p-8 space-y-6">
          <H2 className="leading-snug">{question.questionText}</H2>

          <div className="grid gap-3">
            {options.map((opt) => {
              let variant = "default";
              if (state === "feedback") {
                if (opt === question.correctAnswer) variant = "correct";
                else if (opt === selectedAnswer && !isCorrect) variant = "wrong";
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  disabled={state === "feedback"}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 text-sm font-medium
                    ${state === "answering" ? "hover:border-primary hover:bg-primary/5 cursor-pointer" : "cursor-default"}
                    ${variant === "correct" ? "border-green-500 bg-green-500/10 text-green-400" : ""}
                    ${variant === "wrong" ? "border-red-500 bg-red-500/10 text-red-400" : ""}
                    ${variant === "default" ? "border-border/50" : ""}
                  `}
                >
                  <span className="flex items-center justify-between">
                    {opt}
                    {variant === "correct" && <CheckCircle className="w-5 h-5 text-green-400" />}
                    {variant === "wrong" && <XCircle className="w-5 h-5 text-red-400" />}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Feedback Row */}
          {state === "feedback" && (
            <div className={`p-4 rounded-xl border ${isCorrect ? "border-green-500/30 bg-green-500/10" : "border-red-500/30 bg-red-500/10"}`}>
              <Body className={isCorrect ? "text-green-400" : "text-red-400"}>
                {isCorrect ? "✅ Correct! Great job." : `❌ The correct answer was: ${question.correctAnswer}`}
              </Body>
            </div>
          )}
        </Card>

        {state === "feedback" && (
          <div className="flex justify-end">
            <Button onClick={handleNext} className="gap-2">
              {isLast ? "See Results" : "Next Question"} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
