import { useCases } from "@/data/useCases";

export function getUseCasesByTool(tool) {
  return useCases.filter((uc) => uc.tools && uc.tools.includes(tool));
}

export function getUseCasesByTask(task) {
  return useCases.filter((uc) => uc.tasks && uc.tasks.includes(task));
}

const TOOL_LABELS = {
  claude: "Claude",
  excel: "Excel",
  chatgpt: "ChatGPT",
  "grok-bot": "Grok Bot",
  manus: "Manus",
};

const TASK_LABELS = {
  underwriting: "Underwriting",
  leasing: "Leasing",
  "property-management": "Property Management",
  "due-diligence": "Due Diligence",
  "rent-rolls": "Rent Rolls",
  brokerage: "Brokerage",
  "deal-sourcing": "Deal Sourcing",
};

function titleCase(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function formatToolName(tool) {
  return TOOL_LABELS[tool] || titleCase(tool);
}

export function formatTaskName(task) {
  return TASK_LABELS[task] || titleCase(task);
}

export function getRelatedUseCases(article, limit = 3) {
  if (!article) return [];
  const related = [];
  const seen = new Set([article.slug]);

  for (const uc of useCases) {
    if (seen.has(uc.slug)) continue;
    if (uc.tools && article.tools && uc.tools.some((t) => article.tools.includes(t))) {
      related.push(uc);
      seen.add(uc.slug);
      if (related.length >= limit) return related;
    }
  }

  for (const uc of useCases) {
    if (seen.has(uc.slug)) continue;
    if (uc.tasks && article.tasks && uc.tasks.some((t) => article.tasks.includes(t))) {
      related.push(uc);
      seen.add(uc.slug);
      if (related.length >= limit) return related;
    }
  }

  for (const uc of useCases) {
    if (seen.has(uc.slug)) continue;
    related.push(uc);
    seen.add(uc.slug);
    if (related.length >= limit) return related;
  }

  return related;
}

export function extractSourceUrl(creditHtml) {
  if (!creditHtml) return null;
  const match = creditHtml.match(/href="([^"]+)"/);
  return match ? match[1] : null;
}

export function getCreditSentence(creditHtml) {
  if (!creditHtml) return "";
  let sentence = creditHtml.split(/\.?\s*Source:/)[0];
  sentence = sentence.replace(/<[^>]+>/g, "");
  return sentence.trim();
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}