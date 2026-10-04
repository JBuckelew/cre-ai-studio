import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Calendar, Clock, User, Zap, Code2, Rocket, Terminal } from "lucide-react";

const STRIPE_URL = "https://buy.stripe.com/14A3cw3xR8D48d3gXYcV20q";

const AGENDA = [
  { time: "0:00", duration: "6 min", title: "Opening", desc: "Open live on SiteMap CRE, the platform built by a broker with no engineering background. Set expectations plainly: what attendees will leave with, and what they will not.", icon: Rocket },
  { time: "6:00", duration: "12 min", title: "Decide to Build or Buy", desc: "Four signals a tool is worth building, and four signals to walk away. The three-question test: can you prompt it, can you buy it, or should you build it. Score three real CRE ideas live against the test.", icon: CheckCircle },
  { time: "18:00", duration: "16 min", title: "How Vibe Coding Actually Works", desc: "What is really happening when you prompt, in plain language and no jargon. The four habits that decide whether it works, and the four ingredients nearly every CRE tool is made of.", icon: Code2 },
  { time: "34:00", duration: "26 min", title: "Live Build: A Rent Schedule Builder", desc: "Show the finished tool first, then build the same thing from an empty folder. Three live changes, narrating the technique behind each one. Deploy it to the internet and open it on a phone before the segment ends.", icon: Terminal, highlight: true },
  { time: "60:00", duration: "18 min", title: "From a Tool to a Real System", desc: "What an API actually is, and the three kinds of connection in plain terms. Real integrations: what each one solved, what it cost, and what broke. The honest gap between a weekend tool and a product people pay for.", icon: Zap },
  { time: "78:00", duration: "12 min", title: "Resources, Offer, and Q&A", desc: "Resource pack: the finished app, prompt patterns, a build-or-buy checklist, cost sheet and glossary. SiteMap CRE discount code for attendees. Open Q&A.", icon: CheckCircle },
];

export default function VibeCodeWorkshopCard() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-blue-100 blur-[100px] opacity-50" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-orange-100 blur-[100px] opacity-50" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-2xl rounded-3xl">
            {/* Gradient top bar */}
            <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500" />

            <div className="absolute top-6 left-6 z-10 flex gap-2">
              <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-4 py-2 text-sm border-0">
                NEW WORKSHOP
              </Badge>
              <Badge className="bg-blue-100 text-blue-700 font-bold px-4 py-2 text-sm border-0">
                LIVE
              </Badge>
            </div>

            <CardContent className="p-10 md:p-12">
              {/* Header */}
              <div className="mb-10 mt-8">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
                  How to Vibe Code Your{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    First App for CRE
                  </span>
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                  A 90-minute working session for brokers, analysts, asset managers and investors. One app built live, honest costs, and no hype.
                </p>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <img
                    src="https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/a11a7b3e4_image.png"
                    alt="Tristen Palori"
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-200 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-slate-900 text-lg">Tristen Palori</div>
                    <div className="text-sm text-slate-600">Commercial Broker at Foresite CRE and Co-founder of SiteMap CRE</div>
                  </div>
                  <User className="w-5 h-5 text-blue-600 flex-shrink-0 hidden sm:block" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-10">
                {/* LEFT COLUMN - AGENDA TIMELINE */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-blue-600" />
                    90-Minute Agenda
                  </h3>
                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-200 via-indigo-200 to-orange-200" />

                    <ul className="space-y-5">
                      {AGENDA.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="relative flex items-start gap-4"
                          >
                            {/* Icon node */}
                            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center z-10 border-2 ${
                              item.highlight
                                ? "bg-gradient-to-br from-blue-600 to-indigo-600 border-blue-300 text-white shadow-lg shadow-blue-200"
                                : "bg-white border-slate-200 text-blue-600"
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>

                            <div className="flex-1 pt-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{item.time}</span>
                                <span className="text-xs text-slate-400">{item.duration}</span>
                                {item.highlight && (
                                  <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">LIVE BUILD</span>
                                )}
                              </div>
                              <div className="font-semibold text-slate-900">{item.title}</div>
                              <div className="text-sm text-slate-600 leading-relaxed mt-0.5">{item.desc}</div>
                            </div>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* RIGHT COLUMN - DETAILS */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-blue-600" />
                    Workshop Details
                  </h3>

                  {/* Details card with gradient border */}
                  <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-blue-600 via-indigo-600 to-orange-500">
                    <div className="rounded-2xl bg-white p-6 space-y-5">
                      <div>
                        <div className="text-sm font-semibold text-slate-500 mb-1">Date</div>
                        <div className="text-lg font-bold text-slate-900">October 29th, 2026</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-500 mb-1">Time</div>
                        <div className="text-lg font-bold text-slate-900">1:00 PM ET</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-500 mb-1">Duration</div>
                        <div className="text-lg font-bold text-slate-900">90 minutes, live</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-500 mb-1">Who it's for</div>
                        <div className="text-lg font-bold text-slate-900">Brokers, analysts, asset managers, investors</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-500 mb-1">Investment</div>
                        <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">$100</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-500 mb-1">You leave with</div>
                        <div className="text-base font-bold text-slate-900 leading-relaxed">A way to decide what is worth building, a working understanding of how the tools function, a finished app you watched get made, and a clear picture of what comes after</div>
                      </div>
                    </div>
                  </div>

                  {/* Resource pack */}
                  <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      Resource pack included
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "The finished app",
                        "Prompt patterns",
                        "Build-or-buy checklist",
                        "Cost sheet",
                        "Glossary",
                        "SiteMap CRE discount",
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-slate-700 text-sm">
                          <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col items-center gap-3">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-full px-12 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  onClick={() => window.open(STRIPE_URL, "_blank")}
                >
                  Sign-Up Here
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-sm text-slate-500">Live on October 29th • 90 minutes • Recording included</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}