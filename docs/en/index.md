---
layout: home

hero:
  name: AIPPT
  text: A professional skill for building brand-aware decks from scratch
  tagline: Replace ad-hoc slide making with a staged workflow built on brand intake, research evidence, slide planning, and verifiable deliverables.
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
    details: AIPPT is designed for creating a new deck from scratch, not for editing an existing PPTX or slide file.
  - title: Evidence before claims
    details: Fact-heavy slides must stay traceable to research entries and source IDs.
  - title: Brand before decoration
    details: Brand constraints, assets, typography, and forbidden elements are aligned before visual execution.
  - title: Slide-spec driven workflow
    details: Outline and slide spec act as the execution contract for layout planning and rendering.
  - title: Canonical layouts
    details: Slides are planned with Bento Grid layout families instead of ad-hoc card sizes and coordinates.
  - title: Verifiable delivery
    details: Prompt bundles, SVG pages, and handoff assets are checked against explicit quality rules.
---

## What AIPPT is

AIPPT is a Claude Code skill for creating a **new presentation deck** from a topic, brief, website, white paper, notes, or brand assets.

It is intentionally workflow-driven. Instead of jumping straight into layout or visuals, it enforces a progression from brand intake to brief alignment, research, outline, slide spec, page planning, output generation, and verification.

## What it produces

Based on the actual skill definition, AIPPT can produce:

- `brand_profile`
- `brief_summary`
- `research_dossier`
- `outline`
- `slide_spec`
- `page_plan`
- prompt bundles, SVG pages, or brand-ready assets depending on delivery mode

## Good fit

- company introduction decks
- investor pitch decks
- product launch slides
- teaching slide decks
- executive review decks
- policy or market interpretation decks

## Not a fit

- editing an existing `.pptx`, `.ppt`, `.key`, or Google Slides file
- reviewing a finished deck
- polishing a single slide inside an existing template

## Documentation

- [Getting Started](/en/guide/getting-started)
- [Workflow](/en/guide/workflow)
- [Output Modes](/en/guide/output-modes)
- [References](/en/guide/references)
- [Evaluation](/en/guide/evaluation)
- [简体中文文档](/)
