import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { H1, H2, Body } from "@/components/ui/typography";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw, ThumbsUp, ThumbsDown, Loader2, Brain } from "lucide-react";
import { toast } from "sonner";

export default function FlashcardPage() {
  const { conceptId } = useParams<{ conceptId: string }>();
  const router = useNavigate();
  const [cards, setCards] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const url = conceptId 
          ? `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/flashcards?conceptId=${conceptId}`
          : `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/flashcards`;
          
        const response = await fetch(url, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch cards");
        const data = await response.json();
        setCards(data);
      } catch (error) {
        toast.error("Failed to load flashcards");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [conceptId]);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  const handleConfidence = async (level: number) => {
    const card = cards[currentIdx];
    try {
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/flashcards/${card.id}/confidence`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ level }),
      });
      toast.success("Progress saved!");
      handleNext();
    } catch (e) {
      toast.error("Failed to save progress");
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <H2>Preparing Flashcards...</H2>
        </div>
      </AppLayout>
    );
  }

  if (cards.length === 0) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
            <Brain className="w-10 h-10 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <H2>No Flashcards Yet</H2>
            <Body className="text-muted-foreground max-w-sm">
              Start learning a topic to generate smart flashcards automatically.
            </Body>
          </div>
          <Button onClick={() => router("/dashboard")}>Back to Dashboard</Button>
        </div>
      </AppLayout>
    );
  }

  const currentCard = cards[currentIdx];

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto py-10 space-y-10">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <H1>Smart Flashcards</H1>
            <Body className="text-muted-foreground">Master concepts through spaced repetition.</Body>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-primary">Card {currentIdx + 1} of {cards.length}</p>
            <div className="w-32 h-2 bg-muted rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300" 
                style={{ width: `${((currentIdx + 1) / cards.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="relative perspective-1000 h-[400px] w-full max-w-2xl mx-auto">
          <motion.div
            className="w-full h-full relative preserve-3d cursor-pointer"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front */}
            <Card className="absolute inset-0 w-full h-full backface-hidden flex flex-col items-center justify-center p-12 text-center bg-gradient-to-br from-card to-muted/30 border-2 border-primary/20 shadow-xl rounded-[2rem]">
               <span className="absolute top-6 left-6 text-[10px] font-bold uppercase tracking-widest text-primary/60">Question</span>
               <H2 className="text-2xl md:text-3xl leading-tight">{currentCard.front}</H2>
               <p className="mt-8 text-sm text-muted-foreground flex items-center gap-2">
                 <RotateCcw className="w-4 h-4" /> Click to flip
               </p>
            </Card>

            {/* Back */}
            <Card className="absolute inset-0 w-full h-full backface-hidden flex flex-col items-center justify-center p-12 text-center bg-primary text-primary-foreground border-2 border-primary shadow-xl rounded-[2rem] rotate-y-180">
               <span className="absolute top-6 left-6 text-[10px] font-bold uppercase tracking-widest text-white/60">Answer</span>
               <H2 className="text-2xl md:text-3xl leading-tight text-white">{currentCard.back}</H2>
               <div className="mt-8 px-4 py-1 rounded-full bg-white/20 text-[10px] font-bold uppercase">
                 {currentCard.category || "Concept"}
               </div>
            </Card>
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={handlePrev} className="rounded-full w-12 h-12">
              <ChevronLeft className="w-6 h-6" />
            </Button>
            
            <AnimatePresence mode="wait">
              {isFlipped && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="flex items-center gap-3"
                >
                  <Button 
                    variant="outline" 
                    className="gap-2 rounded-xl border-red-500/50 text-red-500 hover:bg-red-50"
                    onClick={() => handleConfidence(1)}
                  >
                    <ThumbsDown className="w-4 h-4" /> Hard
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2 rounded-xl border-green-500/50 text-green-500 hover:bg-green-50"
                    onClick={() => handleConfidence(5)}
                  >
                    <ThumbsUp className="w-4 h-4" /> Mastered
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <Button variant="outline" size="icon" onClick={handleNext} className="rounded-full w-12 h-12">
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
          
          <Body className="text-muted-foreground text-sm italic">
            Tip: Be honest with your confidence to improve AI repetition.
          </Body>
        </div>
      </div>
    </AppLayout>
  );
}
