import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "What does AI training for a commercial real estate team cost?",
    a: "Sessions are a flat fee, agreed in writing before we build anything, and invoiced after delivery. The number depends on how much of the session is net new: one we have built before costs less than one designed from scratch for your document types. Enterprise programs run off a rate card instead of a single total. Tell us who is in the room and we will quote it.",
  },
  {
    q: "Which AI tool do you train on?",
    a: "Yours. We have delivered training on Microsoft 365 Copilot, Claude, ChatGPT, and Gemini with NotebookLM. If your firm has already picked a platform, that is the one we teach. If you are still choosing, we will tell you what we would pick and why.",
  },
  {
    q: "How long should a session be?",
    a: "Sixty to ninety minutes for one team, up to three hours for a hands-on workshop. We do not go past three. Two ninety-minute sessions beat one three-hour session, because in the shorter format everybody actually gets their questions answered.",
  },
  {
    q: "Can you train a room where only some people have paid licenses?",
    a: "Yes, as long as your company will give a license to anyone who asks. Then the session doubles as internal demand generation, and we frame it as what anyone can do today plus what the paid version adds. It does not work when licenses are rationed, because it becomes a demo of something the room cannot have.",
  },
  {
    q: "Do you travel for in-person training?",
    a: "Yes, in person nationwide, plus remote sessions for distributed teams. Travel is billed separately at cost.",
  },
  {
    q: "What about our internal AI use policy?",
    a: "Send it to us in prep. We build the training around your guidelines and state them clearly in the room. For a lot of firms that is half the reason they are buying: their people do not know what they are allowed to put in the box.",
  },
  {
    q: "What do we have to do?",
    a: "Forward one survey, approve a demo lineup, and pick a date.",
  },
];

export const TRAINING_FAQS = FAQS;

export default function TrainingFAQ() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-[820px] mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-8 text-center">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-slate-200">
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