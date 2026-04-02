# 参考层与索引

AIPPT v3 不再鼓励在多处手写长文件清单。

唯一映射入口：

- `skills/aippt/references/resource-registry.md`
- `skills/aippt/references/scenes/scene-catalog.json`

## 你应该先看什么

- 判断是否命中场景：先看 `scene-catalog.json`
- 查阶段资源：看 `resource-registry.md`
- 看 scene 默认值：读 `scenes/<scene>.json`
- 看窄场景说明：读 `subskills/<scene>/SKILL.md`

## 资源分层

- `references/scenes/*.json`
  场景元数据：触发词、默认 sections、story arc、style bias、review bias
- `references/styles/*.yaml`
  视觉 token 资源
- `references/*.md`
  staged workflow 的通用规则
- `subskills/<scene>/`
  scene-first 的窄工作流

## 脚本入口

先用：

```bash
cd docs
npm run aippt:list-catalog
```

再按需要调用 workspace / build / validate 脚本。

## 维护顺序

行为变化时，推荐顺序：

1. scene pack / style metadata
2. `resource-registry.md`
3. `SKILL.md`
4. scripts
5. evals
6. docs
