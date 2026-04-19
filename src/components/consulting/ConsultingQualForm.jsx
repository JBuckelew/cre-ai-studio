import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { notifyConsultingApplication } from "@/functions/notifyConsultingApplication";

const FIRM_TYPES = ["Law Firm", "Brokerage", "Investment / PE", "Asset Management", "Developer", "REIT", "Other"];
const TEAM_SIZES = ["Just me", "2–5", "6–20", "21–50", "50+"];
const TIMELINES = ["Immediately", "Within 3 months", "3–6 months", "Just exploring"];

const OptionButton = ({ label, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
      selected
        ? "bg-blue-600 border-blue-500 text-white"
        : "bg-white/5 border-white/10 text-slate-300 hover:border-blue-500/50 hover:bg-white/10"
    }`}
  >
    {label}
  </button>
);

export default function ConsultingQualForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", company: "", website: "",
    firm_type: "", team_size: "", timeline: "", biggest_challenge: ""
  });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const canProceed = () => {
    if (step === 1) return form.first_name && form.last_name && form.email && form.company;
    if (step === 2) return form.firm_type && form.team_size;
    if (step === 3) return form.timeline;
    return true;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const application = await base44.entities.ConsultingApplication.create(form);
    // Fire notification but don't block success on it
    notifyConsultingApplication({ application: { ...form, id: application.id } }).catch(console.error);
    setIsSuccess(true);
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Application Received!</h3>
        <p className="text-slate-400 max-w-sm mx-auto text-sm leading-relaxed">
          Thank you for your interest. Our team will review your application and reach out within 1–2 business days if it's a fit.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="flex gap-1.5 mb-8">
        {[1, 2, 3, 4].map(s => (
          <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-300 ${s <= step ? "bg-blue-500" : "bg-white/10"}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            <h3 className="text-xl font-bold text-white mb-1">Let's start with the basics</h3>
            <p className="text-slate-400 text-sm mb-6">Tell us a bit about yourself.</p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="First name" value={form.first_name} onChange={e => set("first_name", e.target.value)}
                  className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-400" />
                <Input placeholder="Last name" value={form.last_name} onChange={e => set("last_name", e.target.value)}
                  className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-400" />
              </div>
              <Input placeholder="Work email" type="email" value={form.email} onChange={e => set("email", e.target.value)}
                className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-400" />
              <Input placeholder="Company name" value={form.company} onChange={e => set("company", e.target.value)}
                className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-400" />
              <Input placeholder="Company website (e.g. acme.com)" value={form.website} onChange={e => set("website", e.target.value)}
                className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-400" />
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            <h3 className="text-xl font-bold text-white mb-1">About your firm</h3>
            <p className="text-slate-400 text-sm mb-5">What type of firm are you at, and how big is your team?</p>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">Firm Type</p>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {FIRM_TYPES.map(t => <OptionButton key={t} label={t} selected={form.firm_type === t} onClick={() => set("firm_type", t)} />)}
            </div>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">Team Size</p>
            <div className="grid grid-cols-2 gap-2">
              {TEAM_SIZES.map(s => <OptionButton key={s} label={s} selected={form.team_size === s} onClick={() => set("team_size", s)} />)}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            <h3 className="text-xl font-bold text-white mb-1">Your AI timeline</h3>
            <p className="text-slate-400 text-sm mb-5">When are you looking to implement AI?</p>
            <div className="space-y-2">
              {TIMELINES.map(t => <OptionButton key={t} label={t} selected={form.timeline === t} onClick={() => set("timeline", t)} />)}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            <h3 className="text-xl font-bold text-white mb-1">One last thing</h3>
            <p className="text-slate-400 text-sm mb-5">What's your biggest workflow challenge right now? <span className="text-slate-600">(optional)</span></p>
            <textarea
              rows={4}
              placeholder="e.g. Reviewing leases manually takes hours, we need to speed up due diligence..."
              value={form.biggest_challenge}
              onChange={e => set("biggest_challenge", e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 resize-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        {step > 1 ? (
          <button type="button" onClick={() => setStep(s => s - 1)} className="text-slate-400 hover:text-white text-sm transition-colors">
            ← Back
          </button>
        ) : <div />}

        {step < 4 ? (
          <Button
            onClick={() => setStep(s => s + 1)}
            disabled={!canProceed()}
            className="h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full disabled:opacity-40"
          >
            Continue <ArrowRight className="ml-1 w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full"
          >
            {isSubmitting ? "Submitting..." : "Submit Application →"}
          </Button>
        )}
      </div>
    </div>
  );
}