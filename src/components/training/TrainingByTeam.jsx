import React from "react";
import { Quote } from "lucide-react";

export default function TrainingByTeam() {
  return (
    <section id="by-team" className="bg-slate-50 py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Quote className="w-10 h-10 text-blue-600 mb-6 mx-auto" />
        <blockquote>
          <p className="text-2xl md:text-3xl font-medium text-slate-900 leading-snug mb-6">
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
