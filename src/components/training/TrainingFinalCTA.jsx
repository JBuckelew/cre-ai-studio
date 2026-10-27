import React from "react";
import { ArrowUp } from "lucide-react";

export default function TrainingFinalCTA() {
  return (
    <section id="request-again" className="bg-slate-900 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 flex justify-center">
        <a
          href="#request"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("request")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="bg-white text-slate-900 hover:bg-blue-50 font-semibold text-base px-9 py-4 rounded-full shadow-lg shadow-black/30 transition-all duration-300 inline-flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          Request a training
          <ArrowUp className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
