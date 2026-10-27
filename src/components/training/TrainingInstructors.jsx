import React from "react";
import { SectionHead } from "@/components/training/TrainingQuoteKit";

const TOPHER_PRESENTING =
  "https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/91db4f179_instructor-topher-v2.jpg";
const JONATHAN_PRESENTING =
  "https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/8c4abcfa5_instructor-jonathan-v2.jpg";

const FOUNDERS = [
  {
    name: "Topher Stephenson",
    image: TOPHER_PRESENTING,
    objectPosition: "center",
    linkedin: "https://www.linkedin.com/in/tophernow/",
    bio: "11+ years in commercial real estate technology and brokerage. Trains CRE professionals on AI tools.",
  },
  {
    name: "Jonathan Buckelew",
    image: JONATHAN_PRESENTING,
    objectPosition: "center",
    linkedin: "https://www.linkedin.com/in/jonathan-buckelew/",
    bio: "10+ years in real estate private equity. Investment, asset management, and finance perspective from deal work.",
  },
];

export default function TrainingInstructors() {
  return (
    <section id="instructors" className="bg-white py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead
          chip="Instructors"
          title="Who teaches"
          accent="CRE AI training"
          sub="Topher Stephenson and Jonathan Buckelew founded CRE AI Studio and lead the training practice. Sessions are taught by our training team."
        />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {FOUNDERS.map((f) => (
            <div key={f.name} className="grid sm:grid-cols-5 gap-5 items-start rounded-3xl bg-slate-50 border border-slate-200 p-5 shadow-sm">
              <div className="sm:col-span-2 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm aspect-[4/5] w-full max-w-[260px] sm:max-w-none bg-slate-100">
                <img
                  src={f.image}
                  alt={`${f.name}, CRE AI Studio`}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: f.objectPosition || "center" }}
                  loading="lazy"
                />
              </div>
              <div className="sm:col-span-3 pt-1">
                <h3 className="font-bold text-slate-900 text-xl mb-2">{f.name}</h3>
                <p className="text-slate-600 leading-relaxed">{f.bio}</p>
                {f.linkedin && (
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors"
                    aria-label={`${f.name} on LinkedIn`}
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                    </svg>
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
