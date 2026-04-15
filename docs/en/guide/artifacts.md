# Artifacts and Output Tree

This page documents the current AIPPT artifact contract.

## Stage-complete state

A deck is stage-complete only when all exist:

- `brand_profile`
- `brief_summary`
- `research_dossier`
- `outline`
- `slide_spec`
- `page_plan`
- `style_profile`

`outline_only` stops at `outline`; `spec_only` stops at `slide_spec` and does not reach `page_plan`.

## Final delivery state

In addition to stage-complete state:

- `delivery_manifest`
- `review_report` (when validation/refinement finds issues)

`delivery_manifest` is the final handoff metadata, usually produced after validators.

## Wrapper tags

```text
[RESEARCH_DOSSIER]...[/RESEARCH_DOSSIER]
[PPT_OUTLINE]...[/PPT_OUTLINE]
[SLIDE_SPEC]...[/SLIDE_SPEC]
[PAGE_PLAN]...[/PAGE_PLAN]
[STYLE_PROFILE]...[/STYLE_PROFILE]
[REVIEW_REPORT]...[/REVIEW_REPORT]
[DELIVERY_MANIFEST]...[/DELIVERY_MANIFEST]
```

## Required fields

### `outline` (argument layer)

Must include:

- `governing_thought`
- `pillar_map`
- `transition_map`
- `quality_gates`
- `slides[].argument_claim`
- `slides[].proof_question`

### `slide_spec` (WHAT contract)

Must include:

- `argument_claim`
- `proof_question`
- `exhibit_intent`
- `evidence_layer`
- `data_requirements`
- `content_budget`
- `layout_candidates`
- `review_focus`

### `page_plan` (HOW contract)

Must include:

- `layout_hint`
- `layout_family`
- `final_layout`
- `proof_trace`
- `exhibit_blueprint`
- `card_map`
- `rhythm_slot`
- `adjacency_check`
- `overflow_decision`

### `style_profile`

Must include:

- preset or custom `style_direction`
- `style_dimensions`
- `palette_roles`
- `typography_roles`
- `style_instruction_block`

## Preferred output tree

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
│   └── delivery-manifest.json
├── svg/
├── preview/
└── project.json
```

## Manifest minimum

`delivery_manifest` should include:

- `schema_version`
- `contract_version`
- `mode`
- `input_files`
- `outputs`
- per-slide fields for claim/proof/intent and prompt mapping
