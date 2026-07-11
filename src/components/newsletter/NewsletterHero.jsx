import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { subscribeToBeehiiv } from "@/functions/subscribeToBeehiiv";

const ORGS = ["CBRE", "Newmark", "Colliers", "Cushman & Wakefield", "JLL", "Savills"];

function PhoneMockup() {
  return (
    <div className="relative w-[280px] sm:w-[320px]">
      <div className="relative rounded-[2.5rem] bg-slate-900 p-3 shadow-2xl border-[6px] border-slate-800">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-b-2xl z-20" />
        <div className="relative rounded-[2rem] bg-white overflow-hidden h-[560px] flex flex-col">
          <div className="bg-slate-50 px-4 py-2 flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-100">
            <span>9:41</span>
            <span>● ● ●</span>
          </div>
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Inbox</p>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="px-4 py-4 border-b border-slate-100 bg-blue-50/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold">AI</div>
                <div>
                  <p className="text-xs font-semibold text-slate-900">CRE AI Studio</p>
                  <p className="text-[10px] text-slate-400">Weekly · AI for CRE</p>
                </div>
              </div>
              <p className="text-sm font-bold text-slate-900 leading-snug mb-1">
                Build a Prospecting Pipeline with Claude in 10 Minutes
              </p>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                This week: a step-by-step workflow to turn a target list into a tailored outreach campaign — prompts included.
              </p>
            </div>
            <div className="px-4 py-3 border-b border-slate-100">
              <p className="text-xs font-semibold text-slate-700 truncate">Arik R. — re: workshop</p>
              <p className="text-[10px] text-slate-400 truncate">Thanks for the prompt library...</p>
            </div>
            <div className="px-4 py-3 border-b border-slate-100">
              <p className="text-xs font-semibold text-slate-700 truncate">JLL Research</p>
              <p className="text-[10px] text-slate-400 truncate">Q2 office market report...</p>
            </div>
            <div className="px-4 py-3">
              <p className="text-xs font-semibold text-slate-700 truncate">Colliers — new listing</p>
              <p className="text-[10px] text-slate-400 truncate">Industrial asset, 120k sf...</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[3rem] blur-2xl -z-10" />
    </div>
  );
}

export default function NewsletterHero() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    setErrorMsg("");
    try {
      await subscribeToBeehiiv({ email, source: "newsletter_landing" });
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-4">
              Weekly AI Tutorials in 5 Minutes or Less
            </p>
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Get smarter with AI for commercial real estate
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
              Start your week with the CRE AI Studio newsletter — free, hands-on AI tutorials, prompt libraries, and real CRE workflows delivered straight to your inbox.
            </p>

            {status === "success" ? (
              <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-5 max-w-md">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                <div>
                  <p className="font-semibold text-green-900">You're in!</p>
                  <p className="text-sm text-green-700">Check your inbox to confirm your subscription.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="h-12 px-7 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-60 whitespace-nowrap inline-flex items-center justify-center"
                >
                  {status === "submitting" ? "Subscribing..." : "SUBSCRIBE"}
                  {status !== "submitting" && <ArrowRight className="ml-2 w-4 h-4" />}
                </button>
              </form>
            )}

            {status === "error" && (
              <p className="text-sm text-red-600 mt-3">{errorMsg}</p>
            )}

            <p className="text-sm text-slate-500 mt-4 max-w-md">
              Your privacy is our priority. Unsubscribe anytime. See our{" "}
              <a href="/Privacy-Policy" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </p>

            <div className="mt-12">
              <p className="text-sm font-medium uppercase tracking-widest text-slate-500 mb-5">
                Join hundreds of CRE professionals from:
              </p>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                {ORGS.map((o) => (
                  <span key={o} className="text-xl font-bold text-slate-400">{o}</span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end order-first lg:order-last"
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}