import React from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import HeroSection from "../components/landing/HeroSection";
import StudioTourSection from "../components/landing/StudioTourSection";
import ToolsSection from "../components/landing/ToolsSection";
import MissionSection from "../components/landing/MissionSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import AISurveySection from "../components/landing/AISurveySection";
import MembershipPricing from "../components/pricing/MembershipPricing";
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
      <MembershipPricing id="pricing" className="pb-12 sm:pb-16" />
      <TestimonialsSection />
      <StudioTourSection />
      <MissionSection />
      <AISurveySection />
    </div>
  );
}