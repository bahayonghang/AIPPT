---
name: aippt
description: >
  从零创建全新 PPT / slide deck 的研究驱动型工作流技能。用户只要是想基于主题、官网、白皮书、
  笔记、品牌素材或业务目标，完整产出一套新的企业介绍、融资路演、产品发布会、教学课件、年度复盘、
  政策解读、董事会汇报或行业研究 deck，就应该使用此技能。它会执行品牌 intake、brief 对齐、
  证据化研究、sticky-note 大纲、slide spec、page plan、style profile、prompt bundle /
  SVG 交付与验证。不要用于修改现有 PPTX、审校已有 deck、只润色单页、套现成模板或只改文案。
compatibility:
  optional:
    - web_search_or_fetch
    - filesystem
    - structured_output
    - image_or_pdf_input
---

# AIPPT

## Scope

Use this skill to build a **new deck from scratch**.

The workflow is content-first and evidence-first. The output is not just a pretty prompt. It is a planning system that turns a topic or source pack into a complete deck contract with reviewable intermediate artifacts.

## Non-goals

Do **not** use this skill for:

- editing an existing `.pptx`, `.ppt`, `.key`, or Google Slides file
- reviewing or polishing an already finished deck
- modifying one page inside an existing template
- promising native Office export when the runtime cannot automate Office

If the user already has a deck and wants edits, review, or PPTX-native operations, route to the platform's PPTX or document-editing workflow instead.

## Capability-driven compatibility

This skill is portable. It should preserve the same staged workflow even when the host runtime is weaker.

- **Web search / fetch**: preferred for research; if unavailable, research only from user-provided files and say so explicitly
- **Filesystem**: preferred for saving artifacts under `output/`; if unavailable, return the same artifacts inline
- **Structured output**: preferred for wrappers such as `[PPT_OUTLINE]`, `[SLIDE_SPEC]`, `[PAGE_PLAN]`, `[STYLE_PROFILE]`, `[REVIEW_REPORT]`, `[DELIVERY_MANIFEST]`
- **Image/PDF input**: useful for white papers, annual reports, screenshots, logos, and sample decks, but not required

## Core principles

- Content first, styling second.
- Research before claims.
- Outline before rendering.
- Planning before SVG.
- Brand constraints before decoration.
- Verification before claiming readiness.

## Artifact contract

The deck is considered planned only when these artifacts exist:

- `brand_profile`
- `brief_summary`
- `research_dossier`
- `outline`
- `slide_spec`
- `page_plan`
- `style_profile`

The deck is considered delivered only when these artifacts also exist:

- `review_report` when verification finds issues or when an optional aesthetic review is requested
- `delivery_manifest`

Use these wrapper tags whenever the runtime supports structured output:

```text
[PPT_OUTLINE]...[/PPT_OUTLINE]
[SLIDE_SPEC]...[/SLIDE_SPEC]
[PAGE_PLAN]...[/PAGE_PLAN]
[STYLE_PROFILE]...[/STYLE_PROFILE]
[REVIEW_REPORT]...[/REVIEW_REPORT]
[DELIVERY_MANIFEST]...[/DELIVERY_MANIFEST]
```

## Workflow overview

1. Stage 0: Brand and asset intake
2. Stage 1: Brief alignment hard stop
3. Stage 2: Research dossier
4. Stage 3: Sticky-note outline hard stop
5. Stage 4: Slide spec
6. Stage 5: Page plan
7. Stage 6: Style profile and delivery mode
8. Stage 7: Delivery execution
9. Stage 8: Verification and review

You may compress wording for speed, but do **not** skip the stages.

## Stage 0: Brand and asset intake

Read `references/brand-intake.md`.

Collect or infer:

- organization / product / project name
- official website and trusted source materials
- logo status and placement restrictions
- brand colors, fonts, icon style, chart style
- photo / illustration direction
- tone of voice
- compliance notes, legal disclaimers, forbidden elements
- preferred or inferred style preset candidates

Return a compact `brand_profile` before deep research. If the user provides weak or no brand material, infer only from official sources and mark each inferred item clearly.

## Stage 1: Brief alignment hard stop

Lock the presentation brief before heavy execution.

At minimum, capture:

- audience
- presentation purpose
- desired audience action after the deck
- presenter context
- speaking duration
- page budget
- language
- must-have sections
- success criteria

Return `brief_summary`.

Do not start outline generation until the brief is stable enough that the narrative target is clear.

## Stage 2: Research dossier

Read `references/research-protocol.md`.

Produce both:

- a readable research summary
- a structured `research_dossier`

Rules:

- prioritize official and first-party sources
- keep dates visible for time-sensitive claims
- assign stable source IDs such as `R1`, `R2`, `R3`
- never move a fact into `outline`, `slide_spec`, or `page_plan` unless it is traceable to a source entry
- if evidence is weak or conflicting, preserve that uncertainty

## Stage 3: Sticky-note outline hard stop

Read:

- `references/outline-prompt.md`
- `references/cognitive-design-principles.md`

Produce two linked outputs:

1. `outline`
2. a sticky-note style preview for human review

Requirements:

- `outline.approved` must be `false` when first generated
- every slide must have one clear `page_goal`
- section flow must be story-first, not topic dumping
- titles must carry information, not generic placeholders
- use cognitive-load and hierarchy rules to keep the deck explainable

Hard stop:

- Do **not** generate `slide_spec`, `page_plan`, prompt bundle, or SVG pages until the outline is explicitly approved
- only after confirmation should `outline.approved` become `true`

## Stage 4: Slide spec

Read `references/slide-spec-schema.md`.

Produce `slide_spec` as the execution contract for each page.

Every slide must include:

- `slide_id`
- `page_type`
- `page_goal`
- `audience_takeaway`
- `evidence_refs`
- `content_budget`
- `layout_candidates`
- `preferred_layout`
- `story_role`
- `review_focus`
- `asset_needs`
- `citations_mode`

Rules:

- `preferred_layout` must be one of the candidates
- `story_role` must explain the narrative function of the slide
- `review_focus` must tell later reviewers what quality dimension matters most
- metric-heavy slides must not hide citations

## Stage 5: Page plan

Read:

- `references/bento-grid-system.md`
- `references/page-plan-schema.md`

Turn each `slide_spec` item into a structured `page_plan`.

For every slide, define:

- `final_layout`
- `layout_rationale`
- `card_map` with exact slots and real content allocation
- `citations_placement`
- `visual_emphasis_order`
- `overflow_strategy`
- unresolved asset placeholders when necessary

Rules:

- use one canonical layout name from the Bento system
- use real planned content, not “put text here”
- if the page is too dense, split it instead of shrinking it into unreadability
- if a fact appears in the page plan, it must already exist in the research dossier

## Stage 6: Style profile and delivery mode

Read the style registry:

- `references/styles/index.json`
- the single most relevant preset under `references/styles/*.yaml`

Choose or infer a `style_profile`.

Return it in this form when structured output is possible:

```text
[STYLE_PROFILE]
{
  "style_profile": {
    "preset_id": "business",
    "selection_reason": "Matches enterprise buyers and official navy brand tones",
    "source": "explicit_brand | inferred_brand | neutral_fallback",
    "style_file": "references/styles/business.yaml",
    "overrides": []
  }
}
[/STYLE_PROFILE]
```

Supported delivery modes:

- `prompt_bundle_only`
- `svg_pages`
- `brand_ready_assets`

Default conservatively to `prompt_bundle_only` unless the user explicitly wants SVG pages or a handoff package.

## Stage 7: Delivery execution

Read `references/design-prompt.md`.

If filesystem is available, prefer this output layout:

```text
output/
├── briefing/
├── specs/
├── prompts/
├── svg/
└── preview/
```

### `prompt_bundle_only`

Deliver:

- `brand_profile`
- `brief_summary`
- `research_dossier`
- `outline`
- `slide_spec`
- `page_plan`
- `style_profile`
- per-slide prompt bundle
- `delivery_manifest`

### `svg_pages`

Deliver:

- everything from `prompt_bundle_only`
- per-slide `.svg`
- notes about simplifications, placeholders, or unresolved assets
- optional HTML preview if the runtime can build one safely

### `brand_ready_assets`

Deliver:

- everything from `prompt_bundle_only`
- style preset selection and override notes
- page-family guidance for cover / section / KPI / comparison / case-study / closing pages
- chart, icon, and citation usage rules
- optional SVG pages if explicitly requested

## Stage 8: Verification and review

Read:

- `references/review-taxonomy.md`
- `references/svg-quality-checklist.md`

Run deterministic hard-rule checks first. Use aesthetic review only after the hard rules pass or when the user explicitly asks for a design critique.

At minimum verify:

- `outline.approved = true` before rendering
- one-to-one mapping across `outline`, `slide_spec`, and `page_plan`
- citations remain visible anywhere facts are used
- layout sizes and spacing stay on the canonical grid
- no text overflow or unsafe-zone spill
- SVG root, viewBox, and font fallbacks are sane
- the chosen delivery mode actually produced the promised files

When issues are found, return a typed `review_report` that uses the taxonomy in `references/review-taxonomy.md`. Prefer actionable findings over vague “make it prettier” feedback.

## Office compatibility note

Treat SVG compatibility conservatively:

- High-confidence workflows: Microsoft 365, PowerPoint 2024, 2021, 2019
- Needs local validation: PowerPoint 2016

Do not promise identical SVG import or editing behavior on PowerPoint 2016.

## Resource guidance

Load only the resources you need:

- use one style preset file at a time
- use `cognitive-design-principles.md` during outline and review stages
- use `page-plan-schema.md` only after `slide_spec` exists
- use the scripts under `scripts/` when you need deterministic prompt bundling, artifact validation, SVG validation, or preview generation

## Regression testing

Use:

- `evals/evals.json` for workflow regression
- `evals/trigger-evals.json` for trigger-boundary regression
- `references/eval-prompts.md` for the human-readable test catalog

Success means:

- new-deck requests reliably trigger this skill
- existing-deck edit or critique requests do not
- the workflow emits `brand_profile`, `brief_summary`, `research_dossier`, `outline`, `slide_spec`, `page_plan`, `style_profile`, and `delivery_manifest`
- any SVG output passes the hard-rule checks before being described as ready
