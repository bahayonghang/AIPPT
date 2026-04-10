# Workflow

AIPPT v3 uses `scene-first routing + generic staged contract`.

## Routing

1. Check `scene-catalog.json`
2. If a scene matches, read `subskills/<scene>/SKILL.md`
3. Apply scene defaults
4. Resume the generic AIPPT stages

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

Scene-aware additions:

- `required_sections` should be visible in the outline
- `default_story_arc` should appear in the story-role sequence
- `review_bias` should appear in `slide_spec.review_focus`
- `audience_density_bias` / `layout_tendency` should propagate into downstream contracts or manifest metadata
