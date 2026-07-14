# ADR-SITE-003: Hosting and Domain Strategy

## Status

Accepted direction for WEB-1.0. No deployment approved.

## Context

The website must preserve a provider-independent canonical domain:
`https://www.enterprisereality.org`. ER-WEB-002 identifies GitHub Pages with
Cloudflare DNS as the initial architecture guide direction, while ER-CON-002
requires technology neutrality and static-host portability.

## Options

## GitHub Pages with Cloudflare DNS

Strengths: simple repository-to-static-host flow, common GitHub Actions support,
low operational overhead.

Trade-offs: hosting behaviour is tied to GitHub Pages conventions, and advanced
headers or redirects may need additional workarounds.

## Cloudflare Pages with GitHub as Source

Strengths: strong static hosting capability, edge headers and redirects, simple
preview environments.

Trade-offs: deeper dependence on Cloudflare project configuration and account
settings.

## Portable Static Deployment through CI

Strengths: CI produces a reviewed static artifact that can be deployed to
GitHub Pages, Cloudflare Pages or another static host.

Trade-offs: requires a separately approved deployment target and release
procedure.

## Decision

Prefer portable static deployment through CI as the operational pattern, with
GitHub Pages plus Cloudflare DNS remaining a suitable first deployment option
when deployment readiness is approved.

## Consequences

- WEB-1.0 records deployment readiness documentation only.
- No DNS, hosting project or production deployment change is made.
- The build output remains portable static HTML, CSS, JavaScript and assets.
