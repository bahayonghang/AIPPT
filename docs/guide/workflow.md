# 工作流

AIPPT v3 = `scene-first routing + generic staged contract`。

## Step 0：路由

先判断：

- 是否命中 `scene-catalog.json`
- 若命中，先读对应 `subskills/<scene>/SKILL.md`
- 然后回到通用 stage contract

## Step 1：Argument contract

保持不变：

- `governing_thought`
- `pillar_map`
- `transition_map`
- `argument_claim`
- `proof_question`

Hard stop：

- 首次 outline 必须 `approved=false`

## Step 2：Production contract

保持不变：

- `slide_spec`
- `page_plan`
- `style_profile`
- `delivery_manifest`

新增 style / layout 要求：

- `style_profile` 应包含 `style_dimensions`
- `style_profile` 应包含 `style_instruction_block`
- `slide_spec` / `page_plan` 可声明 `layout_hint` / `layout_family`
- `page_plan.final_layout` 仍是最终几何落点

新增 scene-aware 要求：

- `required_sections` 要在 outline 中体现
- `default_story_arc` 要在 `story_role` 序列中体现
- `review_bias` 要在 `slide_spec.review_focus` 中体现
- `audience_density_bias` / `layout_tendency` 要能传导到下游合同或 manifest

## Step 3：Validation

`validate-artifacts` 现在除了原有合同一致性，还会在传入 `--scene-pack` 时检查：

- scene 与 manifest 一致
- outline 是否覆盖 required sections
- story arc 是否成立
- review bias 是否落到逐页 review_focus

## Step 4：Delivery

Scene pack 只影响默认值，不改变交付模型：

- `prompt_bundle_only`
- `svg_pages`
- `brand_ready_assets`
