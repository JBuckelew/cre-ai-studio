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
    "Corporate AI training for CRE firms, built around your platform, your tools, and your team's real work. Live online (or onsite). Led by both founders.",
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
    "Firm-built AI training for commercial real estate teams on Claude, ChatGPT, Gemini, or Copilot. Live online by default, delivered by both founders.",
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
      "Corporate AI training for CRE firms, built around your platform, your tools, and your team's real work. Live online (or onsite). Led by both founders.",
    path: "/training",
    appendSiteName: false,
    noindex: false,
    image:
      "https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/ddd6f4855_topher-presenting.jpg",
    ogImageAlt: "Topher Stephenson delivering AI training for a commercial real estate team",
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
