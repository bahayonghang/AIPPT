---
name: aippt
description: >
  从零创建全新 PPT / slide deck 的专业工作流技能。仅在用户要从主题、目标、材料和品牌约束出发，
  完整生成一套新的演示结构、策划说明和设计资产时使用。覆盖品牌与资产 intake、证据化研究、
  outline、slide spec、版式策划，以及 `prompt_bundle_only`、`svg_pages`、
  `brand_ready_assets` 三种交付模式。即使用户只是说“帮我做一套新的企业介绍 / 路演 / 发布会 /
  课件 / 汇报 deck”，也应触发此技能。不用于修改现有 PPTX、审校已有 deck、润色单页、
  套已有模板或只改文案，这些场景应交给更合适的文档/设计技能。
compatibility:
  optional:
    - web_search_or_fetch
    - filesystem
    - structured_output
    - image_or_pdf_input
---

# AIPPT

## Scope

This skill is for building a **new** deck from scratch.

Use it when the user wants to go from a topic, brief, website, white paper, PDF, notes, or brand assets to a complete presentation package with research, structure, page planning, and render-ready prompts or SVG pages.

## Non-goals

Do **not** force this workflow onto requests like:

- editing an existing `.pptx`, `.ppt`, `.key`, or Google Slides file
- reviewing or polishing an already-finished deck
- reworking a single slide inside an existing master/template
- exporting a native Office file when the runtime has no Office automation

If the user already has a deck and wants edits or review, route to the platform's PPTX/document editing path instead of using this skill.

## Capability-driven compatibility

This skill is platform-agnostic, but some capabilities make it stronger:

- **Web search / fetch**: preferred for research, optional if the user already provides trustworthy materials
- **Filesystem**: preferred for saving prompt bundles, SVG pages, and planning artifacts; if unavailable, return artifacts inline
- **Structured output**: preferred for `outline` and `slide_spec` JSON, but Markdown/code block fallbacks are acceptable
- **Image/PDF input**: useful for logos, screenshots, annual reports, and white papers; optional

If a capability is missing, keep the same workflow and state the limitation explicitly. Do not skip research, slide spec, or page planning just because the runtime is weaker.

## Core rules

- Content first, styling second.
- Research before claims.
- Brand before decoration.
- Page planning before SVG.
- Verification before claiming readiness.

## Workflow overview

1. Stage 0: Brand & asset intake
2. Stage 1: Brief alignment
3. Stage 2: Research protocol
4. Stage 3: Outline + slide spec
5. Stage 4: Page planning
6. Stage 5: Output mode execution
7. Stage 6: Verification

You may compress stages 0-3 for speed, but do not skip them.

## Stage 0: Brand & asset intake

Read `references/brand-intake.md`.

Collect or infer:

- organization / product / project name
- official website and source materials
- logo assets and logo restrictions
- brand colors, fonts, icon style, photo / illustration direction
- chart styling preferences and metric formatting rules
- tone of voice
- forbidden elements, compliance notes, legal disclaimers
- any required sections or mandatory claims

Output a compact `brand_profile` before continuing.

If the user does not provide assets, infer only from official sources and clearly mark inferred items.

## Stage 1: Brief alignment

Lock the presentation brief before doing research-heavy work.

At minimum, clarify:

- audience
- purpose
- desired audience action after the presentation
- presenter context and speaking duration
- page budget
- must-have sections
- language
- success criteria

Output a `brief_summary`.

## Stage 2: Research protocol

Read `references/research-protocol.md`.

Build a chapter-oriented research dossier.

Rules:

- prioritize official and first-party sources
- record source title, URL, publication/access date, and why it matters
- every major claim, metric, and timeline item must be traceable to at least one source
- when the runtime supports it, prefer search grounding + URL context for discovery plus deep reading
- if evidence is weak or conflicting, say so instead of smoothing it over

Output:

- a human-readable research summary
- a structured `research_dossier`

## Stage 3: Outline + slide spec

Read `references/outline-prompt.md` and `references/slide-spec-schema.md`.

Produce two linked artifacts:

1. `outline`: the story arc and page sequence
2. `slide_spec`: the execution contract for each page

Requirements:

- `outline` must explain the narrative at chapter and page level
- `slide_spec` must include `slide_id`, `page_type`, `page_goal`, `evidence_refs`, `content_budget`, `layout_candidates`, and `visual_priority`
- `slide_spec.slide_id` order must map one-to-one to the final deck order
- no page may cite a fact that is missing from `research_dossier`
- present the deck as "digital sticky notes" for confirmation before page planning

Use these wrappers when the runtime supports structured output:

```text
[PPT_OUTLINE]
...json...
[/PPT_OUTLINE]

[SLIDE_SPEC]
...json...
[/SLIDE_SPEC]
```

## Stage 4: Page planning

Read `references/bento-grid-system.md`.

Turn each `slide_spec` item into a page-planning brief with a final layout decision and card-level content allocation.

For every slide, decide:

- final layout
- card inventory
- content allocation per card
- metric/chart/image slots
- source chips or footer refs when the slide contains external facts
- visual emphasis order

Use **real content**, not placeholders like "put text here".

If a slide is too dense for the budget, split it into two slides instead of shrinking everything.

Recommended per-slide planning format:

```markdown
### S03 - 市场机会
- Page type: kpi / comparison
- Goal: 让投资人 30 秒内理解市场规模和增长逻辑
- Final layout: asymmetric-two-column
- Card A (780x580): TAM / SAM / SOM narrative + 2 metrics
- Card B (400x580): source-backed KPI stack + citation refs R3, R5
- Visual priority: headline metric first, supporting explanation second
```

## Stage 5: Output mode execution

Read `references/design-prompt.md` and `references/svg-quality-checklist.md`.

If the user did not already specify a delivery mode, ask or default conservatively to `prompt_bundle_only`.

Supported modes:

- `prompt_bundle_only`
- `svg_pages`
- `brand_ready_assets`

### Shared rules

- if filesystem is available, persist artifacts under `output/`
- if filesystem is unavailable, return the same artifacts inline
- every page prompt must be self-contained
- if the deck includes source-backed facts, keep page citation refs visible in the page instructions

Suggested artifact layout:

```text
output/
├── briefing/
│   ├── brand-profile.md
│   ├── brief-summary.md
│   └── research-summary.md
├── specs/
│   ├── outline.json
│   ├── slide-spec.json
│   └── page-plan.md
├── prompts/
│   ├── page-01-cover.md
│   ├── page-02-contents.md
│   └── ...
├── svg/
│   ├── page-01-cover.svg
│   └── ...
└── brand/
    ├── master-guidance.md
    ├── page-family-rules.md
    └── asset-usage-rules.md
```

### `prompt_bundle_only`

Use when the user wants maximum portability or plans to render in Gemini/ChatGPT/another model themselves.

Deliver:

- per-page prompt bundle
- brand summary
- outline + slide spec
- any rendering caveats

### `svg_pages`

Use when the runtime can safely produce SVG.

Deliver:

- per-page prompt bundle
- per-page `.svg`
- notes for any page that had to be simplified for fit/readability

Do not call the SVG Office-ready until it passes the checklist.

### `brand_ready_assets`

Use when the user wants a handoff package for a designer or PowerPoint operator, not just raw SVG.

Deliver:

- brand profile
- master/theme guidance
- recommended cover / section / data / case-study page families
- chart and icon usage rules
- prompt bundle
- optional SVG pages if explicitly requested

## Office compatibility note

Treat SVG compatibility conservatively:

- **High-confidence workflows**: Microsoft 365, PowerPoint 2024, 2021, 2019
- **Needs local validation**: PowerPoint 2016

If the user specifically targets PowerPoint 2016, call out the validation risk instead of promising identical behavior.

## Stage 6: Verification

Run the checklist in `references/svg-quality-checklist.md` before claiming completion.

At minimum confirm:

- research coverage and source traceability
- page count and story flow
- `outline` to `slide_spec` mapping
- layout sizes and card spacing are consistent
- no text overflow or unsafe-zone spill
- font fallback is sane
- citations / source refs are visible where needed
- the chosen output-mode deliverables were actually produced

## Regression testing

Use `references/eval-prompts.md` whenever you need to regression-test this skill, compare trigger descriptions, or audit whether the workflow still routes correctly.

Success means:

- new-deck requests reliably trigger this skill
- existing-deck edit requests do not
- the workflow still produces source-backed `outline`, `slide_spec`, page planning, and valid deliverables
