# References and Indexes

AIPPT v3 no longer expects long hand-maintained file inventories across docs.

Canonical maps:

- `skills/aippt/references/resource-registry.md`
- `skills/aippt/references/scenes/scene-catalog.json`

## Where to start

- routing question: read `scene-catalog.json`
- stage resource question: read `resource-registry.md`
- scene defaults: read `scenes/<scene>.json`
- narrow workflow: read `subskills/<scene>/SKILL.md`

## Resource layers

- `references/scenes/*.json`
  scene metadata for routing, required sections, story arc, style bias, density bias, layout tendency, and review bias
- `references/styles/*.yaml`
  visual token presets
- `references/style-dimensions.md`
  style-dimension vocabulary
- `references/style-auto-routing.md`
  preset recommendation heuristics
- `references/layout-gallery.md`
  `layout_hint` archetype vocabulary
- `references/*.md`
  generic staged workflow rules
- `subskills/<scene>/`
  scene-first guidance
