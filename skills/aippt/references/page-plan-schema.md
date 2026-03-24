# Page Plan Schema

Use this file in **Stage 5** after `slide_spec` is approved and the outline is locked.

The purpose of `page_plan` is to turn narrative intent into an explicit per-slide layout contract with no guesswork left for prompt generation or SVG rendering.

## Required structure

Wrap the result with `[PAGE_PLAN]` and `[/PAGE_PLAN]`.

```text
[PAGE_PLAN]
{
  "page_plan": {
    "deck_id": "short-deck-id",
    "slides": [
      {
        "slide_id": "S03",
        "final_layout": "asymmetric-two-column",
        "layout_rationale": "One dominant narrative block with a KPI evidence sidebar",
        "card_map": [
          {
            "card_id": "A",
            "slot": {
              "x": 40,
              "y": 100,
              "w": 780,
              "h": 580
            },
            "purpose": "主叙事",
            "content_items": [
              "一句主张",
              "2-3 条 supporting bullets"
            ],
            "asset_slots": [],
            "source_refs": ["R3"],
            "overflow_strategy": "reduce_copy_then_split"
          }
        ],
        "citations_placement": "page-footer",
        "visual_emphasis_order": [
          "headline claim",
          "hero metric",
          "supporting explanation"
        ],
        "unresolved_assets": [],
        "notes": "Footer citations required because 3 external facts are present"
      }
    ]
  }
}
[/PAGE_PLAN]
```

## Field rules

- `final_layout` must be one canonical layout name from `bento-grid-system.md`
- `card_map` must use real slot geometry, not vague prose
- `content_items` must contain actual planned content, not placeholders
- `source_refs` must be a subset of the slide's `evidence_refs`
- `citations_placement` must be `none`, `card-local`, or `page-footer`
- `visual_emphasis_order` must list the actual reading sequence
- `overflow_strategy` should explain what to do before text gets crushed

## Overflow strategy guidance

Use one of these patterns:

- `trim_secondary_copy`
- `convert_to_metric_stack`
- `move_to_sidebar`
- `split_slide`
- `replace_chart_with_kpi_card`
- `reduce_bullets_then_split`

Prefer `split_slide` over shrinking body text below the allowed floor.

## Planning rules

1. Each slide gets one `final_layout`.
2. Each card must have a specific purpose.
3. Narrow cards should carry short content, metrics, refs, or support blocks, not long paragraphs.
4. If the page needs more than 5 cards or more than one hero message, split it.
5. If a real image or chart is unavailable, use a clearly named placeholder slot.
