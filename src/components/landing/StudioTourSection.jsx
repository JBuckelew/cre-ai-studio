import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlayCircle,
  CalendarDays,
  Wand2,
  BookOpen,
  PhoneCall,
  ArrowRight,
  Users,
  MessageCircle,
  ShieldCheck,
  Check,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { goToPricing } from "@/lib/goToPricing";
import TextTestimonials from "./TextTestimonials";

// Screenshots of the Studio on Circle. Member names and photos are hidden before capture.
// A null image falls back to a neutral placeholder layout.
const STUDIO_IMAGES = {
  lessons: null,
  events: null,
  skills: null,
  prompts: null,
};

const TABS = [
  {
    key: "lessons",
    label: "AI Lessons",
    icon: PlayCircle,
    tag: "New every week",
    title: "Step-by-step AI lessons for CRE work",
    body: "Short video lessons that walk through one real task with one specific AI tool, from screening an OM to marketing a listing to building an automation. Start with the Quickstart course, then pick up a new lesson every week.",
    points: ["Built around CRE tasks, not generic AI tips", "Follow along at your own pace"],
    path: "cre-ai-studio.circle.so/courses",
    alt: "The AI lessons area inside CRE AI Studio",
  },
  {
    key: "events",
    label: "Live Events",
    icon: CalendarDays,
    tag: "Every month",
    title: "Live training with the founders",
    body: "A monthly live training session with open Q&A, plus monthly office hours. Bring your questions, your workflow, or the deal you're stuck on, and work through it live.",
    points: ["Monthly live training with Q&A", "Monthly office hours"],
    path: "cre-ai-studio.circle.so/events",
    alt: "The live events calendar inside CRE AI Studio",
  },
  {
    key: "skills",
    label: "Skill Library",
    icon: Wand2,
    tag: "Ready to use",
    title: "AI skills built for CRE",
    body: "Ready-to-run Claude skills for the work you already do: T12 analysis, property ownership research, prospecting pipelines and more. Set one up once and reuse it on every deal.",
    points: ["Install once, reuse on every deal", "Built and tested by CRE operators"],
    path: "cre-ai-studio.circle.so/skills",
    alt: "The Skill Library inside CRE AI Studio",
  },
  {
    key: "prompts",
    label: "Prompt Library",
    icon: BookOpen,
    tag: "Copy and paste",
    title: "The CRE prompt library",
    body: "Tested prompts for underwriting, leasing, marketing, asset management and legal review. Paste one into ChatGPT, Claude or Gemini and get to a solid first draft in minutes. New prompts are added every week.",
    points: ["Works in ChatGPT, Claude and Gemini", "New prompts added weekly"],
    path: "cre-ai-studio.circle.so/c/prompt-library",
    alt: "The Prompt Library inside CRE AI Studio",
  },
  {
    key: "calls",
    label: "1:1 Calls",
    icon: PhoneCall,
    tag: "Included with membership",
    title: "1:1 calls with the founders",
    body: "Every new member starts with a complimentary 1:1 call with Jonathan and Topher to map where AI fits your work. Then book a call with us every quarter to keep building.",
    points: ["A complimentary call when you join", "Then one call every quarter"],
    path: "Member 1:1 booking",
    alt: "Booking a 1:1 call with the CRE AI Studio founders",
  },
];

function PlaceholderScreen() {
  return (
    <div className="flex h-full w-full bg-slate-50" aria-hidden="true">
      <div className="hidden sm:flex w-1/5 flex-col gap-3 border-r border-slate-200 bg-white p-4">
        {[70, 55, 80, 60, 50, 65].map((w, i) => (
          <div key={i} className="h-2.5 rounded-full bg-slate-200" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="flex-1 p-4 sm:p-6">
        <div className="h-4 w-1/3 rounded-full bg-slate-300" />
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="aspect-video rounded-lg bg-gradient-to-br from-blue-100 to-purple-100" />
              <div className="mt-3 h-2.5 w-4/5 rounded-full bg-slate-200" />
              <div className="mt-2 h-2.5 w-1/2 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BookingMockup() {
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  const open = new Set([3, 4, 10, 11, 12, 17, 18, 24, 25]);
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-8" aria-hidden="true">
      <div className="grid w-full max-w-2xl grid-cols-1 sm:grid-cols-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="sm:col-span-2 border-b sm:border-b-0 sm:border-r border-slate-200 p-5">
          <div className="flex -space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">JB</div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-amber-500 to-orange-600 text-sm font-bold text-white">TS</div>
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">CRE AI Studio</p>
          <p className="mt-1 text-lg font-bold leading-snug text-slate-900">Member 1:1 Strategy Call</p>
          <p className="mt-2 text-sm text-slate-600">30 min · Video call</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">Map where AI fits your work, then come back every quarter to keep building.</p>
        </div>
        <div className="sm:col-span-3 p-5">
          <p className="text-sm font-semibold text-slate-900">Pick a day</p>
          <div className="mt-3 grid grid-cols-7 gap-1.5 text-center text-xs">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span key={i} className="text-slate-400">{d}</span>
            ))}
            {days.map((d) => (
              <span
                key={d}
                className={`rounded-md py-1.5 ${
                  d === 11
                    ? "bg-blue-600 font-bold text-white"
                    : open.has(d)
                      ? "bg-blue-50 font-semibold text-blue-700"
                      : "text-slate-300"
                }`}
              >
                {d}
              </span>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {["10:00 am", "1:30 pm", "3:00 pm"].map((t, i) => (
              <span
                key={t}
                className={`rounded-lg border py-2 text-center text-xs font-semibold ${
                  i === 1 ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 text-slate-700"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BrowserFrame({ tab }) {
  const src = STUDIO_IMAGES[tab.key];
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-blue-900/10">
      <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-100 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-white px-3 py-1 text-xs text-slate-500">
          <Lock className="h-3 w-3 flex-none" aria-hidden="true" />
          <span className="truncate">{tab.path}</span>
        </div>
      </div>
      <div className="relative aspect-[16/10] bg-slate-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.key}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {tab.key === "calls" ? (
              <BookingMockup />
            ) : src ? (
              <img src={src} alt={tab.alt} loading="lazy" className="h-full w-full object-cover object-top" />
            ) : (
              <PlaceholderScreen />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function StudioTourSection() {
  const [activeKey, setActiveKey] = useState(TABS[0].key);
  const tabRefs = useRef({});
  const active = TABS.find((t) => t.key === activeKey);

  const handleKeyDown = (e, index) => {
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(e.key)) return;
    e.preventDefault();
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = TABS[(index + step + TABS.length) % TABS.length];
    setActiveKey(next.key);
    tabRefs.current[next.key]?.focus();
  };

  return (
    <section id="whats-included" className="scroll-mt-24 overflow-hidden bg-white pt-20 pb-20 lg:pt-28 lg:pb-28 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#e2e8f0_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-30" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-3xl text-center lg:mb-14"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">Inside the Studio</p>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Here's exactly what you get when you join
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            CRE AI Studio is a private community built for commercial real estate. Take a look around before you sign up.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          {/* Tabs: a scrolling chip row on mobile, a vertical list on desktop */}
          <div className="lg:col-span-4">
            <div
              role="tablist"
              aria-label="What's inside the Studio"
              aria-orientation="vertical"
              className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:gap-3 lg:overflow-visible lg:px-0 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {TABS.map((tab, index) => {
                const selected = tab.key === activeKey;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    ref={(el) => (tabRefs.current[tab.key] = el)}
                    role="tab"
                    id={`studio-tab-${tab.key}`}
                    aria-selected={selected}
                    aria-controls="studio-tabpanel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveKey(tab.key)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`group flex flex-none items-center gap-3 rounded-full border px-4 py-2.5 text-left transition-all lg:rounded-2xl lg:px-5 lg:py-4 ${
                      selected
                        ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/20 lg:bg-white lg:text-slate-900 lg:ring-1 lg:ring-blue-600"
                        : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 flex-none items-center justify-center rounded-full lg:h-11 lg:w-11 lg:rounded-xl ${
                        selected ? "bg-white/20 lg:bg-blue-600 lg:text-white" : "bg-slate-100 text-blue-600 group-hover:bg-blue-100"
                      }`}
                    >
                      <Icon className="h-4 w-4 lg:h-5 lg:w-5" />
                    </span>
                    <span className="flex flex-col">
                      <span className="whitespace-nowrap text-sm font-semibold lg:text-lg lg:font-bold">{tab.label}</span>
                      <span className={`hidden text-sm lg:block ${selected ? "text-blue-600" : "text-slate-500"}`}>{tab.tag}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panel */}
          <div
            id="studio-tabpanel"
            role="tabpanel"
            aria-labelledby={`studio-tab-${active.key}`}
            className="lg:col-span-8"
          >
            <BrowserFrame tab={active} />
            <AnimatePresence mode="wait">
              <motion.div
                key={active.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-6 sm:mt-8"
              >
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 lg:hidden">{active.tag}</p>
                <h3 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">{active.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">{active.body}</p>
                <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
                  {active.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-slate-700">
                      <Check className="h-4 w-4 flex-none text-green-600" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Always-on benefits + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 lg:mt-20"
        >
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { icon: Users, text: "A community of hundreds of CRE pros putting AI to work" },
              { icon: MessageCircle, text: "Questions answered by the founders within 24 hours" },
              { icon: ShieldCheck, text: "7-day free trial. Cancel anytime." },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="pt-2 font-medium leading-snug text-slate-800">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button
              size="lg"
              onClick={goToPricing}
              className="group rounded-full bg-gradient-to-r from-blue-600 to-amber-500 px-8 font-semibold text-white transition-all duration-300 hover:opacity-90"
            >
              Start Your 7-Day Free Trial
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>

        <TextTestimonials />
      </div>
    </section>
  );
}
