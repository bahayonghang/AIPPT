# Review Taxonomy

Use this file in **Stage 8** after deterministic validation.

The goal is to convert vague feedback into typed, actionable revisions.

## Review layers

1. Deterministic validation (`validate-artifacts`, `validate-svg`)
2. Typed refinement on remaining quality issues

## Issue types

### 1. `attribute_change`

Precise property tweaks with no layout rethink.

Examples:

- font size too small
- accent contrast too weak
- citation chip opacity too low

### 2. `layout_restructure`

Layout choice is wrong but slide concept remains valid.

Examples:

- main claim hidden in a secondary card
- evidence should move to hero+sidebar instead of equal columns

### 3. `full_rethink`

Slide concept itself fails and patching is not enough.

Examples:

- wrong proof shape for the question
- impossible density for one page

### 4. `content_reduction`

Clarity blocked by excess content.

Examples:

- too many bullets/cards
- long paragraphs in narrow slots

### 5. `deck_coordination`

Cross-slide pacing and consistency issues.

Examples:

- repeated layout families across adjacent slides
- no breathing slide in dense proof cluster

### 6. `evidence_repair`

Source traceability or evidence display issues.

Examples:

- source refs missing from render
- proof claim unsupported by cited evidence

### 7. `argument_consistency`

Argument chain mismatch between contracts.

Examples:

- `outline.argument_claim` and `slide_spec.argument_claim` diverge unexpectedly
- `page_plan.proof_trace` does not match `slide_spec.proof_question`

## Priority levels

- `1`: must fix
- `2`: should fix
- `3`: nice to have

## Review report shape

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
        "type": "argument_consistency",
        "priority": 1,
        "slide_id": "S05",
        "review_focus": "hierarchy",
        "description": "proof_trace.question does not match slide proof_question",
        "action": "Align page_plan proof_trace with slide_spec and re-generate prompt"
      }
    ],
    "next_step": "render | revise_page_plan | revise_slide_spec | split_slide"
  }
}
[/REVIEW_REPORT]
```

## Mapping guidance

- factual visibility issues -> `evidence_repair`
- clutter/density issues -> `content_reduction`
- reading-order issues -> `layout_restructure` or `attribute_change`
- cross-slide pacing issues -> `deck_coordination`
- contract mismatch issues -> `argument_consistency`

Prefer the smallest issue type that resolves the failure.
