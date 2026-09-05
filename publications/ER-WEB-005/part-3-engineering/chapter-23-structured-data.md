---
publication: ER-WEB-005
part: III
chapter: 23
title: Structured Data
version: 0.1.0
status: Draft
classification: Canonical Engineering
author: Enterprise Reality Programme
reviewer: Chief Architect
engineering-source: ER-ENG-001
engineering-viewpoint: Structured Data
---

# Chapter 23 - Structured Data

> **"Machines require structure before they can understand knowledge."**

## Engineering Viewpoint

**Structured Data**

---

## Design Intent (Internal)

This chapter documents the implemented structured data architecture of the Enterprise Reality Website.

It records observable implementation evidence only and shall not describe structured data capabilities that are not implemented within the repository.

---

## Purpose

Describe how the Enterprise Reality Website exposes structured information for machine interpretation through implemented structured data mechanisms.

The objective is to explain how semantic structure complements constitutional publication without becoming the source of publication identity.

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
- `src/layouts/PublicationLayout.astro`
- `src/pages/industries/index.astro`
- `src/pages/industries/[sector].astro`
- `src/pages/roadmap.astro`
- `tests/e2e/foundation.spec.ts`
- `tests/e2e/acceptance.spec.ts`
- `tests/e2e/industries.spec.ts`
- `docs/RELEASE-PROCESS.md`

### Verification

✓ Repository observed

✓ Engineering baseline approved

✓ Implementation unchanged

---

## Repository Evidence

| Repository Artefact | Purpose |
| ------------------- | ------- |
| `src/layouts/BaseLayout.astro` | Defines the shared `structuredData` prop, creates the site-wide JSON-LD graph, emits a single inline `application/ld+json` script, and includes Organization, WebSite, WebPage and route-dependent BreadcrumbList graph items. |
| `src/layouts/PublicationLayout.astro` | Creates publication-specific structured data and passes it into `BaseLayout` for rendered research publication pages. |
| `src/pages/industries/index.astro` | Defines page-specific structured data for the industries listing and passes it into `BaseLayout`. |
| `src/pages/industries/[sector].astro` | Defines page-specific structured data for generated industry scenario pages and passes it into `BaseLayout`. |
| `src/pages/roadmap.astro` | Defines page-specific structured data for the roadmap route and passes it into `BaseLayout`. |
| `tests/e2e/foundation.spec.ts` | Verifies that core routes expose parseable schema.org JSON-LD containing Organization, WebSite and WebPage graph entries, and verifies route-dependent BreadcrumbList entries. |
| `tests/e2e/acceptance.spec.ts` | Verifies that rendered route JSON-LD parses, includes Organization and does not include a Corporation type. |
| `tests/e2e/industries.spec.ts` | Verifies that the industries route emits one JSON-LD script and includes CollectionPage structured data. |
| `docs/RELEASE-PROCESS.md` | Records release verification expectation that structured data, where present, is valid and uses canonical URLs. |

---

## Implemented Structured Data Architecture

The implemented structured data architecture is layout-centred and JSON-LD based.

`BaseLayout` owns the shared graph assembly for rendered pages. It defines a `structuredData` prop that accepts either a single record or an array of records. The layout creates shared graph items for the site organisation, website identity, rendered webpage and, for non-home routes, breadcrumb information.

The shared graph is emitted as a single inline script:

```html
<script type="application/ld+json">
```

The generated JSON object uses:

- `@context: "https://schema.org"`
- `@graph`

The graph always includes the implemented Organization, WebSite and WebPage items. For non-home routes, `BaseLayout` also adds a BreadcrumbList item with Home and the current page title as list entries.

Page-specific structured data is supplied by route or layout files through the `structuredData` prop. `BaseLayout` normalises that input to an array, removes any page-level `@context` value, and appends the remaining item data to the shared graph. The final JSON-LD script therefore has one schema.org context at graph level.

The implemented page-specific schema types observed in the repository are:

- ScholarlyArticle
- CollectionPage
- Article
- WebPage

No other structured data schema types are documented by this chapter.

---

## Structured Data Generation

Structured data is generated during Astro rendering.

`BaseLayout` constructs canonical structured data values from layout props and constants. It sets `siteOrigin` to `https://www.enterprisereality.org`, composes the page title, builds the canonical URL from `canonicalPath`, and uses those values in the WebPage graph item.

The Organization graph item is identified as:

```text
https://www.enterprisereality.org/#organization
```

The WebSite graph item is identified as:

```text
https://www.enterprisereality.org/#website
```

The WebPage graph item uses the rendered canonical URL with `#webpage` appended as its identifier. It includes the canonical page URL, composed page name, description, `isPartOf` reference to the WebSite item and `publisher` reference to the Organization item.

For non-home routes, `BaseLayout` generates BreadcrumbList data using Home as the first item and the rendered page as the second item. The home route does not receive a BreadcrumbList item.

When a page or layout passes additional structured data, `BaseLayout` strips that item's local `@context` and appends the remaining object to the shared graph. The final graph is serialized with `JSON.stringify(structuredDataGraph)` and emitted through Astro's `set:html`.

The implementation does not use a separate structured data utility module. Structured data generation is implemented directly in `BaseLayout`, with page-specific inputs declared in route and publication layout files.

---

## Semantic Publication Representation

Publication structured data is implemented in `PublicationLayout`.

`PublicationLayout` receives the publication object used to render the publication page. It creates a ScholarlyArticle structured data item with fields derived from the same publication data used for visible page metadata and publication rendering:

- `headline` from `publication.title`
- `alternativeHeadline` from `publication.subtitle`
- `abstract` from `publication.summary`
- `author` as a Person with `publication.author`
- `datePublished` from `publication.publicationDate`
- `dateModified` from `publication.updatedDate` or `publication.publicationDate`
- `identifier` from `publication.id`
- `version` from `publication.version`
- `url` from the production origin plus `publication.canonicalPath`

That item is passed into `BaseLayout` with `ogType="article"` and the publication canonical path. `BaseLayout` then appends the ScholarlyArticle item to the same JSON-LD graph as the shared Organization, WebSite, WebPage and route breadcrumb items.

This representation does not replace the publication metadata table, visible canonical citation or content collection data. It exposes selected implemented publication fields for machine interpretation while the rendered publication and repository publication artefacts remain the source of publication meaning.

---

## Engineering Rationale

The implemented structured data architecture supports semantic consistency by centralising shared graph generation in `BaseLayout`. Organization, WebSite, WebPage and breadcrumb data are created through one layout path rather than repeated independently across routes.

It supports machine interpretation by emitting schema.org JSON-LD in a single `application/ld+json` script for each rendered page. E2E tests parse that script and verify expected graph entries on core routes.

It supports publication interoperability by deriving ScholarlyArticle structured data from the same publication object used for visible publication rendering. Publication identifier, version, author, summary, dates and canonical path are represented in the graph without changing the publication's constitutional source of authority.

It supports maintainability by allowing page-specific routes to pass additional structured data into the shared layout while keeping the final graph assembly and JSON-LD emission in one place.

The implementation also preserves schema restraint. `tests/e2e/acceptance.spec.ts` verifies that rendered structured data contains Organization and does not include Corporation. This chapter therefore documents Organization and does not invent or substitute additional organisation schema types.

---

## Relationship to Website Architecture

Part II established Publication Architecture.

Chapter 21 documented publication metadata.

Chapter 22 documented discoverability.

This chapter explains how the implemented website provides semantic structure for machine interpretation.

Architecture remains constitutionally authoritative.

Structured data remains implementation evidence.

---

## Engineering Consequences

The implemented structured data architecture influences:

- semantic interoperability;
- publication representation;
- machine discoverability;
- future extensibility.

---

## Engineering Traceability

Every implementation statement shall be traceable to:

- ER-ENG-001
- Engineering Traceability Matrix
- Repository evidence

---

## Lessons Learned

Structured data should be documented from implemented engineering rather than assumed semantic models.

Repository evidence remains the authoritative engineering source.

---

## Future Evolution

This chapter shall evolve only when:

- implemented structured data changes;
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

Document the implemented Structured Data Architecture.

### Engineering Authority

ER-ENG-001.

### Repository Evidence

Implemented JSON-LD graph generation in `BaseLayout`, page-specific structured data inputs, publication structured data and e2e validation coverage.

### Traceability

Engineering Traceability Matrix.

---

## Engineer's Reflection

Structured data provides semantic understanding for machines in much the same way that metadata provides identity for publications.

Within the Enterprise Reality Website, structured data extends governed publications into machine-readable form without altering their constitutional authority.

---

## Enduring Contribution

**Structured Data shall always be documented from observable implementation evidence rather than inferred semantic capability.**
