# Scripts

This page describes the current `skills/aippt/scripts/` behavior (v2).

## 1. `build-prompt-bundle.mjs`

Purpose:

- generate per-slide prompt files from `slide_spec + page_plan + style_profile + brand_profile`
- emit enriched `delivery-manifest.json`
- enforce claim/question/intent consistency across contracts

Example:

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

## 2. `validate-artifacts.mjs`

Purpose:

- validate outline/spec/plan/style/manifest consistency
- validate argument-chain and production-chain alignment
- validate rhythm risks (proof wall, repeated layouts)

Example:

```bash
cd docs
npm run aippt:validate-artifacts -- \
  --outline ../output/specs/outline.json \
  --slide-spec ../output/specs/slide-spec.json \
  --page-plan ../output/specs/page-plan.json \
  --style-profile ../output/specs/style-profile.json \
  --delivery-manifest ../output/prompts/delivery-manifest.json
```

Legacy compatibility:

```bash
cd docs
npm run aippt:validate-artifacts -- \
  --outline ../output/specs/outline.json \
  --slide-spec ../output/specs/slide-spec.json \
  --page-plan ../output/specs/page-plan.json \
  --allow-legacy=true
```

## 3. `validate-svg.mjs`

Purpose:

- validate SVG root/namespace/viewBox
- validate font floors and safe zones
- detect unresolved placeholders (double-curly template markers, `TODO`, `TBD`)
- optional source-ref consistency checks with page plan and manifest

Example:

```bash
cd docs
npm run aippt:validate-svg -- \
  --input ../output/svg \
  --page-plan ../output/specs/page-plan.json \
  --manifest ../output/prompts/delivery-manifest.json
```

## 4. `build-preview.mjs`

Purpose:

- generate static HTML preview from SVG pages

Example:

```bash
cd docs
npm run aippt:build-preview -- \
  --svg-dir ../output/svg \
  --output ../output/preview/index.html \
  --manifest ../output/prompts/delivery-manifest.json \
  --title "AIPPT Preview"
```

## Calling convention

- run from `docs/`
- pass runtime args via `npm run <script> -- <args>`
- if a script fails, first verify input paths, then contract shape/wrapper tags
