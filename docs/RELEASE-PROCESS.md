# Release Process

The production website release process is prepared but not activated. This
document defines the WEB-1.7 deployment-readiness workflow and does not approve,
perform or imply a live deployment.

## Review Sequence

1. Architecture review confirms boundaries, technology decisions and portability.
2. Editorial review confirms clarity, terminology and publication discipline.
3. Claims review confirms public evidence and capability status.
4. Quality checks run locally and in CI.
5. Accessibility, SEO, link integrity, security and public-boundary evidence are
   reviewed.
6. Publication approval is recorded.
7. Deployment approval is requested separately.
8. GitHub Pages deployment may proceed only from `main` after approval.
9. Post-deployment verification confirms domain, redirects, sitemap, robots and
   canonical URLs.

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
git diff --check
```

The GitHub Actions deployment-readiness workflow runs the npm quality gates and
uploads the `dist/` Pages artifact. Its deploy job is guarded so pull requests
do not deploy, and only a `push` to `main` can deploy.

## Release Checklist

- Build succeeds.
- Formatting, linting, Astro/TypeScript checks and unit tests pass.
- Playwright browser and accessibility smoke tests pass.
- Public/private boundary check passes against source and generated output.
- No draft content appears in production routes.
- `dist/sitemap-index.xml` exists and uses canonical URLs.
- `dist/robots.txt` exists and points to the canonical sitemap.
- `dist/CNAME` exists and contains `www.enterprisereality.org`.
- Canonical URLs use `https://www.enterprisereality.org`.
- Structured data, where present, is valid and uses canonical URLs.
- No secrets, unnecessary environment variables or repository secrets are
  required.
- Custom-domain verification is completed after deployment approval.
- Rollback owner, previous release and rollback path are recorded before
  deployment.

## Release Notes

Release notes should describe changed routes, content, governance artefacts,
quality evidence and known limitations.

## Deployment Approval

No deployment, DNS change or production hosting change occurs merely because a
build succeeds. Approval must explicitly cover publishing the static artifact,
GitHub Pages repository settings, DNS records and Cloudflare configuration.

## Rollback Principle

Because output is static, rollback should restore the previous approved static
artifact or previous approved source revision, subject to release authority.

## Rollback Procedure

To roll back by source:

1. Identify the previous approved release commit.
2. Revert the faulty release through a reviewed pull request.
3. Run the full quality gate.
4. Merge to `main` after rollback approval.
5. Verify the restored GitHub Pages deployment.

To roll back by Pages deployment:

1. Identify the previous successful GitHub Pages deployment.
2. Confirm it maps to an approved release.
3. Restore or re-run that deployment using GitHub controls where available.
4. Verify routes, sitemap, robots, custom domain and HTTPS.
5. Purge Cloudflare cache if stale content remains.

DNS and Cloudflare rollback steps require separate operational approval and must
be recorded in the release evidence.
