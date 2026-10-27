import React from "react";

const TEAMS = [
  {
    title: "Sales & leasing brokers",
    body: "Lease and LOI review, comparing versions and flagging redlines, prospect and market research, outreach and pitch content, and the administrative lift that gives brokers more time to transact. We split by product type where it matters, because an industrial demo and a retail demo are different trainings to a broker.",
  },
  {
    title: "Asset managers",
    body: "Market and rent comps, leasing velocity, recurring owner and investor reporting, and pulling from trusted public sources to reduce reliance on second-hand data.",
  },
  {
    title: "Operations & marketing",
    body: "Email and inbox as a system of record, finding the file nobody can locate, long-document and policy work, meeting-to-action-items, and faster marketing production — with honest expectations on where each tool is strong.",
  },
  {
    title: "Asset-class specialists",
    body: "Sessions built around the documents, metrics, and workflows specific to your asset class, on your platform.",
  },
];

const JONATHAN_PRESENTING =
  "https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/e9990578e_jonathan-presenting.jpg";

export default function TrainingByTeam() {
  return (
    <section id="by-team" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="inline-block rounded-full bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-5">
              Training by team
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Split by the work, not by seniority
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              Relevance is specific. A demo on one property type or one role doesn&apos;t carry to
              another — so we build sessions around who&apos;s actually in the room.
            </p>
            <div className="space-y-5">
              {TEAMS.map((t) => (
                <div key={t.title}>
                  <h3 className="font-semibold text-slate-900 mb-1">{t.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <img
              src={JONATHAN_PRESENTING}
              alt="Jonathan Buckelew presenting AI underwriting workflows to a commercial real estate audience"
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
