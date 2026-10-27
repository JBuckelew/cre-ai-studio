import React from "react";

export default function TrainingPlatforms() {
  return (
    <section id="platforms" className="bg-slate-50 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">
            Platforms
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-5">
            AI training for commercial real estate firms, on your platform
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg mb-4">
            Claude (Projects, Artifacts, Skills), ChatGPT (custom GPTs and projects), Gemini (app and
            Workspace side panels), or Microsoft Copilot (Chat, agents, and Microsoft 365). We teach
            the features your seats include. That is the core of our CRE AI training: your stack, not
            a generic demo environment.
          </p>
          <p className="text-sm text-slate-600">
            See the work these sessions target in our{" "}
            <a
              href="/use-cases"
              className="text-blue-600 hover:text-blue-700 font-medium underline-offset-2 hover:underline"
            >
              AI use cases for commercial real estate
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
