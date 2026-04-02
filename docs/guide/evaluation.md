# 评测

AIPPT v3 的评测分四层：

1. generic workflow 回归
2. trigger boundary 回归
3. scene-pack 路由回归
4. scene-aware validator 回归

## 机器可读文件

- `skills/aippt/evals/evals.json`
- `skills/aippt/evals/trigger-evals.json`
- `skills/aippt/evals/scene-stubs/*.json`

## 人工评测提示

- `skills/aippt/references/eval-prompts.md`

## 必查项

- generic 新 deck 场景不退化
- 现有 deck 编辑 / review / 单页 / outline-only 仍不触发
- 每个内置 scene pack 至少有 1 正例 + 1 近邻反例
- `outline.approved=false` 在 scene pack 下也不能被绕过
- `validate-artifacts --scene-pack` 能检查 sections / story arc / review bias

## 建议流程

先看场景：

```bash
cd docs
npm run aippt:list-catalog
```

再跑 validator：

```bash
cd docs
npm run aippt:validate-artifacts -- \
  --outline ../output/specs/outline.json \
  --slide-spec ../output/specs/slide-spec.json \
  --page-plan ../output/specs/page-plan.json \
  --style-profile ../output/specs/style-profile.json \
  --delivery-manifest ../output/prompts/delivery-manifest.json \
  --scene-pack investor-pitch
```
