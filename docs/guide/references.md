# 参考文件与资源层

AIPPT 的行为由 `skills/aippt/SKILL.md` + `references/` + `scripts/` + `evals/` 共同定义。  
资源总入口是：`skills/aippt/references/resource-registry.md`。

## 主入口

### `skills/aippt/SKILL.md`

定义：

- 触发边界与非目标场景
- 0-8 阶段流程
- 双层合同（argument + production）
- 输出模式与验证要求

## 核心 references（按阶段）

### Stage 0 / 6

- `brand-intake.md`：品牌采集与推断边界
- `style-vocabulary.md`：`style_direction`、`palette_roles`、`typography_roles`、`brand_override_rules`

### Stage 2

- `research-protocol.md`：来源优先级、dossier 结构、anti-fabrication

### Stage 3

- `argument-architecture.md`：governing thought、pillar、proof chain
- `ghost-deck-playbook.md`：archetype、transition、quality gates
- `outline-prompt.md`：outline 结构与 hard stop
- `narrative-rhythm.md`：节奏与重复控制
- `cognitive-design-principles.md`：可读性与认知负载

### Stage 4

- `slide-spec-schema.md`：逐页 WHAT 合同
- `exhibit-intent-taxonomy.md`：proof question 到展示意图映射
- `resource-menu.md`：快速决策菜单

### Stage 5

- `bento-grid-system.md`：canonical 布局坐标
- `page-plan-schema.md`：逐页 HOW 合同
- `resource-menu.md`：节奏/密度/布局防退化菜单

### Stage 7

- `design-prompt.md`：渲染 prompt 模板（严格消费合同字段）

### Stage 8

- `review-taxonomy.md`：typed issue 分类（新增 `argument_consistency`）
- `svg-quality-checklist.md`：SVG 硬规则
- `narrative-rhythm.md`：deck 级节奏复核

## Style 资源

### `references/styles/index.json`

风格注册表（`business`, `tech`, `minimal`, `scientific`, `editorial-infographic`, `creative`）。

### `references/styles/*.yaml`

每个 preset 定义配色、字体、卡片风格、图表色和布局偏置。  
最终输出时要映射为 `style_profile` token，而不只是 preset 名字。

## Scripts

- `build-prompt-bundle.mjs`
  - 逐页生成 prompt 文件
  - 严格校验 `slide_spec` 与 `page_plan` 的 claim/question/intent 一致性
  - 输出增强版 `delivery_manifest`
- `validate-artifacts.mjs`
  - 校验 argument + production 合同一致性
  - 校验节奏风险（proof-wall / layout 三连）
  - 支持兼容模式：`--allow-legacy=true`
- `validate-svg.mjs`
  - 校验 SVG 硬规则
  - 可选 `--page-plan` / `--manifest` 做 source refs 一致性检查
- `build-preview.mjs`
  - 基于 SVG 生成静态 preview

## Evals

- `evals/evals.json`：workflow + 合同质量回归
- `evals/trigger-evals.json`：触发边界与 near-miss 回归
- `references/eval-prompts.md`：人工可读评测集

## 维护建议

流程升级时优先更新顺序：

1. `resource-registry.md`
2. `SKILL.md`
3. schema references（outline/spec/plan/design）
4. scripts
5. evals
6. docs 页面
