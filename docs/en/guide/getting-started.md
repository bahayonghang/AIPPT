# Getting Started

## 1. Confirm this is an AIPPT request

AIPPT is for **building a full new deck from scratch**.

Good fit:

- full new-deck workflow from topic/materials/brand inputs
- requires research, argument structure, page planning, and delivery contracts

Not a fit:

- editing existing deck files
- critique-only requests
- single-slide requests
- outline-only requests

## 2. Prepare inputs

Recommended:

- topic/project
- audience
- purpose
- desired action
- page budget
- language
- source materials (websites, reports, PDFs, notes)
- brand constraints (logo, color, typography, forbidden elements)

## 3. Understand dual contracts

AIPPT outputs two layers:

- argument layer: governing thought, pillars, claims, proof questions
- production layer: slide spec, page plan, style profile, delivery manifest

Critical gate:

- first outline must be `approved=false`
- no rendering before explicit approval

## 4. Choose delivery mode

Default is `prompt_bundle_only`.

Optional:

- `svg_pages`
- `brand_ready_assets`

## 5. Preferred output tree

```text
output/
├── briefing/
├── specs/
├── prompts/
├── svg/
└── preview/
```

## 6. Common scripts

Build prompt bundle:

```bash
cd docs
npm run aippt:build-prompts -- \
  --slide-spec ../output/specs/slide-spec.json \
  --page-plan ../output/specs/page-plan.json \
  --brand-profile ../output/briefing/brand-profile.md \
  --style-profile ../output/specs/style-profile.json \
  --output-dir ../output/prompts \
  --delivery-mode prompt_bundle_only
```

Validate contracts:

```bash
cd docs
npm run aippt:validate-artifacts -- \
  --outline ../output/specs/outline.json \
  --slide-spec ../output/specs/slide-spec.json \
  --page-plan ../output/specs/page-plan.json \
  --style-profile ../output/specs/style-profile.json \
  --delivery-manifest ../output/prompts/delivery-manifest.json
```

Validate SVG (optional):

```bash
cd docs
npm run aippt:validate-svg -- \
  --input ../output/svg \
  --page-plan ../output/specs/page-plan.json \
  --manifest ../output/prompts/delivery-manifest.json
```
