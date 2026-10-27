import React from "react";

const TEAMS = [
  {
    title: "Sales and leasing brokers",
    body: "Lease and LOI review, redlines, prospect and market research, outreach and pitch content, and the admin work that slows a desk down. When product type matters, we split sessions so the demos match the brokers joining.",
  },
  {
    title: "Asset managers",
    body: "Comps, leasing velocity, owner and investor reporting, and research from trusted public sources.",
  },
  {
    title: "Operations and marketing",
    body: "Inbox and file work, long documents and policies, meeting follow-up, and faster marketing production on your platform.",
  },
  {
    title: "Asset-class specialists",
    body: "Documents, metrics, and workflows for your asset class, on your tools.",
  },
];

export default function TrainingByTeam() {
  return (
    <section id="by-team" className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-10">
          <span className="inline-block rounded-full bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-5">
            Training by team
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Training by team
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            We build sessions around the work people do.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {TEAMS.map((t) => (
            <div
              key={t.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="font-semibold text-slate-900 mb-2">{t.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>

        <blockquote className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <p className="text-slate-700 leading-relaxed mb-4">
            &ldquo;He does not just explain what is possible. He shows how to take these tools from
            idea to implementation across our diverse departments like leasing, acquisitions,
            marketing, property management, accounting, construction, and development.&rdquo;
          </p>
          <footer className="text-sm text-slate-500">
            <span className="font-semibold text-slate-900">Tim Murphy</span>
            {" · "}Senior Director, Marketing &amp; Technology, NewMark Merrill Companies
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
