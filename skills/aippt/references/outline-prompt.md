# PPT Outline Prompt Template

Use this file in **Stage 3** after `brief_summary`, `brand_profile`, and `research_dossier` are ready.

This file defines the **outline only**. Generate `slide_spec` separately with `slide-spec-schema.md`.

## Inputs

Replace these placeholders before use:

- `{{BRIEF_SUMMARY}}`
- `{{BRAND_PROFILE}}`
- `{{RESEARCH_DOSSIER}}`
- `{{PAGE_REQUIREMENTS}}`

## Prompt template

```text
# Role: 顶级的 PPT 结构架构师

## Goal
基于 brief、brand_profile 和 research_dossier，输出一份 story-first 的演示大纲和 sticky-note 预览。

## Story rules
1. 结论先行。
2. 章节之间要有递进关系，不要只是在堆主题。
3. 每一页只承担一个主要沟通任务。
4. 仅使用 research_dossier 中有证据支持的事实。
5. 页面标题要有信息量，不要用“概述”“详情”这类空标题。
6. 在正式设计之前，把每页当成一张“数字便利贴”。
7. 初次生成时必须把 `approved` 设为 `false`。

## Brief
{{BRIEF_SUMMARY}}

## Brand profile
{{BRAND_PROFILE}}

## Research dossier
{{RESEARCH_DOSSIER}}

## Output requirements
请严格输出 JSON，并用 [PPT_OUTLINE] 和 [/PPT_OUTLINE] 包裹：

[PPT_OUTLINE]
{
  "outline": {
    "deck_goal": "一句话说明这套 deck 想让观众接受什么",
    "target_audience": "目标受众",
    "desired_action": "演示结束后希望观众做什么",
    "language": "zh-CN",
    "slide_count_target": "{{PAGE_REQUIREMENTS}}",
    "slide_count_actual": 12,
    "approved": false,
    "story_arc": [
      "开场为什么重要",
      "核心观点或方案",
      "证据与案例",
      "结论与行动"
    ],
    "cover": {
      "slide_id": "S01",
      "title": "主标题",
      "sub_title": "副标题",
      "page_goal": "封面承担的沟通任务",
      "story_role": "anchor",
      "evidence_refs": []
    },
    "table_of_contents": {
      "slide_id": "S02",
      "title": "目录",
      "page_goal": "建立阅读路径",
      "content": ["第一部分标题", "第二部分标题", "第三部分标题"],
      "story_role": "bridge",
      "evidence_refs": []
    },
    "sections": [
      {
        "section_id": "P1",
        "section_title": "第一部分标题",
        "key_message": "这一部分最核心的一句话",
        "section_goal": "这一部分想解决什么问题",
        "slides": [
          {
            "slide_id": "S03",
            "title": "页面标题",
            "page_goal": "这一页要让观众理解的核心信息",
            "story_role": "proof",
            "content": ["要点1", "要点2", "要点3"],
            "evidence_refs": ["R1", "R3"],
            "sticky_note": "一句话说明这张便利贴为什么存在"
          }
        ]
      }
    ],
    "closing": {
      "slide_id": "SXX",
      "title": "结论 / Thank You",
      "page_goal": "收束并给出下一步行动",
      "story_role": "closing",
      "content": ["总结要点1", "总结要点2"],
      "evidence_refs": []
    }
  }
}
[/PPT_OUTLINE]

## Additional output
在 JSON 之后，补一段简洁的 sticky-note 预览 Markdown，逐页列出：
- `slide_id`
- 页面标题
- `story_role`
- `page_goal`
- 2-4 个核心内容点

## Constraints
1. 严格遵循 JSON 结构。
2. 总页数要符合 {{PAGE_REQUIREMENTS}}，不要明显超出。
3. 每页 `content` 必须有 2-4 条具体要点，不能留空。
4. `slide_id` 必须按最终顺序连续编号。
5. 不在这里决定最终坐标和卡片布局，那是 slide_spec 与 page_plan 的工作。
```

## Hard-stop reminder

`approved` is the execution gate. Until it becomes `true`, later stages may refine the narrative but must not render the deck.
