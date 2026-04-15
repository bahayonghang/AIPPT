# Workflow

AIPPT uses `scene-first routing + golden path + staged contract`.

## Routing + intake

1. Check `scene-catalog.json`
2. If a scene matches, read `subskills/<scene>/SKILL.md`
3. Apply scene defaults only
4. Resume the generic AIPPT stages

Golden path: `route + intake -> brand_profile + brief_summary -> research_dossier -> outline hard stop -> slide_spec -> page_plan -> style_profile -> delivery + validation`

Scene packs never bypass the hard gates.

## Argument contract

Still required:

- `governing_thought`
- `pillar_map`
- `transition_map`
- `argument_claim`
- `proof_question`

Hard stop:

- first outline keeps `approved=false`
- `outline_only` stops at outline

## Production contract

Still required:

- `slide_spec`
- `page_plan`
- `style_profile`
- `delivery_manifest`

New style/layout expectations:

- `style_profile` should include `style_dimensions`
- `style_profile` should include `style_instruction_block`
- `slide_spec` / `page_plan` may declare `layout_hint` / `layout_family`
- `page_plan.final_layout` remains the canonical geometry target
- `spec_only` stops at `slide_spec` and does not continue into `page_plan`

## Validation

`validate-artifacts` checks contract consistency; with `--scene-pack`, it also checks that scene defaults flow downstream.

## Delivery

Scene-aware additions should flow downstream, but only as defaults and review signals.

Partial regeneration rule: if generated artifacts are already approved and have explicit `slide_id`s, only those slides may be rebuilt, and the matching validators must run again.
