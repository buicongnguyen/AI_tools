# Contributing

Thank you for helping make this guide more practical and verifiable for software engineers.

## Before you change content

- Open an issue for a new chapter, large restructuring, or a claim that changes the guide's recommendations.
- Prefer official product documentation and primary technical sources. Record the access date in `SOURCES.md`.
- Do not publish credentials, customer data, private prompts, or copied proprietary code.
- Label estimates, examples, and measured results clearly. A template or empty scorecard is not evidence.

## Local quality gates

Requires Node.js 24 or newer.

```powershell
npm ci
npx playwright install chromium
npm test
```

`npm test` validates links and metadata, HTML structure, the executable lab, accessibility, responsive layout, synchronized Claude/Codex controls, and dark mode.

## Pull requests

1. Create a focused branch.
2. Update tests when behavior or navigation changes.
3. Run all quality gates locally.
4. Explain the user problem, evidence, scope, and verification in the pull request.
5. Keep product-specific advice in the Claude/Codex switcher when their workflows differ.

Small, evidence-backed changes are easier to review and maintain than broad rewrites.
