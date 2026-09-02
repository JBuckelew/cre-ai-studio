import React from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import TrainingHero from "@/components/training/TrainingHero";
import TrainingTestimonials from "@/components/training/TrainingTestimonials";
import TrainingForm from "@/components/training/TrainingForm";

export default function Training() {
  usePageMeta({
    title: "AI Training for Commercial Real Estate Teams | CRE AI Studio",
    description:
      "Custom AI training for CRE brokerages, asset managers, and associations. We survey your team, build every demo on your own workflows, and both founders deliver the session. Recording and prompt pack included.",
    path: "/training",
    appendSiteName: false,
  });

  const scrollToRequest = () =>
    document.getElementById("request")?.scrollIntoView({ behavior: "smooth" });
  const scrollToTestimonials = () =>
    document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-slate-50">
      <TrainingHero
        onRequestClick={scrollToRequest}
        onTestimonialsClick={scrollToTestimonials}
      />
      <TrainingTestimonials />
      <TrainingForm />
    </div>
  );
}