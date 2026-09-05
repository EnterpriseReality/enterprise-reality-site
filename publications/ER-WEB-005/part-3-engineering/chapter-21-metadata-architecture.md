---
publication: ER-WEB-005
part: III
chapter: 21
title: Metadata Architecture
version: 0.1.0
status: Draft
classification: Canonical Engineering
author: Enterprise Reality Programme
reviewer: Chief Architect
engineering-source: ER-ENG-001
engineering-viewpoint: Metadata Architecture
---

# Chapter 21 - Metadata Architecture

> **"Metadata gives constitutional identity to published knowledge."**

## Engineering Viewpoint

**Metadata Architecture**

---

## Design Intent (Internal)

This chapter documents the implemented metadata architecture of the Enterprise Reality Website.

It records observable implementation evidence and shall not describe metadata capabilities that are not implemented within the repository.

---

## Purpose

Describe how metadata is implemented to identify, validate, organise and govern publications within the Enterprise Reality Website.

The objective is to explain how metadata supports constitutional publication, engineering traceability and long-term maintainability.

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
- `src/utilities/status.ts`
- `src/utilities/content-rules.ts`
- `src/utilities/publications.ts`
- `src/layouts/BaseLayout.astro`
- `src/layouts/PublicationLayout.astro`
- `src/components/PublicationCard.astro`
- `src/pages/research/publications/[slug].astro`
- `tests/unit/content-rules.test.ts`
- `tests/unit/acceptance-rules.test.ts`
- `tests/e2e/foundation.spec.ts`
- `tests/e2e/acceptance.spec.ts`

### Verification

✓ Repository observed

✓ Engineering baseline approved

✓ Implementation unchanged

---

## Repository Evidence

| Repository Artefact | Purpose |
| ------------------- | ------- |
| `src/content.config.ts` | Defines Astro content collections, publication metadata schema, roadmap capability metadata schema, canonical path validation and public path restrictions. |
| `src/content/architecture/foundation-boundary.md` | Provides an architecture collection front matter example using the implemented publication metadata fields as draft demonstration content. |
| `src/content/industries/foundation-industry-placeholder.md` | Provides an industries collection front matter example using the implemented publication metadata fields as draft demonstration content. |
| `src/content/releases/foundation-release-placeholder.md` | Provides a releases collection front matter example using the implemented publication metadata fields as draft demonstration content. |
| `src/content/roadmap/foundation-roadmap-placeholder.md` | Provides a roadmap collection front matter example using the implemented capability metadata fields as draft demonstration content. |
| `src/utilities/status.ts` | Defines accepted publication statuses, accepted capability statuses and draft visibility behaviour. |
| `src/utilities/content-rules.ts` | Implements repository-level metadata checks for identifiers, statuses, canonical paths, private path markers and draft flags. |
| `src/utilities/publications.ts` | Filters draft research publications, sorts visible publications and derives route slugs from canonical paths. |
| `src/layouts/BaseLayout.astro` | Accepts title, description and canonical path props and composes shared page identity values for rendered pages. |
| `src/layouts/PublicationLayout.astro` | Renders publication metadata including identifier, version, author, dates, reading time, status, abstract, citation and related publications. |
| `src/components/PublicationCard.astro` | Presents publication card metadata including identifier, status, version, publication date, reading time and featured state. |
| `src/pages/research/publications/[slug].astro` | Generates publication paths from visible research publications, renders collection content and resolves related publication identifiers against visible publications. |
| `tests/unit/content-rules.test.ts` | Verifies draft exclusion, accepted metadata statuses, private canonical path rejection, duplicate identifier detection and content metadata validity. |
| `tests/unit/acceptance-rules.test.ts` | Verifies canonical origin alignment, expected route manifest and reserved absent research publication route. |
| `tests/e2e/foundation.spec.ts` | Verifies foundational page behaviour, including page metadata checks for core website routes. |
| `tests/e2e/acceptance.spec.ts` | Verifies acceptance-level website behaviour against the implemented public route expectations. |

---

## Implemented Metadata Architecture

The implemented metadata architecture is centred on Astro content collection schemas and shared layout inputs.

`src/content.config.ts` defines a base publication schema used by the architecture, research, releases and industries collections. The implemented publication metadata fields are:

- `id`
- `title`
- `subtitle`
- `version`
- `status`
- `category`
- `summary`
- `publicationDate`
- `updatedDate`
- `author`
- `featured`
- `draft`
- `canonicalPath`
- `relatedPublications`

The same file defines a separate capability schema for the roadmap collection. The implemented capability metadata fields are:

- `id`
- `title`
- `status`
- `summary`
- `canonicalPath`
- `featured`
- `draft`

The publication schema and capability schema are not identical. Publication entries carry version, category, author, optional dates and related publication metadata. Roadmap capability entries do not carry those fields in the implemented schema.

Publication identity is implemented through `id`. Publication identifiers are constrained to uppercase letters, digits and hyphens. Roadmap capability identifiers are constrained to lowercase letters, digits and hyphens. The current repository front matter follows those constraints: the demonstration publication entries use identifiers such as `ER-WEB-DEMO-ARCH`, while the roadmap demonstration entry uses `foundation-roadmap-placeholder`.

Version metadata is implemented for publication collections through `version`, validated as a numeric semantic-style value with two or three numeric segments. Current demonstration publication entries use `0.1.0`. The roadmap capability schema does not implement version metadata.

Status metadata is implemented through shared status arrays in `src/utilities/status.ts`. Publication statuses are:

- `Released`
- `In Development`
- `Research`
- `Concept`

Capability statuses are:

- `Released`
- `In Development`
- `Planned`
- `Research`
- `Concept`

The implemented difference is material: `Planned` is accepted for capabilities but not for publication metadata.

Publication classification is represented by the `category` field in publication collection metadata. The current demonstration publication entries classify content as `Architecture`, `Industries` and `Releases`. The roadmap capability schema does not implement `category`.

Canonical path metadata is implemented through `canonicalPath`. `src/content.config.ts` requires clean public paths beginning with `/` and containing lowercase letters, digits, slashes and hyphens. The schema then pipes that value through `publicPath`, which rejects paths containing `.codex`, `engineering-backlog` or `source-material`.

Publication relationships are implemented through `relatedPublications`, an array of publication identifier strings. `src/pages/research/publications/[slug].astro` resolves each related identifier against visible research publications. If a related publication is visible and has metadata, the route passes its title and canonical path to `PublicationLayout`. If the identifier cannot be resolved to a visible publication, the identifier remains text rather than becoming a link.

Page-level identity metadata is passed through layout props. `BaseLayout` requires `title` and `description`, accepts an optional `canonicalPath`, composes a site-qualified page title, and builds a canonical URL from the implemented site origin and path. Publication pages pass `publication.title`, `publication.summary` and `publication.canonicalPath` into that layout through `PublicationLayout`.

This chapter does not document search engine optimisation metadata or structured data as Chapter 21 scope. Those areas are explicitly reserved for later chapters.

---

## Metadata Validation

Metadata validation is implemented in two observable layers.

The first layer is the Astro content collection schema in `src/content.config.ts`. It validates field shape when content collections are loaded. Publication entries must provide required string fields such as `id`, `title`, `version`, `status`, `category`, `summary`, `author` and `canonicalPath`. Optional publication fields are `subtitle`, `publicationDate` and `updatedDate`. `featured` defaults to `false`, `draft` defaults to `true` and `relatedPublications` defaults to an empty array.

The capability schema validates the roadmap metadata shape. It requires `id`, `title`, `status`, `summary` and `canonicalPath`. `featured` defaults to `false` and `draft` defaults to `true`.

The second layer is the repository-level validation utility in `src/utilities/content-rules.ts`. `validateContentMetadata` checks:

- `id` is present as a non-empty string;
- `status` belongs to the accepted status list for the metadata kind;
- `canonicalPath` is a clean public path;
- `canonicalPath` does not expose `.codex`, `engineering-backlog` or `source-material`;
- `draft` is present as a boolean.

`findDuplicateIdentifiers` scans metadata items and returns duplicate identifiers in sorted order.

`tests/unit/content-rules.test.ts` verifies these rules. It checks that draft demonstration content is excluded from production visibility, draft research entries are filtered out of visible publications, invalid capability status and private canonical paths are rejected, unsupported publication lifecycle statuses are rejected, duplicate identifiers are detected, all current content metadata validates, and demonstration entries remain drafts.

Canonical path generation for research publication routes is implemented by `publicationSlug` in `src/utilities/publications.ts`. It derives the route slug from a publication `canonicalPath` by removing the `/research/publications/` prefix and a trailing slash. `src/pages/research/publications/[slug].astro` uses that derived slug in `getStaticPaths()` for visible research publications only.

---

## Publication Governance

The implemented metadata supports publication governance by making identity, visibility and relationships explicit.

Publication identity is governed by `id`, `title`, `version`, `status`, `author` and `canonicalPath`. `PublicationLayout` renders the identifier, version, author, publication date, updated date and status in the publication metadata panel. It also renders the summary as the abstract and uses the identifier, version, author and publication year to compose the canonical citation.

Version management is implemented as metadata, not as a runtime release mechanism. Publication content entries carry `version`; `PublicationLayout` displays it; `PublicationCard` displays it; and the schema validates its numeric shape. No repository evidence shows automated version promotion or changelog generation from the field.

Status governance is implemented through the accepted status arrays in `src/utilities/status.ts`, the Zod schema in `src/content.config.ts`, `StatusBadge` usage in publication presentation components and unit tests that reject unsupported statuses. The implemented statuses describe publication or capability state without inventing additional lifecycle states.

Publication visibility is governed by `draft`. `src/utilities/status.ts` implements `isDraftVisibleInProduction` as the inverse of the draft flag. `visibleResearchPublications` filters out draft research publications before sorting and route generation. The current content entries are demonstration drafts, and tests verify that draft research entries are not visible publications.

Publication consistency is supported by `canonicalPath`. The same field is validated by schema rules, checked by repository validation utilities, used to derive research publication slugs and passed into layout rendering. The acceptance rules also verify that the repository's canonical origin is aligned with the configured website origin and CNAME.

Publication relationships are governed by `relatedPublications`. The implementation treats related publication identifiers as metadata references and resolves them only when matching visible research publications exist. This avoids creating links to unpublished or draft publications.

---

## Engineering Rationale

Metadata contributes to constitutional publication by making publication identity explicit in front matter and by validating that identity before content participates in the site build.

ER-ENG-001 records `src/content.config.ts`, `src/layouts/BaseLayout.astro`, `src/layouts/PublicationLayout.astro`, `src/utilities/publications.ts`, `src/utilities/status.ts`, `src/utilities/content-rules.ts` and the unit tests as baseline repository evidence. The Engineering Traceability Matrix maps Chapter 21 to metadata-related layouts, schemas and tests. Chapter 21 therefore describes implementation evidence rather than an aspirational metadata model.

Engineering traceability is supported because publication metadata fields are carried from Markdown front matter through typed content collections into route generation and presentation components. An engineer can trace `canonicalPath` from front matter, through schema validation, through publication slug generation, into layout canonical path input. An engineer can trace `status` from front matter, through accepted status constants, into `StatusBadge` presentation and validation tests.

Repository consistency is supported by using shared schemas for multiple publication collections. Architecture, research, releases and industries entries share the base publication schema, while roadmap capabilities use a narrower schema appropriate to capability metadata. This preserves the implemented distinction between publication metadata and capability metadata.

Maintainability is supported by default values for `featured`, `draft` and `relatedPublications`, by explicit accepted status lists and by unit tests that exercise metadata rules. Future content additions can follow the implemented metadata contract without each page redefining identity, status, visibility or canonical path rules.

No implementation change is introduced by this chapter. The chapter records the implemented metadata architecture as observable repository evidence.

---

## Relationship to Website Architecture

Part II established Publication Architecture.

This chapter explains how metadata implements the governance responsibilities defined by that architecture.

Architecture remains constitutionally authoritative.

Metadata remains implementation evidence.

---

## Engineering Consequences

The implemented metadata architecture influences:

- publication integrity;
- repository organisation;
- navigation;
- validation;
- future extensibility.

---

## Engineering Traceability

Every implementation statement shall be traceable to:

- ER-ENG-001
- Engineering Traceability Matrix
- Repository evidence

---

## Lessons Learned

Metadata should be documented from implemented governance rather than assumed publication practice.

Repository evidence remains the authoritative engineering source.

---

## Future Evolution

This chapter shall evolve only when:

- implemented metadata changes;
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

Document the implemented metadata architecture.

### Engineering Authority

ER-ENG-001.

### Repository Evidence

Metadata schemas and publication metadata.

### Traceability

Engineering Traceability Matrix.

---

## Engineer's Reflection

Metadata is often viewed as supporting information.

Within the Enterprise Reality Website it performs a constitutional role by providing stable identity, governance and traceability for published knowledge.

Recording its implementation ensures that future engineers understand not only what metadata exists, but why it is essential to constitutional publication.

---

## Enduring Contribution

**Metadata Architecture shall always be documented from observable implementation evidence rather than inferred publication practice.**
