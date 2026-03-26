# Workflow

This page documents the current AIPPT flow from `skills/aippt/SKILL.md`.

AIPPT now uses a dual-contract model:

- argument contract (what must be true)
- production contract (how each page realizes that argument)

## Overview

Core rules:

- Argument first, visuals second
- Evidence-backed claims only
- Outline before production
- Explicit page contracts over implicit layout guesses
- Validation before readiness

Stage sequence:

1. Stage 0: Brand and asset intake
2. Stage 1: Brief alignment hard stop
3. Stage 2: Research dossier
4. Stage 3: Argument architecture + outline hard stop
5. Stage 4: Slide spec (WHAT to prove)
6. Stage 5: Page plan (HOW to present)
7. Stage 6: Style profile and delivery mode
8. Stage 7: Delivery execution
9. Stage 8: Verification and review

## Stage 0: Brand and asset intake

References:

- `skills/aippt/references/brand-intake.md`
- `skills/aippt/references/style-vocabulary.md`

Output: `brand_profile`

## Stage 1: Brief alignment hard stop

Lock audience, purpose, desired action, context, page/time budget, language, and success criteria.

Output: `brief_summary`

## Stage 2: Research dossier

Reference:

- `skills/aippt/references/research-protocol.md`

Output: `research_dossier` with source IDs (`R1`, `R2`, ...), dated facts, and section packets.

## Stage 3: Argument architecture + outline hard stop

References:

- `skills/aippt/references/argument-architecture.md`
- `skills/aippt/references/ghost-deck-playbook.md`
- `skills/aippt/references/outline-prompt.md`
- `skills/aippt/references/narrative-rhythm.md`

`outline` must include:

- `governing_thought`
- `engagement_archetype`
- `pillar_map`
- `transition_map`
- `quality_gates`
- per-slide `argument_claim` and `proof_question`

Hard stop:

- first outline must keep `approved=false`
- no spec/plan/rendering before explicit outline approval

## Stage 4: Slide spec (WHAT)

References:

- `skills/aippt/references/slide-spec-schema.md`
- `skills/aippt/references/exhibit-intent-taxonomy.md`
- `skills/aippt/references/resource-menu.md`

Key required fields:

- `argument_claim`
- `proof_question`
- `exhibit_intent`
- `evidence_layer`
- `data_requirements`
- `fit_risk`

## Stage 5: Page plan (HOW)

References:

- `skills/aippt/references/page-plan-schema.md`
- `skills/aippt/references/bento-grid-system.md`
- `skills/aippt/references/resource-menu.md`

Key required fields:

- `proof_trace`
- `exhibit_blueprint`
- `rhythm_slot`
- `adjacency_check`
- `overflow_decision`

## Stage 6: Style profile and delivery mode

References:

- `skills/aippt/references/styles/index.json`
- one selected `styles/*.yaml`
- `skills/aippt/references/style-vocabulary.md`
- `skills/aippt/references/resource-registry.md`

`style_profile` must include:

- `style_direction`
- `palette_roles`
- `typography_roles`
- `brand_override_rules`

Default mode remains `prompt_bundle_only`.

## Stage 7: Delivery execution

References:

- `skills/aippt/references/design-prompt.md`
- `skills/aippt/references/resource-registry.md`

Scripts:

- `build-prompt-bundle.mjs`
- `validate-artifacts.mjs`
- `validate-svg.mjs`
- `build-preview.mjs`

## Stage 8: Verification and review

References:

- `skills/aippt/references/review-taxonomy.md`
- `skills/aippt/references/svg-quality-checklist.md`
- `skills/aippt/references/narrative-rhythm.md`

Validation order:

1. deterministic checks
2. typed refinement

Minimum checks:

- `outline.approved = true`
- one-to-one mapping across outline/spec/plan
- argument consistency (`claim -> question -> intent -> proof_trace`)
- rhythm safety (no proof wall / no 3-layout run)
- SVG hard-rule compliance where applicable
