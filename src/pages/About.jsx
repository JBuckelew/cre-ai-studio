import React from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

const SITE = "https://creaistudio.com";
const NEWSLETTER_URL = "https://creaistudio.beehiiv.com";
const TOPHER_LINKEDIN = "https://www.linkedin.com/in/tophernow/";
const TOPHER_X = "https://x.com/TopherNow";
const JONATHAN_LINKEDIN = "https://www.linkedin.com/in/jonathan-buckelew/";
const TOPHER_IMG =
  "https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/91db4f179_instructor-topher-v2.jpg";
const JONATHAN_IMG =
  "https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/8c4abcfa5_instructor-jonathan-v2.jpg";

const PAGE_TITLE = "About CRE AI Studio | AI Training for Commercial Real Estate";
const PAGE_DESCRIPTION =
  "CRE AI Studio is an AI learning community, team training and consulting company for commercial real estate, run by Topher Stephenson and Jonathan Buckelew.";

const FAQS = [
  {
    q: "Who runs CRE AI Studio?",
    a: "CRE AI Studio is run by its two co-founders, Topher Stephenson and Jonathan Buckelew. Topher has 11+ years in commercial real estate technology and brokerage. Jonathan has 10+ years in real estate private equity and asset management.",
  },
  {
    q: "What do members get?",
    a: "Members get weekly step-by-step video lessons and AI skills built for CRE, monthly office hours, and a community of hundreds of CRE professionals. Level 2 adds live monthly VIP training sessions with Q&A. Level 3 adds direct access to the founders, with questions answered within 24 hours.",
  },
  {
    q: "Do you train teams?",
    a: "Yes. We train CRE teams and companies on AI, delivered by Jonathan and Topher. Clients include SVN International, CREDA and X Team. Team training is a separate service from the community membership.",
  },
  {
    q: "Do you do consulting?",
    a: "Yes. We work with CRE firms on AI strategy and on building AI into their workflows. You can start with a call about what your team needs.",
  },
  {
    q: "Do you speak at conferences?",
    a: "Yes. We give in-person presentations and workshops at conferences and industry events. Details are on our speaking page.",
  },
  {
    q: "How do I get the newsletter?",
    a: "Subscribe for free on our newsletter page. It is sent weekly and is read by more than 6,000 CRE professionals.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. Every membership level starts with a 7-day free trial. A card is needed to start the trial, and billing begins after the 7 days.",
  },
];

const organization = {
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "CRE AI Studio",
  url: SITE,
  email: "hello@creaistudio.com",
  description:
    "AI learning community, team training and consulting for commercial real estate professionals and teams.",
  sameAs: [NEWSLETTER_URL],
  founder: [
    {
      "@type": "Person",
      name: "Topher Stephenson",
      jobTitle: "Co-founder",
      sameAs: [TOPHER_LINKEDIN, TOPHER_X],
    },
    {
      "@type": "Person",
      name: "Jonathan Buckelew",
      jobTitle: "Co-founder",
      sameAs: [JONATHAN_LINKEDIN],
    },
  ],
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE}/about#webpage`,
  url: `${SITE}/about`,
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  about: { "@id": `${SITE}/#organization` },
  mainEntity: organization,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const linkClass = "font-semibold text-blue-700 hover:text-blue-900 underline underline-offset-2";

function Section({ title, children }) {
  return (
    <section className="mt-14">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">{title}</h2>
      {children}
    </section>
  );
}

function Offer({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-700 leading-relaxed">{children}</p>
    </div>
  );
}

function Person({ name, image, bio, linkedin, extra }) {
  return (
    <div className="grid sm:grid-cols-5 gap-5 items-start rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="sm:col-span-2 rounded-xl overflow-hidden aspect-[4/5] w-full max-w-[260px] sm:max-w-none bg-slate-100">
        <img
          src={image}
          alt={`${name}, co-founder of CRE AI Studio`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="sm:col-span-3">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{name}</h3>
        <p className="text-slate-700 leading-relaxed">{bio}</p>
        <p className="mt-3 text-sm">
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {name} on LinkedIn
          </a>
          {extra}
        </p>
      </div>
    </div>
  );
}

export default function About() {
  usePageMeta({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: "/about",
    appendSiteName: false,
  });

  return (
    <main className="bg-slate-50 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-4xl mx-auto px-6 py-14 md:py-20">
        <header>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-5">About CRE AI Studio</h1>
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
            CRE AI Studio teaches commercial real estate professionals and teams how to use AI in their daily work,
            through an online community, team training, consulting, a weekly newsletter and conference talks.
          </p>
        </header>

        <Section title="What we offer">
          <div className="grid md:grid-cols-2 gap-5">
            <Offer title="The online community">
              Our paid community is where CRE professionals learn AI together. Members get weekly step-by-step video
              lessons, AI skills built for CRE, monthly office hours and a community of hundreds of peers.{" "}
              <Link to="/#whats-included" className={linkClass}>See the membership levels</Link>.
            </Offer>
            <Offer title="AI training for CRE teams and companies">
              We train whole teams on the AI tools they already have, using their own documents and CRE workflows.
              Sessions are delivered by Jonathan and Topher.{" "}
              <Link to="/training" className={linkClass}>Learn about team training</Link>.
            </Offer>
            <Offer title="Consulting">
              We help CRE firms decide where AI fits and then build it into their workflows. You can start with a
              call about what your team needs.{" "}
              <Link to="/Consulting" className={linkClass}>Learn about consulting</Link>.
            </Offer>
            <Offer title="The newsletter">
              A free weekly newsletter read by more than 6,000 CRE professionals. Each issue is a short AI tutorial
              you can finish in five minutes or less, with the prompts behind it.{" "}
              <Link to="/Newsletter" className={linkClass}>Subscribe to the newsletter</Link>.
            </Offer>
            <div className="md:col-span-2">
              <Offer title="Speaking and workshops">
                We give in-person presentations and workshops at conferences and industry events.{" "}
                <Link to="/speaking" className={linkClass}>See our speaking page</Link>.
              </Offer>
            </div>
          </div>
          <p className="mt-5 text-slate-700">
            We also publish a library of CRE AI use cases. <Link to="/use-cases" className={linkClass}>Browse the use cases</Link>.
          </p>
        </Section>

        <Section title="What makes us different">
          <ul className="list-disc pl-6 space-y-2 text-slate-700 leading-relaxed">
            <li>Everything we teach is built around CRE work, not general AI.</li>
            <li>We are two practitioners: Jonathan comes from real estate private equity and asset management, and Topher from CRE technology and brokerage.</li>
            <li>Lessons are step by step, so you can use them on your next deal.</li>
            <li>The founders answer questions themselves. At Level 3, members get a direct channel to us, with answers within 24 hours.</li>
            <li>We have been training CRE teams on AI since March 2024.</li>
            <li>One place covers it all: learn on your own in the community, train your team, or bring us in to build.</li>
          </ul>
        </Section>

        <Section title="Who it's for">
          <p className="text-slate-700 leading-relaxed">
            CRE brokers, investors, asset managers, property managers, analysts and developers, and the teams and
            firms they work in.
          </p>
        </Section>

        <Section title="The people">
          <div className="grid gap-6">
            <Person
              name="Topher Stephenson"
              image={TOPHER_IMG}
              linkedin={TOPHER_LINKEDIN}
              bio="Topher has 11+ years in commercial real estate technology and brokerage. He trains CRE professionals on AI tools and speaks at industry events."
              extra={
                <>
                  {" · "}
                  <a href={TOPHER_X} target="_blank" rel="noopener noreferrer" className={linkClass}>@TopherNow on X</a>
                </>
              }
            />
            <Person
              name="Jonathan Buckelew"
              image={JONATHAN_IMG}
              linkedin={JONATHAN_LINKEDIN}
              bio="Jonathan has 10+ years in real estate private equity. He brings the investment, asset management and finance view from real deal work."
            />
          </div>
        </Section>

        <Section title="How to join">
          <ul className="list-disc pl-6 space-y-2 text-slate-700 leading-relaxed">
            <li>
              <strong>Community membership.</strong> Three levels: Level 1 The Basics Plan ($50 a month or $480 a
              year), Level 2 The Achiever Plan ($75 a month or $720 a year) and Level 3 The Super Growth Plan ($100 a
              month or $960 a year). Every level starts with a 7-day free trial. A card is needed to start it.
              We don't refund payments after the trial ends.{" "}
              <Link to="/FreeTrialPayment" className={linkClass}>Start your free trial</Link>.
            </li>
            <li>
              <strong>Teams buying several community seats.</strong> Contact us at{" "}
              <a href="mailto:hello@creaistudio.com" className={linkClass}>hello@creaistudio.com</a>.
            </li>
            <li>
              <strong>Team training.</strong> This is a separate service, delivered by Jonathan and Topher, and is not
              part of a membership. <Link to="/training" className={linkClass}>Team training details</Link>.
            </li>
          </ul>
        </Section>

        <Section title="Key facts">
          <dl className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm grid gap-3 text-slate-700">
            <div><dt className="font-bold text-slate-900 inline">Company name: </dt><dd className="inline">CRE AI Studio</dd></div>
            <div><dt className="font-bold text-slate-900 inline">Founded: </dt><dd className="inline">[Topher to confirm]</dd></div>
            <div><dt className="font-bold text-slate-900 inline">Founders: </dt><dd className="inline">Topher Stephenson and Jonathan Buckelew</dd></div>
            <div><dt className="font-bold text-slate-900 inline">Headquarters: </dt><dd className="inline">[Topher to confirm]</dd></div>
            <div><dt className="font-bold text-slate-900 inline">What we offer: </dt><dd className="inline">Online AI learning community, AI training for CRE teams and companies, consulting, a weekly newsletter, and speaking and workshops</dd></div>
            <div><dt className="font-bold text-slate-900 inline">Who it's for: </dt><dd className="inline">CRE brokers, investors, asset managers, property managers, analysts, developers and their teams</dd></div>
            <div><dt className="font-bold text-slate-900 inline">Pricing: </dt><dd className="inline">Community membership from $50 a month, $75 or $100 for higher levels, or $480, $720 or $960 a year. 7-day free trial on all levels.</dd></div>
            <div><dt className="font-bold text-slate-900 inline">Newsletter: </dt><dd className="inline">Free, weekly, 6,000+ readers (<a href={NEWSLETTER_URL} className={linkClass}>creaistudio.beehiiv.com</a>)</dd></div>
            <div><dt className="font-bold text-slate-900 inline">Website: </dt><dd className="inline"><a href={SITE} className={linkClass}>creaistudio.com</a></dd></div>
            <div><dt className="font-bold text-slate-900 inline">Social profiles: </dt><dd className="inline">
              <a href={TOPHER_LINKEDIN} target="_blank" rel="noopener noreferrer" className={linkClass}>Topher on LinkedIn</a>,{" "}
              <a href={TOPHER_X} target="_blank" rel="noopener noreferrer" className={linkClass}>Topher on X</a>,{" "}
              <a href={JONATHAN_LINKEDIN} target="_blank" rel="noopener noreferrer" className={linkClass}>Jonathan on LinkedIn</a>
            </dd></div>
          </dl>
        </Section>

        <Section title="Frequently asked questions">
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.q} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-1">{f.q}</h3>
                <p className="text-slate-700 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}
