# Scripts

This page covers every script in `docs/package.json`, plus `read-preferences.mjs`.

## Catalog and setup

```bash
cd docs
npm run aippt:list-catalog
```

```bash
cd docs
npm run aippt:init-workspace -- --output-dir ../output --scene-id company-intro
```

```bash
cd docs
node ../skills/aippt/scripts/read-preferences.mjs
```

```bash
cd docs
npm run aippt:create-scene-pack -- \
  --id customer-story \
  --label "Customer Story" \
  --description "Use first-party case proof and before/after narrative."
```

`create-scene-pack` scaffolds the scene JSON, subskill, outline starter, and eval stub.

## Production and validation

```bash
cd docs
npm run aippt:build-prompts -- \
  --slide-spec ../output/specs/slide-spec.json \
  --page-plan ../output/specs/page-plan.json \
  --brand-profile ../output/briefing/brand-profile.md \
  --style-profile ../output/specs/style-profile.json \
  --scene-pack company-intro \
  --output-dir ../output/prompts
```

```bash
cd docs
npm run aippt:build-prompts -- \
  --slide-spec ../output/specs/slide-spec.json \
  --page-plan ../output/specs/page-plan.json \
  --brand-profile ../output/briefing/brand-profile.md \
  --style-profile ../output/specs/style-profile.json \
  --output-dir ../output/prompts \
  --slides S03,S04
```

`build-prompt-bundle.mjs` supports `--slides`. If a flow is scene-aware, pass `--scene-pack` where supported.

```bash
cd docs
npm run aippt:validate-artifacts -- \
  --outline ../output/specs/outline.json \
  --slide-spec ../output/specs/slide-spec.json \
  --page-plan ../output/specs/page-plan.json \
  --style-profile ../output/specs/style-profile.json \
  --delivery-manifest ../output/prompts/delivery-manifest.json \
  --scene-pack company-intro
```

```bash
cd docs
npm run aippt:validate-svg -- \
  --input ../output/svg \
  --page-plan ../output/specs/page-plan.json \
  --manifest ../output/prompts/delivery-manifest.json
```

Run `validate-svg` before `build-preview` when SVG output exists.

```bash
cd docs
npm run aippt:build-preview -- \
  --svg-dir ../output/svg \
  --output ../output/preview/index.html \
  --manifest ../output/prompts/delivery-manifest.json
```
