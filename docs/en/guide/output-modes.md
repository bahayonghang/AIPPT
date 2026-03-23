# Output Modes

AIPPT supports three delivery modes. These modes are defined in `skills/aippt/SKILL.md` and work together with `design-prompt.md` and `svg-quality-checklist.md`.

## 1. `prompt_bundle_only`

This is the most conservative and portable mode.

Use it when:

- the user wants to render elsewhere
- the runtime should not generate SVG directly
- maximum portability matters most

Deliverables:

- per-page prompt bundle
- brand summary
- outline
- slide spec
- rendering caveats

## 2. `svg_pages`

Use this when the runtime can safely generate SVG.

Deliverables:

- per-page prompt bundle
- per-page `.svg`
- notes for slides simplified for readability or fit

Notes:

- SVG should not be considered ready until it passes the checklist
- do not fabricate screenshots, logos, or chart data
- missing assets must become explicit placeholders

## 3. `brand_ready_assets`

Use this for a designer or PowerPoint operator handoff.

Deliverables:

- brand profile
- master or theme guidance
- recommended page families
- chart and icon usage rules
- prompt bundle
- optional SVG pages when explicitly requested

## Shared rules

All modes must follow these rules:

- every page prompt must be self-contained
- citation refs stay visible when the slide uses external facts
- research, slide spec, and page planning must not be skipped
- if filesystem is available, artifacts should be written under `output/`

## Office compatibility note

SVG compatibility is treated conservatively:

- high confidence: Microsoft 365, PowerPoint 2024, 2021, 2019
- local validation required: PowerPoint 2016

If the target is PowerPoint 2016, the workflow should explicitly note that local validation is still required.
