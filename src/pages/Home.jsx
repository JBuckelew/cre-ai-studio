import React from "react";
import HeroSection from "../components/landing/HeroSection";
import ValuePropositionSection from "../components/landing/ValuePropositionSection";
import ToolsSection from "../components/landing/ToolsSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import MissionSection from "../components/landing/MissionSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import WhyChooseSection from "../components/landing/WhyChooseSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection />
      <WhyChooseSection />
      <MissionSection />
      <TestimonialsSection />
      <ValuePropositionSection />
      <ToolsSection />
    </div>
  );
}