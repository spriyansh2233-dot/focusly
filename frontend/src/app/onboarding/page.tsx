"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { H2, H3, Body } from "@/components/ui/typography";
import { toast } from "sonner";
import { fetchWithAuth } from "@/lib/api";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNext = () => setStep(step + 1);

  const handleGeneratePath = async () => {
    setLoading(true);
    try {
      await fetchWithAuth("/paths/generate", {
        method: "POST",
        body: JSON.stringify({ goal: goal || "Learn Web Development" }),
      });
      toast.success("Learning path generated successfully!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to generate path");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] py-10">
        <div className="w-full max-w-2xl mb-8 flex items-center justify-between">
          <div className={`h-2 flex-1 mx-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
          <div className={`h-2 flex-1 mx-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
          <div className={`h-2 flex-1 mx-1 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-muted'}`} />
        </div>

        <Card variant="elevated" className="w-full max-w-2xl p-8">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center">
                <H2>Welcome to Focusly</H2>
                <Body className="text-muted-foreground mt-2">Let's personalize your learning experience.</Body>
              </div>
              
              <div className="space-y-4">
                <H3>What is your primary learning goal?</H3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Learn React", "Master Java Spring Boot", "Ace my CS exams", "Learn Python for Data Science"].map((opt) => (
                    <div 
                      key={opt}
                      onClick={() => setGoal(opt)}
                      className={`p-4 border rounded-xl cursor-pointer transition-colors ${goal === opt ? 'border-primary bg-primary/10' : 'hover:border-primary/50'}`}
                    >
                      <Body className="font-medium">{opt}</Body>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <Button onClick={handleNext} disabled={!goal}>Continue</Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center">
                <H2>Knowledge Assessment</H2>
                <Body className="text-muted-foreground mt-2">Just a quick question to gauge your current level.</Body>
              </div>

              <div className="space-y-4 p-6 bg-muted/30 rounded-xl">
                <Body className="font-medium">How comfortable are you with programming concepts?</Body>
                <div className="space-y-3 mt-4">
                  {["Beginner (No experience)", "Intermediate (Know basics)", "Advanced (Build full apps)"].map((opt) => (
                    <div key={opt} className="p-3 border rounded-lg hover:bg-muted cursor-pointer transition-colors">
                      {opt}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={handleNext}>Submit</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚀</span>
              </div>
              <H2>You're all set!</H2>
              <Body className="text-muted-foreground">We're ready to generate a personalized learning path tailored specifically to your goal: <strong>{goal}</strong>.</Body>
              
              <div className="pt-6">
                <Button size="lg" onClick={handleGeneratePath} disabled={loading} className="w-full md:w-auto px-10">
                  {loading ? "Generating your path..." : "Generate My Learning Path"}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </AppLayout>
  );
}
