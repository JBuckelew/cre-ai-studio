import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, Bot, FileSearch, Presentation, Workflow, Building2, CheckCircle, Calendar } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/jonathan-creaistudio/30min";

const services = [
  {
    icon: <Bot className="w-8 h-8" />,
    title: "Claude Skills & AI Agents",
    description: "We build custom Claude Projects and AI agents tailored to your firm's specific workflows — from lease abstraction bots to deal screening assistants.",
    tags: ["Claude Projects", "Custom Prompts", "AI Workflows"],
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/30",
  },
  {
    icon: <FileSearch className="w-8 h-8" />,
    title: "Document Intelligence",
    description: "Automate the review, extraction, and analysis of leases, PSAs, loan docs, and more. Cut hours of manual review down to minutes.",
    tags: ["Lease Review", "Due Diligence", "Risk Flagging"],
    color: "from-purple-500/20 to-purple-600/10",
    border: "border-purple-500/30",
  },
  {
    icon: <Workflow className="w-8 h-8" />,
    title: "Workflow Automation",
    description: "Connect your CRE tools — CoStar, Yardi, Salesforce, Excel — with AI-powered automations that eliminate repetitive tasks and reduce errors.",
    tags: ["Process Automation", "Tool Integration", "Time Savings"],
    color: "from-pink-500/20 to-pink-600/10",
    border: "border-pink-500/30",
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI Strategy & Roadmapping",
    description: "Not sure where to start? We audit your current workflows and build a prioritized AI adoption roadmap so you invest in what actually moves the needle.",
    tags: ["AI Audit", "Roadmap", "Change Management"],
    color: "from-amber-500/20 to-amber-600/10",
    border: "border-amber-500/30",
  },
  {
    icon: <Presentation className="w-8 h-8" />,
    title: "Team Training & Workshops",
    description: "Custom, hands-on training sessions for your team — brokers, analysts, lawyers, or asset managers. Practical. Role-specific. No fluff.",
    tags: ["Onsite Training", "Custom Curriculum", "Team Enablement"],
    color: "from-green-500/20 to-green-600/10",
    border: "border-green-500/30",
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "CRE-Specific AI Buildouts",
    description: "From investment memo generators to tenant communication assistants, we build purpose-built AI tools for commercial real estate teams.",
    tags: ["Custom Builds", "Deal Memos", "Market Reports"],
    color: "from-cyan-500/20 to-cyan-600/10",
    border: "border-cyan-500/30",
  },
];

const processSteps = [
  { step: "01", title: "Discovery Call", desc: "We learn about your team, tools, and biggest workflow pain points." },
  { step: "02", title: "Custom Proposal", desc: "We map out exactly what we'll build, the timeline, and investment." },
  { step: "03", title: "Build & Implement", desc: "We build, test, and deploy — with your team involved the whole way." },
  { step: "04", title: "Train & Hand Off", desc: "We train your team and ensure everything sticks long after we're done." },
];

export default function Consulting() {
  const openCalendly = () => {
    window.open(CALENDLY_URL, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">

      {/* HERO */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block bg-blue-500/10 border border-blue-400/30 rounded-full px-6 py-2 mb-8">
              <span className="text-sm font-semibold text-blue-300">AI Consulting for CRE</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
              We Build AI That{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Works for You
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light mb-10">
              From custom Claude skills to full workflow automation — we help CRE firms implement AI that saves time, reduces errors, and gives you a real competitive edge.
            </p>

            <Button
              onClick={openCalendly}
              className="h-14 px-10 bg-gradient-to-r from-purple-600 via-blue-600 to-blue-500 hover:opacity-90 text-white font-bold text-lg rounded-full shadow-xl transition-all duration-300 group"
            >
              Schedule a Free Strategy Call
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <p className="text-slate-500 text-sm mt-4">No commitment. 30 minutes. Walk away with clarity.</p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-20 bg-slate-950/50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4">What We Build</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Practical AI solutions designed specifically for commercial real estate workflows.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className={`bg-gradient-to-br ${service.color} border ${service.border} h-full hover:scale-[1.02] transition-transform duration-300`}>
                  <CardContent className="p-6">
                    <div className="text-blue-400 mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <Badge key={tag} className="bg-white/10 text-slate-300 border-0 text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4">How It Works</h2>
            <p className="text-slate-400 text-lg">Simple, fast, and built around your team.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-black text-blue-900 mb-3">{item.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF STRIP */}
      <section className="py-12 bg-slate-950/60 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { stat: "200+", label: "CRE Professionals Trained" },
              { stat: "6+", label: "Custom AI Tools Deployed" },
              { stat: "CBRE · Newmark · MetLife", label: "Organizations Represented" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl font-black text-white mb-1">{item.stat}</div>
                <div className="text-slate-400 text-sm">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Calendar className="w-12 h-12 text-blue-400 mx-auto mb-6" />
            <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
              Ready to See What AI Can Do for Your Firm?
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed font-light">
              Book a free 30-minute strategy call. We'll identify your biggest workflow opportunities and show you exactly what's possible.
            </p>

            <Button
              onClick={openCalendly}
              className="h-14 px-12 bg-gradient-to-r from-purple-600 via-blue-600 to-blue-500 hover:opacity-90 text-white font-bold text-lg rounded-full shadow-2xl transition-all duration-300 group"
            >
              Book Your Free Call
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-slate-400">
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> No commitment</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> 30 minutes</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Actionable takeaways</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}