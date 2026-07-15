# ER-CDE-001 Chapter Metadata Template

Use this front matter for every future ER-CDE-001 chapter or appendix manuscript.

```yaml
---
publication: ER-CDE-001
item:
part:
title:
version: 0.1.0
status: Planned
classification: Constitutional Engineering Doctrine
author: Enterprise Reality Programme
reviewer:
last-reviewed:
depends-on:
  - ER-WEB-005
evidence:
  - ER-WEB-005
related-publications: []
source-files: []
---
```

## Field Definitions

| Field | Meaning |
| --- | --- |
| `publication` | The owning publication identifier. Must be `ER-CDE-001`. |
| `item` | Chapter number or appendix identifier from `PUBLICATION-INDEX.md`. |
| `part` | The owning Part or appendix section. |
| `title` | The approved title from the catalogue. |
| `version` | The item version using semantic document versioning. |
| `status` | The item lifecycle status. |
| `classification` | The public classification for the item. |
| `author` | The accountable authoring owner. |
| `reviewer` | The accountable reviewer or review authority, once assigned. |
| `last-reviewed` | The most recent review date in ISO format, once reviewed. |
| `depends-on` | Publications or files that must be read before review. |
| `evidence` | Evidence basis for methodology captured by the item. |
| `related-publications` | Approved public publications related to the item. |
| `source-files` | Public repository files used as evidence. |

## Accepted Statuses

- Planned
- Draft
- Evidence Review
- Constitutional Review
- Editorial Review
- Approved
- Published
- Superseded
- Withdrawn

CDE-0 items remain Planned. A future manuscript may move to Draft only after authorisation for that item.

