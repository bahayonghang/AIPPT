# 参考文件与资源层

AIPPT 的当前行为由 [SKILL.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/SKILL.md)、`references/`、`styles/`、`scripts/`、`assets/` 与 `evals/` 共同定义。

## 核心定义

### `skills/aippt/SKILL.md`

主文件定义：

- 适用范围与非目标场景
- staged workflow
- artifact contract
- output modes
- Office 兼容性说明
- review / verification 规则
- regression testing 入口

## References

### `references/brand-intake.md`

Stage 0 使用。定义品牌与素材收集清单、品牌信号优先级、提问方式，以及 `brand_profile` 模板。

### `references/research-protocol.md`

Stage 2 使用。定义来源优先级、source entry 模板、research dossier 结构，以及 anti-fabrication 规则。

### `references/cognitive-design-principles.md`

Stage 3 与 Stage 8 使用。定义认知负载、3-second test、层级控制与 `story_role` 对密度的约束。

### `references/outline-prompt.md`

Stage 3 使用。定义 `outline` 的生成模板、sticky-note 预览要求，以及 `approved` hard-stop gate。

### `references/slide-spec-schema.md`

Stage 4 使用。定义 `slide_spec` 字段结构、预算规则、`story_role` 与 `review_focus`。

### `references/bento-grid-system.md`

Stage 5 使用。定义标准布局名称、坐标、尺寸、间距、特殊页面原型与反模式。

### `references/page-plan-schema.md`

Stage 5 使用。定义 `page_plan` 的结构，包括 `final_layout`、`card_map`、`citations_placement`、`overflow_strategy` 等。

### `references/design-prompt.md`

Stage 7 使用。把 `slide_spec + page_plan + style_profile` 转换为 render-ready SVG prompt，并约束字体、安全区、引用、占位与 review-driven fixes。

### `references/review-taxonomy.md`

Stage 8 使用。定义可移植的 typed review 体系：

- `attribute_change`
- `layout_restructure`
- `full_rethink`
- `content_reduction`
- `deck_coordination`

### `references/svg-quality-checklist.md`

Stage 8 使用。定义两层校验：

- hard-rule validation
- typed review and refinement

### `references/eval-prompts.md`

人工可读的回归测试集合，用来验证：

- 新建 deck 请求是否正确触发
- 现有 deck 编辑请求是否被正确排除
- 工作流是否仍能稳定产出 source-backed 工件

## Style Registry

### `references/styles/index.json`

style preset 注册表，当前包含：

- `business`
- `tech`
- `minimal`
- `scientific`
- `editorial-infographic`
- `creative`

### `references/styles/*.yaml`

每个 preset 定义：

- palette
- typography
- card style
- chart colors
- layout bias
- slide-type overrides

## Scripts

### `scripts/build-prompt-bundle.mjs`

把 `slide_spec + page_plan + style_profile + brand_profile` 组装成逐页 prompt bundle。

### `scripts/validate-artifacts.mjs`

校验 `outline`、`slide_spec`、`page_plan`、`delivery_manifest` 的一一映射和字段合法性。

### `scripts/validate-svg.mjs`

校验 SVG 的 viewBox、字号、安全区与 citation footer 等硬规则。

### `scripts/build-preview.mjs`

基于 SVG 目录和预览模板生成静态 `index.html`。

## Assets

### `assets/preview-template.html`

静态预览模板，供 `build-preview.mjs` 使用。

## Evals

### `evals/evals.json`

机器可读的 workflow eval 集，覆盖正向与负向用例。

### `evals/trigger-evals.json`

机器可读的 trigger eval 集，用于后续 description optimization。

## 建议的维护方式

如果更新了 Skill 流程，建议同步检查以下内容是否一致：

- `SKILL.md` 中的阶段定义与 artifact contract
- references 中的模板与 schema
- styles registry 与 preset 文件
- scripts 的输入输出契约
- `docs/` 站点中的说明与导航
