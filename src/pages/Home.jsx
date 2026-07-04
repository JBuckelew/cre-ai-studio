import React from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import HeroSection from "../components/landing/HeroSection";
import ValuePropositionSection from "../components/landing/ValuePropositionSection";
import ToolsSection from "../components/landing/ToolsSection";
import MissionSection from "../components/landing/MissionSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import WhyChooseSection from "../components/landing/WhyChooseSection";
import AISurveySection from "../components/landing/AISurveySection";

export default function Home() {
  usePageMeta({
    title: "",
    description: "The CRE AI Course + Community Access. Weekly, step-by-step AI tutorials showing you how to execute specific Commercial Real Estate tasks with specific AI tools.",
    path: "/",
  });
  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection />
      <TestimonialsSection />
      <ValuePropositionSection />
      <WhyChooseSection />
      <MissionSection />
      <AISurveySection />
    </div>
  );
}