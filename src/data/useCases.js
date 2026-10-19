export const useCases = [
  {
    slug: "claude-for-excel-real-estate-proforma",
    titleTag: "How to Rebuild a Real Estate Proforma in Claude for Excel | CRE AI Studio",
    metaDescription: "Rebuild a sponsor proforma in Claude for Excel from screenshots and a rent roll in about 10 minutes. Workflow, copyable prompt, and what to check.",
    h1: "How to Rebuild a Real Estate Proforma in Claude for Excel",
    dek: "One CRE investor used Claude for Excel to rebuild a sponsor's proforma and equity waterfall from screenshots and a rent roll in about 10 minutes. Here is how the workflow runs, a prompt you can copy, and what to check before you trust the numbers.",
    answerHtml: "<strong>Short answer:</strong> Yes, Claude for Excel can rebuild a real estate proforma from a PDF. Screenshot the sources and uses and the proforma, load them into a Claude chat in Excel, paste the rent roll, and ask Claude to flag missing assumptions. Give it the waterfall terms when it asks. Expect a working draft in minutes, then budget real time to verify the formulas.",
    canonicalPlaceholder: "https://creaistudio.com/use-cases/claude-for-excel-real-estate-proforma",
    ogImageAlt: "Five-step workflow diagram: capture screenshots of the sources and uses and proforma, load them into Claude in Excel, paste the rent roll and flag missing assumptions, supply the waterfall terms, then spot-check formulas.",
    imageCaption: "The five-step workflow, summarized from @LeylaKuni's post on X.",
    ogDescription: "A CRE investor rebuilt a sponsor's proforma and waterfall in Claude for Excel from screenshots and a rent roll. The workflow, a copyable prompt, and what to check.",
    twitterDescription: "The workflow, a copyable prompt, and what to check before you trust the model.",
    faqHeading: "FAQ: Claude for Excel and Real Estate Proformas",
    faq: [
      { q: "Can Claude for Excel rebuild a real estate proforma from a PDF?", a: "In the test described here, yes. The investor gave Claude for Excel screenshots of the sources and uses and the proforma, pasted the rent roll, and supplied the waterfall when asked. Claude produced a working model in about 7 to 10 minutes. She spot-checked a few formulas and estimated a full check at a couple of hours, so treat the output as a draft." },
      { q: "What is Claude for Excel?", a: "It's Anthropic's add-in that brings Claude into Excel. It can answer questions about an open workbook, adjust assumptions while keeping formula relationships intact, debug errors, and build or populate models. Anthropic lists it for Pro, Max, Team, and Enterprise plans on Excel for the web, Windows, and Mac." },
      { q: "Can Claude for Excel model a real estate equity waterfall?", a: "In this example, Claude asked for the waterfall terms before building it, and the investor provided one more screenshot. Check each tier, hurdle, and catch-up against the operating agreement, not just the investor deck." },
      { q: "Should I trust a real estate proforma built in Claude for Excel?", a: "Not blindly. The creator of this workflow said so directly. Use it to see a sponsor's assumptions quickly, then verify the formulas, inputs, and rent roll before you rely on the numbers. Anthropic also cautions against using Claude for Excel for final deliverables or audit-critical calculations without human review." },
      { q: "Why rebuild a sponsor's real estate proforma at all?", a: "Rebuilding a model the sponsor calls proprietary shows you which assumptions drive the returns, such as rent growth, exit cap rate, and how distributions split in the waterfall, so you can pressure-test them before you invest." }
    ],
    heroImage: "https://cre-ai-usecases-preview.topher-6ba.workers.dev/images/claude-for-excel-real-estate-proforma.png",
    creditHtml: 'Leyla (@<a href="https://x.com/LeylaKuni" target="_blank" rel="noopener" class="use-case-link">LeylaKuni</a>) shared this workflow on X on Oct 12, 2026. Source: <a href="https://x.com/LeylaKuni/status/2109782327232795012" target="_blank" rel="noopener" class="use-case-link">https://x.com/LeylaKuni/status/2109782327232795012</a>',
    bodyHtml: `<h2>What She Did: Rebuilt a "Proprietary" Real Estate Proforma in Claude for Excel</h2>
<p>When a sponsor says the proforma is proprietary, investors usually get a PDF and no live model. Leyla's response was to rebuild it herself with AI.</p>
<p>Her process, in our words:</p>
<ol>
<li><strong>Captured the deal.</strong> She took screenshots of the sources and uses and the proforma, then put them into a Claude chat inside Excel.</li>
<li><strong>Added the rent roll.</strong> She pasted the rent roll in and told Claude to flag any missing assumptions.</li>
<li><strong>Answered Claude's question.</strong> Claude asked for the waterfall. She supplied it with one more screenshot, and Claude built the model.</li>
<li><strong>Checked the work.</strong> She spot-checked several formulas. She estimated a full check would take a couple of hours, still faster than building the model by hand.</li>
</ol>
<p>She reported the build took about 7 to 10 minutes. Her conclusion was measured: don't trust it blindly, but you can see what the sponsor thinks is proprietary in roughly 20 minutes.</p>

<h2>Why Claude for Excel Matters for CRE Investors</h2>
<p>LPs and smaller investors often can't open a sponsor's model, so they can't stress-test it. Rebuilding the proforma puts the assumptions in front of you, including rent growth, expenses, debt, the exit, and how cash is split in the waterfall.</p>
<p>The point isn't to recreate the sponsor's numbers to the dollar. The point is to find the few inputs that drive the return. Leyla made the same point herself: a proforma doesn't make a deal succeed, and no model saves a levered deal if cap rates widen sharply. She also noted that the more tiers a waterfall has, the less she trusts it.</p>
<p>The tool is now built for this kind of work. Anthropic describes <a href="https://claude.com/docs/office-agents/excel" rel="noopener">Claude for Excel</a> as an add-in that can build or populate models, work across multi-tab workbooks, and adjust assumptions while keeping formula relationships intact.</p>

<h2>How to Try It: A Copyable Claude for Excel Proforma Prompt</h2>
<p>You need Claude for Excel installed (per <a href="https://claude.com/docs/office-agents/excel" rel="noopener">Anthropic's documentation</a>, it's available on Pro, Max, Team, and Enterprise plans), the sponsor's PDF, and the rent roll. Open a blank workbook, start a Claude chat, attach your screenshots, and paste this:</p>
<p>Leyla did not publish a prompt. The prompt below is CRE AI Studio's version of the workflow she describes.</p>
<pre class="prompt"><code>I'm reviewing a commercial real estate deal. Attached are screenshots of the sponsor's sources and uses and proforma. The rent roll is pasted below.

1. Before building anything, list every assumption you need that is not in these materials (for example: waterfall terms, loan terms, exit cap rate, rent and expense growth, reserves). Ask me for them. Do not invent numbers.
2. Rebuild the model in this workbook with live formulas, not hardcoded values. Put all inputs on an Assumptions tab and label the source of each one: screenshot, rent roll, or "provided by me."
3. Use separate tabs for sources and uses, annual cash flow, debt service, and the equity waterfall.
4. Reconcile your NOI, cash flow, and returns to the sponsor's figures. List every difference over 1% and its likely cause.
5. Add a Review tab listing the formulas I should check first, and keep formulas simple enough to audit.

Rent roll:
[paste here]</code></pre>
<p>If Claude asks a question, answer it rather than letting it assume. The quality of the model depends on the inputs you confirm.</p>

<h2>What to Check Before You Rely on a Claude for Excel Proforma</h2>
<ul class="checks">
<li><strong>Transcription.</strong> Compare a sample of numbers read from the screenshots against the PDF. A single misread digit can move the returns.</li>
<li><strong>Rent roll tie-out.</strong> In-place revenue in the model should match the rent roll total, including vacant units and concessions.</li>
<li><strong>Waterfall terms.</strong> Check every tier, preferred return, hurdle, and catch-up against the operating agreement, not just the investor deck.</li>
<li><strong>Hardcodes.</strong> Look for typed-in numbers inside formulas, and confirm that changing an input on the Assumptions tab flows through every tab.</li>
<li><strong>Exit and leverage.</strong> Stress the exit cap rate and the interest rate. That's where the creator says the real risk sits.</li>
<li><strong>Confidentiality.</strong> Confirm that your NDA and your firm's AI policy allow uploading sponsor materials to the tool you're using.</li>
</ul>
<p>Anthropic's own guidance cautions against using Claude for Excel for final deliverables or audit-critical calculations without human review. Treat the output as a first draft you have to verify.</p>`
  }
];

export function getUseCaseBySlug(slug) {
  return useCases.find((uc) => uc.slug === slug);
}