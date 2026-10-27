import React from "react";

export default function TrainingDifference() {
  return (
    <section id="built-around" className="bg-slate-50 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">
              Built around your firm
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              A commercial real estate AI training company built around your firm
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-slate-600 leading-relaxed text-lg mb-10">
              We confirm your platform, subscription, seats, and enabled features before we build
              anything. A short survey (yours, or one we help you write) shows how people use AI now
              and where they want to go. We show your team how to use the most powerful features in your AI subscription on the
              same deal work they do every day. Sessions cover the
              tasks your team needs done, then the advanced features they have not figured out yet.
            </p>

            <blockquote className="rounded-2xl bg-white border-2 border-slate-100 p-6 md:p-8 shadow-sm">
              <p className="font-serif italic text-slate-900 leading-relaxed text-lg md:text-xl mb-5">
                &ldquo;The content was practical, immediately applicable, and tailored specifically to
                how we work in commercial real estate.&rdquo;
              </p>
              <footer className="text-sm text-slate-500">
                <span className="font-semibold text-slate-900">Angelo Pavanello</span>
                {" · "}Vice President, CBRE Canada
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
