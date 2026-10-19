import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function UseCaseCard({ uc, compact = false }) {
  if (compact) {
    return (
      <Link to={`/use-cases/${uc.slug}`} className="block group h-full">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
          <img
            src={uc.heroImage}
            alt={uc.ogImageAlt}
            className="w-full h-36 object-cover"
          />
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                {uc.kicker}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500">{uc.readMins} min read</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
              {uc.h1}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1">
              {uc.dek}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/use-cases/${uc.slug}`} className="block group">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              src={uc.heroImage}
              alt={uc.ogImageAlt}
              className="w-full h-56 md:w-64 md:h-full object-cover"
            />
          </div>
          <div className="p-8 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                {uc.kicker}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500">{uc.readMins} min read</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
              {uc.h1}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">{uc.dek}</p>
            <span className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
              Read the use case
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}