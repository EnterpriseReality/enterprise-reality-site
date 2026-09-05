---
publication: ER-WEB-005
part: III
chapter: 24
title: Accessibility Engineering
version: 0.1.0
status: Draft
classification: Canonical Engineering
author: Enterprise Reality Programme
reviewer: Chief Architect
engineering-source: ER-ENG-001
engineering-viewpoint: Accessibility Engineering
---

# Chapter 24 - Accessibility Engineering

> **"Knowledge fulfils its constitutional purpose only when it can be accessed by every intended reader."**

## Engineering Viewpoint

**Accessibility Engineering**

---

## Design Intent (Internal)

This chapter documents the implemented accessibility engineering of the Enterprise Reality Website.

It records observable implementation evidence only and shall not describe accessibility mechanisms that are not implemented within the repository.

---

## Purpose

Describe how accessibility is implemented within the Enterprise Reality Website to support inclusive access to governed publications.

The objective is to explain how implemented accessibility engineering contributes to constitutional publication quality without extending beyond observable implementation.

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

- `src/layouts/BaseLayout.astro`
- `src/components/SiteHeader.astro`
- `src/components/SiteFooter.astro`
- `src/components/ArchitectureExplorer.astro`
- `src/layouts/PublicationLayout.astro`
- `src/styles/global.css`
- `src/pages/architecture.astro`
- `src/pages/industries/[sector].astro`
- `src/pages/roadmap.astro`
- `src/pages/index.astro`
- `src/components/PublicationCard.astro`
- `src/components/MilestoneCard.astro`
- `package.json`
- `tests/e2e/foundation.spec.ts`
- `tests/e2e/acceptance.spec.ts`
- `tests/e2e/architecture.spec.ts`
- `tests/e2e/industries.spec.ts`
- `tests/e2e/roadmap.spec.ts`
- `tests/e2e/research.spec.ts`

### Verification

✓ Repository observed

✓ Engineering baseline approved

✓ Implementation unchanged

---

## Repository Evidence

| Repository Artefact | Purpose |
| ------------------- | ------- |
| `src/layouts/BaseLayout.astro` | Defines the document language as English, renders a skip link to `#main-content`, wraps page content in `<main id="main-content" tabindex="-1">`, and includes shared header and footer landmarks. |
| `src/components/SiteHeader.astro` | Implements the site header, home wordmark with `aria-label`, labelled primary navigation, active-page `aria-current`, and a mobile menu button with `aria-controls` and `aria-expanded`. |
| `src/components/SiteFooter.astro` | Implements the footer landmark and labelled footer navigation. |
| `src/components/ArchitectureExplorer.astro` | Uses native `details` and `summary` disclosure controls, updates `aria-expanded`, and keeps architecture layer content visible in the HTML. |
| `src/layouts/PublicationLayout.astro` | Renders publication pages as an `<article>` with semantic header, aside, sections and labelled publication metadata areas. |
| `src/styles/global.css` | Defines global focus-visible styling, skip-link visibility on focus, link underline treatment, responsive layout rules and reduced-motion handling through `@media (prefers-reduced-motion: reduce)`. |
| `src/pages/architecture.astro` | Uses semantic sections, labelled ordered lists, a named ownership table and article elements for architecture content. |
| `src/pages/industries/[sector].astro` | Uses labelled sections and articles for scenario structure, labelled industry navigation and `aria-current` for the active sector. |
| `src/pages/roadmap.astro` | Uses labelled regions, labelled ordered lists and textual status presentation for milestones and capability stages. |
| `src/pages/index.astro` | Uses labelled action groups, labelled status information and semantic sections for home-page content. |
| `src/components/PublicationCard.astro` | Renders publication cards as articles and labels publication metadata facts with `aria-label`. |
| `src/components/MilestoneCard.astro` | Renders milestone cards as articles associated with milestone headings through `aria-labelledby`. |
| `package.json` | Declares `@axe-core/playwright` and the `test:e2e` Playwright command used for browser and accessibility smoke checks. |
| `tests/e2e/foundation.spec.ts` | Verifies skip navigation, desktop navigation, mobile keyboard menu operation, automated axe checks for core pages, and reduced-motion CSS presence. |
| `tests/e2e/acceptance.spec.ts` | Verifies required routes have one main heading and pass automated axe accessibility smoke checks. |
| `tests/e2e/architecture.spec.ts` | Verifies architecture navigation state, no-JavaScript content visibility, keyboard disclosure operation, focus visibility after tabbing, automated axe checks and reduced-motion CSS presence. |
| `tests/e2e/industries.spec.ts` | Verifies industry navigation state, labelled scenario content and automated axe checks for industry pages. |
| `tests/e2e/roadmap.spec.ts` | Verifies roadmap navigation state, labelled milestone and capability lists, visible textual statuses and automated axe checks. |
| `tests/e2e/research.spec.ts` | Imports `AxeBuilder` and includes automated accessibility smoke coverage for research routes. |

---

## Implemented Accessibility Engineering

The implemented accessibility engineering is distributed across layouts, components, CSS and Playwright tests. There is no separate accessibility utility module in the observed repository.

`BaseLayout` provides the shared page accessibility frame. It declares `<html lang="en">`, renders a skip link labelled "Skip to main content", and gives the main content container both the `main` landmark and the `#main-content` target. The main element also has `tabindex="-1"`, which allows the skip link test to move focus to the main content region after activation.

The site header implements labelled navigation. `SiteHeader` renders a `nav` element with `aria-label="Primary"` and uses `aria-current="page"` for the current route. The home wordmark uses `aria-label="Enterprise Reality home"`. The mobile menu is controlled by a real `button` with `aria-controls="primary-navigation"` and `aria-expanded`, and the component script updates `aria-expanded` as the menu opens and closes.

Keyboard behavior is implemented for the mobile navigation. The menu button responds as a button, and the E2E tests open it with the keyboard, assert the expanded state, close it with Escape and assert focus returns to the button. The navigation also closes when a menu link is selected.

The architecture explorer uses native disclosure elements. `ArchitectureExplorer` renders each architecture layer as `details` with a `summary`; its script keeps `aria-expanded` aligned with the open state and closes other layers when one opens. The architecture E2E tests verify keyboard operation and focus visibility for this interaction.

The repository uses semantic HTML across public pages and publication rendering. Observed structures include `header`, `main`, `footer`, `nav`, `section`, `article`, `aside`, `table`, `ol`, `ul`, `dl`, `details` and `summary`. Several sections and lists are explicitly labelled with `aria-labelledby` or `aria-label`, including architecture flows, scenario structures, roadmap milestones, publication metadata and navigation areas.

The global stylesheet implements visible focus treatment through `:focus-visible`. It also defines skip-link behavior so the link is positioned off-screen until focused, then becomes visible. Reduced-motion handling is implemented through `@media (prefers-reduced-motion: reduce)`, where scroll behavior, transition duration, animation duration and animation iteration count are constrained.

ARIA usage is present where the implementation exposes names, state or current location. Observed ARIA attributes include `aria-label`, `aria-labelledby`, `aria-current`, `aria-controls`, `aria-expanded` and `aria-hidden`. No repository evidence was found for live regions, custom roving tabindex controls, modal dialog behavior or an independent accessibility helper library.

---

## Accessibility Validation

Accessibility validation is implemented through Playwright tests and `@axe-core/playwright`.

`package.json` declares `@axe-core/playwright` as a development dependency and exposes `npm run test:e2e` as `playwright test`. The E2E suites import `AxeBuilder` and run automated accessibility smoke checks against required public routes, core narrative routes, architecture, industries, roadmap and research routes.

`tests/e2e/foundation.spec.ts` validates skip navigation by focusing the skip link, activating it with Enter and asserting that `#main-content` receives focus. The same suite validates desktop primary navigation by role and name, verifies active-page `aria-current`, validates mobile menu keyboard operation and asserts that core pages have no automated accessibility violations.

`tests/e2e/acceptance.spec.ts` validates that required public routes load with one `main h1` and pass automated accessibility smoke checks. This is route-level smoke coverage, not a claim of complete accessibility certification.

`tests/e2e/architecture.spec.ts` validates that architecture content remains visible when JavaScript is disabled. It also validates the enhanced architecture interaction by focusing a `summary`, opening it with Enter, checking `aria-expanded`, and verifying that the current focus remains visible after tabbing. The suite also runs axe analysis on the architecture page.

`tests/e2e/industries.spec.ts`, `tests/e2e/roadmap.spec.ts` and `tests/e2e/research.spec.ts` include route-specific axe checks. The observed validation is automated smoke testing with axe and keyboard assertions for implemented navigation and disclosure behavior. The repository does not contain manual screen-reader test records, WCAG conformance reports, visual contrast audit artefacts or assistive-technology certification evidence.

---

## Inclusive Publication Engineering

The implemented accessibility engineering supports inclusive publication by making governed website content reachable through semantic page structure, labelled navigation and visible focus behavior.

Publication and narrative pages are rendered inside the shared `BaseLayout` accessibility frame. That frame gives readers a skip path to the main content and creates consistent header, main and footer landmarks across routes.

Readable navigation is supported by the primary and footer navigation landmarks. The current route is exposed through `aria-current`, and mobile navigation exposes its state through `aria-expanded`. Industry pages add a labelled sector navigation and mark the active sector with `aria-current`.

Usable interfaces are supported through native controls where implemented. The architecture explorer uses `details` and `summary`, and the implementation verifies that the enhanced disclosure behavior remains keyboard operable. The architecture page also has a no-JavaScript visibility test, so core architecture content is not dependent on client-side script execution.

Publication engineering uses semantic containers for publication pages and cards. `PublicationLayout` renders publication content as an article with labelled metadata, summary, abstract and citation areas. Publication cards and milestone cards are also article-based, with metadata or headings connected through ARIA where implemented.

Constitutional publication quality is supported by tests that validate route accessibility smoke checks, visible headings, navigation state and content availability. These tests do not establish exhaustive accessibility compliance; they document the accessibility validation currently implemented in the repository.

---

## Engineering Rationale

The implemented accessibility engineering supports usability by giving pages consistent landmarks, visible focus treatment, skip navigation, labelled navigation and keyboard-operable menu and disclosure interactions.

It supports maintainability by centralising shared accessibility structure in `BaseLayout`, shared navigation behavior in `SiteHeader`, publication rendering in `PublicationLayout`, and global focus and reduced-motion styling in `global.css`. This keeps repeated accessibility behavior close to the components and layouts that render the corresponding interface.

It supports constitutional publication by helping readers reach governed content without relying only on pointer interaction or visual page scanning. The implemented skip link, semantic landmarks, labelled sections and visible focus behavior all support access to the public knowledge artefacts rendered by the site.

It supports engineering quality through executable validation. The Playwright suites check keyboard behavior, ARIA state changes, no-JavaScript content visibility, reduced-motion CSS presence and automated axe results. These checks provide repository evidence for implemented behavior and prevent this chapter from asserting accessibility behavior that is not present.

The repository evidence also establishes limits. There is no implemented accessibility utility module, no manual assistive-technology evidence, no independent WCAG conformance report and no documented accessibility behavior beyond the layouts, components, CSS and tests described in this chapter.

---

## Relationship to Website Architecture

Part II established Publication Architecture.

Part III has documented implementation.

This chapter explains how accessibility engineering ensures that governed publications remain usable by their intended audience.

Architecture remains constitutionally authoritative.

Accessibility remains implementation evidence.

---

## Engineering Consequences

The implemented accessibility engineering influences:

- publication usability;
- inclusive access;
- engineering quality;
- long-term maintainability.

---

## Engineering Traceability

Every implementation statement shall be traceable to:

- ER-ENG-001
- Engineering Traceability Matrix
- Repository evidence

---

## Lessons Learned

Accessibility should be documented from implemented engineering rather than assumed compliance objectives.

Repository evidence remains the authoritative engineering source.

---

## Future Evolution

This chapter shall evolve only when:

- implemented accessibility changes;
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

Document the implemented Accessibility Engineering.

### Engineering Authority

ER-ENG-001.

### Repository Evidence

Accessibility implementation and validation.

### Traceability

Engineering Traceability Matrix.

---

## Engineer's Reflection

Accessibility is not an optional enhancement.

Within the Enterprise Reality Website it is an engineering responsibility ensuring that governed knowledge remains available to every intended reader.

Documenting implemented accessibility preserves engineering truth while reinforcing the constitutional commitment to inclusive publication.

---

## Enduring Contribution

**Accessibility Engineering shall always be documented from observable implementation evidence rather than inferred compliance intent.**
