import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SpeakingFAQ({ faqs }) {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-8 text-center">
        Frequently asked questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="border-[#3F3F5A]"
          >
            <AccordionTrigger className="text-white text-left hover:no-underline [&>svg]:text-[#9CA3AF]">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-[#9CA3AF] leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}