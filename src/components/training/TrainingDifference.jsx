import React from "react";

export default function TrainingDifference() {
  return (
    <section id="built-around" className="bg-slate-50 py-12 lg:py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-8">
          <span className="inline-block rounded-full bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-4">
            Built around your firm
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Built around your firm
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            We confirm your platform, subscription, seats, and enabled features before we build
            anything. A short survey (yours, or one we help you write) shows how people use AI now
            and where they want to go. Demos use your documents and workflows. The session covers
            the work your team already wants to do, then the advanced features they have not figured
            out yet.
          </p>
        </div>

        <blockquote className="max-w-3xl border-l-4 border-purple-400 pl-6 py-1">
          <p className="text-slate-800 leading-relaxed text-lg mb-3">
            &ldquo;The content was practical, immediately applicable, and tailored specifically to
            how we work in commercial real estate.&rdquo;
          </p>
          <footer className="text-sm text-slate-500">
            <span className="font-semibold text-slate-900">Angelo Pavanello</span>
            {" · "}Vice President, CBRE Canada
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
