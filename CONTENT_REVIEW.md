# Content and repository review

Reviewed: 2026-07-18

## Outcome

The guide now has a strong software-engineering focus, explicit Claude Code/Codex differences, recent primary-source references, practical prompts, Loop Engineering, and useful diagrams. This hardening pass closes the largest credibility gap: readers can run a deterministic lab and the repository verifies its own website and examples before deployment.

## Scorecard

| Area | Status | Evidence |
|---|---|---|
| Audience and navigation | Strong | Three goal-based entry paths and synchronized tool views |
| Practicality | Improved | Six cases plus one executable token-refresh concurrency lab |
| Evidence discipline | Strong foundation | Dated source inventory, measurement protocol, explicit zero-results disclosure |
| Accessibility and responsive behavior | Automated | Skip links, focus visibility, table captions, reduced motion, axe and mobile checks |
| Repository reliability | Automated | Static, HTML, lab, browser, and deployment gates use the same `npm test` command |
| Governance | Improved | Contributing, security, issue/PR templates, CODEOWNERS, Dependabot |
| Licensing | Owner decision required | No license selected; options documented without granting rights |
| Measured tool comparison | Not started | Zero completed benchmark runs; scorecards are templates only |

## Changes completed in this pass

1. Added an executable auth-refresh race lab with a broken baseline, deterministic reproduction, reference fix, independent tests, and evidence log.
2. Added a measurement protocol that controls task, environment, permissions, human intervention, evidence, and minimum sample size.
3. Replaced shallow deployment checks with static validation, HTML validation, lab verification, Playwright interaction tests, axe accessibility checks, and mobile overflow checks.
4. Added shared keyboard-focus, skip-link, and reduced-motion behavior to every page, plus captions for every table.
5. Added canonical/OpenGraph metadata, a sitemap, robots policy, and a custom 404 page.
6. Added contributor, security, ownership, issue, pull-request, and dependency-maintenance files.
7. Reorganized the README around three engineer outcomes and made evidence status explicit.

## Next professional improvements

| Priority | Improvement | Completion evidence |
|---|---|---|
| P0 | Choose and publish an appropriate license | Owner-approved `LICENSE` file and README update |
| P0 | Run the first 20 controlled practice tasks | Complete rows, linked patches/logs, limitations, and aggregate analysis |
| P1 | Add executable labs for memory growth and optimistic UI races | Each lab contains a failing baseline, reference fix, independent verifier, and CI gate |
| P1 | Extract repeated inline page styles/scripts into versioned shared assets | No behavioral regression; bundle size and duplication reported |
| P1 | Add lightweight source freshness automation | Stale or redirected references produce a review issue, not a silent failure |
| P2 | Add screenshots and short narrated walkthroughs | Captions/transcripts, current UI, and no unsupported claims |

## Editorial rules going forward

- Prefer a runnable artifact over another abstract section.
- Put provider differences in the Claude/Codex switcher; keep engineering invariants shared.
- Cite current product behavior from official sources and technical claims from primary sources.
- Keep failure cases, abandoned attempts, human corrections, and limitations in evaluation data.
- Convert repeated agent mistakes into tests, repository instructions, hooks, or evaluation cases.
- Never present model self-evaluation as independent evidence.
