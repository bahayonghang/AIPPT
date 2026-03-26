# 快速开始

## 1. 先判断是否是 AIPPT 场景

AIPPT 只用于**从零创建整套新 deck**。

适合：

- 从主题/资料/官网/品牌包出发，产出完整 deck 合同
- 需要研究、论证结构、页面规划、交付清单一条龙

不适合：

- 修改现有 `.pptx/.ppt/.key/Google Slides`
- 点评已有 deck
- 只做单页
- 只要轻量大纲

## 2. 准备输入材料

建议至少准备：

- topic / project 名称
- audience
- purpose
- desired action
- page budget
- language
- source materials（官网、白皮书、报告、PDF、纪要）
- brand constraints（logo、色彩、字体、禁用元素）

## 3. 了解新版双层合同

你会得到两层产物：

- 论证层：`governing_thought`, `pillar_map`, `argument_claim`, `proof_question`
- 生产层：`slide_spec`, `page_plan`, `style_profile`, `delivery_manifest`

关键 gate：

- 首次 outline 必须 `approved=false`
- 未批准前不得进入渲染交付

## 4. 选择交付模式

默认：`prompt_bundle_only`

可选：

- `svg_pages`
- `brand_ready_assets`

## 5. 推荐输出树

```text
output/
├── briefing/
├── specs/
├── prompts/
├── svg/
└── preview/
```

## 6. 常用脚本

生成 prompt bundle：

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

合同校验：

```bash
cd docs
npm run aippt:validate-artifacts -- \
  --outline ../output/specs/outline.json \
  --slide-spec ../output/specs/slide-spec.json \
  --page-plan ../output/specs/page-plan.json \
  --style-profile ../output/specs/style-profile.json \
  --delivery-manifest ../output/prompts/delivery-manifest.json
```

SVG 校验（可选）：

```bash
cd docs
npm run aippt:validate-svg -- \
  --input ../output/svg \
  --page-plan ../output/specs/page-plan.json \
  --manifest ../output/prompts/delivery-manifest.json
```
