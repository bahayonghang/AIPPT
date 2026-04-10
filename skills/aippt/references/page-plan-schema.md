# Page Plan Schema

Use this file in **Stage 5** after `slide_spec` is approved.

`page_plan` defines HOW each slide will realize the proof contract.

## Required structure

Wrap output with `[PAGE_PLAN]` and `[/PAGE_PLAN]`.

```text
[PAGE_PLAN]
{
  "page_plan": {
    "deck_id": "short-deck-id",
    "slides": [
      {
        "slide_id": "S03",
        "layout_hint": "split-screen",
        "layout_family": "comparison",
        "final_layout": "asymmetric-two-column",
        "layout_rationale": "主论点占大区，证据占侧栏",
        "proof_trace": {
          "claim": "这一页要成立的论断",
          "question": "这一页要回答的证明问题",
          "evidence_refs": ["R3", "R7"]
        },
        "exhibit_blueprint": {
          "primary_intent": "comparison",
          "secondary_intents": [],
          "visual_strategy": "左图右证据注释",
          "encoding_notes": "统一口径、同比优先、强调关键差值"
        },
        "card_map": [
          {
            "card_id": "A",
            "slot": { "x": 40, "y": 100, "w": 780, "h": 580 },
            "purpose": "主比较图",
            "content_items": ["结论句", "图表要点", "限制条件"],
            "asset_slots": ["benchmark-bars"],
            "source_refs": ["R3", "R7"],
            "overflow_strategy": "reduce_bullets_then_split"
          }
        ],
        "citations_placement": "page-footer",
        "visual_emphasis_order": ["headline claim", "hero evidence", "supporting context"],
        "rhythm_slot": "proof-cluster",
        "adjacency_check": {
          "previous_layout": "hero-plus-two",
          "next_layout": "single-focus",
          "has_three_in_row_risk": false
        },
        "overflow_decision": "keep_single_page",
        "unresolved_assets": [],
        "notes": "如数据更新，优先替换主图"
      }
    ]
  }
}
[/PAGE_PLAN]
```

## Field rules

- `layout_hint` should come from `references/layout-gallery.md`.
- `layout_family` is a human-readable grouping such as `comparison`, `dashboard`, `timeline`, `hero`, or `ecosystem`.
- `final_layout` must be a canonical layout from `bento-grid-system.md`.
- `proof_trace.claim` must align with `slide_spec.argument_claim`.
- `proof_trace.question` must align with `slide_spec.proof_question`.
- `exhibit_blueprint.primary_intent` must match `slide_spec.exhibit_intent`.
- `card_map.source_refs` must be a subset of `proof_trace.evidence_refs`.
- `citations_placement` must be `none`, `card-local`, or `page-footer`.
- `rhythm_slot` should be one of `anchor`, `proof-cluster`, `bridge`, `breathing`, `closing`.

## Overflow decisions

Use one of:

- `keep_single_page`
- `trim_secondary_copy`
- `move_to_sidebar`
- `convert_to_metric_stack`
- `split_slide`

Prefer `split_slide` over shrinking below readability.

## Planning rules

1. One slide has one `final_layout`.
2. `card_map` uses real coordinates, not prose placeholders.
3. Every card has explicit purpose and owned content.
4. If the slide needs more than 5 cards, split it.
5. If a required asset is missing, list it in `unresolved_assets` clearly.
6. `adjacency_check.has_three_in_row_risk=true` requires layout/rhythm revision.
7. `layout_hint` should explain the visual archetype before geometry is fixed.
