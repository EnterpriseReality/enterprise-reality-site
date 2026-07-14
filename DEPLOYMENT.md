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

## Pre-Deployment Evidence

Before any future deployment approval, capture evidence for:

- formatting, linting, Astro and TypeScript checks;
- unit tests and Playwright browser tests;
- axe accessibility checks;
- production build and sitemap generation;
- internal link integrity;
- public/private boundary scanning;
- static-host header review;
- publication approval.

## Deferred Operational Decisions

Deployment target, DNS configuration, cache policy, redirects, hosting headers
and production monitoring remain deferred to an approved deployment-readiness
story.
