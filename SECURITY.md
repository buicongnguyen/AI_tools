# Security policy

## Reporting a vulnerability

Please report vulnerabilities privately with the repository's **Security → Report a vulnerability** flow. Do not open a public issue for a vulnerability that could expose credentials, execute untrusted code, or compromise a developer workstation.

Include:

- the affected page, example, workflow, or commit;
- reproducible steps and expected impact;
- the smallest safe proof of concept;
- any suggested mitigation.

The maintainer will acknowledge a complete report, assess severity, and coordinate a fix before public disclosure when appropriate.

## Scope

Security reports may cover executable examples, GitHub Actions, dependency configuration, unsafe agent instructions, prompt-injection paths, secret handling, and deployment guidance. The supported version is the current `main` branch.

Never include real API keys, access tokens, customer data, or private repository contents in a report or AI-agent transcript.
