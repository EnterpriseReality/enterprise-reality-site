---
publication: ER-WEB-005
part: III
chapter: 20
title: Navigation Architecture
version: 0.1.0
status: Draft
classification: Canonical Engineering
author: Enterprise Reality Programme
reviewer: Chief Architect
engineering-source: ER-ENG-001
engineering-viewpoint: Navigation Architecture
---

# Chapter 20 - Navigation Architecture

> **"Knowledge has little value if it cannot be reliably discovered."**

## Engineering Viewpoint

**Navigation Architecture**

---

## Design Intent (Internal)

This chapter documents the implemented navigation architecture of the Enterprise Reality Website.

It records observable implementation evidence and shall not describe navigation capabilities that are not implemented within the repository.

---

## Purpose

Describe how the Enterprise Reality Website enables readers to discover, traverse and consume constitutional publications through implemented navigation structures.

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

- `src/pages/`
- `src/components/SiteHeader.astro`
- `src/components/SiteFooter.astro`
- `src/layouts/BaseLayout.astro`
- `src/layouts/PublicationLayout.astro`
- `src/components/PublicationCard.astro`
- `src/pages/research/index.astro`
- `src/pages/research/publications/index.astro`
- `src/pages/research/publications/[slug].astro`
- `src/pages/industries/index.astro`
- `src/pages/industries/[sector].astro`
- `src/utilities/publications.ts`
- `src/utilities/industries.ts`
- `acceptance/website-v1/expected/route-manifest.json`
- `tests/e2e/foundation.spec.ts`
- `tests/e2e/research.spec.ts`
- `tests/e2e/industries.spec.ts`
- `tests/e2e/architecture.spec.ts`

### Verification

✓ Repository observed

✓ Engineering baseline approved

✓ Implementation unchanged

---

## Repository Evidence

| Repository Artefact | Purpose |
| ------------------- | ------- |
| `src/pages/` | Defines Astro file-based routes for the home page, narrative pages, architecture, industries, research, roadmap, about, 404 and dynamic route segments. |
| `src/components/SiteHeader.astro` | Implements the wordmark link, primary navigation links, active-route state and mobile menu behaviour. |
| `src/components/SiteFooter.astro` | Implements footer navigation using the same top-level public destinations as the header. |
| `src/layouts/BaseLayout.astro` | Composes shared page navigation by rendering `SiteHeader`, `main#main-content` and `SiteFooter` around page content. |
| `src/layouts/PublicationLayout.astro` | Provides publication-level navigation support through related publication links and a `Back to Research` link. |
| `src/components/PublicationCard.astro` | Presents publication summary cards with links supplied by publication routes. |
| `src/pages/research/index.astro` | Implements the research landing page and links to the publication index at `/research/publications/`. |
| `src/pages/research/publications/index.astro` | Implements the approved research publication index using visible research publications. |
| `src/pages/research/publications/[slug].astro` | Implements static dynamic publication paths from visible research publications and maps related publication identifiers to links where available. |
| `src/pages/industries/index.astro` | Implements the industries overview and links scenario cards to sector routes. |
| `src/pages/industries/[sector].astro` | Implements static sector routes and sector navigation across the industries overview and all implemented scenarios. |
| `src/utilities/publications.ts` | Filters draft research publications, sorts visible publications and derives publication slugs from canonical paths. |
| `src/utilities/industries.ts` | Defines implemented industry scenario slugs used by the industries index and dynamic sector route. |
| `acceptance/website-v1/expected/route-manifest.json` | Records expected public routes and the absent reserved research publication route. |
| `tests/e2e/foundation.spec.ts` | Verifies core routes, primary navigation, mobile menu state, skip navigation and internal links. |
| `tests/e2e/research.spec.ts` | Verifies research routes, empty approved publication state, absent draft publication routes and research internal links. |
| `tests/e2e/industries.spec.ts` | Verifies industries overview, sector routes, primary navigation state and industries internal links. |
| `tests/e2e/architecture.spec.ts` | Verifies architecture route metadata and active primary navigation state. |

---

## Implemented Navigation Architecture

The implemented navigation architecture is composed through the shared Astro layout and route files.

`src/layouts/BaseLayout.astro` imports `SiteHeader`, `SiteFooter` and `../styles/global.css`. It renders a skip link targeting `#main-content`, then renders the header, the main content landmark and the footer within the site shell. Pages that use `BaseLayout` therefore receive the shared header and footer navigation without each page reimplementing those structures.

`src/components/SiteHeader.astro` implements the primary navigation. The observed primary navigation items are:

- Home - `/`
- Why Enterprise Reality - `/why-enterprise-reality/`
- Platform - `/platform/`
- Architecture - `/architecture/`
- Industries - `/industries/`
- Research - `/research/`
- Roadmap - `/roadmap/`
- Constitution-Driven Engineering - `/constitution-driven-engineering/`
- About - `/about/`

The header wordmark links to `/` with the accessible label `Enterprise Reality home`.

Active primary navigation state is implemented with `aria-current="page"`. The current path is read from `Astro.url.pathname`. The home route is current only when the path is exactly `/`; other top-level entries are current when the current path starts with the entry href. This means a route below `/industries/` inherits the Industries active state and a route below `/research/` inherits the Research active state.

The header implements a mobile menu button with `aria-controls="primary-navigation"` and `aria-expanded="false"`. Client-side script toggles `aria-expanded` and the `menu-open` body class, closes the menu when a navigation anchor is clicked, and closes the menu on `Escape` while returning focus to the toggle button. The mobile presentation is controlled by the component-local media query in `SiteHeader.astro`.

`src/components/SiteFooter.astro` implements footer navigation. The footer link list uses the same top-level public destinations as the header and is rendered inside a `nav` landmark with `aria-label="Footer"`.

Publication navigation is implemented in `src/layouts/PublicationLayout.astro`. The publication layout renders publication metadata, abstract, body content, canonical citation, related publications and a link back to `/research/`. Related publications are rendered as links only when the dynamic publication route resolves a related identifier to a visible publication with a canonical path. Otherwise, the related identifier is rendered as text.

Industry navigation is implemented by the industries pages. `src/pages/industries/index.astro` maps `industryScenarios` to scenario cards that link to `/industries/{slug}/`. `src/pages/industries/[sector].astro` generates static paths from the same scenario list and renders a sector navigation section containing the industries overview and every implemented sector route. The current sector link receives `aria-current="page"`.

Research publication discovery is implemented by the research pages. `src/pages/research/index.astro` links to `/research/publications/`. `src/pages/research/publications/index.astro` lists visible research publications with `PublicationCard` when approved, non-draft collection entries exist. The current repository evidence and tests show the approved publication list rendering an empty state rather than published publication cards.

---

## Routing Strategy

Routing is implemented through Astro file-based routes under `src/pages/`.

The observed static page routes include:

- `/`
- `/404/`
- `/why-enterprise-reality/`
- `/platform/`
- `/architecture/`
- `/research/`
- `/research/publications/`
- `/industries/`
- `/roadmap/`
- `/constitution-driven-engineering/`
- `/about/`

The observed dynamic route files are:

- `src/pages/industries/[sector].astro`
- `src/pages/research/publications/[slug].astro`

The industries dynamic route implements `getStaticPaths()` from `industryScenarios`. The implemented sector slugs observed in `src/utilities/industries.ts` and the expected route manifest are:

- `housing`
- `financial-services`
- `healthcare`
- `government`
- `insurance`
- `energy-and-petroleum`

The research publication dynamic route implements `getStaticPaths()` from `visibleResearchPublications(await getCollection("research"))`. `visibleResearchPublications` filters out entries with `draft: true`, sorts visible entries by publication date and identifier, and `publicationSlug` derives the route slug from a canonical path under `/research/publications/`.

The expected route manifest records `/research/publications/errs-001/` as an absent route. The research e2e tests verify that the draft route `/research/publications/draft/` returns 404 and that the reserved ERRS-001 route is not generated without an approved manuscript.

No repository evidence shows client-side routing, nested route guards, generated handbook web routes, breadcrumb navigation rendered in page bodies, search navigation, pagination, tag navigation or menu-driven publication filtering. This chapter therefore does not describe those behaviours as implemented navigation.

---

## Publication Discovery

Publication discovery is implemented in two distinct areas: runtime website discovery and handbook repository discovery.

Runtime research discovery is implemented through `/research/` and `/research/publications/`. The research landing page introduces the Enterprise Reality Research Series and includes a `Browse all publications` link to `/research/publications/`. The publication index route gathers entries from the `research` content collection, filters them through `visibleResearchPublications`, and renders visible entries with `PublicationCard`.

The current repository evidence shows no approved public research publication cards in the generated research pages. The implemented empty state says approved research publications will appear following publication review. The research tests verify that publication cards are absent, ERRS-001 text is absent from the pages and built output, and draft or reserved publication routes are not generated.

Dynamic research publication pages are implemented but only generated for visible research publications. When a visible publication exists, `src/pages/research/publications/[slug].astro` renders it with `PublicationLayout`, calculates reading time and resolves related publication identifiers to links where the related publication is also visible.

Handbook chapter discovery is repository-based, not implemented as website runtime routing. The ER-WEB-005 handbook is organised through `publications/ER-WEB-005/ER-WEB-005.md`, `publications/ER-WEB-005/PUBLICATION-INDEX.md` and part README files. This chapter file sits under `publications/ER-WEB-005/part-3-engineering/`. Those Markdown indexes provide handbook navigation inside the repository, but the observed website route tree does not expose handbook chapters as public Astro routes.

Architecture discovery is implemented as the top-level `/architecture/` route. It is linked from primary navigation, footer navigation and tested as a core route. The architecture e2e tests verify that the Architecture primary navigation item receives `aria-current="page"` on `/architecture/`.

Industry discovery is implemented as the top-level `/industries/` route and dynamic sector routes. The industries overview maps scenario data into scenario cards. Sector pages render a sector navigation section linking back to the industries overview and across all implemented sector routes.

Roadmap discovery is implemented as the top-level `/roadmap/` route. It is linked from primary navigation and footer navigation, and appears in the expected public route manifest.

Release content exists as a content collection area under `src/content/releases/`, but the observed route tree and expected route manifest do not show a releases index or release-detail route. This chapter therefore records release content as content structure, not as implemented navigation.

---

## Navigation Consistency

Navigation consistency is achieved through shared composition and repeated source lists.

`BaseLayout` gives pages a common header, main content landmark and footer. That keeps primary and footer navigation consistent across pages that use the shared layout.

The header and footer both expose the same top-level destinations. The header additionally implements current-route state and mobile menu behaviour, while the footer provides a simple footer navigation landmark.

Top-level paths use trailing slashes consistently in implemented links and expected routes. The route manifest records the public route set with trailing slashes, and route tests assert canonical URLs for the implemented pages.

Domain-specific navigation is local to the domain that owns it:

- research pages own research publication discovery;
- publication pages own related publication links and the back-to-research link;
- industries pages own sector cards and sector navigation;
- the shared site layout owns site-wide header, footer and skip navigation.

Maintainability is supported by keeping route discovery close to the data source. Industry routes are generated from `industryScenarios`. Research publication routes are generated from visible research collection entries. Primary and footer links are defined as explicit arrays inside their respective components.

Reader experience is supported by predictable top-level navigation, consistent footer navigation, accessible navigation landmarks, active route indication, keyboard-operable mobile menu behaviour and skip navigation to the main content. These behaviours are supported by repository tests in `tests/e2e/foundation.spec.ts`, `tests/e2e/industries.spec.ts`, `tests/e2e/research.spec.ts` and `tests/e2e/architecture.spec.ts`.

---

## Relationship to Website Architecture

Part II established Information Architecture and Publication Architecture.

This chapter explains how those architectural responsibilities are realised through implemented navigation.

Architecture remains constitutionally authoritative.

Navigation remains implementation evidence.

---

## Engineering Consequences

The implemented navigation architecture influences:

- publication accessibility;
- discoverability;
- information flow;
- long-term maintainability.

---

## Engineering Traceability

Every implementation statement shall be traceable to:

- ER-ENG-001
- Engineering Traceability Matrix
- Repository evidence

---

## Lessons Learned

Navigation should be documented from implemented behaviour rather than intended user journeys.

Repository evidence remains the authoritative engineering source.

---

## Future Evolution

This chapter shall evolve only when:

- implemented navigation changes;
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

Document the implemented navigation architecture.

### Engineering Authority

ER-ENG-001.

### Repository Evidence

Navigation implementation.

### Traceability

Engineering Traceability Matrix.

---

## Engineer's Reflection

Navigation is the practical expression of information architecture.

The constitutional architecture defines how knowledge should be organised; the navigation architecture demonstrates how readers experience that organisation in practice.

Recording implemented navigation ensures that future engineers understand not only where knowledge resides, but how it is reached.

---

## Enduring Contribution

**Navigation Architecture shall always be documented from observable implementation evidence rather than inferred user experience.**
