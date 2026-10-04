import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Calendar, Clock, User } from "lucide-react";

const STRIPE_URL = "https://buy.stripe.com/14A3cw3xR8D48d3gXYcV20q";

const AGENDA = [
  { time: "0:00", duration: "6 min", title: "Opening", desc: "Open live on SiteMap CRE, the platform built by a broker with no engineering background. Set expectations plainly: what attendees will leave with, and what they will not." },
  { time: "6:00", duration: "12 min", title: "Decide to Build or Buy", desc: "Four signals a tool is worth building, and four signals to walk away. The three-question test: can you prompt it, can you buy it, or should you build it. Score three real CRE ideas live against the test." },
  { time: "18:00", duration: "16 min", title: "How Vibe Coding Actually Works", desc: "What is really happening when you prompt, in plain language and no jargon. The four habits that decide whether it works, and the four ingredients nearly every CRE tool is made of." },
  { time: "34:00", duration: "26 min", title: "Live Build: A Rent Schedule Builder", desc: "Show the finished tool first, then build the same thing from an empty folder. Three live changes, narrating the technique behind each one. Deploy it to the internet and open it on a phone before the segment ends." },
  { time: "60:00", duration: "18 min", title: "From a Tool to a Real System", desc: "What an API actually is, and the three kinds of connection in plain terms. Real integrations: what each one solved, what it cost, and what broke. The honest gap between a weekend tool and a product people pay for." },
  { time: "78:00", duration: "12 min", title: "Resources, Offer, and Q&A", desc: "Resource pack: the finished app, prompt patterns, a build-or-buy checklist, cost sheet and glossary. SiteMap CRE discount code for attendees. Open Q&A." },
];

export default function VibeCodeWorkshopCard() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-2xl">
            <div className="absolute top-6 left-6 z-10">
              <Badge className="bg-blue-600 text-white font-bold px-4 py-2 text-sm">
                NEW WORKSHOP
              </Badge>
            </div>

            <CardContent className="p-10 md:p-12">
              <div className="mb-10 mt-8">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                  How to Vibe Code Your First App for CRE
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed mb-4">
                  A 90-minute working session for brokers, analysts, asset managers and investors. One app built live, honest costs, and no hype.
                </p>
                <div className="flex items-center gap-2 text-slate-700">
                  <User className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Taught by Tristen Palori, Commercial Broker at Foresite CRE and Co-founder of SiteMap CRE</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-10">
                {/* LEFT COLUMN - AGENDA */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-blue-600" />
                    90-Minute Agenda
                  </h3>
                  <ul className="space-y-4">
                    {AGENDA.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-14 pt-0.5">
                          <span className="text-sm font-bold text-blue-600">{item.time}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{item.title}</div>
                          <div className="text-sm text-slate-600 leading-relaxed mt-0.5">{item.desc}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* RIGHT COLUMN - DETAILS */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-blue-600" />
                    Workshop Details
                  </h3>
                  <div className="space-y-5 bg-slate-50 rounded-2xl p-6">
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
                      <div className="text-lg font-bold text-slate-900">$100</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-500 mb-1">You leave with</div>
                      <div className="text-lg font-bold text-slate-900">A way to decide what is worth building, a working understanding of how the tools function, a finished app you watched get made, and a clear picture of what comes after</div>
                    </div>
                  </div>

                  <div className="mt-6 bg-blue-50 rounded-2xl p-6">
                    <h4 className="font-bold text-slate-900 mb-3">Resource pack included</h4>
                    <ul className="space-y-2">
                      {[
                        "The finished app",
                        "Prompt patterns",
                        "Build-or-buy checklist",
                        "Cost sheet",
                        "Glossary",
                        "SiteMap CRE discount code",
                      ].map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-slate-700">
                          <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-full px-12 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  onClick={() => window.open(STRIPE_URL, "_blank")}
                >
                  Register for $100
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}