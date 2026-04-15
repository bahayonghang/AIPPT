# Getting Started

## 1. Route before intake

Check the catalog first:

```bash
cd docs
npm run aippt:list-catalog
```

Use a scene pack when the request clearly matches a recurring deck type such as:

- company intro
- investor pitch
- board briefing
- policy briefing
- teaching deck
- thesis defense

## 2. Initialize the workspace

```bash
cd docs
npm run aippt:init-workspace -- --output-dir ../output --scene-id investor-pitch
```

If you use defaults, prepare one of:

- `./.aippt/EXTEND.json`
- `~/.aippt/EXTEND.json`

Supported defaults include scene, style preset, delivery mode, language, strict review, and style dimensions.

## 3. Run the staged workflow

The standard path is:

`route + intake -> brand_profile + brief_summary -> research_dossier -> outline hard stop -> slide_spec -> page_plan -> style_profile -> delivery + validation`

Rules:

- the first outline must keep `approved=false`
- `outline_only` stops at outline
- `spec_only` stops at `slide_spec` and does not continue into `page_plan`
- scene packs only refine defaults; they never bypass hard gates

## 4. Build and validate

Build first, then validate.

If you are using a scene-aware workflow, pass `--scene-pack` to the relevant scripts.

If you want to stop at a stage boundary, use staged modes:

- `outline_only`
- `spec_only`

These modes do not bypass approvals and do not generate prompt bundles early.

## 5. Partial regeneration

If AIPPT-generated artifacts are already approved and have explicit `slide_id`s, you can regenerate only selected slides; rerun the matching validators afterward.
