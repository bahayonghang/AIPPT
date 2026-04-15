# Output Modes

AIPPT supports five modes.

## `outline_only`

Use when you want to confirm the argument skeleton before entering production contracts.

Rules:

- stop at the outline stage
- do not generate prompt bundles
- do not generate `delivery_manifest`
- do not bypass the first-pass `outline.approved=false` gate

## `spec_only`

Use when outline is approved but you want to confirm `slide_spec` before page planning.

Rules:

- stop at `slide_spec`
- do not generate `page_plan`
- do not generate prompt bundles
- do not generate `delivery_manifest`

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

All final-delivery modes require:

- self-contained per-page prompts
- visible citation refs for external facts
- no skipping of `slide_spec` and `page_plan`
- `outline.approved = true` before render-delivery
- `delivery_manifest` in final outputs

`outline_only` and `spec_only` are staged stopping points, not final delivery states.

## Manifest minimum

`delivery_manifest` should include:

- `schema_version`
- `contract_version`
- `mode`
- `input_files`
- `outputs`
- per-slide: `slide_id`, `title`, `story_role`, `argument_claim`, `proof_question`, `exhibit_intent`, `prompt_file`
