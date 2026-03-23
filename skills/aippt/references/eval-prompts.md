# AIPPT Evaluation Prompts

Use this file to regression-test trigger quality and workflow quality.

## How to score

For each prompt, check:

1. Did `aippt` trigger or stay silent correctly?
2. Did the workflow collect brand + brief context where appropriate?
3. Did it produce source-backed research and keep source IDs visible?
4. Did it generate both `outline` and `slide_spec`?
5. Did it choose a sensible layout family and a correct output mode?

## Positive trigger cases

### Case 01: 企业介绍

**Prompt**

```text
帮我做一套新的企业介绍 PPT，主题是“Dify 企业版介绍”，受众是潜在客户。需要 12 页左右，风格偏商务科技。可以参考官网和最近的产品更新。
```

**Expected**

- `aippt` should trigger
- should collect audience, page budget, brand/source materials
- should research official product material before outlining

### Case 02: 融资路演

**Prompt**

```text
请从零开始做一套 Seed 轮融资路演 deck。产品是 AI 客服 SaaS，我有官网、logo 和一份产品白皮书。目标受众是投资人，想突出市场机会、增长数据和团队能力。
```

**Expected**

- `aippt` should trigger
- should intake logo/brand/white paper
- should create KPI-capable slide specs and research-backed evidence refs

### Case 03: 产品发布会

**Prompt**

```text
帮我做一套新品发布会 slides，主题是“智能随身翻译耳机”。我想要偏 Apple 风格，但要保持自家品牌色。请从主题和官网资料开始规划。
```

**Expected**

- `aippt` should trigger
- should ask for brand constraints instead of blindly copying another company
- should produce cover / feature / proof / CTA structure

### Case 04: 教学课件

**Prompt**

```text
我要一套 45 分钟的教学课件，主题是“Transformer 基础入门”。受众是大三学生，希望讲清概念、流程和案例，风格简洁学术。
```

**Expected**

- `aippt` should trigger
- should align on teaching duration and depth
- should prefer process / timeline / comparison page types

### Case 05: 年度复盘

**Prompt**

```text
请帮我做一套 2025 年度经营复盘 deck，受众是管理层。重点是增长、盈利、团队效率和 2026 年计划，控制在 15 页以内。
```

**Expected**

- `aippt` should trigger
- should ask for or request source materials and KPI definitions
- should produce data-heavy slides with citations

### Case 06: 数据密集型汇报

**Prompt**

```text
把这份市场研究和财务数据整理成一套新的行业汇报 PPT，给董事会看。需要高密度信息，但不能乱，要保留来源。
```

**Expected**

- `aippt` should trigger
- should emphasize source traceability and dense but readable layouts
- should prefer `two-by-two-dashboard`, `mixed-grid`, or `asymmetric-two-column`

### Case 07: 政策解读

**Prompt**

```text
帮我做一套新的政策解读演示，主题是“2026 年 AI 合规要求变化”。受众是企业内部法务和产品团队，需要明确时间线、风险点和行动建议。
```

**Expected**

- `aippt` should trigger
- should prioritize official regulator / policy sources
- should use timeline + risk/action structure

### Case 08: 无网络但有材料

**Prompt**

```text
我没有联网需求，只用我上传的白皮书和会议纪要做一套产品战略 deck。请从这些材料里完成研究、提纲和页面规划。
```

**Expected**

- `aippt` should trigger
- should keep the workflow intact even without web search
- should explicitly state that research is limited to user-provided materials

## Negative trigger cases

### Case 09: 修改现有 PPTX

**Prompt**

```text
帮我改一下这个现有 PPTX 的第 7 页，把排版调得更高级一点，标题短一点，其他内容别动。
```

**Expected**

- `aippt` should **not** trigger
- should route to a PPTX or slide-editing workflow instead

### Case 10: 审校现有 deck

**Prompt**

```text
看看这套现成的路演 deck 有哪些逻辑问题，给我改进建议，不需要重做整套。
```

**Expected**

- `aippt` should **not** trigger
- should route to review / critique flow instead of full deck generation
