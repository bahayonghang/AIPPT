# 输出模式

AIPPT 支持五种模式。

## `outline_only`

适合：

- 只确认论证骨架
- 还没准备进入 WHAT / HOW 合同

规则：

- 停在 outline 阶段
- 不生成 prompt bundle
- 不生成 `delivery_manifest`
- 不绕过 `outline.approved=false` 首轮门禁

## `spec_only`

适合：

- 已批准 outline，但想先确认 `slide_spec` / `page_plan`
- 暂时不进入渲染交付

规则：

- 停在 production contract 阶段
- 不生成 prompt bundle
- 不生成 `delivery_manifest`

## `prompt_bundle_only`（默认）

适合：

- 先产出稳定合同，再交给其它渲染链路
- 环境不适合直接渲染 SVG
- 需要高可移植性

必须交付：

- `brand_profile`
- `brief_summary`
- `research_dossier`
- `outline`
- `slide_spec`
- `page_plan`
- `style_profile`
- per-slide prompt bundle
- `delivery_manifest`

## `svg_pages`

适合：

- 当前环境可生成并校验 SVG
- 需要直接得到页面文件

必须交付：

- `prompt_bundle_only` 全部工件
- per-slide `.svg`

推荐附带：

- `preview/index.html`

硬规则：

- SVG 未通过 `validate-svg` 不视为 ready
- 缺失资源必须占位，不得杜撰

## `brand_ready_assets`

适合：

- 交付给设计师或 PPT 操作人员继续制作

必须交付：

- `prompt_bundle_only` 全部工件
- 风格与品牌覆盖说明
- 页面家族与图表/引用使用指导

SVG 为可选项，仅在用户明确要求时附带。

## 共享规则

三种最终交付模式都必须满足：

- 每页 prompt 自包含
- 外部事实必须可见 citation refs
- 不得跳过 `slide_spec` 与 `page_plan`
- `outline.approved` 必须先为 `true`
- 最终必须产出 `delivery_manifest`

而 `outline_only` / `spec_only` 属于 staged stopping points，不属于最终交付完成态。

## Manifest 关键字段（v2）

`delivery_manifest` 至少应包含：

- `schema_version`
- `contract_version`
- `mode`
- `input_files`
- `outputs`
- per-slide: `slide_id/title/story_role/argument_claim/proof_question/exhibit_intent/prompt_file`

## Office 兼容性说明

SVG 兼容性保持保守：

- 高信心：Microsoft 365、PowerPoint 2024/2021/2019
- 需本地验证：PowerPoint 2016
