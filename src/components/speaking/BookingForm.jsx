import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { CheckCircle, Loader2 } from "lucide-react";

const FORMAT_OPTIONS = [
  "Not sure yet",
  "60-Minute Conference Keynote",
  "Hands-On Workshop (2-4 hours)",
  "Custom or Other",
];

export default function BookingForm({ scarcity, selectedFormat, formImage }) {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    event_date: "",
    format: "Not sure yet",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedFormat) {
      setFormData((prev) => ({ ...prev, format: selectedFormat }));
    }
  }, [selectedFormat]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.name || !formData.email || !formData.message) {
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
        event_date: formData.event_date || "TBD",
        format: formData.format,
        message: formData.message,
      };
      await base44.entities.SpeakingInquiry.create(inquiry);
      await base44.functions.invoke("notifySpeakingInquiry", { inquiry });
      setSuccess(true);
    } catch (err) {
      console.error("Speaking inquiry error:", err);
      setError("Something went wrong. Please try again or email topher@creaistudio.com.");
    }
    setSubmitting(false);
  };

  const inputClass =
    "w-full rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 px-4 py-3 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all";

  if (success) {
    return (
      <section className="bg-white py-20">
        <div className="max-w-md mx-auto text-center rounded-2xl bg-white border-2 border-slate-100 shadow-sm p-10">
          <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <p className="text-slate-900 text-lg font-semibold">Thanks. Your inquiry is in.</p>
          <p className="text-slate-600 text-sm mt-2">I'll be in touch within one business day.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-5">
              Bring Topher to your next event
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">{scarcity.formLine}</p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Tell me about your event: format, audience, and what you want them to walk away with. I'll respond within one business day.
            </p>
            <div className="mb-4">
              <img
                src={formImage}
                alt="Topher Stephenson, co-founder of CRE AI Studio"
                className="w-40 h-40 rounded-full object-cover object-top border-4 border-slate-100 shadow-sm"
                loading="lazy"
              />
            </div>
            <p className="text-sm text-slate-600">
              Prefer email?{" "}
              <a href="mailto:topher@creaistudio.com" className="text-blue-600 hover:text-blue-700 font-medium">
                topher@creaistudio.com
              </a>{" "}
              · Or call 484-695-6902
            </p>
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
                <label className="text-sm text-slate-900 font-medium mb-1.5 block">Organization</label>
                <input
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="ABC Commercial"
                />
              </div>
              <div>
                <label className="text-sm text-slate-900 font-medium mb-1.5 block">Email *</label>
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
              <div>
                <label className="text-sm text-slate-900 font-medium mb-1.5 block">Event date (or TBD)</label>
                <input
                  name="event_date"
                  value={formData.event_date}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="October 15, 2026"
                />
              </div>
              <div>
                <label className="text-sm text-slate-900 font-medium mb-1.5 block">Format you're interested in</label>
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
                <label className="text-sm text-slate-900 font-medium mb-1.5 block">Tell me about your event *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={inputClass + " min-h-[120px] resize-y"}
                  placeholder="Format, audience, goals..."
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
                  "Send inquiry"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}