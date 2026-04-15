---
name: aippt
description: >
  Contract-first workflow skill for building a brand-new deck from topic, brief, notes, website,
  PDF, white paper, or brand assets. Use this whenever the user wants a full new PPT, slide deck,
  pitch deck, board pack, teaching deck, policy briefing, thesis defense, or structured presentation
  from scratch and expects research, argument structure, page planning, style direction, and delivery
  artifacts instead of ad-hoc slide drafting. Trigger even on requests like "帮我做一套 PPT",
  "make a presentation", or "create slides" when the intent is a brand-new deck. Also trigger when
  the user wants to stop early at `outline_only` or `spec_only` as a staged checkpoint inside a full
  new-deck project. Do not use this for existing deck edits, critique-only requests, template tweaks,
  single-slide asks, export-only work, or lightweight outline / story-direction requests that
  explicitly do not want AIPPT contracts, research, page planning, or delivery artifacts.
compatibility:
  optional:
    - filesystem
    - structured_output
    - web_search_or_fetch
    - image_or_pdf_input
---

# AIPPT

## Positioning

AIPPT is the strategy-and-contract operator for **brand-new deck projects**.

Use it when the user wants more than ad-hoc slide drafting. The default AIPPT value is:

- route the request to the right scene pack
- collect a real intake instead of improvising from one sentence
- build a traceable deck argument before any production step
- stop at `outline.approved=false` until the human confirms the structure
- continue into `slide_spec`, `page_plan`, style instructions, and delivery only after approval

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

## Trigger boundary

Trigger AIPPT when the user wants a **new deck project** and expects any meaningful subset of:

- intake or brief alignment
- research or source-grounded evidence collection
- argument architecture / ghost-deck outline
- slide-by-slide planning
- style direction or delivery artifacts

Typical requests that should trigger AIPPT:

- "帮我从零做一套新的 PPT / slide deck / presentation"
- "make me a pitch deck from our notes and website"
- "create slides for a board meeting from scratch"
- "做一套完整教学课件，不只是提纲，要到逐页规划"
- "先做到 outline_only / spec_only，确认后再继续整套新 deck"

Typical requests that should **not** trigger AIPPT:

- existing PPTX / Google Slides editing
- critique-only or deck review only
- single-slide design
- export or file conversion only
- a lightweight brainstorming outline with **no** AIPPT contracts or downstream artifacts

Important boundary:

- **Do trigger** if the user says "先只做到 outline_only" or "先停在 spec_only" **and** this is clearly a new-deck project that will continue after approval.
- **Do not trigger** if the user only wants a casual outline or story arc and explicitly does not want research, contract artifacts, page planning, or AIPPT delivery outputs.

## First-turn operator protocol

Always do these steps before producing any outline:

1. **Decide route**: scene pack or generic AIPPT.
2. **Extract known inputs** from the user message first.
3. **Ask only for missing gaps**, not for everything again.
4. **State the staged path** so the user knows AIPPT will stop at outline approval before production.

Minimum first-turn intake checklist:

- brand / company / product
- official sources and trusted materials
- audience and use context
- desired audience action after the deck
- duration or page budget if known
- known assets, screenshots, brand rules, or forbidden elements
- desired stopping point: `outline_only`, `spec_only`, `prompt_bundle_only`, `svg_pages`, or `brand_ready_assets`

Use `references/brand-intake.md` for the full checklist.

## Default operator path

When the user does not ask for a special branch, follow the shortest happy path in:

- `references/golden-path.md`

The default sequence is:

1. route + intake
2. `brand_profile` + `brief_summary`
3. `research_dossier`
4. ghost-deck `outline`
5. hard stop for approval
6. `slide_spec`
7. `page_plan`
8. `style_profile`
9. delivery + validation

## Scene routing quick map

Before running the generic workflow, check whether the request clearly smells like one of these deck archetypes:

| Scene | Typical request signals | Route to |
| --- | --- | --- |
| `company-intro` | company overview, enterprise intro, customer-facing who-we-are deck | `subskills/company-intro/SKILL.md` |
| `investor-pitch` | fundraising, seed / series A, traction, team, ask | `subskills/investor-pitch/SKILL.md` |
| `board-briefing` | board deck, management update, operating review, decision points | `subskills/board-briefing/SKILL.md` |
| `policy-briefing` | regulation, compliance change, policy interpretation, timeline + risks | `subskills/policy-briefing/SKILL.md` |
| `teaching-deck` | lecture, training, workshop, lesson, learning objectives | `subskills/teaching-deck/SKILL.md` |
| `thesis-defense` | defense, dissertation, research contribution, literature gap, method/results | `subskills/thesis-defense/SKILL.md` |

If no scene clearly fits, stay on generic AIPPT.

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
2. Apply the scene defaults for audience bias, required sections, story arc, review bias, preferred style, density bias, and layout tendency.
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
- `outline_only` and `spec_only` are valid staged stops **only when the request is still a new-deck AIPPT project**
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

- `outline_only`
- `spec_only`
- `prompt_bundle_only` (default)
- `svg_pages`
- `brand_ready_assets`

`outline_only` and `spec_only` are staged stopping points, not shortcuts around approvals.

Workspace metadata lives in `output/project.json`.
Scene metadata lives in scene-pack JSON and may be copied into `delivery_manifest`.

## Preferences

Optional defaults may live in:

1. `./.aippt/EXTEND.json`
2. `~/.aippt/EXTEND.json`

Supported defaults:

- `default_scene`
- `default_style_preset`
- `default_delivery_mode`
- `default_language`
- `strict_review`
- `style_dimensions`

Schema: `references/config/preferences-schema.md`
Reader: `scripts/read-preferences.mjs`

## Resource loading

Canonical map:

- `references/resource-registry.md`

Use it as the source of truth for:

- stage references
- style presets
- style dimensions
- scene packs
- scripts
- eval files

Do not hand-maintain long file lists in multiple places.

## Scripts

Catalog and setup:

- `scripts/list-catalog.mjs`
- `scripts/init-workspace.mjs`
- `scripts/read-preferences.mjs`
- `scripts/create-scene-pack.mjs`

Production and validation:

- `scripts/build-prompt-bundle.mjs`
- `scripts/validate-artifacts.mjs`
- `scripts/validate-svg.mjs`
- `scripts/build-preview.mjs`

Scene-aware options:

- `build-prompt-bundle.mjs --scene-pack <scene-id-or-json>`
- `build-prompt-bundle.mjs --slides S03,S04`
- `validate-artifacts.mjs --scene-pack <scene-id-or-json>`

## What scene packs control

Scene packs may set:

- `required_sections`
- `default_story_arc`
- `evidence_policy`
- `preferred_style_preset`
- `delivery_default`
- `review_bias`
- `audience_density_bias`
- `layout_tendency`

These values must appear in downstream contracts, not just in prose.

## Style system

AIPPT now uses a dual-layer style model:

- presets in `references/styles/*.yaml`
- dimensions in `references/style-dimensions.md`
- auto-routing heuristics in `references/style-auto-routing.md`
- render-facing summary block in `references/style-instruction-schema.md`

`style_profile` should carry:

- token roles
- style dimensions
- style instruction block

## Layout system

Use both layers together:

- `references/layout-gallery.md` for visual archetypes and `layout_hint`
- `references/bento-grid-system.md` for canonical geometry and `final_layout`

`page_plan` should explain the archetype first, then the geometry.

## Partial regeneration rule

AIPPT still does not edit existing third-party decks.

However, for artifacts generated inside the AIPPT workflow, partial regeneration is allowed for named `slide_id`s when:

- outline approval already happened
- the scope stays inside `page_plan`, prompt bundle, review report, or SVG output
- validation is rerun before claiming success

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
- preferences, layout hints, and style instruction blocks remain represented in downstream contracts

## Maintenance rule

When workflow behavior changes, update in this order:

1. scene pack / style metadata
2. `resource-registry.md`
3. root `SKILL.md`
4. scripts
5. evals
6. docs and README
