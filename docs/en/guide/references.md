# References and Resource Layer

AIPPT behavior is defined by:

- `skills/aippt/SKILL.md`
- `skills/aippt/references/`
- `skills/aippt/scripts/`
- `skills/aippt/evals/`

Canonical index: `skills/aippt/references/resource-registry.md`

## Stage-mapped references

### Stage 0 / 6

- `brand-intake.md`
- `style-vocabulary.md`

### Stage 2

- `research-protocol.md`

### Stage 3

- `argument-architecture.md`
- `ghost-deck-playbook.md`
- `outline-prompt.md`
- `narrative-rhythm.md`
- `cognitive-design-principles.md`

### Stage 4

- `slide-spec-schema.md`
- `exhibit-intent-taxonomy.md`
- `resource-menu.md`

### Stage 5

- `bento-grid-system.md`
- `page-plan-schema.md`
- `resource-menu.md`

### Stage 7

- `design-prompt.md`

### Stage 8

- `review-taxonomy.md`
- `svg-quality-checklist.md`
- `narrative-rhythm.md`

## Style resources

- `styles/index.json` (registry)
- `styles/*.yaml` (preset token definitions)

The output contract should expose style tokens (`palette_roles`, `typography_roles`) rather than only preset IDs.

## Script layer

- `build-prompt-bundle.mjs`
  - builds page prompts + enriched delivery manifest
  - enforces claim/question/intent consistency
- `validate-artifacts.mjs`
  - validates argument + production contracts
  - includes rhythm checks
  - supports `--allow-legacy=true`
- `validate-svg.mjs`
  - validates SVG hard rules
  - optional source-ref checks with `--page-plan` / `--manifest`
- `build-preview.mjs`
  - builds static preview HTML

## Evals

- `evals/evals.json` (workflow + contract quality)
- `evals/trigger-evals.json` (trigger boundaries + near misses)
- `references/eval-prompts.md` (human-readable set)

## Maintenance order

When workflow changes, update in this order:

1. `resource-registry.md`
2. `SKILL.md`
3. schema references
4. scripts
5. evals
6. docs pages
