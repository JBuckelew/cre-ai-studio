import React from "react";

export default function TrainingByTeam() {
  return (
    <section id="by-team" className="bg-slate-50 py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4 text-center">
          Across teams
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight text-center mb-8">
          Built for how CRE teams split the work
        </h2>
        <blockquote className="rounded-2xl bg-white border-2 border-slate-100 p-6 md:p-10 shadow-sm text-center">
          <p className="font-serif italic text-slate-900 leading-relaxed text-lg md:text-xl mb-5">
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
