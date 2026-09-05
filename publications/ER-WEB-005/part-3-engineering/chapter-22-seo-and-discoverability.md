---
publication: ER-WEB-005
part: III
chapter: 22
title: SEO and Discoverability
version: 0.1.0
status: Draft
classification: Canonical Engineering
author: Enterprise Reality Programme
reviewer: Chief Architect
engineering-source: ER-ENG-001
engineering-viewpoint: SEO and Discoverability
---

# Chapter 22 - SEO and Discoverability

> **"Knowledge must first possess identity before it can be discovered."**

## Engineering Viewpoint

**SEO and Discoverability**

---

## Design Intent (Internal)

This chapter documents the implemented SEO and discoverability mechanisms of the Enterprise Reality Website.

It records observable implementation evidence only.

It shall not describe SEO practices that are not implemented within the repository.

---

## Purpose

Describe how the implemented website supports external discovery while preserving constitutional publication integrity.

The objective is to explain how implemented SEO mechanisms expose governed knowledge without becoming the source of that knowledge.

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
- `package.json`
- `src/layouts/BaseLayout.astro`
- `src/layouts/PublicationLayout.astro`
- `src/pages/research/index.astro`
- `src/pages/research/publications/index.astro`
- `src/pages/research/publications/[slug].astro`
- `src/utilities/publications.ts`
- `public/robots.txt`
- `public/CNAME`
- `DEPLOYMENT.md`
- `docs/RELEASE-PROCESS.md`
- `tests/unit/acceptance-rules.test.ts`

### Verification

✓ Repository observed

✓ Engineering baseline approved

✓ Implementation unchanged

---

## Repository Evidence

| Repository Artefact | Purpose |
| ------------------- | ------- |
| `astro.config.mjs` | Configures the canonical site origin as `https://www.enterprisereality.org`, static output, trailing slash behaviour and the `@astrojs/sitemap` integration. |
| `package.json` | Declares `@astrojs/sitemap` as an implementation dependency and defines build and validation commands that generate and check the static output. |
| `src/layouts/BaseLayout.astro` | Composes page titles, descriptions and canonical URLs from layout props and emits the canonical link for rendered pages. |
| `src/layouts/PublicationLayout.astro` | Passes publication title, summary and canonical path into `BaseLayout` for publication pages. |
| `src/pages/research/index.astro` | Exposes the research landing page with a canonical path and lists visible featured publications from the research collection. |
| `src/pages/research/publications/index.astro` | Exposes the research publication index with a canonical path and lists visible research publications. |
| `src/pages/research/publications/[slug].astro` | Generates static publication routes only from visible research publications and renders them through `PublicationLayout`. |
| `src/utilities/publications.ts` | Filters draft research publications from visible publication routes and derives publication slugs from canonical paths. |
| `public/robots.txt` | Allows crawling for all user agents and declares the canonical sitemap index URL. |
| `public/CNAME` | Records the custom domain `www.enterprisereality.org`, aligned with the configured Astro site origin. |
| `DEPLOYMENT.md` | Records canonical origin, sitemap, robots, CNAME and static artifact verification expectations for deployment readiness. |
| `docs/RELEASE-PROCESS.md` | Includes release checklist checks for sitemap, robots, CNAME and canonical URL evidence. |
| `tests/unit/acceptance-rules.test.ts` | Verifies static generation, canonical origin alignment with CNAME and robots sitemap declaration. |

---

## Implemented Discoverability Architecture

The implemented discoverability architecture is static, route-based and origin-bound.

`astro.config.mjs` configures Astro with `output: "static"`, `site: "https://www.enterprisereality.org"`, `trailingSlash: "always"` and `integrations: [sitemap()]`. These settings establish the build as a static website, bind generated site URLs to the configured production origin, use trailing slash URLs and enable sitemap generation through the Astro sitemap integration.

Discoverable page identity is implemented through shared layout inputs. `BaseLayout` accepts `title`, `description` and an optional `canonicalPath`. It composes a site-qualified page title, builds the canonical URL from the canonical path and `https://www.enterprisereality.org`, and emits a canonical link in the document head.

Publication discoverability is implemented by the research publication routes. `src/pages/research/publications/index.astro` exposes the publication index at `/research/publications/`. `src/pages/research/publications/[slug].astro` generates static publication routes from visible research publications only. Visibility is determined by `visibleResearchPublications`, which excludes draft research entries before route generation and listing.

Search engine exposure is implemented through static HTML routes, generated sitemap output, canonical links and the repository robots file. `public/robots.txt` allows crawling and points crawlers to `https://www.enterprisereality.org/sitemap-index.xml`.

The implementation does not add an SEO service, analytics service, crawler control beyond the repository robots file, runtime indexing API or search ranking mechanism.

---

## Sitemap Generation

Sitemap generation is implemented through `@astrojs/sitemap`.

The integration is imported in `astro.config.mjs` and registered as `sitemap()` in the Astro `integrations` array. The same configuration sets the site origin to `https://www.enterprisereality.org`, so generated sitemap URLs are bound to that origin.

`package.json` declares `@astrojs/sitemap` as a dependency and defines the production build as:

```sh
ASTRO_TELEMETRY_DISABLED=1 astro build && node scripts/check-public-boundary.mjs dist
```

The build therefore runs Astro static generation before the public-boundary scanner checks the generated `dist/` output.

`DEPLOYMENT.md` records post-build checks for `dist/sitemap-index.xml`, and `docs/RELEASE-PROCESS.md` records the release checklist expectation that `dist/sitemap-index.xml` exists and uses canonical URLs.

`public/robots.txt` references the generated sitemap index at:

```text
https://www.enterprisereality.org/sitemap-index.xml
```

---

## Canonical URLs

Canonical URLs are implemented in `BaseLayout`.

The layout defines the site origin as `https://www.enterprisereality.org`, accepts a `canonicalPath` prop and falls back to `Astro.url.pathname` when no explicit canonical path is supplied. It then constructs the canonical URL with:

```ts
new URL(canonicalPath, siteOrigin).toString()
```

The resulting value is emitted as:

```html
<link rel="canonical" href={canonicalUrl} />
```

Publication pages pass their collection `canonicalPath` through `PublicationLayout` into `BaseLayout`. The research landing page and research publication index also pass explicit canonical paths.

Canonical origin alignment is checked by `tests/unit/acceptance-rules.test.ts`, which verifies that `astro.config.mjs` contains the configured origin, `public/CNAME` contains `www.enterprisereality.org` and `public/robots.txt` points to the canonical sitemap.

---

## Search Engine Exposure

Search engine exposure is implemented through public static routes and public static files.

The Astro build emits static output because `astro.config.mjs` sets `output: "static"`. Public files under `public/` are copied into the generated artifact, including `robots.txt` and `CNAME`.

`public/robots.txt` contains:

```text
User-agent: *
Allow: /

Sitemap: https://www.enterprisereality.org/sitemap-index.xml
```

This is the implemented crawler instruction in the repository. It allows crawling and provides the canonical sitemap index URL.

Research publication exposure is governed by the implemented route and visibility logic. `src/pages/research/publications/[slug].astro` calls `visibleResearchPublications` before `getStaticPaths()` creates publication routes. `visibleResearchPublications` filters out draft research publications, so draft entries are not exposed as generated publication routes.

`src/pages/research/publications/index.astro` and `src/pages/research/index.astro` list visible publications from the same filtered collection. The implementation therefore exposes approved visible publications through static pages, internal publication listings, canonical URLs and sitemap generation.

The repository does not contain evidence of search engine ranking controls, paid discovery integration, analytics-driven SEO behaviour or runtime submission to search engines.

---

## Engineering Rationale

The implemented discoverability mechanisms support publication visibility by making static pages available through predictable public routes, a generated sitemap and a crawler-readable robots file.

They support consistent indexing by binding sitemap URLs, canonical links, robots references and the custom domain to the same origin: `https://www.enterprisereality.org`.

They support canonical publication identity by passing publication `canonicalPath` values through `PublicationLayout` into `BaseLayout`, where the final canonical URL is constructed and emitted.

They support long-term maintainability by keeping discoverability behaviour in a small number of shared artefacts: Astro configuration, the base layout, publication route generation, robots configuration and release verification documentation.

The implementation keeps discoverability separate from publication meaning. Publication metadata and visibility rules determine which research publications become visible routes; sitemap and robots configuration expose the generated public site for discovery.

---

## Relationship to Website Architecture

Part II established Publication Architecture.

Chapter 21 documented Metadata Architecture.

This chapter explains how the implemented website exposes those governed publications for discovery.

Architecture remains constitutionally authoritative.

Discoverability remains implementation evidence.

---

## Engineering Consequences

The implemented discoverability architecture influences:

- publication visibility;
- search engine indexing;
- canonical references;
- long-term discoverability.

---

## Engineering Traceability

Every implementation statement shall be traceable to:

- ER-ENG-001
- Engineering Traceability Matrix
- Repository evidence

---

## Lessons Learned

Discoverability should be documented from implemented engineering rather than assumed SEO practice.

Repository evidence remains the authoritative engineering source.

---

## Future Evolution

This chapter shall evolve only when:

- implemented discoverability mechanisms change;
- ER-ENG-001 is revised.

Architecture changes alone do not require revision.

---

## Engineering Integrity Check

✓ Repository evidence referenced

✓ Constitutional Engineering Baseline referenced

✓ Traceability established

✓ Architecture preserved

✓ Implementation accurately represented

---

## Engineering Summary

### Purpose

Document the implemented SEO and discoverability engineering.

### Engineering Authority

ER-ENG-001.

### Repository Evidence

Sitemap, canonical URLs, robots configuration, publication routes, build configuration and release verification artefacts.

### Traceability

Engineering Traceability Matrix.

---

## Engineer's Reflection

Search engines discover information.

They do not define it.

Within the Enterprise Reality Website, discoverability exists to expose governed publications whose identity has already been established through constitutional metadata.

Recording only the implemented discoverability mechanisms preserves the distinction between publication governance and external visibility.

---

## Enduring Contribution

**SEO and Discoverability shall always be documented from observable implementation evidence rather than inferred optimisation practice.**
