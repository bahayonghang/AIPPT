# Slide Spec Schema

Use this file in **Stage 4** after outline is approved.

`slide_spec` defines WHAT each slide must prove and what data/layout envelope it may use.

## Required structure

Wrap output with `[SLIDE_SPEC]` and `[/SLIDE_SPEC]`.

```text
[SLIDE_SPEC]
{
  "slide_spec": {
    "deck_id": "short-deck-id",
    "language": "zh-CN",
    "slides": [
      {
        "slide_id": "S03",
        "page_type": "comparison",
        "title": "页面标题",
        "page_goal": "这一页承担的唯一任务",
        "audience_takeaway": "观众看完后应记住什么",
        "story_role": "proof",
        "pillar_id": "P2",
        "argument_claim": "这一页要成立的论断",
        "proof_question": "这页必须回答的证明问题",
        "exhibit_intent": "comparison",
        "evidence_layer": "L2",
        "evidence_refs": ["R3", "R7"],
        "data_requirements": [
          "至少2个可比对象",
          "至少1个统一口径指标"
        ],
        "content_budget": {
          "max_cards": 3,
          "max_bullets_per_card": 4,
          "max_body_chars_per_card": 90,
          "max_stats": 4
        },
        "layout_candidates": ["symmetric-two-column", "three-column"],
        "preferred_layout": "symmetric-two-column",
        "review_focus": ["layout_balance", "citation_visibility"],
        "fit_risk": "low",
        "asset_needs": {
          "logos": [],
          "charts": ["benchmark-bars"],
          "images": [],
          "icons": []
        },
        "citations_mode": "page-footer",
        "notes": "可补一条 caveat"
      }
    ]
  }
}
[/SLIDE_SPEC]
```

## Field definitions

- `slide_id`: must map one-to-one to approved outline order.
- `page_type`: `cover`, `contents`, `comparison`, `process`, `timeline`, `kpi`, `case-study`, `mixed-media`, `closing`, `generic`.
- `story_role`: `anchor`, `proof`, `bridge`, `breathing`, `closing`.
- `argument_claim`: slide-level conclusion.
- `proof_question`: single question this slide must answer.
- `exhibit_intent`: `none`, `comparison`, `trend`, `composition`, `distribution`, `process`, `timeline`, `matrix`, `decision`, `relationship`.
- `evidence_layer`: `L1`, `L2`, or `L3`.
- `fit_risk`: `low`, `medium`, or `high`.
- `citations_mode`: `none`, `card-local`, `page-footer`.

## Rules

1. Every slide must include `argument_claim` and `proof_question`.
2. Fact-backed slides must include `evidence_refs`.
3. `preferred_layout` must be one of `layout_candidates`.
4. `exhibit_intent` must match the proof question shape.
5. `fit_risk=high` should trigger split/reframe consideration in Stage 5.
6. `review_focus` must contain at least one quality risk.
7. If `evidence_refs` is non-empty, `citations_mode` cannot be `none`.

## Content-budget guidance

- cover/bridge/breathing slides: usually `max_cards=1-2`
- proof slides: usually `max_cards=2-4`
- if `max_cards > 5`, split the slide instead

## Intent/data sanity checks

- `comparison` without comparables is invalid.
- `trend` without ordered time points is invalid.
- `composition` without total+parts is invalid.
- `decision` without options+criteria is invalid.

Use these checks before moving to page planning.
