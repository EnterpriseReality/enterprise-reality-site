# Security

## Supported Status

The Enterprise Reality website is in WEB-1.7 deployment-readiness work and is
not yet deployed as a production service.

## Responsible Disclosure

Report suspected security issues through the programme's approved private
reporting channel. A public security contact address has not yet been approved,
so this repository does not publish or invent one.

## Security Posture

- Static generation only.
- No authentication.
- No database.
- No analytics or advertising trackers.
- No third-party chat.
- No unnecessary cookies.
- No secrets in the repository.
- Least-privilege CI permissions.
- GitHub Pages deployment is limited to the guarded `main` workflow path.
- Dependency update configuration where practical.

## Content Security Policy Recommendation

Before deployment, configure static hosting with a restrictive CSP such as:

```text
default-src 'self'; img-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'
```

The final CSP must be reviewed against the actual hosting provider and published
asset requirements.

## Static Hosting Header Recommendations

Before production release, configure equivalent static-host headers where the
approved hosting provider supports them:

```text
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
```

These recommendations do not constitute deployment approval and must be
validated during the deployment-readiness story.
