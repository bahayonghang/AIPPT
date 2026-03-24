---
layout: home

hero:
  name: AIPPT
  text: A research-driven skill for building new decks from scratch
  tagline: Replace ad-hoc slide making with brand intake, evidence-backed research, sticky-note outline approval, page planning, and verifiable delivery.
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
    details: "AIPPT is for creating a new deck from scratch, not for editing an existing PPTX or slide file."
  - title: Evidence before claims
    details: "Fact-heavy slides must stay traceable to `research_dossier` entries and source IDs."
  - title: Outline hard stop
    details: "`outline.approved` is the execution gate. Rendering must not start before the sticky-note outline is confirmed."
  - title: Slide spec plus page plan
    details: "`slide_spec` locks narrative and content budgets, while `page_plan` locks layout, card mapping, and citation placement."
  - title: Style profile aware
    details: "AIPPT now includes a style registry and a formal `style_profile` artifact."
  - title: Verifiable delivery
    details: "Prompt bundles, SVG pages, and handoff assets can be checked with artifact validators, SVG validators, and static preview generation."
---

## What AIPPT is

AIPPT is a Claude Code skill for creating a **new presentation deck** from a topic, brief, website, white paper, notes, or brand assets.

It is intentionally workflow-driven. Instead of jumping straight into layout or visuals, it enforces a progression from brand intake to brief alignment, research, sticky-note outline approval, slide spec, page plan, style selection, output generation, and verification.

## What it produces

Based on the current skill definition, AIPPT can produce:

- `brand_profile`
- `brief_summary`
- `research_dossier`
- `outline`
- `slide_spec`
- `page_plan`
- `style_profile`
- `review_report`
- `delivery_manifest`

## Good fit

- company introduction decks
- investor pitch decks
- product launch slides
- teaching slide decks
- executive review decks
- policy or market interpretation decks
- dense board or industry briefings

## Not a fit

- editing an existing `.pptx`, `.ppt`, `.key`, or Google Slides file
- reviewing a finished deck
- polishing a single slide inside an existing template
- creating only a cover image or one-off slide asset

## Documentation

- [Getting Started](/en/guide/getting-started)
- [Workflow](/en/guide/workflow)
- [Output Modes](/en/guide/output-modes)
- [References and Resource Layer](/en/guide/references)
- [Evaluation, Scripts, and Regression](/en/guide/evaluation)
- [简体中文文档](/)
