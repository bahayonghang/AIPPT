# Resource Registry

Use this file as the single routing map for AIPPT references, scripts, assets, and evals.

Load only stage-relevant files. Avoid full-library loading by default.

## Core workflow references

| Stage | File | Purpose |
| --- | --- | --- |
| Stage 0 | `brand-intake.md` | brand signals, source trust order, inference boundaries |
| Stage 0 / 6 | `style-vocabulary.md` | style direction, palette roles, typography roles, override rules |
| Stage 2 | `research-protocol.md` | source policy, dossier schema, anti-fabrication |
| Stage 3 | `argument-architecture.md` | governing thought, pillars, proof chain |
| Stage 3 | `ghost-deck-playbook.md` | archetypes, transitions, quality gates |
| Stage 3 | `outline-prompt.md` | outline JSON template with hard-stop approval gate |
| Stage 3 / 8 | `narrative-rhythm.md` | pacing and repetition control |
| Stage 3 / 8 | `cognitive-design-principles.md` | hierarchy and readability heuristics |
| Stage 4 | `slide-spec-schema.md` | per-slide WHAT contract |
| Stage 4 | `exhibit-intent-taxonomy.md` | proof question to exhibit intent routing |
| Stage 4 / 5 | `resource-menu.md` | compact decision menu for layout/rhythm/citation choices |
| Stage 5 | `bento-grid-system.md` | canonical layout geometry |
| Stage 5 | `page-plan-schema.md` | per-slide HOW contract |
| Stage 7 | `design-prompt.md` | render prompt template |
| Stage 8 | `review-taxonomy.md` | typed refinement issues |
| Stage 8 | `svg-quality-checklist.md` | deterministic SVG hard-rule checks |
| Regression | `eval-prompts.md` | human-readable evaluation catalog |

## Scene resources

| File | Purpose |
| --- | --- |
| `scenes/scene-catalog.json` | scene-pack index and subskill routing map |
| `scenes/*.json` | scene-specific defaults for sections, story arc, style bias, delivery default, review bias |
| `subskills/<scene>/SKILL.md` | narrow workflow surface for a matched scene |
| `subskills/<scene>/references/outline-starter.md` | default scene outline starter |

## Style resources

| File | Purpose |
| --- | --- |
| `styles/index.json` | style preset registry and keyword routing |
| `styles/business.yaml` | business/board default token profile |
| `styles/tech.yaml` | product/technology token profile |
| `styles/minimal.yaml` | low-decoration executive profile |
| `styles/scientific.yaml` | teaching/research profile |
| `styles/editorial-infographic.yaml` | data-story heavy profile |
| `styles/creative.yaml` | bold campaign profile |

## Scripts

| Script | Purpose |
| --- | --- |
| `scripts/list-catalog.mjs` | list scene packs, style presets, delivery modes, and validators |
| `scripts/init-workspace.mjs` | initialize `output/` tree and `output/project.json` |
| `scripts/create-scene-pack.mjs` | scaffold a new scene pack, subskill, outline starter, and eval stub |
| `scripts/build-prompt-bundle.mjs` | generate per-slide prompt files + delivery manifest |
| `scripts/validate-artifacts.mjs` | validate contract consistency and rhythm/argument checks |
| `scripts/validate-svg.mjs` | validate SVG hard rules and optional source-ref consistency |
| `scripts/build-preview.mjs` | generate static preview HTML from SVG pages |
| `scripts/_shared.mjs` | shared parsing and helper utilities |

## Assets

| File | Purpose |
| --- | --- |
| `assets/preview-template.html` | preview template used by `build-preview.mjs` |

## Evals

| File | Purpose |
| --- | --- |
| `evals/evals.json` | workflow regression and contract-quality cases |
| `evals/trigger-evals.json` | trigger-boundary and near-miss cases |
| `evals/scene-stubs/*.json` | scene-pack scaffold stubs for future route coverage |

## Loading guidance

- Start with `scene-catalog.json` when the request smells like a repeated deck archetype.
- Stage 3: always load `argument-architecture.md` and `ghost-deck-playbook.md` together.
- Stage 4: load `exhibit-intent-taxonomy.md` before finalizing `exhibit_intent`.
- Stage 5: consult `resource-menu.md` to avoid repetitive layouts and proof walls.
- Stage 8: use `narrative-rhythm.md` plus validator output before issuing review decisions.
- If a reference is cited in docs or README, point back to this registry or `list-catalog.mjs` instead of duplicating file lists.
