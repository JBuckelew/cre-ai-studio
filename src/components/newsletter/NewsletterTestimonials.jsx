import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    content: "Since joining the platform, I'm reclaiming hours every single week. What once took me hours to compile and format now gets done in a fraction of the time using the step-by-step workflows and automation templates.",
    name: "Daniel Levison",
    role: "CEO, CRE Holdings USA",
  },
  {
    content: "I ran your Prospecting Pipeline Claude skill against one I built myself. Yours was much better!",
    name: "Sam Harrell",
    role: "Industrial Broker",
  },
  {
    content: "Their property ownership research skill worked like a dream!",
    name: "Arik Roshanzamir",
    role: "Founder, Bond Street Properties",
  },
  {
    content: "CRE AI Studio cuts through the noise. Instead of abstract AI talk, it delivers real, industry-specific workflows that actually work in production.",
    name: "Isaac Herrera",
    role: "CEO, Cobroker.AI",
  },
  {
    content: "The monthly cost is an absolute no-brainer for anyone trying to improve. That could be as an individual or a company, crazy value.",
    name: "Matt Cooper",
    role: "Founder, Stride CRE",
  },
  {
    content: "Honestly, I have spent thousands of dollars on AI classes over the past three years, and this group is VASTLY underpriced for the value you are all bringing.",
    name: "Ben Nolte",
    role: "Senior Advisor, NAI SunVista",
  },
];

export default function NewsletterTestimonials() {
  const [api, setApi] = useState(null);

  return (
    <section className="bg-[#1a1a2e] py-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left fixed column */}
        <div className="lg:sticky lg:top-24 self-start">
          <h2 className="font-serif text-3xl lg:text-5xl font-semibold text-white leading-tight">
            Everything you need to <span className="italic">know</span> to put AI to work in CRE
          </h2>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-md">
            AI is moving fast, but if you're a busy commercial real estate professional like most, you don't have time to sift through generic tutorials and hype-filled newsletters. We do the heavy lifting — real CRE workflows, tested prompts, and practical tutorials, every week.
          </p>
        </div>

        {/* Right carousel column */}
        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-white">
              What readers are saying
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => api?.scrollPrev()}
                aria-label="Previous testimonials"
                className="w-9 h-9 rounded-full bg-[#252545] text-purple-400 hover:bg-purple-700 hover:text-white transition-colors flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => api?.scrollNext()}
                aria-label="Next testimonials"
                className="w-9 h-9 rounded-full bg-[#252545] text-purple-400 hover:bg-purple-700 hover:text-white transition-colors flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <Carousel
            opts={{ align: "start", loop: true, dragFree: false }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="items-start">
              {TESTIMONIALS.map((t, i) => (
                <CarouselItem
                  key={i}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="bg-[#252545] rounded-2xl p-6 flex flex-col gap-3 min-h-[140px]">
                    <p className="text-slate-200 text-base leading-relaxed">{t.content}</p>
                    <div>
                      <p className="font-bold text-white">{t.name}</p>
                      <p className="text-sm text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}