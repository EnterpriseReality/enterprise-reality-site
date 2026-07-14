import { existsSync, lstatSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const roots = process.argv.slice(2);
const scanRoots =
  roots.length > 0 ? roots : ["src", "public", "publications", "dist"];

const prohibitedMarkers = [
  ".codex/",
  "engineering-backlog/",
  "internal prompt",
  "private review",
  "BEGIN PRIVATE KEY",
  "API_KEY",
];

const secretPatterns = [
  { label: "private key block", pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
  {
    label: "generic token assignment",
    pattern: /\b(token|secret|password)\s*=\s*['"][^'"]{12,}/i,
  },
  {
    label: "generic API key assignment",
    pattern: /\bapi[_-]?key\s*=\s*['"][^'"]{12,}/i,
  },
];

const ignoredDirectories = new Set([
  ".git",
  ".astro",
  "node_modules",
  "coverage",
  "playwright-report",
  "test-results",
]);

const ignoredFiles = new Set([
  "scripts/check-public-boundary.mjs",
  "src/utilities/content-rules.ts",
]);
const textExtensions = new Set([
  ".astro",
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".svg",
  ".ts",
  ".txt",
  ".yml",
  ".yaml",
]);

const findings = [];

function isTextFile(path) {
  return [...textExtensions].some((extension) => path.endsWith(extension));
}

function walk(root, path = root) {
  if (!existsSync(path)) {
    return;
  }

  const stats = lstatSync(path);
  const repoPath = relative(process.cwd(), path);

  if (stats.isDirectory()) {
    if (ignoredDirectories.has(path.split("/").at(-1))) {
      return;
    }

    for (const entry of readdirSync(path)) {
      walk(root, join(path, entry));
    }

    return;
  }

  if (!stats.isFile() || ignoredFiles.has(repoPath) || !isTextFile(path)) {
    return;
  }

  const content = readFileSync(path, "utf8");
  const lowerContent = content.toLowerCase();

  for (const marker of prohibitedMarkers) {
    if (lowerContent.includes(marker.toLowerCase())) {
      findings.push(`${repoPath}: prohibited marker "${marker}"`);
    }
  }

  for (const secretPattern of secretPatterns) {
    if (secretPattern.pattern.test(content)) {
      findings.push(
        `${repoPath}: possible secret pattern "${secretPattern.label}"`,
      );
    }
  }
}

for (const root of scanRoots) {
  walk(root);
}

if (findings.length > 0) {
  console.error("Public/private boundary check failed:");
  for (const finding of findings) {
    console.error(`- ${finding}`);
  }
  process.exit(1);
}

console.log(
  `Public/private boundary check passed for ${scanRoots.filter((root) => existsSync(root)).join(", ")}.`,
);
