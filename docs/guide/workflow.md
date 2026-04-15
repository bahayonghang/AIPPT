# 工作流

AIPPT = `scene-first routing + golden path + staged contract`。

## Step 0：路由 + intake

先判断：

- 是否命中 `scene-catalog.json`
- 若命中，先读对应 `subskills/<scene>/SKILL.md`
- scene pack 只会改默认值，不会绕过门禁
- 然后回到通用 stage contract

黄金路径：`route + intake -> brand_profile + brief_summary -> research_dossier -> outline hard stop -> slide_spec -> page_plan -> style_profile -> delivery + validation`

## Step 1：Argument contract

保持不变：

- `governing_thought`
- `pillar_map`
- `transition_map`
- `argument_claim`
- `proof_question`

Hard stop：

- 首次 outline 必须 `approved=false`
- `outline_only` 只停在 outline

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
- `spec_only` 只停在 `slide_spec`，不会进入 `page_plan`

## Step 3：Validation

`validate-artifacts` 会检查合同一致性；传入 `--scene-pack` 时，还会检查 scene 默认值是否真正落到下游。

## Step 4：Delivery

Scene pack 只影响默认值，不改变交付模型：

- `prompt_bundle_only`
- `svg_pages`
- `brand_ready_assets`

部分重建规则：AIPPT 生成过且已批准的工件，如果带明确 `slide_id`，可以只重建指定页；完成后要重新跑对应 validator。
