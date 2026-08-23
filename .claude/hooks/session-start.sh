#!/bin/bash
# SessionStart hook: install gstack (https://github.com/garrytan/gstack) in
# Claude Code on the web sessions so its skills (/review, /qa, /ship, ...)
# are available. Fail-soft: a broken install must never block the session.
set -uo pipefail

# Web sessions only — local machines install gstack once (see CLAUDE.md).
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

GSTACK_DIR="$HOME/.claude/skills/gstack"

# The web environment blocks Playwright's browser CDN but ships its own
# Chromium; gstack's browser skills (/browse, /qa) can launch it directly.
if [ -n "${CLAUDE_ENV_FILE:-}" ] && [ -x /opt/pw-browsers/chromium ] \
  && ! grep -q GSTACK_CHROMIUM_PATH "$CLAUDE_ENV_FILE" 2>/dev/null; then
  echo 'export GSTACK_CHROMIUM_PATH=/opt/pw-browsers/chromium' >> "$CLAUDE_ENV_FILE"
fi

if [ -d "$GSTACK_DIR/bin" ]; then
  echo "gstack already installed at $GSTACK_DIR"
  exit 0
fi

# gstack's setup verifies Playwright can launch Chromium and otherwise
# downloads one — which this environment's network policy blocks. Bridge the
# pre-installed browsers to the revisions gstack's Playwright pins so the
# launch probe passes and no download is attempted. Best-effort.
bridge_playwright_browsers() {
  local root="${PLAYWRIGHT_BROWSERS_PATH:-}"
  [ -d "$root" ] && [ -f "$GSTACK_DIR/node_modules/playwright-core/browsers.json" ] || return 0
  node - "$GSTACK_DIR" "$root" <<'EOF' 2>/dev/null || true
const fs = require("fs"), path = require("path");
const [gstackDir, root] = process.argv.slice(2); // argv: [node, "-", gstackDir, root]
const { browsers } = JSON.parse(
  fs.readFileSync(path.join(gstackDir, "node_modules/playwright-core/browsers.json"), "utf8"));
const revision = (name) => (browsers.find((b) => b.name === name) || {}).revision;
// Find an already-installed binary for a browser family under either the
// old (chrome-linux) or Chrome-for-Testing (chrome-linux64) layout.
const findExisting = (prefix, subpaths) => {
  for (const dir of fs.readdirSync(root)) {
    if (!dir.startsWith(prefix + "-")) continue;
    for (const sub of subpaths) {
      const p = path.join(root, dir, sub);
      if (fs.existsSync(p)) return p;
    }
  }
  return null;
};
const bridge = (family, rev, linkName, subpaths) => {
  if (!rev) return;
  const dir = path.join(root, `${family}-${rev}`);
  if (fs.existsSync(dir)) return; // already present (real or bridged)
  const existing = findExisting(family, subpaths);
  if (!existing) return;
  fs.mkdirSync(path.dirname(path.join(dir, linkName)), { recursive: true });
  fs.symlinkSync(existing, path.join(dir, linkName));
  for (const marker of ["INSTALLATION_COMPLETE", "DEPENDENCIES_VALIDATED"])
    fs.writeFileSync(path.join(dir, marker), "");
  console.log(`bridged ${family}-${rev} -> ${existing}`);
};
bridge("chromium", revision("chromium"), "chrome-linux64",
  ["chrome-linux", "chrome-linux64"]);
bridge("chromium_headless_shell", revision("chromium-headless-shell"),
  path.join("chrome-headless-shell-linux64", "chrome-headless-shell"),
  [path.join("chrome-linux", "headless_shell"),
   path.join("chrome-headless-shell-linux64", "chrome-headless-shell")]);
EOF
}

echo "Installing gstack into $GSTACK_DIR ..."
install_gstack() {
  git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git "$GSTACK_DIR" </dev/null || return 1
  cd "$GSTACK_DIR" || return 1
  bun install --frozen-lockfile >/dev/null 2>&1 || bun install >/dev/null 2>&1 || true
  bridge_playwright_browsers
  ./setup -q </dev/null
}

if install_gstack; then
  echo "gstack installed. Skills like /review, /qa, /ship, /office-hours are available."
else
  echo "WARNING: gstack install failed; continuing without it." >&2
  rm -rf "$GSTACK_DIR"
fi

exit 0
