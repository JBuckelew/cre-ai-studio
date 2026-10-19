import React from "react";
import { Link } from "react-router-dom";

export default function UseCaseCard({
  href,
  img,
  alt,
  kicker,
  title,
  excerpt,
  credit,
  titleAs = "h3",
}) {
  const TitleTag = titleAs;
  return (
    <Link
      to={href}
      className="flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_10px_24px_-8px_rgba(37,99,235,0.25)] transition-shadow no-underline text-inherit"
    >
      <div className="aspect-[1200/630] border-b border-slate-200 bg-slate-900">
        <img
          src={img}
          alt={alt}
          width={1200}
          height={630}
          loading="lazy"
          className="w-full h-full object-contain block"
        />
      </div>
      <div className="px-4 pt-3.5 pb-4">
        <span className="text-xs font-bold tracking-widest uppercase text-blue-600">
          {kicker}
        </span>
        <TitleTag className="text-[19px] font-bold leading-[1.2] text-slate-900 mt-1.5 mb-2">
          {title}
        </TitleTag>
        <p className="text-[15px] text-slate-600 mb-2.5">{excerpt}</p>
        <div className="text-[13px] text-slate-500">{credit}</div>
      </div>
    </Link>
  );
}