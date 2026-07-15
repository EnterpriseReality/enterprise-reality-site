# ER-WEB-005 - Enterprise Reality Website Engineering Handbook

**Publication ID:** ER-WEB-005  
**Version:** 1.0.0  
**Status:** In Development  
**Classification:** Canonical Engineering Publication

## Purpose

ER-WEB-005 establishes the governed structure for the Enterprise Reality Website Engineering Handbook. Milestone 2 publishes the approved Part I Foundations chapters while the overall handbook remains in development.

## Audience

The handbook is intended for website engineers, reviewers, publication maintainers, architects and programme approvers responsible for the Enterprise Reality public website.

## Relationship to ER-WEB-001 Through ER-WEB-004

ER-WEB-005 is subordinate to the approved website publication set:

- ER-CON-002 defines website constitutional authority.
- ER-WEB-001 defines website programme scope and objectives.
- ER-WEB-002 defines website architecture and boundaries.
- ER-WEB-003 defines design-system principles.
- ER-WEB-004 defines publication lifecycle, metadata and public/private controls.

This handbook may explain approved website engineering practice, but it must not redefine those publications.

## Repository Structure

```text
publications/ER-WEB-005/
|-- README.md
|-- CONSTITUTION.md
|-- ER-WEB-005.md
|-- PUBLICATION-INDEX.md
|-- CHAPTER-METADATA-TEMPLATE.md
|-- part-1-foundations/
|-- part-2-architecture/
|-- part-3-engineering/
|-- part-4-quality/
|-- part-5-operations/
|-- part-6-governance/
|-- part-7-reference/
|-- diagrams/
`-- assets/
```

Each directory contains a README. Part I chapter files are published for Milestone 2. Later Part chapter files, diagrams and assets remain absent until their milestones begin.

## Authoring Workflow

1. Confirm the proposed chapter is listed in `PUBLICATION-INDEX.md`.
2. Create the chapter file only when its milestone begins.
3. Use the canonical front matter in `CHAPTER-METADATA-TEMPLATE.md`.
4. Keep chapter claims aligned with ER-CON-002 and ER-WEB-001 through ER-WEB-004.
5. Record dependencies, reviewed source files and related publications in chapter metadata.
6. Submit chapters for editorial, architecture and technical review before approval.

Chat is a workshop for drafting, review and exploration. Git is the canonical source of truth for publication content, metadata, history and approval records.

## Chapter Review Lifecycle

Chapters move through: Planned, Draft, Architecture Review, Technical Review, Approved, Published, Superseded or Withdrawn.

No chapter is published until public/private review, evidence review, constitutional review and technical review are complete.

## Versioning

The handbook uses semantic document versioning:

- Major versions record constitutional or structural changes.
- Minor versions record approved chapter or governance additions.
- Patch versions record corrections that do not materially change meaning.

The initial Milestone 1 foundation version is `0.1.0`. The Milestone 2 Part I publication version is `1.0.0`.

## Contribution Rules

Contributions must be public-safe, evidence-based, reviewed and scoped to the approved chapter catalogue. Contributors must not copy private platform material, internal prompts, unpublished reviews, private backlog content, credentials, local secrets, employer or client material into this publication.

Milestone 2 publishes Part I only. It does not create diagrams, screenshots, code examples, operational procedures, routes, components or deployment changes.
