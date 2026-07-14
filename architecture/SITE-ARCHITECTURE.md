# Site Architecture

The Enterprise Reality public website is a static publication platform.

## Layers

```text
Governance
  -> Content
  -> Presentation
  -> Static Generation
  -> Portable Delivery
  -> Quality Operations
```

## Responsibilities

- Governance: repository constitution, publication policy, ADRs and review
  discipline.
- Content: validated Astro content collections and approved public publications.
- Presentation: semantic Astro layouts, components and standards-based CSS.
- Static generation: deterministic build output in `dist/`.
- Portable delivery: generated assets suitable for static hosts.
- Quality operations: format, lint, type, unit, browser, accessibility and
  public/private boundary checks.

## Boundaries

The website does not perform runtime reasoning, evidence resolution,
automation, approval, authentication or customer-data handling. It publishes
approved public information only.

## Current Foundation Scope

WEB-1.0 implements the engineering platform, global shell, foundation routes,
design tokens, content schemas, SEO baseline, accessibility baseline, privacy
posture, security posture and CI quality gates. Later website stories own the
final narrative, interactive architecture, research index, industries, roadmap
and releases catalogue.
