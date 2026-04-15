# Evaluation

## Maintained regression sources

- `skills/aippt/evals/evals.json`
- `skills/aippt/evals/trigger-evals.json`
- `skills/aippt/references/eval-prompts.md`

## Scaffolds, not primary regression

- `skills/aippt/evals/scene-stubs/README.md`
- `skills/aippt/evals/scene-stubs/*.json`

These stubs are scaffolding and should be promoted into the main suites later.

## Critical checks

- generic triggers still work
- non-trigger boundaries do not trigger
- every built-in scene has a positive case and a near-miss negative case
- `outline.approved=false` is preserved under scene routing
- downstream artifacts reflect scene defaults, preferences, and the style instruction block
