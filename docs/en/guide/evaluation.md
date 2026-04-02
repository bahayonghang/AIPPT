# Evaluation

AIPPT v3 evaluation now covers:

1. generic workflow regression
2. trigger-boundary regression
3. scene-pack routing regression
4. scene-aware validator regression

Machine-readable sources:

- `skills/aippt/evals/evals.json`
- `skills/aippt/evals/trigger-evals.json`
- `skills/aippt/evals/scene-stubs/*.json`

Human-readable prompts:

- `skills/aippt/references/eval-prompts.md`

Critical checks:

- generic new-deck requests still trigger
- existing-deck edit/review cases still do not trigger
- every built-in scene has a positive route test and a near-miss negative case
- `outline.approved=false` is preserved under scene routing
- `validate-artifacts --scene-pack` checks sections, story arc, and review bias
