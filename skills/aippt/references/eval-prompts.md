# AIPPT Evaluation Prompts

Use this file for human-readable regression review.

Machine-readable sets:

- `evals/evals.json`
- `evals/trigger-evals.json`

## Scoring checklist (v2)

For each positive case, check:

1. Trigger correctness: AIPPT should trigger.
2. Argument contract: outline includes `governing_thought`, `pillar_map`, `transition_map`, `argument_claim`, `proof_question`.
3. Production contract: `slide_spec` includes `exhibit_intent`, `evidence_layer`, `fit_risk`; `page_plan` includes `proof_trace`, `exhibit_blueprint`, `rhythm_slot`.
4. Evidence traceability: source refs remain consistent across research -> outline -> slide spec -> page plan.
5. Rhythm quality: no 3 consecutive proof-wall slides and no 3 identical adjacent layouts.
6. Validator status: `validate-artifacts` passes; if SVG mode is requested, `validate-svg` passes.

For each negative case, check:

1. Trigger correctness: AIPPT should not trigger.
2. Routing quality: request is redirected to suitable edit/review/single-slide/copy flow.

## Positive samples

### New company deck

```text
帮我做一套新的企业介绍 PPT，主题是“Dify 企业版介绍”，受众是潜在客户。需要 12 页左右，风格偏商务科技。可以参考官网和最近的产品更新。
```

### Investor pitch from scratch

```text
请从零开始做一套 Seed 轮融资路演 deck。产品是 AI 客服 SaaS，我有官网、logo 和一份产品白皮书。目标受众是投资人，想突出市场机会、增长数据和团队能力。
```

### Board evidence-heavy pack

```text
把这份市场研究和财务数据整理成一套新的行业汇报 PPT，给董事会看。需要高密度信息，但不能乱，要保留来源。
```

### Offline source pack workflow

```text
我没有联网需求，只用我上传的白皮书和会议纪要做一套产品战略 deck。请从这些材料里完成研究、提纲和页面规划。
```

## Negative samples

### Existing PPTX edit

```text
帮我改一下这个现有 PPTX 的第 7 页，把排版调得更高级一点，标题短一点，其他内容别动。
```

### Existing deck critique

```text
看看这套现成的路演 deck 有哪些逻辑问题，给我改进建议，不需要重做整套。
```

### Outline only

```text
你先给我一个 10 页左右的 PPT 大纲就行，后面的页面结构和设计我自己做，不需要整套流程。
```

### Single-page request

```text
帮我做一个 keynote 风格的封面页，主题是“AI 助手时代”，不要整套 deck，就一页。
```
