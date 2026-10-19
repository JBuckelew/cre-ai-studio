import React from "react";
import { Link } from "react-router-dom";

export default function UseCaseCard({ uc }) {
  const shortKicker = uc.kicker.replace(/^AI Use Case · /, "");
  const credit = `Credit: ${uc.creatorHandle} · ${uc.bylineDate} · ${uc.readMins} min read`;
  return (
    <Link to={`/use-cases/${uc.slug}`} className="block group h-full">
      <article className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className="aspect-[1200/630] bg-slate-50 overflow-hidden border-b border-slate-100">
          <img
            src={uc.heroImageSrc}
            alt={uc.ogImageAlt}
            width={1200}
            height={630}
            className="w-full h-full object-contain block"
          />
        </div>
        <div className="p-5 flex flex-col flex-1">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
            {shortKicker}
          </span>
          <p className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
            {uc.h1}
          </p>
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1">
            {uc.metaDescription}
          </p>
          <p className="text-xs text-slate-400 mt-3">{credit}</p>
        </div>
      </article>
    </Link>
  );
}