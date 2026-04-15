# 快速开始

## 1. 先路由再 intake

如果请求明显属于这些场景，先走 scene pack：

- 企业介绍
- 融资路演
- 董事会汇报
- 政策解读
- 教学课件
- 毕业答辩

查看目录：

```bash
cd docs
npm run aippt:list-catalog
```

## 2. 初始化 workspace

```bash
cd docs
npm run aippt:init-workspace -- --output-dir ../output --scene-id investor-pitch
```

如果你有默认偏好，也可以先准备：

- `./.aippt/EXTEND.json`
- `~/.aippt/EXTEND.json`

支持的默认值包括 scene、style preset、delivery mode、language、strict review、style dimensions。

这会创建：

- `briefing/`
- `specs/`
- `prompts/`
- `svg/`
- `preview/`
- `project.json`

## 3. 进入 staged workflow

标准顺序是：

`route + intake -> brand_profile + brief_summary -> research_dossier -> outline hard stop -> slide_spec -> page_plan -> style_profile -> delivery + validation`

硬规则：

- 首次 `outline.approved=false`
- `outline_only` 只停在 outline
- `spec_only` 只停在 `slide_spec`，不会继续到 `page_plan`
- scene pack 只会细化默认值，不会绕过 hard stop

## 4. 生成与校验

先 build，再 validate。

如果你是 scene-aware 工作流，相关脚本都传 `--scene-pack`。

如果只想停在阶段边界，可以使用 staged modes：

- `outline_only`
- `spec_only`

这两个模式不会绕过 approval gate，也不会提前生成 prompt bundle。

## 5. 部分重建

AIPPT 生成过的工件，如果已经批准且带有明确 `slide_id`，可以按页局部重建；重建后要重新跑对应 validator。
