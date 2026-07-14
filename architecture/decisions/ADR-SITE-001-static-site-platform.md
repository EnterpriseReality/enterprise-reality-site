# ADR-SITE-001: Static Site Platform

## Status

Accepted for WEB-1.0.

## Context

ER-WEB-002 directs a content-led, portable, accessible static website using
Astro, TypeScript, Markdown or MDX, structured content and minimal client-side
JavaScript.

## Decision

Use Astro with TypeScript, static generation, Astro content collections and
standards-based CSS.

Client-side JavaScript is limited to necessary progressive enhancement, currently
the mobile navigation state controller.

## Consequences

- The site produces portable static output.
- Content metadata is validated at build time.
- Public pages remain readable without application hydration.
- Future stories can add MDX or interactive enhancements only where justified by
  approved architecture and accessibility requirements.
