# AIPPT Evaluation Prompts

Use this file for human-readable regression review.

Machine-readable sources:

- `evals/evals.json`
- `evals/trigger-evals.json`
- `evals/scene-stubs/*.json`

## Core checklist

For positive cases, verify:

1. Trigger correctness: AIPPT should trigger.
2. Routing correctness: if a built-in scene matches, its subskill should be used before generic AIPPT.
3. Hard gate correctness: the first outline still keeps `approved=false`.
4. Argument contract: outline contains `governing_thought`, `pillar_map`, `argument_claim`, `proof_question`.
5. Production contract: `slide_spec`, `page_plan`, `style_profile`, and `delivery_manifest` are present when appropriate.
6. Scene-aware quality: `required_sections`, `default_story_arc`, and `review_bias` are reflected in downstream artifacts when `--scene-pack` is used.
7. Validation: `validate-artifacts` passes; `validate-svg` passes when SVG output is requested.

For negative cases, verify:

1. Trigger correctness: AIPPT should not trigger.
2. Routing quality: request is redirected to edit, review, single-slide, or copy workflow.

## Positive scene samples

### Company intro

```text
请从零开始做一套企业介绍 deck，给潜在客户看，重点讲公司定位、产品方案、客户证明和部署模式。
```

### Investor pitch

```text
请从零开始做一套 Seed 轮融资路演 deck，产品是 AI 客服 SaaS，要突出市场机会、增长数据、团队和融资诉求。
```

### Board briefing

```text
下周董事会要看一套新的经营汇报，请把增长、利润、风险和下季度决策点整理成完整新 deck。
```

### Policy briefing

```text
做一套新的政策解读演示，主题是 2026 年 AI 合规要求变化，受众是法务和产品团队，要有时间线、风险点和建议动作。
```

### Teaching deck

```text
我要一套 45 分钟的教学课件，主题是 Transformer 基础入门，希望有学习目标、案例、练习和总结。
```

### Thesis defense

```text
请从零开始做一套毕业答辩 PPT，包含研究问题、文献缺口、方法、结果、贡献和未来工作。
```

## Generic positive sample

```text
帮我做一套新的 AI 产品战略 deck，从我提供的会议纪要和白皮书出发，完整输出 research、提纲、逐页规划和交付清单。
```

## Negative samples

```text
我已经有公司介绍 PPTX，只想改第 3 页和第 4 页的排版。
```

```text
帮我点评一下这份现成融资 deck 的逻辑漏洞，不需要重做。
```

```text
我只要一页教学封面，不要整套课件。
```

```text
把这份演讲稿润色成更有感染力的口播稿，不用做 PPT。
```
