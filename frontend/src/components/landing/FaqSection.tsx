"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

const faqs = [
  {
    question: "Is Focusly free?",
    answer: "Yes, Focusly offers a completely free tier that includes basic AI tutoring, note taking, and spaced repetition features. We also plan to offer premium features for advanced users in the future."
  },
  {
    question: "Can I upload my own notes?",
    answer: "Absolutely! The Smart Notes feature allows you to upload TXT, PDF, and DOCX files. Our AI will automatically summarize them and extract key concepts for you."
  },
  {
    question: "How does the AI Tutor help with exams?",
    answer: "The AI Tutor can generate practice quizzes, explain complex topics using simple analogies, and identify your weak spots based on your performance history (your Learning DNA)."
  },
  {
    question: "Is my data secure?",
    answer: "Yes. Your personal notes, learning progress, and account details are securely stored. We do not sell your personal data."
  },
  {
    question: "Can I use it on mobile?",
    answer: "Focusly is built as a progressive web app (PWA), meaning it's fully responsive and works beautifully on your phone's web browser. You can even install it to your home screen."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-32 bg-background relative overflow-hidden transition-colors duration-300">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border text-muted-foreground mb-6 font-medium text-sm">
            <MessageCircleQuestion className="w-4 h-4 text-primary" />
            Got Questions?
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about Focusly. Can't find the answer you're looking for? Reach out to our team.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`overflow-hidden rounded-2xl border-2 transition-all duration-300 ${isOpen ? 'border-primary/50 bg-card shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'border-border bg-card/50 hover:border-border hover:bg-muted/50'}`}
              >
                <button
                  className="flex items-center justify-between w-full p-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-2xl"
                  onClick={() => toggleOpen(index)}
                >
                  <span className="font-semibold text-lg pr-8 text-foreground">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 15 }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-primary text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-muted text-muted-foreground'}`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-muted-foreground leading-relaxed text-base pt-2 border-t border-border mt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
