# Evaluation, Scripts, and Regression

AIPPT evaluation has three layers:

- human-readable prompts: `skills/aippt/references/eval-prompts.md`
- workflow evals: `skills/aippt/evals/evals.json`
- trigger-boundary evals: `skills/aippt/evals/trigger-evals.json`

## v2 evaluation focus

Beyond trigger accuracy, verify dual-contract integrity:

1. outline includes governing thought + pillars + transitions
2. each slide carries `argument_claim` + `proof_question`
3. slide spec includes `exhibit_intent` + `evidence_layer` + `fit_risk`
4. page plan includes `proof_trace` + `exhibit_blueprint` + `rhythm_slot`
5. cross-contract consistency is preserved
6. evidence refs stay traceable

## Case classes

Positive:

- new company deck
- investor pitch
- board evidence-heavy deck
- policy briefing
- teaching deck
- offline-material full deck

Negative / near-miss:

- existing deck edits
- critique-only requests
- outline-only requests
- single-page requests
- copy-polish-only requests

## Script-level checks

```bash
cd docs
npm run aippt:validate-artifacts -- \
  --outline ../output/specs/outline.json \
  --slide-spec ../output/specs/slide-spec.json \
  --page-plan ../output/specs/page-plan.json \
  --style-profile ../output/specs/style-profile.json \
  --delivery-manifest ../output/prompts/delivery-manifest.json
```

Legacy compatibility mode:

```bash
cd docs
npm run aippt:validate-artifacts -- \
  --outline ../output/specs/outline.json \
  --slide-spec ../output/specs/slide-spec.json \
  --page-plan ../output/specs/page-plan.json \
  --allow-legacy=true
```

SVG checks:

```bash
cd docs
npm run aippt:validate-svg -- \
  --input ../output/svg \
  --page-plan ../output/specs/page-plan.json \
  --manifest ../output/prompts/delivery-manifest.json
```

## Success criteria

- full new-deck requests trigger reliably
- edit/review/single-page requests do not trigger
- `validate-artifacts` passes without blocking errors
- `svg_pages` outputs pass `validate-svg`
- delivery manifest accurately describes produced assets
