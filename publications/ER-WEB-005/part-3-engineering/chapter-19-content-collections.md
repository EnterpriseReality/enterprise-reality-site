---
publication: ER-WEB-005
part: III
chapter: 19
title: Content Collections
version: 0.1.0
status: Draft
classification: Canonical Engineering
author: Enterprise Reality Programme
reviewer: Chief Architect
engineering-source: ER-ENG-001
engineering-viewpoint: Content Collections
---

# Chapter 19 - Content Collections

> **"Knowledge becomes trustworthy when it is organised before it is published."**

## Engineering Viewpoint

**Content Collections**

---

## Design Intent (Internal)

This chapter documents the implemented content collection architecture of the Enterprise Reality Website.

It records observable implementation evidence and shall not describe collection capabilities that are not implemented within the repository.

---

## Purpose

Describe how content collections organise, validate and publish engineering knowledge within the Enterprise Reality Website.

The objective is to explain how implemented collections support constitutional publication, engineering consistency and long-term maintainability.

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

- `src/content.config.ts`
- `src/content/architecture/foundation-boundary.md`
- `src/content/industries/foundation-industry-placeholder.md`
- `src/content/releases/foundation-release-placeholder.md`
- `src/content/roadmap/foundation-roadmap-placeholder.md`
- `src/pages/research/publications/index.astro`
- `src/pages/research/publications/[slug].astro`
- `src/utilities/content-rules.ts`
- `src/utilities/publications.ts`
- `src/utilities/status.ts`
- `tests/unit/content-rules.test.ts`

### Verification

✓ Repository observed

✓ Engineering baseline approved

✓ Implementation unchanged

---

## Implemented Content Collection Architecture

The implemented content collection architecture is defined in `src/content.config.ts`. It uses Astro content collections with Markdown files loaded through `glob({ pattern: "**/*.md", base: ... })`.

Five collections are exported:

- `architecture`, loaded from `./src/content/architecture`
- `research`, loaded from `./src/content/research`
- `releases`, loaded from `./src/content/releases`
- `roadmap`, loaded from `./src/content/roadmap`
- `industries`, loaded from `./src/content/industries`

The `architecture`, `research`, `releases` and `industries` collections use the shared `basePublicationSchema`. That schema requires publication metadata for `id`, `title`, `version`, `status`, `category`, `summary`, `author` and `canonicalPath`. It also supports optional `subtitle`, `publicationDate` and `updatedDate`, and provides defaults for `featured`, `draft` and `relatedPublications`.

The `roadmap` collection uses `capabilitySchema`. That schema requires capability metadata for `id`, `title`, `status`, `summary` and `canonicalPath`, and provides defaults for `featured` and `draft`.

The current repository content structure contains Markdown entries under:

- `src/content/architecture/`
- `src/content/industries/`
- `src/content/releases/`
- `src/content/roadmap/`

Those entries are draft demonstration records. Each exists to validate its collection model and states that it does not publish a route. No current repository evidence shows published Markdown entries in the `research` collection.

---

## Collection Validation

Collection validation is implemented through schema definitions in `src/content.config.ts` and supporting governance tests in `tests/unit/content-rules.test.ts`.

Publication collection entries are validated by `basePublicationSchema`. Observable validation rules include:

- publication identifiers must match uppercase alphanumeric and hyphen form;
- titles, categories, summaries and authors must be non-empty strings;
- versions must match the implemented numeric version pattern;
- statuses must come from `publicationStatuses`;
- canonical paths must match the clean public path pattern;
- canonical paths are piped through public path validation;
- related publication identifiers must match uppercase alphanumeric and hyphen form;
- `featured`, `draft` and `relatedPublications` receive schema defaults when omitted.

Capability entries are validated by `capabilitySchema`. Observable validation rules include:

- capability identifiers must match lowercase alphanumeric and hyphen form;
- titles and summaries must be non-empty strings;
- statuses must come from `capabilityStatuses`;
- canonical paths must match the clean public path pattern;
- canonical paths are piped through public path validation;
- `featured` and `draft` receive schema defaults when omitted.

The canonical path validator requires clean public paths. The public path validator rejects paths containing `.codex`, `engineering-backlog` or `source-material`.

The content governance utility in `src/utilities/content-rules.ts` mirrors the implemented status, canonical path, private marker and draft-flag checks for unit validation. The unit tests verify draft visibility, accepted statuses, private path rejection, duplicate identifier detection and metadata validation across all current Markdown files under `src/content`.

---

## Publication Organisation

Publication organisation is split between content collections, page routes and handbook publication files.

The `research` collection is the implemented collection used by the research publication routes. The publication index route calls `getCollection("research")`, passes entries through `visibleResearchPublications`, and renders visible entries with `PublicationCard`. The dynamic publication route also calls `getCollection("research")`, uses `visibleResearchPublications` to generate static paths, renders the selected publication through `PublicationLayout`, calculates reading time and resolves visible related publications by identifier.

The visibility rule for research publications is implemented in `src/utilities/publications.ts`: entries with `draft: true` are filtered out, and visible entries are sorted by publication date and then identifier. The route text states that approved research publications appear after publication review and that drafts are not exposed as routes.

The current `architecture`, `industries`, `releases` and `roadmap` Markdown entries are demonstration records for schema validation. Their frontmatter sets `draft: true`, `featured: false` and collection-specific canonical paths. They are organised by content domain under `src/content/`, but their body text states that they do not publish routes.

ER-WEB-005 handbook chapters are organised outside Astro content collections under `publications/ER-WEB-005/`. This chapter is a handbook publication artefact, not a new runtime collection entry.

---

## Engineering Rationale

The implemented content collection architecture supports publication governance by placing public-facing metadata behind explicit schemas. Publication records and capability records have separate schema responsibilities, which keeps the roadmap capability model distinct from publication-oriented collections.

Consistency is supported through shared schema reuse. The publication-oriented collections use a single `basePublicationSchema`, while roadmap entries use `capabilitySchema`. Both schemas share canonical path validation and public path validation, so content domains follow the same public boundary rule.

Validation is supported at more than one level. Astro content schemas validate collection entries, while `src/utilities/content-rules.ts` and `tests/unit/content-rules.test.ts` verify the repository's content governance rules independently against current Markdown content.

Maintainability is supported by simple file-system organisation. Content entries are grouped under domain-specific folders in `src/content/`, and the collection names match the implemented content domains: architecture, research, releases, roadmap and industries.

Discoverability is supported where implementation exists: research publications are gathered from the `research` collection, filtered for non-draft visibility, sorted predictably and exposed through the research publication index and dynamic publication route.

The architecture does not claim additional publication behaviour for collections that currently contain draft demonstration content only. It records the implemented structure, validation and route usage visible in the repository.

---

## Relationship to Website Architecture

Part II established Publication Architecture.

This chapter explains how implemented content collections realise that architecture.

Architecture remains constitutionally authoritative.

Collections remain implementation evidence.

---

## Engineering Consequences

The implemented collection architecture influences:

- publication workflows;
- navigation;
- metadata;
- build validation;
- future extensibility.

---

## Engineering Traceability

Every implementation statement shall be traceable to:

- ER-ENG-001
- Engineering Traceability Matrix
- Repository evidence

---

## Lessons Learned

Content architecture should be documented from observable implementation rather than framework capability.

Repository evidence remains the authoritative engineering source.

---

## Future Evolution

This chapter shall evolve only when:

- implemented collection architecture changes;
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

Document the implemented content collection architecture.

### Engineering Authority

ER-ENG-001.

### Repository Evidence

Content collections and schemas.

### Traceability

Engineering Traceability Matrix.

---

## Engineer's Reflection

Content collections are more than a framework feature.

Within the Enterprise Reality Website they provide the engineering structure through which constitutional knowledge becomes governed publication.

Recording their implementation ensures that future engineers understand not only where knowledge resides, but how it is validated and transformed into published artefacts.

---

## Enduring Contribution

**Content Collections shall always be documented from observable implementation evidence rather than inferred framework capability.**
