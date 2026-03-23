# 输出模式

AIPPT 支持三种交付模式。这些模式都定义在 `skills/aippt/SKILL.md` 中，并配合 `design-prompt.md` 与 `svg-quality-checklist.md` 使用。

## 1. `prompt_bundle_only`

这是最保守、兼容性最高的模式。

适用场景：

- 用户想把结果交给其他模型继续渲染
- 当前运行环境不适合直接生成 SVG
- 需要最大可移植性

应交付：

- 逐页 prompt bundle
- brand summary
- outline
- slide spec
- 渲染注意事项

## 2. `svg_pages`

适用于运行环境可以安全生成 SVG 的场景。

应交付：

- 逐页 prompt bundle
- 每页 `.svg`
- 对于因版面密度而简化的页面说明

注意事项：

- 只有通过质量清单后，才能把 SVG 视为可交付结果
- 不要伪造截图、logo、图表数据
- 缺失资源必须使用明确占位

## 3. `brand_ready_assets`

适合交给设计师或 PPT 操作人员做进一步落地。

应交付：

- brand profile
- master/theme guidance
- 页面家族建议（cover / section / data / case-study 等）
- 图表与图标使用规则
- prompt bundle
- 如果用户明确要求，可附带 SVG 页面

## 共享规则

无论哪种模式，都必须遵守以下要求：

- 每页 prompt 自包含
- 如果页面使用外部事实，必须保留 citation refs
- 不能跳过 research、slide spec 与 page planning
- 如果文件系统可用，建议输出到 `output/`

## Office 兼容性说明

Skill 对 SVG 的 Office 兼容性持保守态度：

- 高信心：Microsoft 365、PowerPoint 2024、2021、2019
- 需要本地验证：PowerPoint 2016

如果用户明确目标是 PowerPoint 2016，则不能承诺完全一致，需要显式提示本地验证风险。
