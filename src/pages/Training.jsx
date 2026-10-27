import React from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import TrainingHero from "@/components/training/TrainingHero";
import TrainingWho from "@/components/training/TrainingWho";
import TrainingDifference from "@/components/training/TrainingDifference";
import TrainingHow from "@/components/training/TrainingHow";
import TrainingPlatforms from "@/components/training/TrainingPlatforms";
import TrainingFormats from "@/components/training/TrainingFormats";
import TrainingByTeam from "@/components/training/TrainingByTeam";
import TrainingInstructors from "@/components/training/TrainingInstructors";
import TrainingTestimonials from "@/components/training/TrainingTestimonials";
import TrainingFAQ, { FAQ_ITEMS } from "@/components/training/TrainingFAQ";
import TrainingSupportingQuotes from "@/components/training/TrainingSupportingQuotes";
import TrainingForm from "@/components/training/TrainingForm";
import TrainingBridge from "@/components/training/TrainingBridge";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CRE AI Studio",
  url: "https://creaistudio.com",
  email: "topher@creaistudio.com",
  logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/render/image/public/base44-prod/public/68a7d83d574299e5af5ccbd3/4da799a0b_CREAIStudioLogoDesign.png?width=1200&height=630&resize=contain",
  founder: [
    { "@type": "Person", name: "Topher Stephenson" },
    { "@type": "Person", name: "Jonathan Buckelew" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Corporate AI training for commercial real estate firms",
  name: "AI training for commercial real estate teams",
  description:
    "CRE AI training for commercial real estate firms on Claude, ChatGPT, Gemini, or Copilot. Built around your platform, subscription, and workflows. Sessions run over live video, or onsite if you prefer. Training CRE teams on AI since March 2024.",
  provider: {
    "@type": "Organization",
    name: "CRE AI Studio",
    url: "https://creaistudio.com",
  },
  areaServed: "US",
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Commercial real estate firms and teams",
  },
  url: "https://creaistudio.com/training",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Corporate AI training for commercial real estate teams",
  description:
    "AI training for commercial real estate teams on Claude, ChatGPT, Gemini, or Copilot. Built around your firm's platform and workflows. Sessions run over live video, or onsite if you prefer.",
  provider: {
    "@type": "Organization",
    name: "CRE AI Studio",
    url: "https://creaistudio.com",
  },
  educationalLevel: "Professional",
  teaches: "AI tools and workflows for commercial real estate teams",
  url: "https://creaistudio.com/training",
};

export default function Training() {
  usePageMeta({
    title: "AI Training for Commercial Real Estate Teams | CRE AI Studio",
    description:
      "CRE AI training for commercial real estate firms and teams on Claude, ChatGPT, Gemini, or Copilot. A commercial real estate AI training company built around your platform and workflows. Training CRE teams on AI since March 2024.",
    path: "/training",
    appendSiteName: false,
    noindex: false,
    image:
      "https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/6001223af_hero-dual-presenters-a.jpg",
    ogImageAlt: "Topher Stephenson and Jonathan Buckelew, founders of CRE AI Studio",
  });

  const scrollToRequest = () =>
    document.getElementById("request")?.scrollIntoView({ behavior: "smooth" });
  const scrollToHow = () =>
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  const scrollToTestimonials = () =>
    document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-slate-50">
      <TrainingHero
        onRequestClick={scrollToRequest}
        onHowClick={scrollToHow}
        onTestimonialsClick={scrollToTestimonials}
      />
      <TrainingWho />
      <TrainingDifference />
      <TrainingHow />
      <TrainingPlatforms />
      <TrainingFormats />
      <TrainingByTeam />
      <TrainingInstructors />
      <TrainingTestimonials />
      <TrainingFAQ />
      <TrainingSupportingQuotes />
      <TrainingForm />
      <TrainingBridge />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
    </div>
  );
}
