# CRE AI Studio

Vite + React (JavaScript) web app for CRE AI Studio, built on Base44
(`base44/` holds entity schemas and backend functions; `src/` holds the
React app — pages, components, Tailwind styling).

- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

## gstack (recommended)

This project uses [gstack](https://github.com/garrytan/gstack) for AI-assisted
workflows. In Claude Code on the web, a SessionStart hook
(`.claude/hooks/session-start.sh`) installs it automatically. On a local
machine, install it once for the best experience:

```bash
git clone --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup
```

Use /browse from gstack for all web browsing. Use ~/.claude/skills/gstack/... for gstack file paths.
Available skills: /office-hours, /plan-ceo-review, /plan-eng-review, /plan-design-review,
/design-consultation, /design-shotgun, /design-html, /review, /ship, /land-and-deploy,
/canary, /benchmark, /browse, /open-gstack-browser, /qa, /qa-only, /design-review,
/setup-browser-cookies, /setup-deploy, /setup-gbrain, /sync-gbrain, /retro, /investigate,
/document-release, /document-generate, /codex, /cso, /autoplan, /pair-agent, /careful, /freeze,
/guard, /unfreeze, /gstack-upgrade, /learn.

gstack is optional — sessions without it still work normally.
