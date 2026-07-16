# Content Evaluation

Reviewed: 2026-07-16

## Executive assessment

The original content was technically broad and responsible, but it read more
like a reference manual than a field guide. It explained many good practices
without quickly showing an engineer what a successful real task looks like.

Initial assessment: **6.5/10**

## What was already strong

- Clear emphasis on tests, evidence, review, security, and human approval.
- Useful coverage across software, firmware, FPGA, and hardware.
- Current official sources for Claude Code, Codex, ChatGPT, and GPT-5.6.
- Reusable project, debugging, evaluation, and validation templates.
- Dark mode and a deployable static site.

## Problems found

| Finding | User impact | Change made |
|---|---|---|
| The idea-to-deploy lifecycle appeared twice | Repetition delayed useful detail | Replaced it with one shared engineering workflow |
| Tool installation appeared before practical value | Page felt tool-led rather than outcome-led | Added a 15-minute start path and realistic cases first |
| Advice was mostly abstract | Engineers could agree but not immediately apply it | Added software, embedded-debug, and FPGA case studies |
| Software and hardware guidance was mixed together | Users had to scan irrelevant material | Added selectable engineering paths |
| Templates were buried in prose | Low conversion from reading to action | Linked the idea brief and eval set from the quick start |
| Failure modes were dispersed | The guide felt more idealized than field-realistic | Added six common failure patterns and countermeasures |
| Tables and flow boxes used white backgrounds | Dark-mode contrast was inconsistent | Switched them to theme variables |
| Long flow diagrams did not scale well | Layout could become cramped | Changed flows to horizontally scrollable flex sequences |
| No navigation | Long page was difficult to revisit | Added sticky section navigation |
| No dedicated prompt-writing system | Users had examples but no reusable construction method | Added the G-C-C-R-V-O pattern and a role-based prompt library |

## Content principles applied

1. Lead with a useful outcome, not product names.
2. Show a believable situation, imperfect evidence, and a bounded result.
3. Distinguish what the agent can do from what the engineer must prove.
4. Make every major section answer “what do I do next?”
5. Keep safety and review gates, but express them in operational language.
6. Treat compilation, simulation, screenshots, and demos as partial evidence.

## Recommended next improvements

- Add one complete downloadable example project showing artifacts from idea brief
  through deployment and postmortem.
- Add automated HTML, accessibility, link, and mobile-layout tests to CI.
- Record short screen-capture walkthroughs using the three case studies.
- Add filters for role, project phase, and tool once the content grows further.
- Revisit model names, installation commands, and product features monthly.
