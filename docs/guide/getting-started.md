# 快速开始

## 1. 先理解 Skill 的边界

AIPPT 只用于 **从零创建一套新的 deck**。

如果用户已经有现成的 `.pptx`、`.ppt`、`.key` 或 Google Slides 文件，并且需求是修改、审校、润色或替换其中某几页，那么不应该走 AIPPT 流程。

核心规则见：`skills/aippt/SKILL.md`

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

如果品牌素材不完整，AIPPT 允许基于 **官方来源** 进行推断，但必须明确标注哪些是推断项。

## 3. 按阶段执行

AIPPT 的标准阶段是：

1. Stage 0: Brand & asset intake
2. Stage 1: Brief alignment
3. Stage 2: Research protocol
4. Stage 3: Outline + slide spec
5. Stage 4: Page planning
6. Stage 5: Output mode execution
7. Stage 6: Verification

## 4. 选择交付模式

如果用户没有明确指定交付模式，Skill 要保守地默认到 `prompt_bundle_only`。

可选模式：

- `prompt_bundle_only`
- `svg_pages`
- `brand_ready_assets`

## 5. 使用 VitePress 文档

本项目已经提供最小可用的 VitePress 配置。

启动本地文档站：

```bash
npm install
npm run docs:dev
```

构建静态站点：

```bash
npm run docs:build
```

预览构建结果：

```bash
npm run docs:preview
```
