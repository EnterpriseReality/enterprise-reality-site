---
publication: ER-WEB-005
part: III
chapter: 15
title: Technology Stack
version: 0.1.0
status: Draft
classification: Canonical Engineering
author: Enterprise Reality Programme
reviewer: Chief Architect
engineering-source: ER-ENG-001
engineering-viewpoint: Technology Stack
---

# Chapter 15 - Technology Stack

> **"Technology serves the architecture. The repository provides the evidence."**

## Engineering Viewpoint

**Technology Stack**

---

## Design Intent (Internal)

The purpose of this chapter is to describe the technology stack implemented by the Enterprise Reality Website.

Unlike the architectural viewpoints described in Part II, this chapter documents observable implementation evidence derived from the Constitutional Engineering Baseline.

Technology choices are therefore recorded rather than prescribed.

---

## Purpose

The purpose of this chapter is to describe the implemented technology stack supporting the Enterprise Reality Website.

Each technology is documented because it exists within the repository and contributes to the implementation of the approved architecture.

---

## Engineering Authority

This chapter derives its authority from:

**ER-ENG-001 — Constitutional Engineering Baseline**

The repository implementation is the source of truth.

---

## Technology Inventory

This section documents the technologies identified within the approved engineering baseline.

The inventory shall reflect observable implementation rather than architectural preference.

The observed implementation is a static Astro website using TypeScript, standards-based CSS and Markdown-backed content collections.

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

---

## Engineering Rationale

The implemented technology stack supports:

- static publication;
- maintainable engineering;
- repeatable validation;
- structured content;
- reliable deployment.

These observations are derived from repository evidence.

---

## Repository Evidence

Primary engineering evidence includes:

- package metadata;
- build configuration;
- repository structure;
- engineering scripts;
- validation configuration.

The authoritative inventory is maintained within ER-ENG-001.

---

## Engineering Consequences

The implemented technology stack influences:

- repository organisation;
- build engineering;
- publication generation;
- validation;
- deployment.

Subsequent chapters examine each of these engineering domains in detail.

---

## Relationship to Architecture

Part II established why the website is architected as it is.

This chapter explains which technologies realise that architecture.

Architecture remains constitutionally authoritative.

Technology remains implementation evidence.

---

## Engineering Traceability

This chapter is fully traceable to:

- ER-ENG-001
- Engineering Traceability Matrix

No implementation statement shall exist without supporting repository evidence.

---

## Lessons Learned

Technology selections should be recorded from implementation rather than inferred from design intent.

Maintaining this distinction improves long-term accuracy and maintainability of the engineering handbook.

---

## Future Evolution

Future revisions of this chapter should occur only when:

- the implemented technology stack changes;
- the Constitutional Engineering Baseline is updated.

Architecture changes alone do not require modification of this chapter.

---

## Engineering Integrity Check

✓ Repository evidence referenced

✓ Constitutional Engineering Baseline referenced

✓ Architecture preserved

✓ Implementation accurately represented

✓ Traceability established

---

## Engineering Summary

### Purpose

Describe the implemented technology stack.

### Engineering Authority

ER-ENG-001.

### Repository Evidence

Technology inventory.

### Traceability

Engineering Traceability Matrix.

---

## Engineer's Reflection

Technology changes over time.

What remains valuable is an accurate engineering record describing the technology implemented at a specific point in time.

The Constitutional Engineering Baseline provides that record, allowing the handbook to remain both trustworthy and maintainable.

---

## Enduring Contribution

**The technology stack shall always be documented from repository evidence rather than architectural assumption.**
