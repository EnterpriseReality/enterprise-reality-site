# ER-WEB-005 Chapter Metadata Template

Use this front matter for every ER-WEB-005 chapter file.

```yaml
---
publication: ER-WEB-005
part:
chapter:
title:
version: 0.1.0
status: Draft
classification: Canonical Engineering
author: Enterprise Reality Programme
reviewer:
last-reviewed:
depends-on: []
related-publications: []
source-files: []
---
```

## Field Definitions

| Field | Meaning |
| --- | --- |
| `publication` | The owning publication identifier. Must be `ER-WEB-005`. |
| `part` | The Part number or title that owns the chapter. |
| `chapter` | The chapter number from `PUBLICATION-INDEX.md`. |
| `title` | The approved chapter title from the chapter catalogue. |
| `version` | The chapter version using semantic document versioning. |
| `status` | The chapter lifecycle status. |
| `classification` | The public classification for the chapter. |
| `author` | The accountable authoring owner. |
| `reviewer` | The accountable reviewer or review authority, once assigned. |
| `last-reviewed` | The most recent review date in ISO format, once reviewed. |
| `depends-on` | Publications, chapters or files that must be read before reviewing the chapter. |
| `related-publications` | Approved public publications related to the chapter. |
| `source-files` | Public repository files used as implementation evidence. |

## Accepted Chapter Statuses

- Planned
- Draft
- Architecture Review
- Technical Review
- Approved
- Published
- Superseded
- Withdrawn

A new chapter normally starts as Draft when the file is created. Planned chapters remain in the publication index until their files exist.
