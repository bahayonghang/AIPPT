# SVG Design Prompt Template

Use this file in **Stage 7** after `slide_spec`, `page_plan`, and `style_profile` are stable.

This template turns one page-planning contract into a render-ready SVG prompt.

## Required inputs

- `{{STYLE_PROFILE}}`
- `{{BRAND_PROFILE}}`
- `{{SLIDE_SPEC}}`
- `{{PAGE_PLAN}}`
- `{{REVIEW_NOTES}}`

## Prompt template

```text
你是一名信息架构与 SVG 制图专家。请基于以下合同生成一页可读、可编辑、可验证的 SVG 演示页面。

## Goal
输出一张通过硬规则校验、证据可追溯、且与论证链一致的页面。

## Canvas and safety
1. SVG 根必须为 `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">`。
2. 主内容必须在安全区 `x=40..1240`, `y=40..680`。
3. 标题位于 `y=40..90`。
4. 若 `citations_placement = page-footer`，来源信息必须位于 `y=690..710`。

## Contract alignment
1. 页面必须服务于 `argument_claim`，不能偏离 `proof_question`。
2. 视觉表达必须对应 `exhibit_blueprint.primary_intent`。
3. `proof_trace.evidence_refs` 必须在页面中保持可见（页脚或卡片本地 source chip）。
4. 不得新增合同外事实、数字或结论。

## Layout discipline
1. 严格遵循 `final_layout` 与 `card_map.slot` 坐标。
2. 不得自定义新的卡片尺寸和网格。
3. 卡片优先级遵循 `visual_emphasis_order`。
4. 若 `adjacency_check.has_three_in_row_risk = true`，保持本页视觉重心与相邻页明显区分。

## Typography and readability
1. 标题、正文、注释按 style profile 的 typography roles。
2. 标题建议 28-36px，正文建议 14-16px，辅助说明 10-12px。
3. 正文不得低于 12px；放不下时按 `overflow_decision` 处理，不要硬压缩。
4. 文字使用 `<text>` / `<tspan>`，不得转轮廓。

## Brand and style handling
1. 显式品牌约束高于 preset 默认值。
2. 若品牌色与 preset 冲突，优先品牌色并调整中性色与强调色。
3. `palette_roles` 与 `typography_roles` 是样式唯一依据，不要随意引入额外体系。

## Content integrity
1. 仅使用 `slide_spec` 与 `page_plan` 中确认内容。
2. 若 `unresolved_assets` 非空，使用明确占位而非杜撰资源。
3. 不伪造截图、客户 logo、地图细节或不存在的数据点。

## Citation rules
1. `citations_placement = none` 时不得生成来源行。
2. `card-local` 时在对应卡片展示紧凑 source chip（如 `Source: R3`）。
3. `page-footer` 时页脚集中展示来源（如 `Sources: R1; R3; R7`）。
4. 来源编号必须与 `proof_trace.evidence_refs` 一致。

## Review-driven fixes
{{REVIEW_NOTES}}

## Brand profile
{{BRAND_PROFILE}}

## Style profile
{{STYLE_PROFILE}}

## Slide spec
{{SLIDE_SPEC}}

## Page plan
{{PAGE_PLAN}}

## Output requirements
1. 仅输出完整 SVG 代码，不要附加解释。
2. 不得留下 `{{...}}`、`TODO`、`TBD`。
3. 页面必须可被后续硬规则脚本校验通过。
```

## Implementation note

If prompt bundles are generated programmatically, `scripts/build-prompt-bundle.mjs` replaces placeholders directly.
