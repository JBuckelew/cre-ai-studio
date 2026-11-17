import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Presentation, Wrench, Check, ArrowRight } from "lucide-react";

const OFFERS = [
  {
    key: "training",
    icon: Presentation,
    eyebrow: "Corporate AI training",
    title: "Train your team on the AI platform you already pay for",
    body: "Live sessions built around your firm's platform, subscription and workflows. Over video, or onsite if you prefer.",
    points: [
      "Claude, ChatGPT, Gemini or Microsoft Copilot",
      "Demos on your team's real work, with time for Q&A",
      "One session, multi-team packages, or enterprise cohorts",
      "Recordings your team can come back to",
    ],
    cta: "Explore team training",
    href: "/training",
    accent: "from-blue-600 to-indigo-600",
    chip: "bg-blue-50 text-blue-700",
  },
  {
    key: "consulting",
    icon: Wrench,
    eyebrow: "AI consulting",
    title: "We build the AI workflows your firm needs",
    body: "We learn how your team works, map where AI pays off, then build it with your team involved the whole way.",
    points: [
      "AI strategy and a prioritized adoption roadmap",
      "Custom Claude skills and AI agents",
      "Lease, PSA and loan doc review and extraction",
      "Automations that connect the tools you already use",
    ],
    cta: "Explore consulting",
    href: "/Consulting",
    accent: "from-amber-500 to-orange-500",
    chip: "bg-amber-50 text-amber-700",
  },
];

const FIRMS = ["SVN International", "RE/MAX Commercial", "Coldwell Banker Commercial"];

export default function MissionSection() {
  return (
    <section
      id="training-consulting"
      className="py-20 lg:py-32 bg-gradient-to-b from-slate-50 to-slate-100 relative overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-blue-100/50 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-amber-100/50 to-transparent rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 md:mb-16"
        >
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
            For CRE firms
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            AI{" "}
            <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              training and consulting
            </span>{" "}
            for commercial real estate teams
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Want your whole team using AI, or a workflow built for you? We work directly with
            brokerages, owner/operators, investment firms and associations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {OFFERS.map((offer, i) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={offer.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 * i }}
                className="relative flex flex-col overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${offer.accent}`} />
                <div className="flex flex-1 flex-col p-6 sm:p-8 md:p-10">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${offer.accent} text-white shadow-sm`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${offer.chip}`}>
                      {offer.eyebrow}
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl md:text-[1.7rem] font-bold leading-snug tracking-tight text-slate-900">
                    {offer.title}
                  </h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">{offer.body}</p>
                  <ul className="mt-6 space-y-3">
                    {offer.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-slate-700">
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-2 lg:mt-auto">
                    <a
                      href={offer.href}
                      className="group inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                      {offer.cta}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 md:mt-12 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Training CRE teams since March 2024, including
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {FIRMS.map((firm) => (
              <span key={firm} className="text-lg md:text-xl font-bold text-slate-700">
                {firm}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
