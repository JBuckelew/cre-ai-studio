import React from "react";
import { Quote } from "lucide-react";

export const QUOTES = {
  sarah: {
    name: "Sarah Vincent",
    title: "Chief Growth Officer",
    firm: "SVN International Public Benefit Corporation",
    quote:
      "Topher has a unique ability to translate complex concepts into practical, relevant insights for commercial real estate professionals at all levels. The feedback from our Advisors was overwhelmingly positive.",
  },
  angelo: {
    name: "Angelo Pavanello",
    title: "Vice President",
    firm: "CBRE Canada",
    quote:
      "The content was practical, immediately applicable, and tailored specifically to how we work in commercial real estate.",
  },
  kristie: {
    name: "Kristie Jacobson Kimnach",
    title: "Executive Director",
    firm: "RE/MAX Commercial Global",
    quote:
      "His ability to translate AI into practical, real-world applications made a significant impact, with several attendees noting it was the best course they had taken.",
  },
  jenna: {
    name: "Jenna Hille, M.S.",
    title: "National Director of Strategy & Operations",
    firm: "Coldwell Banker Commercial",
    quote:
      "He taught the entire team how to build customized versions of AI tools for their specific use-cases. His experience in the industry enables him to break down complex topics in a way that resonated with our audience.",
  },
  erin: {
    name: "Erin Horan, Ph.D.",
    title: "Sr. Manager E-learning and Education Content",
    firm: "Commercial Real Estate Development Association (CREDA)",
    quote:
      "Partnering with CRE AI Studio to develop and deliver our AI in Commercial Real Estate course has been an exceptional experience.",
  },
  salk: {
    name: "Jonathan Salk",
    title: "CEO",
    firm: "CORFAC International",
    quote:
      "He made AI tools and concepts approachable, understandable and practical at all levels, tailoring his presentations to the real-world needs of commercial real estate professionals. Our members walked away with actionable strategies they could use immediately.",
  },
  murphy: {
    name: "David Murphy",
    title: "Vice Chairman",
    firm: "CBRE Central Florida",
    quote:
      'Instead of vague "use AI for everything" advice, we got concrete guidance on what to focus on. We left the sessions with a detailed outline of what we\'re doing now, and an executive summary on what to do next.',
  },
  eric: {
    name: "Eric Edwards",
    title: "2026 Florida CCIM SW District President",
    firm: "CCIM",
    quote:
      "Topher has a talent for making AI accessible and relevant to commercial real estate professionals.",
  },
  tim: {
    name: "Tim Murphy",
    title: "Senior Director, Marketing & Technology",
    firm: "NewMark Merrill Companies",
    quote:
      "He does not just explain what is possible. He shows how to take these tools from idea to implementation across our diverse departments like leasing, acquisitions, marketing, property management, accounting, construction, and development.",
  },
};

// Single most useful line of each testimonial (verbatim trims).
export const LINES = {
  sarah:
    "A unique ability to translate complex concepts into practical, relevant insights for commercial real estate professionals at all levels. The feedback from our Advisors was overwhelmingly positive.",
  kristie:
    "His ability to translate AI into practical, real-world applications made a significant impact, with several attendees noting it was the best course they had taken.",
  jenna:
    "He taught the entire team how to build customized versions of AI tools for their specific use-cases.",
  erin: QUOTES.erin.quote,
  murphy:
    'Instead of vague "use AI for everything" advice, we got concrete guidance on what to focus on.',
  salk: "Our members walked away with actionable strategies they could use immediately.",
  eric: QUOTES.eric.quote,
};

export function withLine(key) {
  return { ...QUOTES[key], quote: LINES[key] };
}

export function initials(name) {
  return name
    .replace(/,.*$/, "")
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

export function Avatar({ name, dark = false, big = false }) {
  return (
    <span
      aria-hidden="true"
      className={`${big ? "w-16 h-16 text-base" : "w-10 h-10 text-xs"} shrink-0 rounded-full flex items-center justify-center font-bold text-white ${
        dark ? "bg-white/15 ring-1 ring-white/25" : "bg-gradient-to-br from-blue-600 to-purple-600"
      }`}
    >
      {initials(name)}
    </span>
  );
}

export function QuoteCard({ q, className = "" }) {
  return (
    <figure
      className={`relative flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden ${className}`}
    >
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400" />
      <div className="p-6 md:p-7 flex flex-col flex-1">
        <Quote className="w-7 h-7 text-blue-600/80 mb-4" aria-hidden="true" />
        <blockquote className="text-slate-700 leading-relaxed flex-1">
          &ldquo;{q.quote}&rdquo;
        </blockquote>
        <figcaption className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-100">
          <Avatar name={q.name} />
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-slate-900">{q.name}</span>
            <span className="block text-xs text-slate-500 leading-snug">{q.title}</span>
            <span className="block text-xs font-semibold text-blue-700 leading-snug">{q.firm}</span>
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

export function SectionHead({ chip, title, accent, sub, dark = false, center = false }) {
  return (
    <div className={`mb-10 md:mb-12 ${center ? "text-center mx-auto" : ""} max-w-3xl`}>
      <span
        className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest mb-4 ${
          dark ? "bg-white/10 text-blue-200 ring-1 ring-white/15" : "bg-blue-600 text-white"
        }`}
      >
        {chip}
      </span>
      <h2
        className={`font-serif text-3xl md:text-4xl lg:text-[2.6rem] font-bold tracking-tight leading-tight ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
        {accent && (
          <>
            {" "}
            <span
              className={`italic ${
                dark
                  ? "text-blue-300"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
              }`}
            >
              {accent}
            </span>
          </>
        )}
      </h2>
      {sub && (
        <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}
