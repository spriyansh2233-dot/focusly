import { Metadata } from "next";
import { LandingPageClient } from "@/components/landing/LandingPageClient";

export const metadata: Metadata = {
  title: "Focusly | Study Smarter. Remember Longer.",
  description: "Focusly is an AI-powered study companion built for real students. Master your subjects with spaced repetition, smart notes, and personalized learning paths.",
  openGraph: {
    title: "Focusly | Study Smarter. Remember Longer.",
    description: "Focusly is an AI-powered study companion built for real students.",
    type: "website",
    locale: "en_US",
    siteName: "Focusly",
  },
};

export default function Home() {
  return <LandingPageClient />;
}
