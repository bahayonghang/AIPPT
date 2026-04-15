# AIPPT

## Installation

```bash
npx skills add bahayonghang/AIPPT
```

AIPPT is a Claude Code skill for **brand-new deck projects**. It is contract-first: research, argument, layout, style, and delivery are staged and validated before handoff.

Use it for full new-deck work, including staged checkpoints like `outline_only` and `spec_only` when they belong to a larger deck build.

Do not use AIPPT for:

- casual outline-only brainstorming with no contract path
- critique-only or review-only requests
- single-slide work
- export-only or conversion-only work
- template tweaks
- editing existing `.pptx/.ppt/.key/Google Slides` files

## Current skill surface

AIPPT now routes through two layers:

- `generic AIPPT`: the default staged workflow
- `scene packs`: narrow subskills for recurring deck types
- `golden-path.md`: the shortest default operator path for standard new-deck requests
- `./.aippt/EXTEND.json` and `~/.aippt/EXTEND.json`: project/user defaults for scene, style, delivery mode, language, strict review, and style dimensions
- dual-layer style + layout system: preset/style dimensions plus layout archetype/final geometry
- scriptable delivery surface: prompt bundle, SVG validation, static preview, and scene-pack scaffolding

Built-in scene packs:

- `company-intro`
- `investor-pitch`
- `board-briefing`
- `policy-briefing`
- `teaching-deck`
- `thesis-defense`

The root skill stays the contract layer. It does not become a slide editor runtime.

## Golden path

The shortest default operator path is:

1. route + intake
2. `brand_profile` + `brief_summary`
3. `research_dossier`
4. outline hard stop
5. `slide_spec`
6. `page_plan`
7. `style_profile`
8. delivery + validation

Hard gate: the first outline must keep `approved=false`.

Scene packs only refine defaults; they never bypass gates.

## Output model

Default workspace:

```text
output/
├── briefing/
├── specs/
├── prompts/
├── svg/
├── preview/
└── project.json
```

Delivery modes:

- `outline_only`
- `spec_only`
- `prompt_bundle_only`
- `svg_pages`
- `brand_ready_assets`

## Key commands / script entrypoints

- `cd docs && npm run aippt:list-catalog`
- `cd docs && npm run aippt:init-workspace -- --output-dir ../output --scene-id investor-pitch`
- `node skills/aippt/scripts/read-preferences.mjs`
- `cd docs && npm run aippt:create-scene-pack -- --id customer-story --label "Customer Story" --description "Use first-party case proof and before/after narrative."`
- `cd docs && npm run aippt:build-prompts -- --slide-spec ../output/specs/slide-spec.json --page-plan ../output/specs/page-plan.json --brand-profile ../output/briefing/brand-profile.md --style-profile ../output/specs/style-profile.json --scene-pack investor-pitch --output-dir ../output/prompts`
- `cd docs && npm run aippt:validate-artifacts -- --outline ../output/specs/outline.json --slide-spec ../output/specs/slide-spec.json --page-plan ../output/specs/page-plan.json --style-profile ../output/specs/style-profile.json --delivery-manifest ../output/prompts/delivery-manifest.json --scene-pack investor-pitch`
- `cd docs && npm run aippt:validate-svg -- --input ../output/svg --page-plan ../output/specs/page-plan.json --manifest ../output/prompts/delivery-manifest.json`
- `cd docs && npm run aippt:build-preview -- --svg-dir ../output/svg --output ../output/preview/index.html --manifest ../output/prompts/delivery-manifest.json`

## Canonical maps

Use these as source of truth:

- [`skills/aippt/references/resource-registry.md`](skills/aippt/references/resource-registry.md)
- [`skills/aippt/references/golden-path.md`](skills/aippt/references/golden-path.md)
- [`skills/aippt/references/scenes/scene-catalog.json`](skills/aippt/references/scenes/scene-catalog.json)

## Evaluation

Regression sources:

- `skills/aippt/evals/evals.json`
- `skills/aippt/evals/trigger-evals.json`
- `skills/aippt/references/eval-prompts.md`
- `skills/aippt/evals/scene-stubs/README.md` + generated stubs as scaffold coverage to promote into the main suites

## Docs

- Chinese README: `README_CN.md`
- VitePress docs: `docs/`

```bash
cd docs
npm install
npm run docs:dev
```
