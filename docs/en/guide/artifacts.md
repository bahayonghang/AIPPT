# Artifacts and Output Tree

This page documents the AIPPT artifact contract (v2).

## Planned state

A deck is considered planned only when all exist:

- `brand_profile`
- `brief_summary`
- `research_dossier`
- `outline`
- `slide_spec`
- `page_plan`
- `style_profile`

## Delivered state

In addition to planned state:

- `delivery_manifest`
- `review_report` (when validation/refinement finds issues)

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

## v2 required fields

### `outline` (argument layer)

Must include:

- `governing_thought`
- `engagement_archetype`
- `pillar_map`
- `transition_map`
- `quality_gates`
- `slides[].argument_claim`
- `slides[].proof_question`

### `slide_spec` (WHAT)

Must include:

- `argument_claim`
- `proof_question`
- `exhibit_intent`
- `evidence_layer`
- `data_requirements`
- `fit_risk`
- `layout_hint` (optional, but recommended)
- `layout_family` (optional, but recommended)

### `page_plan` (HOW)

Must include:

- `layout_hint`
- `layout_family`
- `proof_trace`
- `exhibit_blueprint`
- `rhythm_slot`
- `adjacency_check`
- `overflow_decision`

### `style_profile`

Must include:

- `style_direction`
- `style_dimensions`
- `style_instruction_block`
- `palette_roles`
- `typography_roles`
- `brand_override_rules`

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
└── preview/
    └── index.html
```

## Manifest minimum (v2)

`delivery_manifest` should include:

- `schema_version`
- `contract_version`
- `mode`
- `input_files`
- `outputs`
- per-slide fields for claim/proof/intent and prompt mapping
