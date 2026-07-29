import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SpeakingFAQ({ faqs }) {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-8 text-center">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-slate-200"
            >
              <AccordionTrigger className="text-slate-900 text-left hover:no-underline [&>svg]:text-slate-400">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}