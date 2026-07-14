# Enterprise Reality Website Programme

This repository contains the public website programme for **Enterprise
Reality**.

The website is engineered using Constitution-Driven Engineering and governed by
approved public publications. It is constitutionally separate from the private
Enterprise Reality platform repository.

## Governing Publications

- [ER-CON-002 — Enterprise Reality Website Constitution](publications/ER-CON-002-Enterprise-Reality-Website-Constitution.md)
- [ER-WEB-001 — Website Specification](publications/ER-WEB-001-Enterprise-Reality-Website-Specification-v1.0.md)
- [ER-WEB-002 — Website Architecture Guide](publications/ER-WEB-002-Enterprise-Reality-Website-Architecture-Guide-v1.0.md)
- [ER-WEB-003 — Website Design System](publications/ER-WEB-003-Enterprise-Reality-Website-Design-System-v1.0.md)
- [ER-WEB-004 — Website Publication Guide](publications/ER-WEB-004-Enterprise-Reality-Website-Publication-Guide-v1.0.md)
- [Publication Index](publications/PUBLICATION-INDEX.md)

Implementation follows these publications rather than redefining them.

## Current Status

Website Programme: Deployment Readiness

Current story: WEB-1.7 — Deployment Readiness

Deployment: Prepared but deferred. WEB-1.7 adds repeatable GitHub Pages
readiness, release documentation and custom-domain preparation without
publishing the site, changing DNS or modifying hosting settings.

## Prerequisites

- Node.js 20 or later
- npm
- Chromium dependencies for Playwright browser smoke tests

## Setup

```sh
npm install
npx playwright install chromium
```

## Commands

```sh
npm run dev
npm run build
npm run check
npm run lint
npm run format
npm run format:check
npm run test
npm run test:e2e
npm run public-boundary:check
```

## Repository Structure

```text
enterprise-reality-site/
├── .github/
├── architecture/
├── docs/
├── implementation/
├── public/
├── publications/
├── scripts/
├── source-material/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── utilities/
├── tests/
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Architecture Summary

The site is an Astro static site using TypeScript, content collections,
standards-based CSS and minimal client-side JavaScript. The generated output is
portable static HTML, CSS, JavaScript and assets.

The website owns public presentation, publication, navigation, documentation and
quality checks. It does not own runtime reasoning, automation, evidence
resolution, authentication, customer data or production APIs.

## Content Model

Astro content collections are defined for architecture, research, releases,
roadmap and industry content. Metadata is validated at build time and draft
content is excluded from production routes.

## Quality Checks

The site includes format checks, linting, Astro/TypeScript checks, unit tests,
Playwright browser smoke tests, axe accessibility smoke tests, static build
verification, sitemap generation and public/private boundary scanning.

## Deployment Readiness

Production deployment is prepared through GitHub Actions and GitHub Pages, but
requires separate release approval before publication.

- Pull requests run the deployment workflow build and all quality gates without
  deploying.
- Pushes to `main` are the only event allowed to deploy the uploaded Pages
  artifact.
- The canonical production origin is `https://www.enterprisereality.org`.
- `public/CNAME` prepares the GitHub Pages custom-domain artifact for
  `www.enterprisereality.org`.
- Apex-domain support for `https://enterprisereality.org` is documented as a
  Cloudflare DNS and redirect configuration step.

See [DEPLOYMENT.md](DEPLOYMENT.md) and
[docs/RELEASE-PROCESS.md](docs/RELEASE-PROCESS.md) before approving any
production publication.

## Public / Private Boundary

This repository contains approved public material only. Do not copy private
platform source, unpublished review material, internal prompts, confidential
correspondence, employer/client material, personal data, credentials or secrets
into this repository.

The boundary scanner is a supporting control. It does not replace editorial,
architectural and public-classification review.

## Website Programme

- WEB-1.0 — Website Foundations
- WEB-1.1 — Core Public Narrative
- WEB-1.2 — Architecture Experience
- WEB-1.3 — Research & Publications
- WEB-1.4 — Industries
- WEB-1.5 — Roadmap & Releases
- WEB-1.6 — Hardening
- WEB-1.7 — Deployment Readiness
- WEB-1-RW1 — Website Acceptance Workload

Architecture before implementation. Truth before marketing. Public evidence
before public claims.
