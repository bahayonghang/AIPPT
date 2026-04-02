# AIPPT

## Installation

```bash
npx skills add bahayonghang/AIPPT
```

AIPPT is a Claude Code skill for building a **new deck from scratch** with a contract-first workflow.

It is optimized for:

- research-backed new PPT requests
- argument architecture before layout work
- portable production artifacts
- deterministic validation before delivery

## What changed in v3

AIPPT now has two routing layers:

- `generic AIPPT`: the main staged workflow
- `scene packs`: narrow subskills for recurring deck types

Built-in scene packs:

- `company-intro`
- `investor-pitch`
- `board-briefing`
- `policy-briefing`
- `teaching-deck`
- `thesis-defense`

The root skill remains the strategy and contract layer. It does **not** become a PPTX editor or `deck.json` runtime.

## When to use AIPPT

Use AIPPT when the user wants a new:

- company overview deck
- investor pitch
- board or executive briefing
- policy or market briefing
- teaching deck
- thesis defense deck
- full deck workflow from source material to delivery artifacts

Do not use AIPPT for:

- editing an existing `.pptx/.ppt/.key/Google Slides`
- reviewing a finished deck only
- template-only tweaks
- single-slide requests
- outline-only requests

## Workflow model

AIPPT keeps a strict staged flow:

1. brand intake
2. brief alignment
3. research dossier
4. outline hard stop
5. slide spec
6. page plan
7. style profile + delivery mode
8. delivery execution
9. verification and review

Non-negotiable gate:

- first outline must keep `approved=false`

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

- `prompt_bundle_only`
- `svg_pages`
- `brand_ready_assets`

## Key commands

List scenes, styles, delivery modes, and validators:

```bash
cd docs
npm run aippt:list-catalog
```

Initialize a workspace:

```bash
cd docs
npm run aippt:init-workspace -- --output-dir ../output --scene-id investor-pitch
```

Build prompt bundle:

```bash
cd docs
npm run aippt:build-prompts -- \
  --slide-spec ../output/specs/slide-spec.json \
  --page-plan ../output/specs/page-plan.json \
  --brand-profile ../output/briefing/brand-profile.md \
  --style-profile ../output/specs/style-profile.json \
  --scene-pack investor-pitch \
  --output-dir ../output/prompts
```

Validate contracts:

```bash
cd docs
npm run aippt:validate-artifacts -- \
  --outline ../output/specs/outline.json \
  --slide-spec ../output/specs/slide-spec.json \
  --page-plan ../output/specs/page-plan.json \
  --style-profile ../output/specs/style-profile.json \
  --delivery-manifest ../output/prompts/delivery-manifest.json \
  --scene-pack investor-pitch
```

## Canonical maps

Use these as the source of truth:

- [`skills/aippt/references/resource-registry.md`](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/resource-registry.md)
- [`skills/aippt/references/scenes/scene-catalog.json`](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/scenes/scene-catalog.json)

Avoid duplicating long file inventories elsewhere.

## Evaluation

AIPPT keeps three regression layers:

- `skills/aippt/evals/evals.json`
- `skills/aippt/evals/trigger-evals.json`
- `skills/aippt/references/eval-prompts.md`

These now cover:

- generic new-deck requests
- scene-pack routing
- existing-deck edit boundaries
- near-miss non-trigger cases

## Docs

- Chinese README: `README_CN.md`
- VitePress docs: `docs/`

```bash
cd docs
npm install
npm run docs:dev
```
