# Security

## Supported Status

The Enterprise Reality website is in WEB-1.0 foundation development and is not
yet deployed as a production service.

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
- Dependency update configuration where practical.

## Content Security Policy Recommendation

Before deployment, configure static hosting with a restrictive CSP such as:

```text
default-src 'self'; img-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'
```

The final CSP must be reviewed against the actual hosting provider and published
asset requirements.
