import React from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import TrainingHero from "@/components/training/TrainingHero";
import TrainingTestimonials from "@/components/training/TrainingTestimonials";
import TrainingForm from "@/components/training/TrainingForm";
import TrainingBridge from "@/components/training/TrainingBridge";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI training for commercial real estate teams",
  name: "Corporate AI training for commercial real estate",
  provider: {
    "@type": "Organization",
    name: "CRE AI Studio",
    url: "https://creaistudio.com",
  },
  areaServed: "US",
};

export default function Training() {
  usePageMeta({
    title: "AI Training for Commercial Real Estate Teams | CRE AI Studio",
    description:
      "Custom AI training for CRE brokerages, asset managers, and associations. We survey your team, build every demo on your own workflows, and both founders deliver the session. Recording and prompt pack included.",
    path: "/training",
    appendSiteName: false,
    noindex: false,
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
      <TrainingBridge />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </div>
  );
}