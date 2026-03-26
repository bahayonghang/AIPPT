# 评估、脚本与回归测试

AIPPT 的评估分三层：

- 人工提示集：`skills/aippt/references/eval-prompts.md`
- workflow 回归：`skills/aippt/evals/evals.json`
- trigger 边界回归：`skills/aippt/evals/trigger-evals.json`

## 新版评估重点（v2）

除了触发正确性，必须验证“双层合同完整性”：

1. outline 是否含 `governing_thought/pillar_map/transition_map`
2. `slides[].argument_claim` 与 `slides[].proof_question` 是否完整
3. slide_spec 是否含 `exhibit_intent/evidence_layer/fit_risk`
4. page_plan 是否含 `proof_trace/exhibit_blueprint/rhythm_slot`
5. claim-question-intent 是否跨合同一致
6. citation/source refs 是否可追溯

## 用例类型

### 正向

应触发 AIPPT 的典型场景：

- 新建企业介绍
- 融资路演
- 董事会高密度汇报
- 政策解读
- 教学课件
- 仅离线材料但需要整套新 deck

### 负向 / near-miss

不应触发 AIPPT 的场景：

- 改现有 PPTX 某几页
- 点评现有 deck
- 仅要大纲
- 只做封面或单页视觉
- 只润色文案

## 脚本层回归

建议每次都跑：

```bash
cd docs
npm run aippt:validate-artifacts -- \
  --outline ../output/specs/outline.json \
  --slide-spec ../output/specs/slide-spec.json \
  --page-plan ../output/specs/page-plan.json \
  --style-profile ../output/specs/style-profile.json \
  --delivery-manifest ../output/prompts/delivery-manifest.json
```

如需兼容旧合同：

```bash
cd docs
npm run aippt:validate-artifacts -- \
  --outline ../output/specs/outline.json \
  --slide-spec ../output/specs/slide-spec.json \
  --page-plan ../output/specs/page-plan.json \
  --allow-legacy=true
```

SVG 回归：

```bash
cd docs
npm run aippt:validate-svg -- \
  --input ../output/svg \
  --page-plan ../output/specs/page-plan.json \
  --manifest ../output/prompts/delivery-manifest.json
```

## 成功标准

- 新建整套 deck 请求稳定触发
- 编辑/点评/单页/大纲-only 请求稳定不触发
- `validate-artifacts` 通过且无 blocking error
- `svg_pages` 模式下 `validate-svg` 通过
- `delivery_manifest` 与实际产物一致
