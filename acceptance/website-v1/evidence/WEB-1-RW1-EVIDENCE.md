# WEB-1-RW1 Acceptance Evidence

## 1. Workload Purpose

Verify Website v1.0 as a release candidate for constitutional, editorial,
technical and operational acceptance.

## 2. Constitutional Boundary

This workload owns acceptance tests, acceptance scripts, verification evidence
and the smallest defect correction exposed by acceptance. It does not own new
public capability, deployment, DNS, GitHub settings, analytics, authentication
or backend services.

## 3. Release-Candidate Commit

Release-candidate commit at workload execution: `79a7371`
(`chore(web): complete WEB-1.7 deployment readiness`).

## 4. Required Route Results

Covered by `tests/e2e/acceptance.spec.ts` and
`acceptance/website-v1/expected/route-manifest.json`.

Result: PASS. The required 17 public routes loaded successfully, and
`/research/publications/errs-001/` returned 404.

## 5. Narrative Acceptance

Covered by focused acceptance tests for public positioning, constitutional
principles and prohibited positioning claims.

Result: PASS. The site preserves the approved public positioning and
constitutional boundaries, including the AI authority boundary and the
distinction between decision, Action Proposal, authority and execution.

## 6. Capability-Status Acceptance

Covered by focused tests for released milestones and planned/research future
capabilities.

Result: PASS. v0.1.0-v0.6.0 are shown as Released. Operational Readiness,
Decision Services and Explorer are Planned. Assistant is Research.

## 7. Architecture Acceptance

Covered by existing architecture tests and focused acceptance checks for
runtime progression, ownership, reasoning, automation, open-world reasoning, AI
boundary and JavaScript-disabled comprehensibility.

Result: PASS. The architecture page remains readable without JavaScript and
keeps progressive interaction keyboard-operable.

## 8. Research/Publication Acceptance

Covered by focused acceptance checks for truthful empty state, absent ERRS-001,
draft exclusion and no fabricated metadata.

Result: PASS. The research collection is currently empty, the truthful empty
state is rendered, draft/placeholder publication metadata is absent and
ERRS-001 is not generated.

## 9. Industry Acceptance

Covered by sector route tests for shared constitutional scenario structure,
Action Proposal terminology, operational-system boundary and human
accountability.

Result: PASS. All six industry routes exist and preserve the shared
constitutional scenario structure.

## 10. Roadmap Acceptance

Covered by focused tests for released v0.1.0-v0.6.0 milestones, Operational
Readiness planned status, future product separation and absence of speculative
dates or percentages.

Result: PASS. No speculative dates, percentages, private sprint content or
delivery promises were found.

## 11. Accessibility Evidence

Automated axe smoke tests run through Playwright. These tests do not claim full
WCAG certification.

Result: PASS. Automated axe smoke checks reported no violations across the
principal acceptance routes. This is not a complete WCAG certification.

## 12. SEO and Metadata Evidence

Focused tests verify title, description, canonical URL, Open Graph URL,
structured data parsing, sitemap and robots.

Result: PASS. Required routes expose titles, descriptions, canonical URLs under
`https://www.enterprisereality.org`, Open Graph URLs and parseable JSON-LD.
`robots.txt` points to the canonical sitemap.

## 13. Link-Integrity Evidence

Focused tests crawl internal links on required routes and assert successful
responses.

Result: PASS. Internal links discovered on required routes returned successful
responses.

## 14. Privacy and Security Evidence

Focused tests and the public/private boundary scanner check for analytics,
tracking, secrets, runtime APIs, backend endpoints and private markers.

Result: PASS. No analytics, tracking pixels, cookie banner, third-party chat,
runtime API route, secret marker or private marker was detected by the local
checks.

## 15. Performance Evidence

The workload verifies static generation, absence of large client frameworks and
small purpose-specific scripts. Lighthouse is deferred unless available in the
local toolchain.

Result: PASS for static-generation and dependency-boundary checks. Lighthouse
was not run in this workload because it is optional and not required when local
tooling is unavailable.

## 16. Build Reproducibility Evidence

The runner performs two production builds and compares semantic route, sitemap,
canonical and HTML hash manifests.

Result: PASS. Build 1 and Build 2 semantic manifests were equal.

## 17. Deployment-Readiness Evidence

Focused unit tests inspect deployment workflows, CNAME, deployment guidance,
release process and security posture.

Result: PASS. Deployment remains guarded to `push` on `main`; pull requests run
quality gates without deployment. CNAME and canonical origin agree on
`www.enterprisereality.org`.

## 18. Full Quality-Command Results

Runner result: PASS.

- `npm run format:check`: PASS
- `npm run lint`: PASS
- `npm run check`: PASS
- `npm run test`: PASS, 2 files / 12 tests
- `npm run test:e2e`: PASS, 55 tests
- `npm run build`: PASS, 17 pages generated
- `npm run public-boundary:check`: PASS
- `git diff --check`: PASS
- `bash acceptance/website-v1/run_acceptance.sh`: PASS

## 19. Public/Private Boundary Result

Result: PASS for `src`, `public` and `dist`.

## 20. Known Limitations

Automated accessibility checks are smoke tests only. GitHub-hosted workflow
success is not claimed unless run on GitHub. Lighthouse is not required when the
tooling is unavailable. Astro emits an expected warning that the research
collection is empty; the acceptance workload verifies the corresponding
truthful empty state.

## 21. Deferred Operational Actions

Deployment approval, DNS, Cloudflare configuration, Pages settings, release
tagging and production monitoring remain deferred.

No deployment, DNS change, GitHub settings change, push, release or tag was
performed.

## 22. Repository State

Post-run repository state:

```text
 M .gitignore
 M src/pages/index.astro
 M src/pages/platform.astro
?? acceptance/
?? tests/e2e/acceptance.spec.ts
?? tests/unit/acceptance-rules.test.ts
```

## 23. Final Acceptance Recommendation

Recommendation: Website v1.0 is locally ready for final review. The workload
introduced no new public capability and corrected one capability-status defect:
Decision Services now appears as Planned rather than Concept.
