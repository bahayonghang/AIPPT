# 参考层与索引

`resource-registry.md` 是 canonical routing map；完整文件清单以它为准，本页只说明“先看什么”。

## 你应该先看什么

- 路由问题：先看 `scene-catalog.json`
- 阶段资源问题：看 `resource-registry.md`
- 最短默认路径：看 `golden-path.md`
- scene 默认值：读 `scenes/<scene>.json`
- 窄场景说明：读 `subskills/<scene>/SKILL.md`

## 资源分层（非完整清单）

- 核心 workflow refs：intake / research / outline / slide_spec / page_plan / style / review
- scene resources：scene JSON、scene subskill、scene outline starter
- style resources：style preset、style dimensions、auto-routing、style vocabulary
- scripts / assets：workspace、build、validate、preview、preview template
- evals：主回归集、人工评测提示、scene stub 脚手架

需要精确文件名时，回到 `resource-registry.md`。

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
