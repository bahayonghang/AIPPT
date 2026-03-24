# Output Modes

AIPPT currently supports three delivery modes. They are defined in [SKILL.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/SKILL.md) and work together with `design-prompt.md`, `svg-quality-checklist.md`, and the script layer.

## 1. `prompt_bundle_only`

This is the most conservative and portable mode, and it is the default.

Use it when:

- the user wants to render elsewhere
- the runtime should not generate SVG directly
- portability matters more than final visual output

Deliverables:

- `brand_profile`
- `brief_summary`
- `research_dossier`
- `outline`
- `slide_spec`
- `page_plan`
- `style_profile`
- per-page prompt bundle
- `delivery_manifest`

## 2. `svg_pages`

Use this when the runtime can safely generate SVG.

Deliverables:

- everything from `prompt_bundle_only`
- per-page `.svg`
- notes for slides simplified for readability or fit
- optional static HTML preview

Notes:

- SVG should not be considered ready until it passes hard-rule validation
- do not fabricate screenshots, logos, or chart data
- missing assets must become explicit placeholders
- produce a `review_report` when review findings exist

## 3. `brand_ready_assets`

Use this for a designer or PowerPoint operator handoff.

Deliverables:

- everything from `prompt_bundle_only`
- preset-selection rationale
- brand or theme guidance
- recommended page families
- chart and icon usage rules
- optional SVG pages when explicitly requested

## Shared rules

All modes must follow these rules:

- every page prompt must be self-contained
- citation refs stay visible when the slide uses external facts
- `research_dossier`, `slide_spec`, and `page_plan` must not be skipped
- `outline.approved` must already be `true`
- if filesystem is available, artifacts should be written under `output/`
- the result should include a `delivery_manifest`

## Script support

These scripts are provided by `docs/package.json` and should be run from the `docs/` directory:

- `npm run aippt:build-prompts`
- `npm run aippt:validate-artifacts`
- `npm run aippt:validate-svg`
- `npm run aippt:build-preview`

## Office compatibility note

SVG compatibility is treated conservatively:

- high confidence: Microsoft 365, PowerPoint 2024, 2021, 2019
- local validation required: PowerPoint 2016

If the target is PowerPoint 2016, the workflow should explicitly note that local validation is still required.
