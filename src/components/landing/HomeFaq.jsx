import React, { useEffect } from "react";

export const HOME_FAQS = [
  {
    q: "How do I use AI for commercial real estate?",
    a: "Start with the work you already do, like underwriting, lease review, rent rolls, property management and deal sourcing. CRE AI Studio teaches those real workflows in weekly hands-on lessons and templates, with live Q&A. Firms can also get customized corporate AI training or strategic AI consulting. A public use-case library shows how CRE professionals use Claude, ChatGPT and Grok Bot.",
  },
  {
    q: "What AI tools are best for commercial real estate?",
    a: "It depends on the job. Members learn Claude, ChatGPT and Gemini for everyday CRE tasks, plus automations in tools like Zapier, Make and n8n. The use-case library shows how professionals use Claude, ChatGPT and Grok Bot on real workflows such as lease abstraction, underwriting reviews and property management. For firms, the Studio also offers customized corporate AI training and strategic AI consulting around those tools.",
  },
  {
    q: "Is there an AI course or community for CRE professionals?",
    a: "Yes. CRE AI Studio offers a membership community of hundreds of CRE pros, with weekly hands-on tutorials, templates and live Q&A; customized corporate AI training for teams; and strategic AI consulting for firms. Membership starts with a 7-day free trial, then $100 a month, or $960 a year (save 20%) with a 12-month commitment. It includes the Claude for Commercial Real Estate Cohort: annual members get free access to the live workshops, and monthly members get the recordings once the cohort ends.",
  },
  {
    q: "How do CRE pros use Claude and ChatGPT?",
    a: "They use them on daily workflows: filling lease abstract templates, reviewing underwriting models, rebuilding proformas, auditing offering memoranda, deal sourcing, site selection, prospecting, and pitch decks. CRE AI Studio membership includes step-by-step lessons for those tools, and the use-case library has copyable prompts and checks from real CRE professionals. Teams that want help rolling this out can also use the Studio's corporate AI training or strategic AI consulting.",
  },
  {
    q: "Can AI help with commercial property management and lease abstraction?",
    a: "Yes. Property managers use AI for fee audits, owner reporting, maintenance routing and running bots like staff. Lease abstraction is another common workflow: filling your own abstract template with Claude or ChatGPT. See the property management and lease abstraction use cases on CRE AI Studio. These are the kinds of real workflows covered in the membership community, corporate AI training and consulting.",
  },
];

const PM_HREF = "/use-cases/ai-for-property-management-grok-bot-staff";
const LEASE_HREF = "/use-cases/ai-lease-abstraction-claude-chatgpt-template";

export const homeFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://creaistudio.com/#faq",
  mainEntity: HOME_FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

function injectHomeFaqJsonLd() {
  if (typeof document === "undefined") return;
  let script = document.head.querySelector('script[data-home-faq-ld]');
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-home-faq-ld", "true");
    document.head.appendChild(script);
  }
  script.text = JSON.stringify(homeFaqJsonLd);
}

function clearHomeFaqJsonLd() {
  if (typeof document === "undefined") return;
  document.querySelectorAll('script[data-home-faq-ld]').forEach((s) => s.remove());
}

function Answer({ item }) {
  if (item.q !== "Can AI help with commercial property management and lease abstraction?") {
    return item.a;
  }
  const [before, rest] = item.a.split("See the property management and lease abstraction use cases on CRE AI Studio.");
  return (
    <>
      {before}
      See the{" "}
      <a href={PM_HREF} className="text-blue-700 underline underline-offset-2 hover:text-blue-800">
        property management
      </a>
      {" and "}
      <a href={LEASE_HREF} className="text-blue-700 underline underline-offset-2 hover:text-blue-800">
        lease abstraction
      </a>
      {" use cases on CRE AI Studio."}
      {rest}
    </>
  );
}

export default function HomeFaq() {
  // Inject during render so prerenderers capture FAQPage JSON-LD on first paint.
  injectHomeFaqJsonLd();

  useEffect(() => {
    injectHomeFaqJsonLd();
    return () => clearHomeFaqJsonLd();
  }, []);

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }} />
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-10 tracking-tight text-center">
          Common questions about AI training for commercial real estate
        </h2>
        <dl className="space-y-4">
          {HOME_FAQS.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl bg-slate-50 border border-slate-200 shadow-sm p-6 md:p-7"
            >
              <dt className="font-bold text-lg text-slate-900 mb-2">{item.q}</dt>
              <dd className="text-slate-600 leading-relaxed">
                <Answer item={item} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
