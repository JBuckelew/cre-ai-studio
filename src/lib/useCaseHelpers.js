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