# ADR-SITE-002: Public Content Boundary

## Status

Accepted for WEB-1.0.

## Context

ER-CON-002 requires a hard separation between the private Enterprise Reality
platform repository and the public website repository. The public website must
not mirror private programme material automatically.

## Decision

The website repository contains only approved public material, the public site
implementation, repository governance, documentation and quality controls.

Private platform source, internal prompts, unpublished reviews, confidential
correspondence, employer/client material, credentials, secrets and unapproved
publication drafts are prohibited.

Promotion from private programme work requires review, redaction, public
classification, versioned public copy and approval before inclusion here.

## Consequences

- Public website implementation cannot depend on private source paths.
- A deterministic marker scan supports review but does not replace human
  classification and approval.
- Content schemas reject obvious private or source-only canonical paths.
