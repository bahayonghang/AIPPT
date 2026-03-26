# 工件与输出树

本页描述 AIPPT 的 artifact contract（v2）。

## 计划完成态

以下工件齐备才算完成规划：

- `brand_profile`
- `brief_summary`
- `research_dossier`
- `outline`
- `slide_spec`
- `page_plan`
- `style_profile`

## 交付完成态

在计划完成态基础上，还需要：

- `delivery_manifest`
- `review_report`（存在验证或 refinement 问题时）

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

## v2 核心字段要求

### `outline`（论证层）

至少包含：

- `governing_thought`
- `engagement_archetype`
- `pillar_map`
- `transition_map`
- `quality_gates`
- `slides[].argument_claim`
- `slides[].proof_question`

### `slide_spec`（WHAT）

至少包含：

- `argument_claim`
- `proof_question`
- `exhibit_intent`
- `evidence_layer`
- `data_requirements`
- `fit_risk`

### `page_plan`（HOW）

至少包含：

- `proof_trace`
- `exhibit_blueprint`
- `rhythm_slot`
- `adjacency_check`
- `overflow_decision`

### `style_profile`

至少包含：

- `style_direction`
- `palette_roles`
- `typography_roles`
- `brand_override_rules`

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
└── preview/
    └── index.html
```

## Manifest（v2）最低要求

`delivery_manifest` 建议至少包含：

- `schema_version`
- `contract_version`
- `mode`
- `input_files`
- `outputs`
- per-slide 的 `slide_id/title/story_role/argument_claim/proof_question/exhibit_intent/prompt_file`
