import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { CheckCircle, Loader2, Check } from "lucide-react";

const TOPHER_HEADSHOT =
  "https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/411ec6d87_topher-headshot.jpg";
const JONATHAN_HEADSHOT =
  "https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/ec13d5946_jonathan-headshot.jpg";

const TEAM_SIZE_OPTIONS = [
  "Not sure yet",
  "Under 25",
  "25 to 75",
  "75 to 200",
  "200+",
];

const PLATFORM_OPTIONS = [
  "Still deciding",
  "Microsoft 365 Copilot",
  "ChatGPT",
  "Claude",
  "Gemini",
  "A mix of tools",
];

const FORMAT_OPTIONS = [
  "Not sure yet",
  "One-time training for one team (60 to 90 minutes)",
  "Basics or advanced package (2 to 6 sessions)",
  "Focused-team package across several groups",
  "Enterprise, multiple offices or platforms",
];

const CHECKLIST = [
  "Both founders on every session",
  "Scoped to your platform, seats, and enabled features before we build",
  "Demos built on your own documents and workflows",
  "Recording, session outline, and prompt library included",
];

export default function TrainingForm() {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    team_size: "Not sure yet",
    platform: "Still deciding",
    format: "Not sure yet",
    timeline: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.name || !formData.organization || !formData.email || !formData.message) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    try {
      const inquiry = {
        name: formData.name,
        organization: formData.organization,
        email: formData.email,
        team_size: formData.team_size,
        platform: formData.platform,
        format: formData.format,
        timeline: formData.timeline || "TBD",
        message: formData.message,
      };
      await base44.entities.TrainingInquiry.create(inquiry);
      try {
        await base44.functions.invoke("notifyTrainingInquiry", { inquiry });
      } catch (notifyErr) {
        console.error("Training notify error:", notifyErr);
      }
      setSuccess(true);
    } catch (err) {
      console.error("Training inquiry error:", err);
      setError("Something went wrong. Please try again or email topher@creaistudio.com.");
    }
    setSubmitting(false);
  };

  const inputClass =
    "w-full rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 px-4 py-3 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all";

  if (success) {
    return (
      <section id="request" className="bg-slate-50 py-20">
        <div className="max-w-md mx-auto text-center rounded-2xl bg-white border-2 border-slate-100 shadow-sm p-10">
          <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <p className="text-slate-900 text-lg font-semibold">Thanks. Your request is in.</p>
          <p className="text-slate-600 text-sm mt-2">We will be in touch within one business day.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="request" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-5">
              Request a training
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              Tell us which platform your firm is on, roughly how many people you want trained, and
              what you want them doing differently afterward. We reply within one business day.
            </p>

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 shadow-sm mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
                How we work
              </p>
              <ul className="space-y-3">
                {CHECKLIST.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-blue-600" />
                    </span>
                    <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <img
                  src={TOPHER_HEADSHOT}
                  alt="Topher Stephenson"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <img
                  src={JONATHAN_HEADSHOT}
                  alt="Jonathan Buckelew"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
              </div>
              <p className="text-sm text-slate-500">
                Prefer email?{" "}
                <a
                  href="mailto:topher@creaistudio.com?subject=CRE%20AI%20Studio%20team%20training"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  topher@creaistudio.com
                </a>
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white border-2 border-slate-100 shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm text-slate-900 font-medium mb-1.5 block">Your name *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Jane Smith"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-slate-900 font-medium mb-1.5 block">
                  Organization *
                </label>
                <input
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="ABC Commercial"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-slate-900 font-medium mb-1.5 block">Work email *</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="jane@abc.com"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-900 font-medium mb-1.5 block">
                    How many people?
                  </label>
                  <select
                    name="team_size"
                    value={formData.team_size}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {TEAM_SIZE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-900 font-medium mb-1.5 block">
                    What are they on?
                  </label>
                  <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {PLATFORM_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-900 font-medium mb-1.5 block">
                  Which format?
                </label>
                <select
                  name="format"
                  value={formData.format}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {FORMAT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-900 font-medium mb-1.5 block">
                  When are you thinking?
                </label>
                <input
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="November 2026, or TBD"
                />
              </div>
              <div>
                <label className="text-sm text-slate-900 font-medium mb-1.5 block">
                  What do you want them doing differently afterward? *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={inputClass + " min-h-[120px] resize-y"}
                  placeholder="Who is joining, what is eating their time, what a win looks like..."
                  required
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3.5 rounded-full hover:shadow-lg transition-all duration-300 disabled:opacity-60 inline-flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                  </>
                ) : (
                  "Request a training"
                )}
              </button>
              <p className="text-xs text-slate-400 text-center">
                We reply within one business day.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
