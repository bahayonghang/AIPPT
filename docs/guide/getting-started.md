# 快速开始

## 1. 先理解 Skill 的边界

AIPPT 只用于 **从零创建一套新的 deck**。

如果用户已经有现成的 `.pptx`、`.ppt`、`.key` 或 Google Slides 文件，并且需求是修改、审校、润色或替换其中某几页，那么不应该走 AIPPT 流程。

核心行为定义见：[skills/aippt/SKILL.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/SKILL.md)

## 2. 准备输入信息

建议准备以下输入：

- 主题或项目名称
- 演示受众
- 演示目的
- 演示结束后希望观众采取的动作
- 页数预算
- 语言要求
- 官网、白皮书、报告、PDF、会议纪要等来源材料
- 品牌素材：logo、颜色、字体、图标风格、禁用元素

如果品牌素材不完整，AIPPT 允许基于 **官方来源** 推断，但必须显式标注哪些是 inferred items。

## 3. 按新阶段执行

当前 AIPPT 的标准阶段是：

1. Stage 0: Brand and asset intake
2. Stage 1: Brief alignment hard stop
3. Stage 2: Research dossier
4. Stage 3: Sticky-note outline hard stop
5. Stage 4: Slide spec
6. Stage 5: Page plan
7. Stage 6: Style profile and delivery mode
8. Stage 7: Delivery execution
9. Stage 8: Verification and review

关键变化：

- `outline.approved` 是进入后续执行的硬门槛
- `slide_spec` 和 `page_plan` 分离，不再混成一个粗粒度 planning 阶段
- `style_profile` 成为独立工件
- `review_report` 与 `delivery_manifest` 成为正式交付产物的一部分

## 4. 选择交付模式

如果用户没有明确指定交付模式，Skill 要保守地默认到 `prompt_bundle_only`。

可选模式：

- `prompt_bundle_only`
- `svg_pages`
- `brand_ready_assets`

## 5. 使用脚本工具层

这些 npm 脚本现在由 `docs/package.json` 暴露。请先进入 `docs/` 目录再执行。

```bash
cd docs
npm run aippt:build-prompts
npm run aippt:validate-artifacts
npm run aippt:validate-svg
npm run aippt:build-preview
```

对应文件：

- [build-prompt-bundle.mjs](D:/Documents/Code/Agents/AIPPT/skills/aippt/scripts/build-prompt-bundle.mjs)
- [validate-artifacts.mjs](D:/Documents/Code/Agents/AIPPT/skills/aippt/scripts/validate-artifacts.mjs)
- [validate-svg.mjs](D:/Documents/Code/Agents/AIPPT/skills/aippt/scripts/validate-svg.mjs)
- [build-preview.mjs](D:/Documents/Code/Agents/AIPPT/skills/aippt/scripts/build-preview.mjs)

## 6. 使用 VitePress 文档

启动本地文档站：

```bash
cd docs
npm install
npm run docs:dev
```

构建静态站点：

```bash
cd docs
npm run docs:build
```

预览构建结果：

```bash
cd docs
npm run docs:preview
```
