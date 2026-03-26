---
layout: home

hero:
  name: AIPPT
  text: A research-driven skill for building new decks from scratch
  tagline: "Replace ad-hoc slide making with dual contracts: argument contract + production contract, both traceable and script-verifiable."
  actions:
    - theme: brand
      text: Get Started
      link: /en/guide/getting-started
    - theme: alt
      text: Explore Workflow
      link: /en/guide/workflow
    - theme: alt
      text: GitHub
      link: https://github.com/bahayonghang/AIPPT

features:
  - title: New decks only
    details: "Built for new deck creation, not for editing or critiquing an existing PPTX or slide file."
  - title: Evidence before claims
    details: "Fact-heavy slides must stay traceable to `research_dossier` entries and source IDs."
  - title: Outline hard stop
    details: "`outline.approved` is the execution gate. Rendering must not start before the sticky-note outline is confirmed."
  - title: Dual planning contracts
    details: "Outline locks governing thought/pillars/proof chain; `slide_spec + page_plan` lock WHAT/HOW execution details."
  - title: Controlled resource layer
    details: "`resource-registry`, `resource-menu`, and `narrative-rhythm` add structure without expanding AIPPT into a heavyweight template warehouse."
  - title: Verifiable tooling
    details: "Prompt bundles, SVG pages, previews, and delivery manifests are validated by `validate-artifacts` and `validate-svg`."
---

## Why AIPPT focuses on intermediate artifacts

Many “make me a PPT” requests actually combine:

- brief clarification
- brand constraints
- source-backed research
- narrative architecture
- page planning
- delivery-mode selection
- final verification

When these are collapsed into one step, the result often degrades into:

- layout first, content later
- unsupported numbers that merely look plausible
- guessed brand systems
- overcrowded slides rescued by tiny text
- files that exist but are not actually ready for handoff

AIPPT splits those concerns into staged workflow steps with explicit outputs and hard stops.

## Core artifacts

The current core artifacts are:

- `brand_profile`
- `brief_summary`
- `research_dossier`
- `outline`
- `slide_spec`
- `page_plan`
- `style_profile`
- `delivery_manifest`
- `review_report`

## Documentation entry points

- [Getting Started](/en/guide/getting-started)
- [Workflow](/en/guide/workflow)
- [Artifacts and Output Tree](/en/guide/artifacts)
- [Output Modes](/en/guide/output-modes)
- [Scripts](/en/guide/scripts)
- [References and Resource Layer](/en/guide/references)
- [Evaluation, Scripts, and Regression](/en/guide/evaluation)
- [简体中文文档](/)
