# Output Modes

AIPPT supports three delivery modes. Default: `prompt_bundle_only`.

## `prompt_bundle_only` (default)

Use when portability and contract completeness are the priority.

Must deliver:

- `brand_profile`
- `brief_summary`
- `research_dossier`
- `outline`
- `slide_spec`
- `page_plan`
- `style_profile`
- per-slide prompt bundle
- `delivery_manifest`

## `svg_pages`

Use when runtime can safely generate and validate SVG.

Must deliver:

- everything in `prompt_bundle_only`
- per-slide `.svg`

Recommended:

- static preview HTML

Hard rule: SVG is not ready until `validate-svg` passes.

## `brand_ready_assets`

Use for designer/operator handoff.

Must deliver:

- everything in `prompt_bundle_only`
- style/brand override notes
- layout/chart/citation usage guidance

SVG is optional unless explicitly requested.

## Shared rules

All modes require:

- self-contained per-page prompts
- visible citation refs for external facts
- no skipping of `slide_spec` and `page_plan`
- `outline.approved = true` before render-delivery
- `delivery_manifest` in final outputs

## Manifest minimum (v2)

`delivery_manifest` should include:

- `schema_version`
- `contract_version`
- `mode`
- `input_files`
- `outputs`
- per-slide: `slide_id`, `title`, `story_role`, `argument_claim`, `proof_question`, `exhibit_intent`, `prompt_file`

## Office compatibility note

SVG support is treated conservatively:

- high confidence: Microsoft 365 / PowerPoint 2024/2021/2019
- local verification required: PowerPoint 2016
