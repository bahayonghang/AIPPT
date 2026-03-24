# Workflow

This page summarizes the full AIPPT workflow from the current definitions in [SKILL.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/SKILL.md) and `skills/aippt/references/`.

## Overview

The core rules are:

- Content first, styling second
- Research before claims
- Outline before rendering
- Planning before SVG
- Brand constraints before decoration
- Verification before claiming readiness

Current full stage sequence:

1. Stage 0: Brand and asset intake
2. Stage 1: Brief alignment hard stop
3. Stage 2: Research dossier
4. Stage 3: Sticky-note outline hard stop
5. Stage 4: Slide spec
6. Stage 5: Page plan
7. Stage 6: Style profile and delivery mode
8. Stage 7: Delivery execution
9. Stage 8: Verification and review

Stages may be compressed for speed, but they must not be skipped.

## Stage 0: Brand and asset intake

Reference: [brand-intake.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/brand-intake.md)

This stage collects or infers:

- organization, product, or project name
- official website and first-party materials
- logo assets and restrictions
- brand colors, fonts, and icon style
- photo or illustration direction
- chart styling and metric formatting rules
- tone of voice
- forbidden elements
- compliance notes and required disclaimers
- style preset candidates

Output: a compact `brand_profile`

## Stage 1: Brief alignment hard stop

Before heavy research begins, the deck brief must be locked.

At minimum, the workflow aligns on:

- audience
- purpose
- desired audience action
- presenter context
- speaking duration
- page budget
- language
- required sections
- success criteria

Output: `brief_summary`

## Stage 2: Research dossier

Reference: [research-protocol.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/research-protocol.md)

Research rules:

- prioritize official and first-party sources
- treat search as discovery, not proof
- keep dates visible for time-sensitive material
- do not promote unsupported numbers or claims to slide content
- record conflicting evidence instead of blending it away

Outputs:

- a human-readable research summary
- a structured `research_dossier`

## Stage 3: Sticky-note outline hard stop

References:

- [outline-prompt.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/outline-prompt.md)
- [cognitive-design-principles.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/cognitive-design-principles.md)

Outputs:

- `outline`
- a sticky-note style preview for review

Important rules:

- `outline.approved` must start as `false`
- each slide gets one main communication task
- slide titles must carry information
- only evidence-backed facts may enter the outline

Hard stop:

- `slide_spec`, `page_plan`, prompt bundles, and SVG execution must not start until `outline.approved` becomes `true`

## Stage 4: Slide spec

Reference: [slide-spec-schema.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/slide-spec-schema.md)

`slide_spec` is the per-slide execution contract. Key fields now include:

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
- `visual_priority`
- `asset_needs`
- `citations_mode`

New additions:

- `story_role` distinguishes `anchor`, `proof`, `bridge`, `breathing`, and `closing`
- `review_focus` tells later review which quality dimension matters most

## Stage 5: Page plan

References:

- [bento-grid-system.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/bento-grid-system.md)
- [page-plan-schema.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/page-plan-schema.md)

This stage turns `slide_spec` into a concrete layout contract with:

- `final_layout`
- `layout_rationale`
- `card_map`
- `citations_placement`
- `visual_emphasis_order`
- `overflow_strategy`
- unresolved asset placeholders when needed

Important constraints:

- use canonical layout names
- avoid invented card sizes
- split overcrowded slides instead of shrinking text too far
- keep long paragraphs out of narrow cards

## Stage 6: Style profile and delivery mode

Resources:

- [references/styles/index.json](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/styles/index.json)
- `references/styles/*.yaml`

This stage determines:

- which preset to use
- whether the choice comes from explicit brand input, inferred brand logic, or neutral fallback
- which delivery mode to use: `prompt_bundle_only`, `svg_pages`, or `brand_ready_assets`

Output: `style_profile`

## Stage 7: Delivery execution

Reference: [design-prompt.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/design-prompt.md)

This stage produces the final deliverables for:

- briefing
- specs
- prompts
- svg
- preview

Shared rules:

- every page prompt must be self-contained
- citation refs remain visible when the slide uses external facts
- `slide_spec` and `page_plan` may not be skipped

## Stage 8: Verification and review

References:

- [svg-quality-checklist.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/svg-quality-checklist.md)
- [review-taxonomy.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/review-taxonomy.md)

Execution order:

1. deterministic hard-rule validation
2. typed review and refinement

At minimum, the workflow verifies:

- `outline.approved = true`
- one-to-one mapping across `outline`, `slide_spec`, and `page_plan`
- citation visibility where facts are used
- layout consistency and spacing
- overflow and safe-zone issues
- font fallback sanity
- whether the requested delivery mode was actually produced
- whether a `review_report` is needed
