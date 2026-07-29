import React, { useState } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import SpeakingHero from "@/components/speaking/SpeakingHero";
import EngagementsMarquee from "@/components/speaking/EngagementsMarquee";
import FormatsSection from "@/components/speaking/FormatsSection";
import WhyTopher from "@/components/speaking/WhyTopher";
import SpeakingTestimonials from "@/components/speaking/SpeakingTestimonials";
import SpeakingFAQ from "@/components/speaking/SpeakingFAQ";
import BookingForm from "@/components/speaking/BookingForm";
import RecentAppearances from "@/components/speaking/RecentAppearances";
import StudioBridge from "@/components/speaking/StudioBridge";
import { SCARCITY, IMAGES, FAQS } from "@/components/speaking/speakingData";

const OG_IMAGE = IMAGES.heroStage;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Topher Stephenson",
  jobTitle: "AI Keynote Speaker and Trainer for Commercial Real Estate",
  worksFor: { "@type": "Organization", name: "CRE AI Studio" },
  sameAs: ["https://www.linkedin.com/in/topherstephenson/", "https://x.com/TopherNow"],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI keynote speaking and training for commercial real estate",
  provider: { "@type": "Person", name: "Topher Stephenson" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Speaking() {
  usePageMeta({
    title: "AI Speaker for Commercial Real Estate | Topher Stephenson | CRE AI Studio",
    description:
      "Book Topher Stephenson, AI keynote speaker and trainer for commercial real estate. Practical keynotes, hands-on workshops, and webinars for CRE conferences, associations, and brokerage teams.",
    path: "/speaking",
    image: OG_IMAGE,
    type: "website",
    noindex: false,
    appendSiteName: false,
  });

  const [selectedFormat, setSelectedFormat] = useState("Not sure yet");

  const handleRequestFormat = (format) => {
    setSelectedFormat(format);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToForm = () =>
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  const scrollToTestimonials = () =>
    document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1A1A2F, #151528)" }}
    >
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: "rgba(99,102,241,0.18)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: "rgba(232,115,90,0.14)" }}
      />

      <div className="relative z-10">
        <SpeakingHero
          scarcity={SCARCITY}
          onBookClick={scrollToForm}
          onSeeTestimonials={scrollToTestimonials}
          heroImage={IMAGES.heroStage}
        />
        <EngagementsMarquee />
        <FormatsSection onRequestFormat={handleRequestFormat} />
        <WhyTopher portraitImage={IMAGES.speakerPortrait} />
        <SpeakingTestimonials bannerImage={IMAGES.audienceHero} />
        <SpeakingFAQ faqs={FAQS} />
        <div id="booking">
          <BookingForm
            scarcity={SCARCITY}
            selectedFormat={selectedFormat}
            formImage={IMAGES.speakerPortrait}
          />
        </div>
        <RecentAppearances />
        <StudioBridge />

        <section className="border-t border-[#3F3F5A] py-10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-[#9CA3AF] text-sm mb-3">
              Topher Stephenson. Co-founder of CRE AI Studio. AI speaker and trainer for commercial real estate.
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <a
                href="https://www.linkedin.com/in/topherstephenson/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9CA3AF] hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/TopherNow"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9CA3AF] hover:text-white transition-colors"
              >
                @TopherNow on X
              </a>
              <a
                href="https://creaistudio.beehiiv.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9CA3AF] hover:text-white transition-colors"
              >
                Newsletter
              </a>
            </div>
            <p className="text-[#9CA3AF] text-sm mt-3">topher@creaistudio.com · 484-695-6902</p>
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}