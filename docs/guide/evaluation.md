# 评测

## 维护中的回归来源

- `skills/aippt/evals/evals.json`
- `skills/aippt/evals/trigger-evals.json`
- `skills/aippt/references/eval-prompts.md`

## scaffold，不是主回归

- `skills/aippt/evals/scene-stubs/README.md`
- `skills/aippt/evals/scene-stubs/*.json`

这些 stub 是脚手架，后续应晋升到主回归集。

## 必查项

- generic trigger 不退化
- non-trigger 边界不误触发
- 每个内置 scene 都有正例和近邻负例
- `outline.approved=false` 在 scene 路由下仍被保留
- 下游能体现 scene defaults / preferences / style instruction block

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
