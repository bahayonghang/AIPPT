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
3. Boundary correctness: staged stops like `outline_only` / `spec_only` still count as AIPPT when they are part of a new-deck project.
4. Hard gate correctness: the first outline still keeps `approved=false`.
5. Argument contract: outline contains `governing_thought`, `pillar_map`, `argument_claim`, `proof_question`.
6. Production contract: `slide_spec`, `page_plan`, `style_profile`, and `delivery_manifest` are present when appropriate.
7. Scene-aware quality: `required_sections`, `default_story_arc`, `review_bias`, `audience_density_bias`, and `layout_tendency` are reflected downstream when `--scene-pack` is used.
8. Style portability: `style_profile` contains `style_dimensions` and `style_instruction_block`.
9. Layout portability: `layout_hint` / `layout_family` stay aligned with `final_layout`.
10. Staged modes: `outline_only` / `spec_only` stop at the correct stage without bypassing approval.
11. Validation: `validate-artifacts` passes; `validate-svg` passes when SVG output is requested.

For negative cases, verify:

1. Trigger correctness: AIPPT should not trigger.
2. Boundary correctness: lightweight outline-only brainstorming with no contract/artifacts should stay outside AIPPT.
3. Routing quality: request is redirected to edit, review, single-slide, copy, or lightweight outlining workflow.

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

## Additional scene synonym samples

```text
帮我从零做一套 customer-facing company overview / corporate profile deck，给潜在合作伙伴和采购方看，要讲清 who we are、产品能力和客户证明。
```

```text
帮我做一套 fundraising pitch deck 给 VC 看，重点是 market size、traction、team 和 ask。
```

```text
请准备一套新的 executive operating review / board update deck，给董事会和管理层看，要覆盖经营快照、关键风险和决策事项。
```

```text
做一套新的 regulatory change / compliance change deck，给法务和产品团队开会用，要讲 clear effective dates、影响和动作。
```

```text
我要做一套新的 workshop / training deck，用来做两小时入门培训，要有 learning objectives、examples 和 exercises。
```

```text
请帮我从零做一套 dissertation defense / viva slides，给答辩委员会看，要完整覆盖研究问题、方法、结果和贡献。
```

## Generic positive samples

```text
帮我做一套新的 AI 产品战略 deck，从我提供的会议纪要和白皮书出发，完整输出 research、提纲、逐页规划和交付清单。
```

```text
使用我的默认配置做一套新的产品介绍 deck，先停在 outline_only；这仍然是整套新 deck 项目，确认结构后我会继续到 slide spec、page plan 和交付。
```

```text
这是一套全新的产品发布 deck，先只做到 outline_only；如果结构过了，我下一轮再让你继续到 slide spec、page plan 和交付。
```

```text
这套新 deck 已经批准过 outline，请只重建 S03 和 S04 的 prompt bundle，并保留其他页不动。
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

```text
先给我一个十页故事大纲就行，research、style profile、page plan、delivery manifest 都不要，后面我自己做页面。
```

```text
官网和白皮书我都有，但这轮只想要一个口头汇报提纲，不要进入 AIPPT 的合同和交付流程。
```

## Scene near-miss routing samples

```text
我要从零做一套招聘宣讲 slides，讲公司文化、岗位和成长路径，是新 deck，但不是客户介绍。
```

```text
我要做一套新的产品发布 keynote deck，重点是新品亮点、发布时间表和现场演示，不是企业概览或 about us 材料。
```

```text
我要做一套新的产品发布 keynote deck，重点是产品能力和发布节奏，不是融资材料。
```

```text
我要做一套给潜在客户看的 sales pitch deck，重点是产品功能、ROI 和落地方案，不是给投资人融资用的。
```

```text
我要做一套 all-hands update slides，给公司全员同步季度进展和士气，不是董事会材料。
```

```text
我要做一套月度运营复盘 slides，给业务团队内部开会用，不是董事会或管理层决策汇报。
```

```text
我要做一套新的合规培训课件给新员工 onboarding，用来讲规则基础和练习题，不是政策更新汇报。
```

```text
我要做一套新的 research talk slides，在学术会议上讲实验结果和贡献，不是课堂教学。
```

```text
帮我做一套 conference talk slides，基于同一篇论文讲实验结果，但这不是答辩。
```
