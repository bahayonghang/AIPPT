# 工件与输出树

本页描述 AIPPT 的当前 artifact contract。

## 阶段完成态

以下工件齐备，才算完成 staged planning：

- `brand_profile`
- `brief_summary`
- `research_dossier`
- `outline`
- `slide_spec`
- `page_plan`
- `style_profile`

`outline_only` 停在 `outline`；`spec_only` 停在 `slide_spec`，还不会进入 `page_plan`。

## 最终交付态

在阶段完成态基础上，还需要：

- `delivery_manifest`
- `review_report`（存在验证或 refinement 问题时）

`delivery_manifest` 是最终 handoff 元数据，通常出现在 validator 之后。

## 常用 wrapper tags

```text
[RESEARCH_DOSSIER]...[/RESEARCH_DOSSIER]
[PPT_OUTLINE]...[/PPT_OUTLINE]
[SLIDE_SPEC]...[/SLIDE_SPEC]
[PAGE_PLAN]...[/PAGE_PLAN]
[STYLE_PROFILE]...[/STYLE_PROFILE]
[REVIEW_REPORT]...[/REVIEW_REPORT]
[DELIVERY_MANIFEST]...[/DELIVERY_MANIFEST]
```

## 核心字段要求

### `outline`（论证层）

至少包含：

- `governing_thought`
- `pillar_map`
- `transition_map`
- `quality_gates`
- `slides[].argument_claim`
- `slides[].proof_question`

### `slide_spec`（WHAT 合同）

至少包含：

- `argument_claim`
- `proof_question`
- `exhibit_intent`
- `evidence_layer`
- `data_requirements`
- `content_budget`
- `layout_candidates`
- `review_focus`

### `page_plan`（HOW 合同）

至少包含：

- `layout_hint`
- `layout_family`
- `final_layout`
- `proof_trace`
- `exhibit_blueprint`
- `card_map`
- `rhythm_slot`
- `adjacency_check`
- `overflow_decision`

### `style_profile`

至少包含：

- preset or custom `style_direction`
- `style_dimensions`
- `palette_roles`
- `typography_roles`
- `style_instruction_block`

## 推荐输出树

```text
output/
├── briefing/
│   ├── brand-profile.md
│   ├── brief-summary.md
│   └── research-dossier.md
├── specs/
│   ├── outline.json
│   ├── slide-spec.json
│   ├── page-plan.json
│   ├── style-profile.json
│   └── review-report.json
├── prompts/
│   ├── 01-s01-title.md
│   └── delivery-manifest.json
├── svg/
├── preview/
└── project.json
```

## Manifest 最低要求

`delivery_manifest` 建议至少包含：

- `schema_version`
- `contract_version`
- `mode`
- `input_files`
- `outputs`
- per-slide 的 `slide_id/title/story_role/argument_claim/proof_question/exhibit_intent/prompt_file`
