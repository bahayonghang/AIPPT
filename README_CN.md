# AIPPT

## 安装

请优先使用以下命令安装：

```bash
npx skills add bahayonghang/AIPPT
```

AIPPT 是一个用于 **从零创建全新演示文稿 / PPT / slide deck** 的 Claude Code Skill，强调研究驱动和中间工件可验证。

它会把主题、brief、官网、白皮书、PDF、笔记或品牌素材，转化为一套完整的 deck 合同，包括：

- brand intake
- brief 对齐
- 证据化研究
- sticky-note 大纲审批
- slide spec
- page plan
- style profile
- delivery manifest

## AIPPT 适合什么

以下场景适合使用 AIPPT：

- 新的企业介绍 deck
- 新的融资路演 deck
- 产品发布会或 keynote deck
- 教学课件
- 年度复盘或董事会汇报
- 政策解读或行业 briefing
- 需要完整 deck 工作流，而不是临时做几页 slides

即使用户只是说“帮我做个 PPT”“把这些材料做成演示”，只要意图是 **新建整套 deck**，而不是编辑现有文件，就应该触发。

## AIPPT 不适合什么

以下情况 **不应该** 使用 AIPPT：

- 修改现有 `.pptx`、`.ppt`、`.key` 或 Google Slides 文件
- 审校、点评或润色已完成的 deck
- 在现有模板里只改几页
- 只润色文案
- 只做一张封面页
- 只要一个轻量大纲，不需要后续完整 deck 规划

## 工作流

AIPPT 采用严格的 8-stage 流程：

1. Stage 0: Brand and asset intake
2. Stage 1: Brief alignment hard stop
3. Stage 2: Research dossier
4. Stage 3: Sticky-note outline hard stop
5. Stage 4: Slide spec
6. Stage 5: Page plan
7. Stage 6: Style profile and delivery mode
8. Stage 7: Delivery execution
9. Stage 8: Verification and review

关键门槛：

- `outline.approved` 在大纲评审前必须保持为 `false`
- `slide_spec` 和 `page_plan` 是两个独立合同，渲染前都必须存在
- SVG 只有通过硬规则校验后，才算可交付

## 工件合同

计划完成态必须有：

- `brand_profile`
- `brief_summary`
- `research_dossier`
- `outline`
- `slide_spec`
- `page_plan`
- `style_profile`

交付完成态还必须有：

- `delivery_manifest`
- `review_report`，当验证或 refinement 发现问题时

## 交付模式

当前支持三种交付模式：

- `prompt_bundle_only`
- `svg_pages`
- `brand_ready_assets`

如果用户没有明确要求，默认保守选择 `prompt_bundle_only`。

## 推荐输出树

当文件系统可用时，AIPPT 应将产物写到：

```text
output/
├── briefing/
├── specs/
├── prompts/
├── svg/
└── preview/
```

模式差异：

- `prompt_bundle_only`：`briefing/`、`specs/`、`prompts/`
- `svg_pages`：在上面基础上增加 `svg/`，可选 `preview/`
- `brand_ready_assets`：至少包含 `prompt_bundle_only` 的产物，并补 handoff guidance，SVG 视需求提供

## References 与资源层

Skill 主定义位于：

- `skills/aippt/SKILL.md`

核心 references 包括：

- `skills/aippt/references/brand-intake.md`
- `skills/aippt/references/research-protocol.md`
- `skills/aippt/references/outline-prompt.md`
- `skills/aippt/references/narrative-rhythm.md`
- `skills/aippt/references/slide-spec-schema.md`
- `skills/aippt/references/resource-menu.md`
- `skills/aippt/references/bento-grid-system.md`
- `skills/aippt/references/page-plan-schema.md`
- `skills/aippt/references/design-prompt.md`
- `skills/aippt/references/review-taxonomy.md`
- `skills/aippt/references/svg-quality-checklist.md`
- `skills/aippt/references/resource-registry.md`

## 脚本

可用辅助脚本：

- `build-prompt-bundle.mjs`
- `validate-artifacts.mjs`
- `validate-svg.mjs`
- `build-preview.mjs`

请在 `docs/` 目录中带参数执行，例如：

```bash
cd docs
npm run aippt:validate-artifacts -- \
  --outline ../output/specs/outline.json \
  --slide-spec ../output/specs/slide-spec.json \
  --page-plan ../output/specs/page-plan.json \
  --style-profile ../output/specs/style-profile.json \
  --delivery-manifest ../output/prompts/delivery-manifest.json
```

## 评估

AIPPT 内置：

- 人工可读 eval 提示集：`skills/aippt/references/eval-prompts.md`
- workflow eval：`skills/aippt/evals/evals.json`
- trigger-boundary eval：`skills/aippt/evals/trigger-evals.json`

覆盖范围包括：

- 新建整套 deck 的正向触发
- 现有 deck 编辑与点评的负向触发
- 只要大纲、只改模板、只做单页等 near-miss 场景

## 文档

- 英文 README：`README.md`
- VitePress 文档：`docs/`

启动文档站：

```bash
cd docs
npm install
npm run docs:dev
```

构建文档：

```bash
cd docs
npm run docs:build
```

## 贡献建议

只要 workflow 有变化，就要同步检查：

- `skills/aippt/SKILL.md`
- `skills/aippt/references/`
- `skills/aippt/scripts/`
- `README.md`
- `README_CN.md`
- `docs/`

请把 `skills/aippt/references/resource-registry.md` 当作当前资源层的唯一映射入口。
