# 脚本

覆盖 `docs/package.json` 的所有脚本，以及 `read-preferences.mjs`。

## Catalog / Setup

查看场景、style、交付模式、validator：

```bash
cd docs
npm run aippt:list-catalog
```

初始化 workspace：

```bash
cd docs
npm run aippt:init-workspace -- --output-dir ../output --scene-id company-intro
```

读取默认配置：

```bash
cd docs
node ../skills/aippt/scripts/read-preferences.mjs
```

创建新的 scene pack 脚手架：

```bash
cd docs
npm run aippt:create-scene-pack -- \
  --id customer-story \
  --label "Customer Story" \
  --description "Use first-party case proof and before/after narrative."
```

`create-scene-pack` 会同时脚手架 scene JSON、subskill、outline starter 和 eval stub。

## Production

生成 prompt bundle：

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

局部重建指定 slide_id：

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

`build-prompt-bundle.mjs` 支持 `--slides`。如果是 scene-aware 流程，支持的地方尽量传 `--scene-pack`。

合同校验：

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

SVG 校验：

```bash
cd docs
npm run aippt:validate-svg -- \
  --input ../output/svg \
  --page-plan ../output/specs/page-plan.json \
  --manifest ../output/prompts/delivery-manifest.json
```

preview + SVG 的推荐顺序是先 `validate-svg`，再 `build-preview`。

预览生成：

```bash
cd docs
npm run aippt:build-preview -- \
  --svg-dir ../output/svg \
  --output ../output/preview/index.html \
  --manifest ../output/prompts/delivery-manifest.json
```

## 原则

- scene-aware 工作流优先给 `build-prompt-bundle` 和 `validate-artifacts` 传 `--scene-pack`
- workspace 元数据写在 `output/project.json`
- 失败时优先检查 `resource-registry.md` 和 `scene-catalog.json`
