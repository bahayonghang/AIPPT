# Scripts

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
npm run aippt:create-scene-pack -- \
  --id customer-story \
  --label "Customer Story" \
  --description "Use first-party case proof and before/after narrative."
```

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
npm run aippt:validate-artifacts -- \
  --outline ../output/specs/outline.json \
  --slide-spec ../output/specs/slide-spec.json \
  --page-plan ../output/specs/page-plan.json \
  --style-profile ../output/specs/style-profile.json \
  --delivery-manifest ../output/prompts/delivery-manifest.json \
  --scene-pack company-intro
```
