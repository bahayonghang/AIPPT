---
name: aippt
description: >
  Contract-first workflow skill for building a brand-new deck from topic, brief, notes, website,
  PDF, white paper, or brand assets. Use this whenever the user wants a full new PPT, pitch deck,
  board pack, teaching deck, policy briefing, or thesis-defense style presentation from scratch and
  expects research, argument structure, page planning, and delivery artifacts instead of ad-hoc slide
  drafting. Trigger even on "help me make a PPT" when the intent is a new deck. Do not use this for
  existing deck edits, critique-only requests, template tweaks, single-slide asks, or outline-only work.
compatibility:
  optional:
    - filesystem
    - structured_output
    - web_search_or_fetch
    - image_or_pdf_input
---

# AIPPT

## Positioning

AIPPT is the strategy and contract layer for **new deck creation**.

Keep these strengths:

- staged artifact contract
- argument-first workflow
- hard stop before production
- deterministic validation
- portable delivery modes

Do not expand AIPPT into:

- existing `.pptx/.ppt/.key/Google Slides` editing
- `deck.json` runtime editing
- native PPTX export tooling
- component-level natural-language page surgery

If the user wants those, route to a downstream editing or rendering skill.

## Subskill-first routing

Before running the generic workflow, check whether the request matches a scene pack.

Scene packs live in:

- `references/scenes/scene-catalog.json`
- `subskills/<scene>/SKILL.md`

Built-in scene packs:

- `company-intro`
- `investor-pitch`
- `board-briefing`
- `policy-briefing`
- `teaching-deck`
- `thesis-defense`

Routing rule:

1. If the request clearly matches a scene pack, read that subskill first.
2. Apply the scene defaults for audience bias, required sections, story arc, review bias, and preferred style.
3. Then resume the generic AIPPT stages below.
4. If no scene matches, stay on generic AIPPT.

Scene packs **refine** the workflow. They never bypass the hard gates.

## Generic workflow

1. Stage 0: brand and asset intake
2. Stage 1: brief alignment hard stop
3. Stage 2: research dossier
4. Stage 3: argument architecture + outline hard stop
5. Stage 4: slide spec
6. Stage 5: page plan
7. Stage 6: style profile + delivery mode
8. Stage 7: delivery execution
9. Stage 8: verification and review

## Hard gates

- `outline.approved=false` on first outline pass
- no `slide_spec`, `page_plan`, prompt bundle, or SVG delivery before explicit outline approval
- `delivery_manifest` is only valid after deterministic checks pass
- scene pack routing may change defaults, but not the gates

## Artifact contract

Planned artifacts:

- `brand_profile`
- `brief_summary`
- `research_dossier`
- `outline`
- `slide_spec`
- `page_plan`
- `style_profile`

Delivered artifacts:

- `delivery_manifest`
- `review_report` when validation or refinement finds issues

Wrapper tags stay unchanged:

- `[RESEARCH_DOSSIER]`
- `[PPT_OUTLINE]`
- `[SLIDE_SPEC]`
- `[PAGE_PLAN]`
- `[STYLE_PROFILE]`
- `[REVIEW_REPORT]`
- `[DELIVERY_MANIFEST]`

Do not introduce new top-level wrapper tags for scene or workspace metadata.

## Output model

Default output tree:

```text
output/
├── briefing/
├── specs/
├── prompts/
├── svg/
├── preview/
└── project.json
```

Delivery modes:

- `prompt_bundle_only` (default)
- `svg_pages`
- `brand_ready_assets`

Workspace metadata lives in `output/project.json`.
Scene metadata lives in scene-pack JSON and may be copied into `delivery_manifest`.

## Resource loading

Canonical map:

- `references/resource-registry.md`

Use it as the source of truth for:

- stage references
- style presets
- scene packs
- scripts
- eval files

Do not hand-maintain long file lists in multiple places.

## Scripts

Catalog and setup:

- `scripts/list-catalog.mjs`
- `scripts/init-workspace.mjs`
- `scripts/create-scene-pack.mjs`

Production and validation:

- `scripts/build-prompt-bundle.mjs`
- `scripts/validate-artifacts.mjs`
- `scripts/validate-svg.mjs`
- `scripts/build-preview.mjs`

Scene-aware options:

- `build-prompt-bundle.mjs --scene-pack <scene-id-or-json>`
- `validate-artifacts.mjs --scene-pack <scene-id-or-json>`

## What scene packs control

Scene packs may set:

- `required_sections`
- `default_story_arc`
- `evidence_policy`
- `preferred_style_preset`
- `delivery_default`
- `review_bias`

These values must appear in downstream contracts, not just in prose.

## Regression expectations

Keep all three layers current:

- `evals/evals.json`
- `evals/trigger-evals.json`
- `references/eval-prompts.md`

Required coverage:

- generic new-deck requests still trigger
- existing-deck edits and critique-only requests still do not trigger
- each built-in scene pack has one positive route test and one near-miss negative test
- scene routing never bypasses `outline.approved=false`

## Maintenance rule

When workflow behavior changes, update in this order:

1. scene pack / style metadata
2. `resource-registry.md`
3. root `SKILL.md`
4. scripts
5. evals
6. docs and README
