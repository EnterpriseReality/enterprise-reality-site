---
publication: ER-WEB-005
part: III
chapter: 16
title: Astro Implementation Architecture
version: 0.1.0
status: Draft
classification: Canonical Engineering
author: Enterprise Reality Programme
reviewer: Chief Architect
engineering-source: ER-ENG-001
engineering-viewpoint: Astro Implementation Architecture
---

# Chapter 16 - Astro Implementation Architecture

> **"Architecture defines intent. Astro realises that intent through implementation."**

## Engineering Viewpoint

Astro Implementation Architecture

---

## Design Intent (Internal)

This chapter documents how the Enterprise Reality Website architecture is implemented using Astro.

It records observable implementation evidence rather than prescribing framework design.

---

## Purpose

Describe the role of Astro as the implementation framework supporting the Enterprise Reality Website.

This chapter explains how Astro organises pages, layouts, routing, content rendering and static site generation in support of the approved architecture.

---

## Engineering Authority

This chapter derives its authority from:

- ER-ENG-001 - Constitutional Engineering Baseline
- Engineering Traceability Matrix

---

## Evidence Summary

### Primary Sources

- ER-ENG-001
- Engineering Traceability Matrix

### Repository Evidence

- `astro.config.mjs`
- `src/pages/`
- `src/layouts/`
- `src/components/`
- `src/content.config.ts`
- `architecture/decisions/ADR-SITE-001-static-site-platform.md`
- `package.json`

### Verification

✓ Repository observed

✓ Engineering baseline approved

✓ Implementation unchanged

---

## Astro Implementation Overview

The repository implements the public website as an Astro project.

The Astro configuration defines:

- `site` as `https://www.enterprisereality.org`;
- `output` as `static`;
- `trailingSlash` as `always`;
- the `@astrojs/sitemap` integration.

The package scripts run Astro through:

- `npm run dev`, which invokes `astro dev`;
- `npm run build`, which invokes `astro build` and then runs the public-boundary check against `dist`;
- `npm run check`, which invokes `astro check`.

The source tree separates Astro responsibilities into:

- `src/pages/` for route files;
- `src/layouts/` for shared layout wrappers;
- `src/components/` for reusable page elements;
- `src/content.config.ts` for content collection configuration and validation;
- `src/styles/` for global CSS and design tokens.

The implementation observed in repository evidence is a static Astro website using TypeScript, Astro components, Markdown-backed content collections and shared layouts.

---

## Static Site Generation

Static generation is configured directly in `astro.config.mjs` through `output: "static"`.

The production build command in `package.json` is:

`ASTRO_TELEMETRY_DISABLED=1 astro build && node scripts/check-public-boundary.mjs dist`

This means the observed build process:

- disables Astro telemetry for the build command;
- runs `astro build`;
- checks the generated `dist` output with `scripts/check-public-boundary.mjs`.

Dynamic route files that require static paths provide them through `getStaticPaths`.

Observed examples include:

- `src/pages/industries/[sector].astro`, which maps `industryScenarios` to sector route parameters;
- `src/pages/research/publications/[slug].astro`, which loads visible research publications from the `research` content collection and maps each publication to a slug route parameter.

The repository evidence supports static publication only. No server output mode is configured.

---

## Layout Composition

The implementation uses Astro layouts to compose shared page structure.

`src/layouts/BaseLayout.astro` imports:

- `SiteHeader` from `src/components/SiteHeader.astro`;
- `SiteFooter` from `src/components/SiteFooter.astro`;
- `src/styles/global.css`.

`BaseLayout` accepts page metadata through props, composes the document title and canonical URL, emits metadata and structured data, renders the shared header and footer, and exposes page-specific content through a `<slot />`.

Pages such as `src/pages/index.astro` import `BaseLayout` and pass title, description and canonical path values before rendering page sections inside the layout.

`src/layouts/PublicationLayout.astro` imports `BaseLayout` and `StatusBadge`. It wraps publication content in a publication-specific article structure, renders publication metadata, renders the page body through a `<slot />`, and passes article metadata into `BaseLayout`.

Reusable components are imported directly into pages and layouts. Observed examples include:

- `SiteHeader` and `SiteFooter` in `BaseLayout`;
- `StatusBadge` in `PublicationLayout` and `src/pages/index.astro`;
- `Callout` in `src/pages/index.astro`;
- `PublicationLayout` in `src/pages/research/publications/[slug].astro`.

---

## Routing Implementation

Routing is implemented through Astro route files under `src/pages/`.

Observed route files include:

- `src/pages/index.astro`;
- `src/pages/about.astro`;
- `src/pages/architecture.astro`;
- `src/pages/constitution-driven-engineering.astro`;
- `src/pages/platform.astro`;
- `src/pages/roadmap.astro`;
- `src/pages/why-enterprise-reality.astro`;
- `src/pages/404.astro`;
- `src/pages/industries/index.astro`;
- `src/pages/industries/[sector].astro`;
- `src/pages/research/index.astro`;
- `src/pages/research/publications/index.astro`;
- `src/pages/research/publications/[slug].astro`.

The dynamic route `src/pages/industries/[sector].astro` defines `getStaticPaths` and returns route parameters from `industryScenarios`.

The dynamic route `src/pages/research/publications/[slug].astro` defines `getStaticPaths`, reads the `research` content collection, filters visible publications, derives publication slugs and passes each publication as route props.

The primary navigation is implemented in `src/components/SiteHeader.astro` as an array of link targets matching observed public route paths. The component compares each link with `Astro.url.pathname` to set `aria-current` on the current route.

The configured trailing slash policy is `always`, and page code passes canonical paths with trailing slashes where canonical paths are specified explicitly.

---

## Relationship to Website Architecture

Part II defined the Website Runtime Architecture.

This chapter documents how Astro realises that architecture through implementation.

Architecture remains constitutionally authoritative.

Implementation remains engineering evidence.

---

## Engineering Consequences

The Astro implementation influences:

- repository organisation;
- content rendering;
- navigation;
- build engineering;
- deployment.

Subsequent chapters examine these areas individually.

---

## Engineering Traceability

Every implementation statement in this chapter shall be traceable to:

- ER-ENG-001
- Engineering Traceability Matrix
- Repository evidence

---

## Lessons Learned

Framework documentation should describe implemented behaviour rather than assumed capability.

Implementation evidence provides the most reliable engineering record.

---

## Future Evolution

This chapter should change only when:

- Astro implementation changes;
- ER-ENG-001 is updated.

Architectural changes alone do not require revision.

---

## Engineering Integrity Check

✓ Repository evidence referenced

✓ Engineering Baseline referenced

✓ Architecture preserved

✓ Implementation accurately represented

✓ Traceability established

---

## Engineering Summary

### Purpose

Document Astro implementation.

### Engineering Authority

ER-ENG-001.

### Repository Evidence

Astro configuration and implementation.

### Traceability

Engineering Traceability Matrix.

---

## Engineer's Reflection

Frameworks evolve.

What remains valuable is an accurate engineering description of how the framework was implemented at a specific point in time.

The Constitutional Engineering Baseline preserves that understanding.

---

## Enduring Contribution

**Astro implementation shall always be documented from observable repository evidence rather than inferred framework behaviour.**
