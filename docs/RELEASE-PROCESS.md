# Release Process

The production website release process is deferred. This document defines the
WEB-1.0 readiness workflow and does not claim that a production deployment
process already exists.

## Review Sequence

1. Architecture review confirms boundaries, technology decisions and portability.
2. Editorial review confirms clarity, terminology and publication discipline.
3. Claims review confirms public evidence and capability status.
4. Quality checks run locally and in CI.
5. Publication approval is recorded.
6. Deployment approval is requested separately.

## Quality Checks

Run:

```sh
npm run format:check
npm run lint
npm run check
npm run test
npm run test:e2e
npm run build
npm run public-boundary:check
```

## Release Notes

Release notes should describe changed routes, content, governance artefacts,
quality evidence and known limitations.

## Deployment Approval

No deployment, DNS change or production hosting change occurs merely because a
build succeeds.

## Rollback Principle

Because output is static, rollback should restore the previous approved static
artifact or previous approved source revision, subject to release authority.
