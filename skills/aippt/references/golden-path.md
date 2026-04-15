# AIPPT Golden Path

Use this file when the request is a standard **new deck project** and you want the shortest reliable AIPPT path.

This is the default operator path. It keeps the workflow easy to follow without weakening the contract model.

## When to use this path

Use the golden path when:

- the user wants a brand-new deck
- a built-in scene pack either clearly matches or generic AIPPT is enough
- there is no unusual delivery branch that needs a custom workflow

Do not use this as a shortcut around approval gates.

## Step 0 — Route and intake

1. Decide whether the request matches a scene pack.
2. Extract what the user already gave you.
3. Ask only for missing gaps.
4. State the staged path explicitly so the user knows you will stop at outline approval before any downstream production.

Minimum gaps to resolve:

- brand / company / product
- official sources or trusted materials
- audience
- desired audience action
- duration or page budget
- asset status
- delivery stop point

## Step 1 — Brand profile + brief summary

Produce:

- `brand_profile`
- `brief_summary`

Keep them compact and usable. They are staging artifacts, not essays.

## Step 2 — Research dossier

Produce `research_dossier` only from:

- official sources
- user-provided materials
- traceable external evidence

If the environment cannot do live web work, say so explicitly and limit the dossier to available material.

## Step 3 — Ghost-deck outline

Produce `outline` with:

- `governing_thought`
- `pillar_map`
- action-title slides
- `proof_question`
- `evidence_refs`

First pass must stay:

```json
{ "approved": false }
```

## Step 4 — Hard stop

Stop here and ask for approval.

Do not generate:

- `slide_spec`
- `page_plan`
- prompt bundle
- SVG pages
- delivery manifest

until the user explicitly approves the outline.

If the user asked for `outline_only`, this is the clean stopping point. Stop here and do not continue.

## Step 5 — Slide spec

After approval, produce `slide_spec`.

Focus on:

- what each slide must prove
- exhibit intent
- evidence refs
- content budget
- preferred layout candidates

If the user asked for `spec_only`, stop after this step and do not continue into page planning or delivery.

## Step 6 — Page plan

Produce `page_plan` from approved `slide_spec`.

Focus on:

- `layout_hint`
- `final_layout`
- `card_map`
- `proof_trace`
- adjacency / rhythm checks

## Step 7 — Style profile

Produce `style_profile` with:

- style preset or justified custom direction
- `style_dimensions`
- palette roles
- typography roles
- `style_instruction_block`

## Step 8 — Delivery

Use the requested stopping point:

- `prompt_bundle_only`
- `svg_pages`
- `brand_ready_assets`

At this stage, only production-facing delivery modes remain. Earlier staged stops should already have exited cleanly.

## Step 9 — Validation

Before claiming success, run the relevant validators:

- `validate-artifacts.mjs`
- `validate-svg.mjs` when SVG output exists

## Boundary rule

This path is for **new deck projects**.

If the user only wants a casual outline, a single slide, an edit to an existing deck, or critique-only work, route away from AIPPT.
