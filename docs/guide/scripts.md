# 脚本

本页说明 `skills/aippt/scripts/` 的当前脚本能力（v2）。

## 1. `build-prompt-bundle.mjs`

用途：

- 基于 `slide_spec + page_plan + style_profile + brand_profile` 生成逐页 prompt
- 生成增强版 `delivery-manifest.json`
- 严格检查 claim/question/intent 一致性

示例：

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

用途：

- 校验 outline/spec/plan/style/manifest 一致性
- 校验 argument chain 与 production chain
- 校验节奏风险（layout 三连、proof-wall）

示例：

```bash
cd docs
npm run aippt:validate-artifacts -- \
  --outline ../output/specs/outline.json \
  --slide-spec ../output/specs/slide-spec.json \
  --page-plan ../output/specs/page-plan.json \
  --style-profile ../output/specs/style-profile.json \
  --delivery-manifest ../output/prompts/delivery-manifest.json
```

兼容旧合同：

```bash
cd docs
npm run aippt:validate-artifacts -- \
  --outline ../output/specs/outline.json \
  --slide-spec ../output/specs/slide-spec.json \
  --page-plan ../output/specs/page-plan.json \
  --allow-legacy=true
```

## 3. `validate-svg.mjs`

用途：

- 校验 SVG root/namespace/viewBox
- 校验字号下限与 safe-zone
- 检查未解析占位符（double-curly 模板标记 / `TODO` / `TBD`）
- 可选按 page_plan/manifest 校验 source refs 一致性

示例：

```bash
cd docs
npm run aippt:validate-svg -- \
  --input ../output/svg \
  --page-plan ../output/specs/page-plan.json \
  --manifest ../output/prompts/delivery-manifest.json
```

## 4. `build-preview.mjs`

用途：

- 从 SVG 页面生成静态预览 HTML

示例：

```bash
cd docs
npm run aippt:build-preview -- \
  --svg-dir ../output/svg \
  --output ../output/preview/index.html \
  --manifest ../output/prompts/delivery-manifest.json \
  --title "AIPPT Preview"
```

## 调用约定

- 先 `cd docs`
- 使用 `npm run <script> -- <args>`
- 失败时优先检查输入文件存在性与 wrapper tags / JSON 结构
