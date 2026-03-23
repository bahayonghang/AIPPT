# Slide Spec Schema

Use this file in **Stage 3B** after the deck `outline` is approved or mostly stable.

The goal of `slide_spec` is to convert a story outline into an execution contract that later stages can plan and render without guessing.

## Required structure

Wrap the result with `[SLIDE_SPEC]` and `[/SLIDE_SPEC]`.

```text
[SLIDE_SPEC]
{
  "slide_spec": {
    "deck_id": "short-deck-id",
    "language": "zh-CN",
    "slides": [
      {
        "slide_id": "S01",
        "page_type": "cover",
        "title": "页面标题",
        "page_goal": "这一页承担的唯一主要任务",
        "audience_takeaway": "观众看完这一页后应该记住什么",
        "evidence_refs": [],
        "content_budget": {
          "max_cards": 1,
          "max_bullets_per_card": 4,
          "max_body_chars_per_card": 90,
          "max_stats": 1
        },
        "layout_candidates": ["cover"],
        "preferred_layout": "cover",
        "visual_priority": {
          "primary": "主标题",
          "secondary": "副标题",
          "tertiary": "品牌或 CTA"
        },
        "asset_needs": {
          "logos": [],
          "charts": [],
          "images": [],
          "icons": []
        },
        "citations_mode": "none",
        "notes": "任何额外提醒"
      }
    ]
  }
}
[/SLIDE_SPEC]
```

## Field definitions

- `slide_id`: must map one-to-one to the outline order
- `page_type`: use a meaningful value like `cover`, `contents`, `comparison`, `process`, `timeline`, `kpi`, `case-study`, `mixed-media`, `closing`, or `generic`
- `page_goal`: one sentence, singular
- `audience_takeaway`: one sentence describing the memory anchor
- `evidence_refs`: source IDs like `R1`, `R3`; use an empty array only for pure transition pages
- `content_budget`: guardrails that force the page to stay readable
- `layout_candidates`: 2-3 valid choices from `bento-grid-system.md`
- `preferred_layout`: the best-fit choice before detailed page planning
- `visual_priority`: what must dominate, what can be secondary, what is optional
- `asset_needs`: exact image/chart/logo/icon requirements
- `citations_mode`: `none`, `card-local`, or `page-footer`

## Content-budget guidance

Use budgets to stop slide bloat before it happens:

- simple cover / closing pages: `max_cards = 1`
- comparison / process / KPI pages: usually `max_cards = 2-4`
- if a page needs more than 5 cards or more than 90 body chars per card, split it

## Slide-spec rules

1. Every slide must have a single `page_goal`.
2. Every fact-heavy page must carry `evidence_refs`.
3. `layout_candidates` must be valid layout names from `bento-grid-system.md`.
4. `preferred_layout` must be one of the candidates.
5. `citations_mode` must align with fact density:
   - `none` for pure transition or cover/closing pages
   - `card-local` for 1-2 localized facts
   - `page-footer` for metric-heavy or evidence-dense pages
