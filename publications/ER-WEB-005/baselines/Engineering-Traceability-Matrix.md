# Engineering Traceability Matrix

Version: 1.0.0  
Date: 2026-07-15  
Repository:
`/Users/shezz/Documents/EnterpriseReality/enterprise-reality-site`  
Sprint: SPR-WEB-3.0  
Story: ER-WEB-005 - Constitutional Engineering Baseline  
Artefact status: Baseline evidence artefact; not a handbook chapter.

## Purpose

This matrix maps planned ER-WEB-005 Chapters 15-24 to observable repository
evidence. It is a traceability artefact for future chapter authors. It does not
author the chapters and does not introduce implementation or architecture
changes.

## Matrix

| Planned chapter | Planned subject | Observable repository evidence | Baseline traceability note |
| --- | --- | --- | --- |
| Chapter 15 | Technology Stack | `package.json`; `package-lock.json`; `astro.config.mjs`; `tsconfig.json`; `eslint.config.js`; `vitest.config.ts`; `playwright.config.ts`; `.nvmrc` | Future content must describe the observed Astro, TypeScript, CSS, Vitest, Playwright, ESLint, Prettier, sitemap and public-boundary stack. |
| Chapter 16 | Astro Architecture | `astro.config.mjs`; `src/pages/`; `src/layouts/`; `src/components/`; `src/content.config.ts`; `architecture/decisions/ADR-SITE-001-static-site-platform.md` | Future content must anchor Astro discussion in static output, file-based routes, shared layouts, components and content collections. |
| Chapter 17 | TypeScript Design | `tsconfig.json`; `src/content.config.ts`; `src/utilities/content-rules.ts`; `src/utilities/industries.ts`; `src/utilities/publications.ts`; `src/utilities/roadmap.ts`; `src/utilities/status.ts`; `tests/unit/` | Future content must reference the repository's actual TypeScript utility modules, type checks and unit-tested content rules. |
| Chapter 18 | CSS Design System | `src/styles/tokens.css`; `src/styles/global.css`; component-local Astro styles; `publications/ER-WEB-003-Enterprise-Reality-Website-Design-System-v1.0.md` | Future content must trace styling to token definitions, global CSS primitives and existing component styles. |
| Chapter 19 | Content Collections | `src/content.config.ts`; `src/content/architecture/`; `src/content/industries/`; `src/content/releases/`; `src/content/roadmap/`; `tests/unit/content-rules.test.ts` | Future content must describe the collection schemas, draft defaults, canonical path validation and public-path restrictions as implemented. |
| Chapter 20 | Navigation Architecture | `src/components/SiteHeader.astro`; `src/components/SiteFooter.astro`; `src/pages/`; `tests/e2e/foundation.spec.ts`; `tests/e2e/industries.spec.ts`; `tests/e2e/architecture.spec.ts` | Future content must reference primary navigation, footer navigation, active route state and mobile menu behaviour. |
| Chapter 21 | Metadata Architecture | `src/layouts/BaseLayout.astro`; `src/layouts/PublicationLayout.astro`; `src/content.config.ts`; `tests/e2e/foundation.spec.ts`; `tests/e2e/acceptance.spec.ts`; `tests/unit/acceptance-rules.test.ts` | Future content must trace title composition, descriptions, canonical URLs, Open Graph metadata, Twitter metadata and publication metadata to implemented layouts and tests. |
| Chapter 22 | SEO and Discoverability | `astro.config.mjs`; `src/layouts/BaseLayout.astro`; `public/robots.txt`; `public/CNAME`; `DEPLOYMENT.md`; `docs/RELEASE-PROCESS.md`; `tests/unit/acceptance-rules.test.ts` | Future content must reference canonical origin, trailing slash policy, sitemap integration, robots configuration and release verification evidence. |
| Chapter 23 | Structured Data | `src/layouts/BaseLayout.astro`; `src/layouts/PublicationLayout.astro`; `src/pages/industries/index.astro`; `src/pages/industries/[sector].astro`; `src/pages/roadmap.astro`; `tests/e2e/foundation.spec.ts`; `tests/e2e/acceptance.spec.ts`; `tests/e2e/industries.spec.ts` | Future content must describe the observed JSON-LD graph pattern and page-specific structured-data inputs only where implemented. |
| Chapter 24 | Accessibility Engineering | `src/layouts/BaseLayout.astro`; `src/components/SiteHeader.astro`; `src/styles/global.css`; `tests/e2e/acceptance.spec.ts`; `tests/e2e/foundation.spec.ts`; `tests/e2e/architecture.spec.ts`; `tests/e2e/industries.spec.ts`; `tests/e2e/roadmap.spec.ts`; `@axe-core/playwright` in `package.json` | Future content must map accessibility discussion to skip navigation, semantic landmarks, ARIA attributes, focus styles, keyboard behaviour and axe smoke tests. |

## Candidate Chapter Evidence Rules

Future Chapters 15-24 must:

- Reference observable repository files.
- Avoid claims that cannot be traced to current implementation.
- Treat ER-CON-002 and ER-WEB-001 through ER-WEB-004 as governing
  publications.
- Preserve the public website boundary recorded in ADR-SITE-002.
- Avoid introducing implementation changes inside handbook chapter work.

## Current Chapter State

The planned Chapters 15-24 are listed in
`publications/ER-WEB-005/part-3-engineering/README.md`. Chapter files for
Chapters 15-24 are intentionally absent in this baseline. This matrix records
candidate evidence only.
