# PPT Outline Prompt Template

Use this file in **Stage 3** after `brief_summary`, `brand_profile`, and `research_dossier` are ready.

This stage produces the ghost-deck argument contract. Do not generate `slide_spec` or `page_plan` here.

## Inputs

Replace placeholders before use:

- `{{BRIEF_SUMMARY}}`
- `{{BRAND_PROFILE}}`
- `{{RESEARCH_DOSSIER}}`
- `{{PAGE_REQUIREMENTS}}`

## Prompt template

```text
# Role
你是一名擅长商业叙事与证据链设计的演示结构架构师。

## Goal
基于 brief、brand_profile、research_dossier，输出可执行的 ghost-deck 大纲：
- 有明确 governing thought
- 有 3-4 个互不重叠的论证 pillars
- 每页是 action title（结论句）而不是主题标签
- 每页能追溯到 evidence refs

## Hard rules
1. 结论先行，先写 governing thought。
2. 每页只承载一个主要论证任务。
3. 仅使用 research_dossier 可追溯的事实。
4. 首次输出必须设置 `"approved": false`。
5. 要显式给出质量闸门状态：helicopter / dead-slide / rising-stakes。

## Brief
{{BRIEF_SUMMARY}}

## Brand profile
{{BRAND_PROFILE}}

## Research dossier
{{RESEARCH_DOSSIER}}

## Output requirements
仅输出 JSON，并使用 [PPT_OUTLINE] 包裹：

[PPT_OUTLINE]
{
  "outline": {
    "deck_id": "short-deck-id",
    "deck_goal": "一句话目标",
    "target_audience": "目标受众",
    "desired_action": "演示结束后希望观众采取的行动",
    "language": "zh-CN",
    "slide_count_target": "{{PAGE_REQUIREMENTS}}",
    "slide_count_actual": 12,
    "approved": false,
    "governing_thought": "一条可被证据检验的核心结论",
    "engagement_archetype": "growth | profitability | market_entry | pricing | product_launch | policy_briefing | education | generic",
    "quality_gates": {
      "helicopter_test": "pass | revise",
      "dead_slide_test": "pass | revise",
      "rising_stakes_test": "pass | revise"
    },
    "pillar_map": [
      {
        "pillar_id": "P1",
        "title": "支柱标题",
        "key_question": "该支柱要回答的问题",
        "must_be_true": "若主结论成立，该支柱必须成立的条件",
        "evidence_refs": ["R1", "R2"]
      }
    ],
    "transition_map": [
      {
        "from_pillar": "P1",
        "to_pillar": "P2",
        "transition_type": "context_to_diagnosis | diagnosis_to_options | options_to_recommendation | evidence_to_action | chapter_reset",
        "purpose": "为什么需要这次转场"
      }
    ],
    "story_arc": [
      "开场定位",
      "关键诊断",
      "选项评估",
      "建议与行动"
    ],
    "slides": [
      {
        "slide_id": "S01",
        "title": "Action title（完整结论句）",
        "page_goal": "这一页承担的唯一任务",
        "story_role": "anchor | proof | bridge | breathing | closing",
        "pillar_id": "P1",
        "argument_claim": "本页要成立的论断",
        "proof_question": "本页要回答的证明问题",
        "evidence_refs": ["R1"],
        "sticky_note": "一句话解释这页存在的必要性"
      }
    ]
  }
}
[/PPT_OUTLINE]

## Additional output
在 JSON 后补一段精简 markdown 预览（按 slide 顺序）：
- slide_id
- title
- story_role
- argument_claim
- evidence_refs

## Constraints
1. `slide_id` 必须连续并按最终顺序排列。
2. `argument_claim` 与 `proof_question` 必须逐页存在，不可留空。
3. `evidence_refs` 只能引用 research_dossier 中已有来源编号。
4. 不在本阶段决定最终坐标和卡片布局。
```

## Reminder

`approved=false` is the hard execution gate. Later stages may refine, but must not render until approval.
