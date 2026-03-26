---
name: aippt
description: >
  Decision-complete workflow skill for creating a brand-aware presentation deck from scratch.
  Use this whenever the user wants a new PPT, slide deck, presentation, pitch deck, launch deck,
  board deck, teaching deck, annual review, policy briefing, or market-research deck starting from
  a topic, brief, website, white paper, PDF, notes, or brand assets and expects end-to-end deck
  planning instead of ad-hoc slide drafting. Trigger even when the user only says "help me make a PPT",
  "build me a deck", or "turn these materials into slides" if the request implies a full new deck.
  Do not use this skill for editing or critiquing existing slide files, template tweaks, single-page
  design tasks, or outline-only requests.
compatibility:
  optional:
    - web_search_or_fetch
    - filesystem
    - structured_output
    - image_or_pdf_input
---

# AIPPT

## Scope and routing boundary

This skill orchestrates a **new deck** from brief to delivery contract.

Use AIPPT when the user wants:

- a brand-new slide deck with narrative, evidence, and page planning
- an end-to-end workflow artifact set (`brand_profile` through `delivery_manifest`)
- a reusable prompt bundle and optional SVG pages

Do not use AIPPT when the user wants:

- edits to existing `.pptx` / `.ppt` / `.key` / Google Slides
- review or critique of finished decks
- one-page design output only
- a lightweight outline with no downstream planning contract

If the request is existing-deck editing or critique, route to PPTX editing or review skills.

## Integration stance

AIPPT integrates the presentation stack at the **strategy layer**, not runtime chaining:

- adopts consultant-style argument architecture (governing thought, pillars, proof chain)
- adopts ghost-deck planning quality gates (helicopter test, dead-slide test, pacing)
- adopts brand-system vocabulary (palette roles, typography roles, style direction)
- keeps AIPPT as the orchestrator and contract producer

This skill does not automatically invoke `consultant`, `brand-system`, `deck-design-ppt`, or `deck-design-pdf`.

## Core principles

- Argument first, visuals second.
- Every slide proves one claim.
- Evidence is traceable or it is not used.
- Outline is gated (`approved=false`) before production contracts.
- Layout is explicit, not implied.
- Default delivery is conservative (`prompt_bundle_only`).
- Deterministic checks run before claiming readiness.

## Artifact contract

### Planned deck (required)

- `brand_profile`
- `brief_summary`
- `research_dossier`
- `outline`
- `slide_spec`
- `page_plan`
- `style_profile`

### Delivered deck (required)

- `delivery_manifest`
- `review_report` when validation or refinement finds issues

### Wrapper tags

```text
[RESEARCH_DOSSIER]...[/RESEARCH_DOSSIER]
[PPT_OUTLINE]...[/PPT_OUTLINE]
[SLIDE_SPEC]...[/SLIDE_SPEC]
[PAGE_PLAN]...[/PAGE_PLAN]
[STYLE_PROFILE]...[/STYLE_PROFILE]
[REVIEW_REPORT]...[/REVIEW_REPORT]
[DELIVERY_MANIFEST]...[/DELIVERY_MANIFEST]
```

## Output tree

```text
output/
├── briefing/
│   ├── brand-profile.md
│   ├── brief-summary.md
│   └── research-dossier.md
├── specs/
│   ├── outline.json
│   ├── slide-spec.json
│   ├── page-plan.json
│   ├── style-profile.json
│   └── review-report.json
├── prompts/
│   ├── 01-s01-title.md
│   ├── 02-s02-title.md
│   └── delivery-manifest.json
├── svg/
└── preview/
    └── index.html
```

## Workflow

1. Stage 0: Brand and asset intake
2. Stage 1: Brief alignment hard stop
3. Stage 2: Research dossier
4. Stage 3: Argument architecture + outline hard stop
5. Stage 4: Slide spec (WHAT to prove)
6. Stage 5: Page plan (HOW to present)
7. Stage 6: Style profile and delivery mode
8. Stage 7: Delivery execution
9. Stage 8: Verification and review

Do not skip stages. You may compress wording, but keep the gates.

## Stage 0: Brand and asset intake

Read:

- `references/brand-intake.md`
- `references/style-vocabulary.md`

Required output: `brand_profile` with:

- confirmed vs inferred brand signals
- official source list
- forbidden elements and compliance notes
- candidate style directions
- palette role constraints when known

## Stage 1: Brief alignment hard stop

Lock decision context before deep execution.

Required brief fields:

- audience
- purpose
- desired action
- context (presenter/use case)
- time budget / reading mode
- page budget
- language
- must-have sections
- success criteria

Required output: `brief_summary`

## Stage 2: Research dossier

Read:

- `references/research-protocol.md`

Required behavior:

- derive 3-6 research themes
- collect stable refs (`R1`, `R2`, ...)
- separate discovery from proof
- keep dates visible for time-sensitive facts
- build section evidence packets for downstream proof

Required output: `research_dossier`

## Stage 3: Argument architecture + outline hard stop

Read:

- `references/argument-architecture.md`
- `references/ghost-deck-playbook.md`
- `references/outline-prompt.md`
- `references/narrative-rhythm.md`

Required output: `outline` including:

- `governing_thought`
- `engagement_archetype`
- `pillar_map[]`
- `transition_map[]`
- `quality_gates`
- ordered slide list with `argument_claim`, `proof_question`, `story_role`, `evidence_refs`

Hard stop:

- first outline must set `approved=false`
- do not produce `slide_spec`, `page_plan`, prompt bundle, or SVG before explicit approval

Quality gates before approval:

- helicopter test: action titles read as a coherent argument
- dead-slide test: no removable slide without breaking logic
- rising-stakes test: narrative escalates toward decision

## Stage 4: Slide spec (WHAT to prove)

Read:

- `references/slide-spec-schema.md`
- `references/exhibit-intent-taxonomy.md`
- `references/resource-menu.md`

Required output: `slide_spec` where each slide includes:

- core identity: `slide_id`, `page_type`, `title`
- argument: `page_goal`, `audience_takeaway`, `story_role`, `pillar_id`, `argument_claim`, `proof_question`
- evidence: `evidence_refs`, `exhibit_intent`, `evidence_layer`, `data_requirements`
- composition envelope: `content_budget`, `layout_candidates`, `preferred_layout`
- risk and review: `review_focus`, `fit_risk`, `citations_mode`, `asset_needs`

Rules:

- `preferred_layout` must be in candidates
- `exhibit_intent` must map to a valid proof shape
- fact-backed slides cannot hide citations

## Stage 5: Page plan (HOW to present)

Read:

- `references/page-plan-schema.md`
- `references/bento-grid-system.md`
- `references/resource-menu.md`
- `references/narrative-rhythm.md`

Required output: `page_plan` where each slide includes:

- `final_layout` + `layout_rationale`
- `proof_trace` (claim, question, evidence refs)
- `exhibit_blueprint` (primary intent, visual strategy, encoding notes)
- `card_map` with real slot coordinates and owned content
- `citations_placement`
- `visual_emphasis_order`
- `rhythm_slot`
- `adjacency_check`
- `overflow_decision`
- `unresolved_assets`

Rules:

- no guessed coordinates outside canonical layouts
- no text-wall fallback in narrow cards
- split slides instead of shrinking below readable size

## Stage 6: Style profile and delivery mode

Read:

- `references/styles/index.json`
- one selected `references/styles/*.yaml`
- `references/style-vocabulary.md`
- `references/resource-registry.md`

Required output: `style_profile` including:

- `preset_id`
- `selection_reason`
- `source`
- `style_file`
- `style_direction`
- `palette_roles`
- `typography_roles`
- `brand_override_rules`
- optional `overrides`

Delivery mode options:

- `prompt_bundle_only` (default)
- `svg_pages`
- `brand_ready_assets`

Default remains `prompt_bundle_only` unless user explicitly asks for SVG pages or handoff package.

## Stage 7: Delivery execution

Read:

- `references/design-prompt.md`
- `references/resource-registry.md`

Scripts:

- `scripts/build-prompt-bundle.mjs`
- `scripts/validate-artifacts.mjs`
- `scripts/validate-svg.mjs`
- `scripts/build-preview.mjs`

### Mode outputs

#### `prompt_bundle_only`

- all planned artifacts
- per-slide prompt files
- `delivery_manifest`

#### `svg_pages`

- everything in `prompt_bundle_only`
- per-slide `.svg`
- optional preview HTML
- unresolved asset notes where needed

#### `brand_ready_assets`

- everything in `prompt_bundle_only`
- style and handoff guidance
- optional SVG pages when requested

## Stage 8: Verification and review

Read:

- `references/review-taxonomy.md`
- `references/svg-quality-checklist.md`
- `references/narrative-rhythm.md`

Run deterministic checks first:

- `outline.approved=true` before render validation
- one-to-one mapping across `outline`, `slide_spec`, `page_plan`
- argument chain consistency (`argument_claim` ↔ `proof_trace`)
- evidence refs preserved and visible
- rhythm checks (no uncontrolled layout repetition, no proof-wall segments)
- SVG hard rules (root, viewBox, safe zone, unresolved placeholders, font floors)
- delivery manifest matches produced files

If issues exist, emit typed `review_report`.

## Resource loading discipline

- `resource-registry.md` is the source-of-truth index.
- Load only stage-relevant references.
- During Stage 4/5, use `resource-menu.md` to avoid repetitive layout decisions.
- During Stage 3/8, use `narrative-rhythm.md` to balance dense evidence and breathing slides.

## Compatibility note

Treat SVG import/edit compatibility conservatively:

- high confidence: Microsoft 365 / PowerPoint 2024 / 2021 / 2019
- local validation required: PowerPoint 2016

## Regression testing

Use:

- `evals/evals.json` for workflow regression
- `evals/trigger-evals.json` for trigger boundaries
- `references/eval-prompts.md` for human-readable review

Success criteria:

- new-deck intents trigger this skill
- existing-deck edit/review/single-page/outline-only intents do not
- produced contracts are decision-complete and validator-clean
