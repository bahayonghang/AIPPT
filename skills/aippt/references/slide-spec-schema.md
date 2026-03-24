# Slide Spec Schema

Use this file in **Stage 4** after the deck `outline` is approved.

The goal of `slide_spec` is to convert a story outline into a slide-by-slide execution contract that later stages can plan, render, and review without guessing.

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
        "story_role": "anchor",
        "review_focus": [
          "hierarchy",
          "readability"
        ],
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

- `slide_id`: must map one-to-one to the approved outline order
- `page_type`: values such as `cover`, `contents`, `comparison`, `process`, `timeline`, `kpi`, `case-study`, `mixed-media`, `closing`, or `generic`
- `page_goal`: one sentence, singular
- `audience_takeaway`: one sentence describing the memory anchor
- `evidence_refs`: source IDs like `R1`, `R3`
- `content_budget`: guardrails that force the slide to stay readable
- `layout_candidates`: 2-3 valid choices from `bento-grid-system.md`
- `preferred_layout`: the best-fit choice before detailed page planning
- `story_role`: use `anchor`, `proof`, `bridge`, `breathing`, or `closing`
- `review_focus`: one or more of `layout_balance`, `readability`, `density`, `contrast`, `chart_legibility`, `citation_visibility`, `hierarchy`
- `asset_needs`: exact image, chart, logo, or icon requirements
- `citations_mode`: `none`, `card-local`, or `page-footer`

## Content-budget guidance

Use budgets to stop slide bloat before it happens:

- simple cover / breathing / closing pages: `max_cards = 1`
- comparison / process / KPI pages: usually `max_cards = 2-4`
- if a page needs more than 5 cards or more than 90 body chars per card, split it

## Slide-spec rules

1. Every slide must have a single `page_goal`.
2. Every fact-heavy slide must carry `evidence_refs`.
3. `layout_candidates` must be valid layout names from `bento-grid-system.md`.
4. `preferred_layout` must be one of the candidates.
5. `review_focus` must reflect the slide's main quality risk.
6. `citations_mode` must align with fact density:
   - `none` for pure transition or cover / closing pages
   - `card-local` for 1-2 localized facts
   - `page-footer` for metric-heavy or evidence-dense pages
