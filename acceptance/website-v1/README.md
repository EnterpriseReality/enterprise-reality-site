# WEB-1-RW1 Website Acceptance Workload

This directory contains the deterministic Website v1.0 acceptance workload.

It verifies the current release candidate without adding new public capability.
The workload covers public routes, constitutional narrative, capability status,
architecture boundaries, research publication boundaries, industry scenarios,
roadmap discipline, accessibility smoke checks, SEO metadata, privacy/security
markers, deployment readiness and semantic build reproducibility.

Run:

```sh
bash acceptance/website-v1/run_acceptance.sh
```

The runner does not deploy, push, change DNS, change GitHub settings or require
secrets.
