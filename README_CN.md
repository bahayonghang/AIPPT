# AIPPT

## 安装

```bash
npx skills add bahayonghang/AIPPT
```

AIPPT 是一个用于**从零创建整套新 deck** 的 Claude Code Skill，核心是 contract-first，而不是直接改现有 PPT 文件。

## v3 的变化

AIPPT 现在有两层路由：

- `generic AIPPT`：通用 staged workflow
- `scene packs`：针对高频场景的窄子技能

内置场景：

- `company-intro`
- `investor-pitch`
- `board-briefing`
- `policy-briefing`
- `teaching-deck`
- `thesis-defense`

主定位不变：

- 保留 staged artifact contract
- 保留 argument-first 和 hard stop
- 保留 validator
- 不扩展成 `.pptx` 编辑器或 `deck.json` 运行时

## 适用场景

适合：

- 企业介绍
- 融资路演
- 董事会/管理层汇报
- 政策/合规解读
- 教学课件
- 毕业答辩 / 学术答辩
- 从主题或资料出发，完整产出 research + outline + page planning + delivery artifacts

不适合：

- 修改现有 `.pptx/.ppt/.key/Google Slides`
- 只点评现有 deck
- 只改模板页
- 只做单页
- 只要轻量大纲

## 工作流模型

AIPPT 仍保持严格阶段：

1. brand intake
2. brief alignment
3. research dossier
4. outline hard stop
5. slide spec
6. page plan
7. style profile + delivery mode
8. delivery execution
9. verification and review

硬门不变：

- 首次 outline 必须 `approved=false`

## 输出结构

默认 workspace：

```text
output/
├── briefing/
├── specs/
├── prompts/
├── svg/
├── preview/
└── project.json
```

交付模式：

- `prompt_bundle_only`
- `svg_pages`
- `brand_ready_assets`

## 常用命令

查看 scene、style、delivery mode 和 validator：

```bash
cd docs
npm run aippt:list-catalog
```

初始化 workspace：

```bash
cd docs
npm run aippt:init-workspace -- --output-dir ../output --scene-id investor-pitch
```

生成 prompt bundle：

```bash
cd docs
npm run aippt:build-prompts -- \
  --slide-spec ../output/specs/slide-spec.json \
  --page-plan ../output/specs/page-plan.json \
  --brand-profile ../output/briefing/brand-profile.md \
  --style-profile ../output/specs/style-profile.json \
  --scene-pack investor-pitch \
  --output-dir ../output/prompts
```

校验合同：

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

## 唯一映射入口

把下面两个文件当作当前版本的唯一真相：

- [`skills/aippt/references/resource-registry.md`](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/resource-registry.md)
- [`skills/aippt/references/scenes/scene-catalog.json`](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/scenes/scene-catalog.json)

不要在 README、docs、脚本注释里重复维护长文件列表。

## 评测

评测分三层：

- `skills/aippt/evals/evals.json`
- `skills/aippt/evals/trigger-evals.json`
- `skills/aippt/references/eval-prompts.md`

现在覆盖：

- generic 新 deck 触发
- scene-pack 路由
- 现有 deck 编辑边界
- near-miss 非触发场景

## 文档

- 英文 README：`README.md`
- VitePress 文档：`docs/`

```bash
cd docs
npm install
npm run docs:dev
```
