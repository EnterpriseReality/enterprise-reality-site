# Deployment Readiness

Production deployment is deferred. This document records readiness guidance for
the static website and does not approve or perform deployment, DNS, hosting or
Cloudflare changes.

## Canonical Origin

The canonical production origin is:

```text
https://www.enterprisereality.org
```

Page metadata, canonical URLs, Open Graph URLs, sitemap output and robots
configuration must continue to use that origin unless a future approved
publication changes the website architecture.

## Static Artifact

The production artifact is the Astro static build output in `dist/`. It must be
portable static HTML, CSS, JavaScript and assets. Runtime authentication,
databases, API services, analytics and tracking scripts are outside the current
website boundary.

## GitHub Pages Workflow

Production deployment is prepared by `.github/workflows/deploy.yml`.

The workflow is designed to be repeatable, reviewable and least-privilege:

- `pull_request` runs build verification and all quality gates without
  deploying;
- `workflow_dispatch` permits manual readiness verification without deploying;
- `push` to `main` is the only path that can execute the deploy job;
- default workflow permissions are `contents: read`;
- the deploy job grants only `pages: write` and `id-token: write`;
- official GitHub Pages actions configure Pages, upload the static artifact and
  deploy that artifact;
- npm dependency caching is enabled through `actions/setup-node`;
- no repository secrets are required.

The workflow uploads `dist/` as the GitHub Pages artifact after:

```sh
npm ci
npx playwright install --with-deps chromium
npm run format:check
npm run lint
npm run check
npm run test
npm run test:e2e
npm run build
npm run public-boundary:check
```

The production build command also runs the public-boundary scanner against the
generated `dist/` output.

## Custom Domain Readiness

The repository includes `public/CNAME` with:

```text
www.enterprisereality.org
```

Astro is configured with `site: "https://www.enterprisereality.org"`, so
canonical URLs, sitemap URLs and robots configuration use the `www` origin.

After deployment approval, verify GitHub Pages custom-domain status for
`www.enterprisereality.org` in the repository Pages settings. Do not change
repository settings as part of deployment-readiness review.

The apex domain `https://enterprisereality.org` should resolve through
Cloudflare and redirect permanently to the canonical `www` origin unless a
future approved publication changes canonical-domain policy.

## Cloudflare Manual Configuration Guide

These are manual deployment-approval steps only. WEB-1.7 does not perform them.

### DNS Records

- Configure `www.enterprisereality.org` as a `CNAME` to the GitHub Pages host
  assigned to this repository.
- Configure `enterprisereality.org` using Cloudflare-supported apex flattening
  or GitHub Pages apex records if apex serving is explicitly approved.
- Prefer redirecting apex traffic to `https://www.enterprisereality.org`.
- Keep proxying, flattening and redirect behaviour documented in the release
  record.

### SSL/TLS

- Use Cloudflare SSL/TLS mode `Full` or stricter once GitHub Pages has issued a
  valid certificate.
- Enable "Always Use HTTPS".
- Enable "Automatic HTTPS Rewrites" if required by the final asset review.
- Confirm GitHub Pages reports HTTPS enforcement for the custom domain.

### Redirects

- Redirect `http://enterprisereality.org/*` to
  `https://www.enterprisereality.org/$1`.
- Redirect `https://enterprisereality.org/*` to
  `https://www.enterprisereality.org/$1`.
- Preserve paths and query strings.
- Verify redirects after DNS propagation.

### Caching

- Cache immutable static assets aggressively where filenames are content-hashed.
- Keep HTML and XML cache lifetimes conservative so publication corrections,
  sitemap updates and robots changes propagate quickly.
- Purge Cloudflare cache after rollback or emergency correction.

### Security Settings

- Enable HSTS only after HTTPS is confirmed stable for both apex and `www`.
- Do not enable third-party scripts, analytics, bot challenges or cookie-based
  features without a new approved story.
- Apply the static-host security headers recommended in `SECURITY.md` where the
  hosting and edge configuration support them.

## Pre-Deployment Evidence

Before any future deployment approval, capture evidence for:

- build succeeds;
- tests pass;
- accessibility smoke tests pass;
- public/private boundary check passes;
- no draft content is published;
- sitemap is generated;
- robots configuration is generated or copied into the artifact;
- canonical URLs use `https://www.enterprisereality.org`;
- structured data, where present, is valid and uses canonical URLs;
- internal links resolve;
- no unnecessary secrets are configured;
- custom domain is verified after deployment approval;
- rollback procedure is understood before deployment.

Suggested local evidence commands:

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

Artifact checks after `npm run build`:

```sh
test -f dist/sitemap-index.xml
test -f dist/robots.txt
test -f dist/CNAME
grep -R "https://www.enterprisereality.org" dist
```

Do not fabricate GitHub Actions results. Capture actual workflow results from
GitHub only after the workflow has run.

## Rollback Guidance

Rollback is a release-authority decision. Because the site is static, rollback
should restore a previous approved source revision or Pages artifact.

### Revert the Source Release

1. Identify the previous approved release commit.
2. Revert the faulty release commit on a reviewed branch.
3. Run the full quality gate locally and in CI.
4. Merge to `main` only after rollback approval.
5. Allow the GitHub Pages workflow to publish the restored artifact.

### Restore a Previous Pages Build

1. Locate the previous successful GitHub Pages deployment in the repository
   deployment history.
2. Confirm that the deployment corresponds to an approved release.
3. Re-run or restore that deployment using GitHub Pages controls where
   available.
4. Verify canonical routes, sitemap, robots, CNAME and Cloudflare cache state.
5. Purge Cloudflare cache if stale content remains visible.

### Emergency DNS or Edge Mitigation

DNS and Cloudflare changes require separate operational approval. If edge
mitigation is approved, record the exact Cloudflare rule, cache purge or DNS
change applied and the rollback path for that change.

## Deferred Operational Decisions

Live DNS configuration, Cloudflare setting changes, repository Pages setting
changes, release tagging, publication approval and production monitoring remain
deferred to a future approved deployment or operations story.
