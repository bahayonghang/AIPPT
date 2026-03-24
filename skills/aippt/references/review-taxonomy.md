# Review Taxonomy

Use this file in **Stage 8** after hard-rule validation.

The purpose of this taxonomy is to turn vague design feedback into portable, actionable review output. It does not depend on Gemini, Task APIs, or a specific host.

## Review layers

1. **Deterministic validation**
   Check structural and technical rules first.
2. **Typed refinement**
   If issues remain, classify them using the issue types below.

## Issue types

### 1. `attribute_change`

Use when a precise property should change without rethinking the layout.

Examples:

- font size too small
- accent color too weak
- card shadow too heavy
- citation chip opacity too low

### 2. `layout_restructure`

Use when the grid choice or card arrangement is wrong, but the slide concept is still valid.

Examples:

- the slide needs hero + sidebar instead of three equal columns
- the current hierarchy hides the main message
- the supporting metrics should move into a sidebar stack

### 3. `full_rethink`

Use when the slide approach itself is wrong and patching will not fix it.

Examples:

- dense table should become a visual comparison
- a content wall should be split into a different narrative device
- the slide tells no clear story

### 4. `content_reduction`

Use when clarity is blocked by too much content.

Examples:

- too many bullets
- too many info units for the page type
- long paragraphs where concise claims are needed

### 5. `deck_coordination`

Use when the issue spans multiple slides.

Examples:

- too many slides in a row use the same layout
- accent color is overused across the deck
- the deck lacks breathing slides

## Priority levels

- `1`: must fix
- `2`: should fix
- `3`: nice to have

## Review report structure

Return review output in this shape when structured output is possible:

```text
[REVIEW_REPORT]
{
  "review_report": {
    "scope": "slide | deck",
    "status": "pass | revise",
    "hard_rule_summary": {
      "passed": true,
      "errors": [],
      "warnings": []
    },
    "issues": [
      {
        "type": "layout_restructure",
        "priority": 1,
        "slide_id": "S05",
        "review_focus": "layout_balance",
        "description": "Current three-column split hides the main chart",
        "action": "Move chart into hero card and stack metrics in the sidebar"
      }
    ],
    "next_step": "render | revise_page_plan | revise_slide_spec | split_slide"
  }
}
[/REVIEW_REPORT]
```

## Mapping guidance

- If the issue is about factual visibility, use `review_focus = citation_visibility`
- If the issue is mainly about clutter, use `review_focus = density`
- If the issue is mainly about reading order, use `review_focus = hierarchy` or `layout_balance`
- If the issue is mainly about charts, use `review_focus = chart_legibility`

## Rule

Prefer the smallest issue type that actually solves the problem. Do not escalate to `full_rethink` unless the slide concept itself fails.
