import React from "react";

export default function TrainingByTeam() {
  return (
    <section id="by-team" className="bg-slate-50 py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-6">
        <blockquote className="max-w-3xl">
          <p className="text-slate-800 leading-relaxed text-lg mb-3">
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
