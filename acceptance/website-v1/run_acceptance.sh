#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

WORK_DIR="$ROOT/.acceptance-work/website-v1"
MANIFEST_ONE="$WORK_DIR/build-1-manifest.json"
MANIFEST_TWO="$WORK_DIR/build-2-manifest.json"
NPM=(npm)

if ! command -v npm >/dev/null 2>&1; then
  if command -v pnpm >/dev/null 2>&1; then
    NPM=(pnpm dlx npm@10)
  else
    printf '[WEB-1-RW1] npm is required to run the canonical package-manager gates.\n' >&2
    exit 1
  fi
fi

log() {
  printf '\n[WEB-1-RW1] %s\n' "$1"
}

require_file() {
  if [[ ! -f "$1" ]]; then
    printf '[WEB-1-RW1] Missing required file: %s\n' "$1" >&2
    exit 1
  fi
}

semantic_manifest() {
  local output="$1"

  node --input-type=module - "$output" <<'NODE'
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const output = process.argv[2];
const dist = "dist";

function walk(path) {
  if (!existsSync(path)) {
    return [];
  }

  return readdirSync(path).flatMap((entry) => {
    const child = join(path, entry);

    if (statSync(child).isDirectory()) {
      return walk(child);
    }

    return [child];
  });
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

const files = walk(dist).sort();
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const html = Object.fromEntries(
  htmlFiles.map((file) => {
    const content = readFileSync(file, "utf8");
    const canonical = content.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? "";

    return [
      relative(dist, file),
      {
        hash: sha256(content),
        canonical,
      },
    ];
  }),
);
const sitemap = existsSync("dist/sitemap-index.xml")
  ? readFileSync("dist/sitemap-index.xml", "utf8")
  : "";
const routes = htmlFiles.map((file) => relative(dist, file)).sort();
const manifest = {
  routes,
  files: files.map((file) => relative(dist, file)).sort(),
  canonicals: Object.fromEntries(
    Object.entries(html).map(([file, value]) => [file, value.canonical]),
  ),
  htmlHashes: Object.fromEntries(
    Object.entries(html).map(([file, value]) => [file, value.hash]),
  ),
  sitemapHash: sha256(sitemap),
  sitemapRoutes: [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort(),
};

writeFileSync(output, `${JSON.stringify(manifest, null, 2)}\n`);
NODE
}

log "Verifying required acceptance files"
require_file "README.md"
require_file "SITE-CONSTITUTION.md"
require_file "PUBLICATION-POLICY.md"
require_file "PUBLICATION-INDEX.md"
require_file "SECURITY.md"
require_file "DEPLOYMENT.md"
require_file "CONTRIBUTING.md"
require_file "docs/CONTENT-GUIDE.md"
require_file "docs/RELEASE-PROCESS.md"
require_file "publications/ER-CON-002-Enterprise-Reality-Website-Constitution.md"
require_file "publications/ER-WEB-001-Enterprise-Reality-Website-Specification-v1.0.md"
require_file "publications/ER-WEB-002-Enterprise-Reality-Website-Architecture-Guide-v1.0.md"
require_file "publications/ER-WEB-003-Enterprise-Reality-Website-Design-System-v1.0.md"
require_file "publications/ER-WEB-004-Enterprise-Reality-Website-Publication-Guide-v1.0.md"
require_file ".github/workflows/quality.yml"
require_file ".github/workflows/deploy.yml"
require_file "public/CNAME"
require_file "acceptance/website-v1/expected/route-manifest.json"
require_file "acceptance/website-v1/evidence/WEB-1-RW1-EVIDENCE.md"

log "Running canonical quality gates"
"${NPM[@]}" run format:check
"${NPM[@]}" run lint
"${NPM[@]}" run check
"${NPM[@]}" run test
"${NPM[@]}" run test:e2e

log "Running focused WEB-1-RW1 acceptance tests"
"${NPM[@]}" run test -- tests/unit/acceptance-rules.test.ts
"${NPM[@]}" run test:e2e -- tests/e2e/acceptance.spec.ts

log "Running first production build"
"${NPM[@]}" run build
mkdir -p "$WORK_DIR"
semantic_manifest "$MANIFEST_ONE"

log "Running public/private boundary check"
"${NPM[@]}" run public-boundary:check

log "Running second production build"
"${NPM[@]}" run build
semantic_manifest "$MANIFEST_TWO"

log "Comparing semantic build outputs"
cmp "$MANIFEST_ONE" "$MANIFEST_TWO"

log "Checking git whitespace"
git diff --check

log "Repository state"
git status --short

printf '\nWEB-1-RW1 ACCEPTANCE PASS: routes, narrative, metadata, accessibility smoke checks, boundary checks, deployment readiness and semantic build reproducibility passed.\n'
