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
    title: "CRE AI Studio | Learn to Use AI for Commercial Real Estate",
    description: "AI training for commercial real estate pros. Weekly hands-on tutorials & templates, live Q&A, and community of hundreds of CRE pros. Start your 7-day free trial, cancel anytime.",
    path: "/",
    appendSiteName: false,
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