# Contributing

## Workflow

- Create a focused branch for each website story or fix.
- Keep changes scoped to the approved story boundary.
- Open a pull request with implementation notes, quality evidence and known
  limitations.
- Do not commit, tag, push or deploy without explicit authority in the active
  workflow.

## Public Content Review

Public content requires editorial review, architectural review, claims review and
publication approval before release.

## Claims Review

Do not introduce unsupported claims about customers, adoption, performance,
regulatory approval, certification, partnerships or commercial availability.

## Accessibility Expectations

Changes must preserve semantic landmarks, keyboard access, visible focus,
responsive content and sufficient contrast. Automated checks support review but
do not replace manual accessibility judgement.

## Public Boundary

Do not copy private platform source, private programme work, unpublished review
material, confidential correspondence, employer/client material, personal data,
credentials or secrets into this repository.

## Testing Expectations

Run the relevant quality commands before requesting review:

```sh
npm run format:check
npm run lint
npm run check
npm run test
npm run test:e2e
npm run build
```

## Publication Approval

Deployment success does not equal publication approval. Approved publication
authority remains governed by ER-CON-002 and ER-WEB-004.
