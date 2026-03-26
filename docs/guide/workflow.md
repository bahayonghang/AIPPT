# 工作流

本页对应当前 `skills/aippt/SKILL.md` 的执行规范。  
新版 AIPPT 采用“双层合同”：

- 论证合同（argument contract）：结论、支柱、证明问题、证据链
- 生产合同（production contract）：逐页规格、版面规划、样式词汇、交付清单

## 总览

核心原则：

- Argument first, visuals second
- Evidence or no claim
- Outline before production
- Explicit layout contracts over implicit style guesses
- Verification before readiness

阶段序列：

1. Stage 0: Brand and asset intake
2. Stage 1: Brief alignment hard stop
3. Stage 2: Research dossier
4. Stage 3: Argument architecture + outline hard stop
5. Stage 4: Slide spec (WHAT to prove)
6. Stage 5: Page plan (HOW to present)
7. Stage 6: Style profile and delivery mode
8. Stage 7: Delivery execution
9. Stage 8: Verification and review

## Stage 0：品牌与素材 intake

参考：

- `skills/aippt/references/brand-intake.md`
- `skills/aippt/references/style-vocabulary.md`

目标：

- 锁定官方来源、品牌约束、禁用元素、推断边界
- 产出可下游复用的视觉词汇线索（不是最终视觉稿）

出口工件：`brand_profile`

## Stage 1：Brief 对齐 Hard Stop

必须锁定：

- audience
- purpose
- desired action
- presenter/use context
- time budget / reading mode
- page budget
- language
- must-have sections
- success criteria

出口工件：`brief_summary`

## Stage 2：研究 dossier

参考：

- `skills/aippt/references/research-protocol.md`

目标：

- 形成 3-6 个 research themes
- 建立稳定 source IDs（`R1`, `R2`, ...）
- 按章节准备 evidence packets

硬规则：

- 搜索是 discovery，不等于 proof
- 时间敏感事实必须带日期
- 未入 source registry 的事实不能进入后续合同

出口工件：`research_dossier`

## Stage 3：论证架构 + Outline Hard Stop

参考：

- `skills/aippt/references/argument-architecture.md`
- `skills/aippt/references/ghost-deck-playbook.md`
- `skills/aippt/references/outline-prompt.md`
- `skills/aippt/references/narrative-rhythm.md`

目标：

- 先形成可辩护的 deck 论证链，再进入页面规划

`outline` 关键字段：

- `governing_thought`
- `engagement_archetype`
- `pillar_map[]`
- `transition_map[]`
- `quality_gates`
- `slides[].argument_claim`
- `slides[].proof_question`

Hard stop：

- 首次产出必须 `outline.approved = false`
- 未批准前，禁止进入 `slide_spec` / `page_plan` / prompt bundle / SVG

质量闸门：

- helicopter test
- dead-slide test
- rising-stakes test

## Stage 4：Slide Spec（WHAT）

参考：

- `skills/aippt/references/slide-spec-schema.md`
- `skills/aippt/references/exhibit-intent-taxonomy.md`
- `skills/aippt/references/resource-menu.md`

目标：

- 给每页定义“要证明什么”，并锁定证据与展示意图

新增关键字段：

- `argument_claim`
- `proof_question`
- `exhibit_intent`
- `evidence_layer`
- `data_requirements[]`
- `fit_risk`

## Stage 5：Page Plan（HOW）

参考：

- `skills/aippt/references/page-plan-schema.md`
- `skills/aippt/references/bento-grid-system.md`
- `skills/aippt/references/resource-menu.md`

目标：

- 把 Stage 4 的证明合同落成可执行版面合同

新增关键字段：

- `proof_trace`
- `exhibit_blueprint`
- `rhythm_slot`
- `adjacency_check`
- `overflow_decision`

规则：

- 仅使用 canonical layouts
- `proof_trace` 必须对齐 `slide_spec` 的 claim/question
- 出现密度风险时优先拆页，不用缩字硬撑

## Stage 6：Style Profile 与交付模式

参考：

- `skills/aippt/references/styles/index.json`
- `skills/aippt/references/styles/*.yaml`
- `skills/aippt/references/style-vocabulary.md`
- `skills/aippt/references/resource-registry.md`

`style_profile` 必须包含：

- `style_direction`
- `palette_roles`
- `typography_roles`
- `brand_override_rules`

交付模式：

- `prompt_bundle_only`（默认）
- `svg_pages`
- `brand_ready_assets`

## Stage 7：交付执行

参考：

- `skills/aippt/references/design-prompt.md`
- `skills/aippt/references/resource-registry.md`

脚本：

- `build-prompt-bundle.mjs`
- `validate-artifacts.mjs`
- `validate-svg.mjs`
- `build-preview.mjs`

要求：

- 每页 prompt 自包含
- 引用可见
- 缺失资产只能显式占位，不能杜撰
- `delivery_manifest` 必须与实际产物一致

## Stage 8：验证与 Review

参考：

- `skills/aippt/references/review-taxonomy.md`
- `skills/aippt/references/svg-quality-checklist.md`
- `skills/aippt/references/narrative-rhythm.md`

顺序：

1. deterministic validation
2. typed refinement

至少验证：

- `outline.approved = true`
- outline/spec/plan 一一映射
- claim-question-intent 三链一致
- 节奏与布局重复风险受控
- SVG 通过 root/viewBox/safe-zone/placeholder/font-floor 检查
