---
publication: ER-WEB-005
part: III
chapter: 18
title: CSS Design System
version: 0.1.0
status: Draft
classification: Canonical Engineering
author: Enterprise Reality Programme
reviewer: Chief Architect
engineering-source: ER-ENG-001
engineering-viewpoint: CSS Design System
---

# Chapter 18 - CSS Design System

> **"Consistency is achieved not through repetition, but through a disciplined design system implemented in code."**

## Engineering Viewpoint

**CSS Design System**

---

## Design Intent (Internal)

This chapter documents the implemented CSS design system of the Enterprise Reality Website.

It records observable implementation evidence and shall not describe styling techniques that are not implemented within the repository.

---

## Purpose

Describe the implemented styling architecture supporting the Enterprise Reality Website.

The objective is to explain how the design system contributes to consistency, readability, accessibility and maintainability.

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

- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/layouts/BaseLayout.astro`
- `src/layouts/PublicationLayout.astro`
- `src/components/SiteHeader.astro`
- `src/components/SiteFooter.astro`
- `src/components/PublicationCard.astro`
- `src/components/StatusBadge.astro`
- `src/components/Callout.astro`
- `src/components/ScenarioCard.astro`
- `src/components/MilestoneCard.astro`
- component-local Astro styles under `src/components/`, `src/layouts/` and `src/pages/`

### Verification

✓ Repository observed

✓ Engineering baseline approved

✓ Implementation unchanged

---

## Implemented Design System

The repository implements the website design system through standards-based CSS.

The styling entry point is `src/styles/global.css`, which imports `src/styles/tokens.css`. `src/layouts/BaseLayout.astro` imports `../styles/global.css`, making the global stylesheet available through the shared site layout.

The implemented stylesheet organisation is:

- `src/styles/tokens.css` defines custom properties on `:root`;
- `src/styles/global.css` defines base element styles, shared layout primitives and reusable page-level classes;
- Astro files under `src/components/`, `src/layouts/` and `src/pages/` define component-local `<style>` blocks for component-specific presentation;
- component-local styles reuse the custom properties defined in `tokens.css`.

The implemented global primitives include:

- universal `box-sizing: border-box`;
- page-level typography, foreground colour and background colour on `html`;
- zero body margin and a `320px` minimum body width;
- link colour, hover colour and underline treatment;
- `:focus-visible` outline, outline offset and focus ring;
- responsive media constraints for `img` and `svg`;
- constrained measure for paragraphs and list items;
- heading margin, line-height, weight and letter-spacing rules;
- a skip link;
- `.site-shell`, `.container`, `.section`, `.section--muted`, `.eyebrow`, `.lead`, `.grid`, `.page-hero`, `.section-header`, `.panel`, `.card`, `.outcome-card`, `.stack`, `.status-list`, `.flow`, `.closing-statement`, architecture presentation classes, industry presentation classes, evidence lists and sector navigation.

The implemented colour system uses custom properties for page surfaces, panels, muted surfaces, strong surfaces, primary text, secondary text, muted text, inverse text, links, accent colour, borders and status colours.

The implemented spacing system uses custom properties from `--space-1` through `--space-9`. Global and component-local styles use those spacing tokens for gaps, padding, margins and section rhythm.

The implemented layout system uses CSS Grid and Flexbox. Global classes such as `.grid`, `.grid--2`, `.grid--3`, `.grid--4`, `.page-hero__inner`, `.architecture-layer dl`, `.industry-diagram`, `.sector-nav`, `.site-shell`, `.status-list` and `.flow` provide reusable layout behaviour. Component-local styles also use grid and flex layouts for headers, navigation, cards, publication metadata and footer content.

The repository does not show CSS modules, Sass, CSS-in-JS, utility-class generation, runtime theming or a separate design-system package. This chapter therefore describes only the implemented CSS files and Astro-local styles.

---

## Typography

The implemented typography system is token-driven.

`src/styles/tokens.css` defines three font-family custom properties:

- `--font-sans`, using Inter first, followed by system sans-serif fallbacks;
- `--font-serif`, using Georgia and Times New Roman fallbacks;
- `--font-mono`, using SFMono-Regular, Consolas, Liberation Mono and Courier New fallbacks.

The same token file defines the type scale:

- `--text-xs: 0.78rem`;
- `--text-sm: 0.875rem`;
- `--text-base: 1rem`;
- `--text-md: 1.125rem`;
- `--text-lg: 1.35rem`;
- `--text-xl: 1.7rem`;
- `--text-2xl: 2.25rem`;
- `--text-3xl: 3rem`.

It also defines line-height tokens:

- `--leading-tight: 1.15`;
- `--leading-heading: 1.22`;
- `--leading-body: 1.65`.

It defines weight tokens:

- `--weight-regular: 400`;
- `--weight-medium: 550`;
- `--weight-semibold: 650`;
- `--weight-bold: 750`.

`src/styles/global.css` applies `--font-sans` to `html`, sets the base line height to `--leading-body`, and applies heading line height and heading font weight to `h1`, `h2` and `h3`.

The global `h1` rule uses `clamp(2.45rem, 2rem + 2vw, var(--text-3xl))`, a maximum measure of `18ch`, and `--leading-tight`. `h2` uses `--text-xl`; `h3` uses `--text-lg`; `.lead` uses `--text-md`; `.eyebrow` uses `--text-sm`, uppercase transformation and the semibold weight token.

Component-local typography uses the same token system. Observed examples include:

- publication identifiers and publication card identifiers using `--font-mono`;
- publication citation text using `--font-serif`;
- status badges using `--text-xs` and semibold weight;
- navigation links using `--text-sm` and semibold weight;
- card subtitles and metadata labels using secondary text colour and semibold weight.

No repository evidence shows externally loaded web-font CSS, font-face declarations or a separate typography package.

---

## Responsive Behaviour

The implemented responsive strategy uses CSS media queries, flexible layout primitives and constrained widths.

`src/styles/tokens.css` defines breakpoint custom properties:

- `--breakpoint-sm: 40rem`;
- `--breakpoint-md: 56rem`;
- `--breakpoint-lg: 72rem`.

The observed media queries use literal rem values rather than the breakpoint custom properties.

`src/styles/global.css` implements the main responsive behaviours:

- `.container` uses `width: min(100% - 2rem, var(--width-page))`;
- `h1` uses a `clamp()` font-size expression;
- `.grid--2`, `.grid--3` and `.grid--4` become multi-column grids at `min-width: 56rem`;
- `.page-hero__inner` becomes a two-column grid at `min-width: 56rem`;
- `.architecture-layer dl` becomes a two-column grid at `min-width: 56rem`;
- `.industry-diagram` becomes a four-column grid at `min-width: 56rem`;
- architecture summary padding, summary indicator size and ownership table minimum width are adjusted at `max-width: 40rem`;
- reduced-motion preferences are handled through `@media (prefers-reduced-motion: reduce)`.

Component-local responsive behaviour is also implemented:

- `src/components/SiteHeader.astro` switches to a toggle-driven fixed navigation panel at `max-width: 48rem`;
- `src/components/SiteHeader.astro` stacks the header and wraps navigation between `48.01rem` and `68rem`;
- `src/layouts/PublicationLayout.astro` changes publication header layout to a two-column grid at `min-width: 56rem`.

The implementation uses CSS Grid, Flexbox, wrapping, minimum widths, constrained container widths and overflow handling. The repository evidence does not show container queries, JavaScript-driven layout measurement or CSS framework breakpoints.

---

## Design Tokens

The implemented design tokens are CSS custom properties defined on `:root` in `src/styles/tokens.css`.

The token groups are:

- font families: `--font-sans`, `--font-serif`, `--font-mono`;
- type scale: `--text-xs`, `--text-sm`, `--text-base`, `--text-md`, `--text-lg`, `--text-xl`, `--text-2xl`, `--text-3xl`;
- line heights: `--leading-tight`, `--leading-heading`, `--leading-body`;
- font weights: `--weight-regular`, `--weight-medium`, `--weight-semibold`, `--weight-bold`;
- spacing: `--space-1` through `--space-9`;
- widths: `--width-page`, `--width-reading`, `--width-wide`;
- surfaces: `--surface-page`, `--surface-panel`, `--surface-muted`, `--surface-strong`;
- text colours: `--text-primary`, `--text-secondary`, `--text-muted`, `--text-inverse`;
- link and accent colours: `--link`, `--link-hover`, `--accent`;
- borders and radii: `--border-subtle`, `--border-strong`, `--radius-sm`, `--radius-md`;
- focus styling: `--focus-color`, `--focus-ring`;
- motion: `--motion-fast`, `--motion-medium`, `--motion-ease`;
- status colours: released, development, planned, research and concept background and border tokens;
- breakpoint values: `--breakpoint-sm`, `--breakpoint-md`, `--breakpoint-lg`.

Global CSS and component-local styles consume these custom properties with `var(...)`. `StatusBadge.astro` also maps status-specific modifier classes to local `--status-bg` and `--status-border` custom properties before applying them to the badge border and background.

No repository evidence shows generated token files, JSON token sources, token build tooling or runtime theme switching.

---

## Engineering Rationale

The implemented styling supports readability by applying a shared sans-serif base, explicit line-height tokens, constrained reading width through `--width-reading`, heading line-height rules and consistent paragraph and list spacing.

It supports maintainability by centralising repeated values in `src/styles/tokens.css` and reusing those values from `src/styles/global.css` and Astro component styles. The global stylesheet owns broad primitives, while component-local styles keep component-specific presentation close to the component that uses it.

It supports consistency by reusing shared surface, text, spacing, border, radius, width, status and typography tokens across layout primitives, cards, panels, navigation, publications and status badges.

It supports accessibility through observable focus-visible styling, skip-link styling, sufficient layout constraints for readable text measure, responsive navigation states, reduced-motion handling and non-overflowing table wrappers. These are styling behaviours implemented in CSS and component-local Astro styles; this chapter does not make claims beyond that observed implementation.

The implemented CSS design system remains aligned with the static Astro architecture recorded in ER-ENG-001. It styles the public website without changing content architecture, routing, deployment, metadata or runtime behaviour.

---

## Relationship to Website Architecture

Part II established presentation responsibilities.

This chapter explains how those responsibilities are realised through the implemented CSS design system.

Architecture remains constitutionally authoritative.

Styling remains implementation evidence.

---

## Engineering Consequences

The implemented design system influences:

- layouts;
- components;
- publications;
- responsive presentation;
- long-term maintainability.

---

## Engineering Traceability

Every implementation statement shall be traceable to:

- ER-ENG-001
- Engineering Traceability Matrix
- Repository evidence

---

## Lessons Learned

Design systems should be documented from implementation evidence rather than visual intention.

Repository evidence remains the authoritative engineering source.

---

## Future Evolution

This chapter shall evolve only when:

- the implemented design system changes;
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

Document the implemented CSS design system.

### Engineering Authority

ER-ENG-001.

### Repository Evidence

Stylesheets and styling implementation.

### Traceability

Engineering Traceability Matrix.

---

## Engineer's Reflection

Visual consistency emerges from disciplined implementation rather than isolated styling decisions.

Recording the implemented design system provides future engineers with an accurate description of how consistency is achieved within the repository.

---

## Enduring Contribution

**The CSS Design System shall always be documented from observable implementation evidence rather than inferred design intention.**
