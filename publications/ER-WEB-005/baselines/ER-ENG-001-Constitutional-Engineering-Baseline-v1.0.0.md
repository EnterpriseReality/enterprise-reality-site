# ER-ENG-001 - Constitutional Engineering Baseline

Version: 1.0.0  
Date: 2026-07-15  
Repository:
`/Users/shezz/Documents/EnterpriseReality/enterprise-reality-site`  
Sprint: SPR-WEB-3.0  
Story: ER-WEB-005 - Constitutional Engineering Baseline  
Artefact status: Baseline evidence artefact; not a handbook chapter.

## Purpose

This artefact records the observed engineering baseline for the Enterprise
Reality public website repository. It catalogues repository evidence only. It
does not introduce implementation changes, architecture changes, engineering
patterns, refactors or handbook chapter content.

## 1. Repository Identity

| Field | Observed baseline |
| --- | --- |
| Repository path | `/Users/shezz/Documents/EnterpriseReality/enterprise-reality-site` |
| Package name | `enterprise-reality-site` |
| Package version | `0.1.0` |
| Module system | ECMAScript modules via `"type": "module"` |
| Programme identity | Enterprise Reality Website Programme |
| Current website status | Deployment Readiness |
| Governing publications | ER-CON-002, ER-WEB-001, ER-WEB-002, ER-WEB-003, ER-WEB-004 |
| Current handbook work area | `publications/ER-WEB-005/` |

Primary repository evidence:

- `README.md`
- `package.json`
- `SITE-CONSTITUTION.md`
- `publications/ER-CON-002-Enterprise-Reality-Website-Constitution.md`
- `publications/ER-WEB-005/README.md`
- `publications/ER-WEB-005/CONSTITUTION.md`

## 2. Repository Topology

The repository is organised around public website implementation, publications,
architecture records, documentation, validation scripts, tests and acceptance
evidence.

| Top-level area | Observed responsibility |
| --- | --- |
| `.github/` | GitHub Actions quality and deployment workflows; Dependabot configuration. |
| `acceptance/` | Website acceptance workload records and expected route manifest. |
| `architecture/` | Site architecture overview and accepted architecture decision records. |
| `docs/` | Content and release process documentation. |
| `implementation/` | Implementation notes boundary area. |
| `public/` | Static public assets including favicon, robots file and CNAME. |
| `publications/` | Approved public publications and ER-WEB-005 handbook workspace. |
| `scripts/` | Repository validation scripts. |
| `source-material/` | Source-material boundary documentation. |
| `src/` | Astro source for pages, layouts, components, content schemas, styles and utilities. |
| `tests/` | Unit and browser smoke tests. |

Primary repository evidence:

- `README.md`
- `architecture/SITE-ARCHITECTURE.md`
- `.github/workflows/quality.yml`
- `.github/workflows/deploy.yml`

## 3. Technology Stack

The observed implementation is a static Astro website using TypeScript,
standards-based CSS and Markdown-backed content collections.

| Layer | Observed technology |
| --- | --- |
| Site framework | Astro `^7.0.9` |
| Language | TypeScript `^6.0.3` |
| Content | Astro content collections loaded from Markdown files |
| Styling | CSS files under `src/styles/` with design tokens in `tokens.css` |
| Sitemap | `@astrojs/sitemap` |
| Type and Astro checks | `astro check` through `@astrojs/check` |
| Unit tests | Vitest |
| Browser tests | Playwright with Chromium |
| Accessibility smoke testing | `@axe-core/playwright` |
| Linting | ESLint with JavaScript and TypeScript ESLint configurations |
| Formatting | Prettier with Astro plugin |
| Public boundary scan | `scripts/check-public-boundary.mjs` |

Primary repository evidence:

- `package.json`
- `astro.config.mjs`
- `src/content.config.ts`
- `eslint.config.js`
- `vitest.config.ts`
- `playwright.config.ts`
- `scripts/check-public-boundary.mjs`

## 4. Source Tree

The source tree is split by Astro responsibility.

| Source area | Observed contents |
| --- | --- |
| `src/pages/` | Route files for home, narrative pages, architecture, industries, research, roadmap, about and 404. |
| `src/layouts/` | Shared page and publication layouts. |
| `src/components/` | Site header, footer, cards, badges, callouts and architecture explorer components. |
| `src/styles/` | Global CSS and design tokens. |
| `src/utilities/` | Publication, roadmap, industry, status and content-rule utilities. |
| `src/content/` | Content collection entries for architecture, industries, releases and roadmap. |
| `src/content.config.ts` | Collection schemas, canonical path rules and public path validation. |

Primary repository evidence:

- `src/pages/index.astro`
- `src/pages/architecture.astro`
- `src/pages/industries/index.astro`
- `src/pages/industries/[sector].astro`
- `src/pages/research/index.astro`
- `src/layouts/BaseLayout.astro`
- `src/layouts/PublicationLayout.astro`
- `src/components/SiteHeader.astro`
- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/content.config.ts`

## 5. Publication Architecture

The website presents approved public publications and governed public content.
Publication implementation is observable in the content model, publication
layout, publication cards, publication utilities and publication policy.

| Publication concern | Observed repository evidence |
| --- | --- |
| Governing publication policy | `PUBLICATION-POLICY.md` |
| Publication index | `PUBLICATION-INDEX.md`, `publications/PUBLICATION-INDEX.md` |
| Handbook workspace | `publications/ER-WEB-005/` |
| Publication layout | `src/layouts/PublicationLayout.astro` |
| Publication card presentation | `src/components/PublicationCard.astro` |
| Publication route generation | `src/pages/research/publications/[slug].astro` |
| Publication listing route | `src/pages/research/publications/index.astro` |
| Publication utilities | `src/utilities/publications.ts` |
| Metadata validation | `src/content.config.ts`, `tests/unit/content-rules.test.ts` |

The repository contains ER-WEB-005 Part III scaffolding for planned engineering
chapters 15-24. Those chapters are not present as authored chapter files in the
baseline.

Primary repository evidence:

- `publications/ER-WEB-005/part-3-engineering/README.md`
- `publications/ER-WEB-005/CHAPTER-METADATA-TEMPLATE.md`
- `src/layouts/PublicationLayout.astro`
- `src/utilities/publications.ts`

## 6. Build Engineering

The build is deterministic static generation with an additional public-boundary
check against generated output.

| Build concern | Observed baseline |
| --- | --- |
| Development command | `npm run dev` |
| Production build command | `npm run build` |
| Build implementation | `ASTRO_TELEMETRY_DISABLED=1 astro build && node scripts/check-public-boundary.mjs dist` |
| Output mode | Static output in Astro configuration |
| Canonical site origin | `https://www.enterprisereality.org` |
| Trailing slash policy | `trailingSlash: "always"` |
| Generated sitemap integration | `@astrojs/sitemap` |
| Static artifact directory | `dist/` |

Primary repository evidence:

- `package.json`
- `astro.config.mjs`
- `DEPLOYMENT.md`
- `docs/RELEASE-PROCESS.md`

## 7. Quality Gates

The repository defines local and CI quality gates for formatting, linting,
Astro and TypeScript checks, unit tests, browser and accessibility smoke tests,
production build verification and public-boundary checks.

| Gate | Command or evidence |
| --- | --- |
| Format check | `npm run format:check` |
| Lint | `npm run lint` |
| Astro and TypeScript check | `npm run check` |
| Unit tests | `npm run test` |
| Browser and accessibility smoke tests | `npm run test:e2e` |
| Production build | `npm run build` |
| Public boundary check | `npm run public-boundary:check` |
| Whitespace diff check | `git diff --check` |
| CI quality workflow | `.github/workflows/quality.yml` |
| Deployment build verification | `.github/workflows/deploy.yml` |

Primary repository evidence:

- `package.json`
- `.github/workflows/quality.yml`
- `.github/workflows/deploy.yml`
- `tests/unit/content-rules.test.ts`
- `tests/unit/acceptance-rules.test.ts`
- `tests/e2e/`

## 8. Deployment Integration

Deployment readiness is present but production publication remains approval
controlled. GitHub Pages deployment is configured through GitHub Actions, with
the deploy job constrained to pushes on `main`.

| Deployment concern | Observed baseline |
| --- | --- |
| Deployment workflow | `.github/workflows/deploy.yml` |
| Build job events | `pull_request`, `push` to `main`, `workflow_dispatch` |
| Deploy job condition | `github.event_name == 'push' && github.ref == 'refs/heads/main'` |
| Artifact upload | `actions/upload-pages-artifact` using `dist` |
| Pages deploy action | `actions/deploy-pages` |
| Workflow permissions | Default `contents: read`; deploy job grants `pages: write` and `id-token: write` |
| Custom domain artifact | `public/CNAME` |
| Robots file | `public/robots.txt` |
| Deployment guidance | `DEPLOYMENT.md`, `docs/RELEASE-PROCESS.md` |

Primary repository evidence:

- `.github/workflows/deploy.yml`
- `DEPLOYMENT.md`
- `docs/RELEASE-PROCESS.md`
- `public/CNAME`
- `public/robots.txt`
- `astro.config.mjs`

## 9. Engineering Inventory

| Inventory item | Repository evidence |
| --- | --- |
| Static-site decision | `architecture/decisions/ADR-SITE-001-static-site-platform.md` |
| Public content boundary | `architecture/decisions/ADR-SITE-002-public-content-boundary.md` |
| Hosting and domain strategy | `architecture/decisions/ADR-SITE-003-hosting-and-domain-strategy.md` |
| Site layer model | `architecture/SITE-ARCHITECTURE.md` |
| Global layout and metadata | `src/layouts/BaseLayout.astro` |
| Publication layout | `src/layouts/PublicationLayout.astro` |
| Primary navigation | `src/components/SiteHeader.astro` |
| Footer navigation | `src/components/SiteFooter.astro` |
| Design tokens | `src/styles/tokens.css` |
| Global CSS | `src/styles/global.css` |
| Content schemas | `src/content.config.ts` |
| Publication utilities | `src/utilities/publications.ts` |
| Industry data utilities | `src/utilities/industries.ts` |
| Roadmap data utilities | `src/utilities/roadmap.ts` |
| Status constants | `src/utilities/status.ts` |
| Content-rule validation utility | `src/utilities/content-rules.ts` |
| Unit tests | `tests/unit/` |
| End-to-end tests | `tests/e2e/` |
| Acceptance workload | `acceptance/website-v1/` |
| Public-boundary scanner | `scripts/check-public-boundary.mjs` |
| Deployment workflow | `.github/workflows/deploy.yml` |
| Quality workflow | `.github/workflows/quality.yml` |
| Release process | `docs/RELEASE-PROCESS.md` |
| Content guide | `docs/CONTENT-GUIDE.md` |
| Security posture | `SECURITY.md` |

## Baseline Constraints

- This artefact does not change implementation.
- This artefact does not change architecture.
- This artefact does not create handbook chapter content.
- This artefact does not author Chapters 15-24.
- This artefact catalogues observable repository evidence only.
