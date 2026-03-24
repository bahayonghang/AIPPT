# References and Resource Layer

Current AIPPT behavior is defined by [SKILL.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/SKILL.md), `references/`, `styles/`, `scripts/`, `assets/`, and `evals/`.

## Core definition

### `skills/aippt/SKILL.md`

The main skill file defines:

- scope and non-goals
- the staged workflow
- the artifact contract
- output modes
- Office compatibility notes
- review and verification rules
- regression-testing entry points

## References

### `references/brand-intake.md`

Used in Stage 0. Defines the intake checklist, brand signal priority, intake questions, and the `brand_profile` template.

### `references/research-protocol.md`

Used in Stage 2. Defines source priority, source entry templates, research dossier structure, and anti-fabrication rules.

### `references/cognitive-design-principles.md`

Used in Stages 3 and 8. Defines working-memory guidance, hierarchy checks, and density limits tied to `story_role`.

### `references/outline-prompt.md`

Used in Stage 3. Defines the outline prompt, sticky-note preview requirements, and the `approved` hard-stop gate.

### `references/slide-spec-schema.md`

Used in Stage 4. Defines the `slide_spec` structure, content budgets, `story_role`, and `review_focus`.

### `references/bento-grid-system.md`

Used in Stage 5. Defines canonical layout names, coordinates, card sizes, spacing rules, special page prototypes, and anti-patterns.

### `references/page-plan-schema.md`

Used in Stage 5. Defines `page_plan`, including `final_layout`, `card_map`, `citations_placement`, and `overflow_strategy`.

### `references/design-prompt.md`

Used in Stage 7. Converts `slide_spec + page_plan + style_profile` into a render-ready SVG prompt and includes review-driven fix placeholders.

### `references/review-taxonomy.md`

Used in Stage 8. Defines the portable typed review system:

- `attribute_change`
- `layout_restructure`
- `full_rethink`
- `content_reduction`
- `deck_coordination`

### `references/svg-quality-checklist.md`

Used in Stage 8. Defines both hard-rule validation and typed refinement.

### `references/eval-prompts.md`

Human-readable regression prompts for routing quality and workflow completeness.

## Style registry

### `references/styles/index.json`

The style registry currently includes:

- `business`
- `tech`
- `minimal`
- `scientific`
- `editorial-infographic`
- `creative`

### `references/styles/*.yaml`

Each preset defines:

- palette
- typography
- card style
- chart colors
- layout bias
- slide-type overrides

## Scripts

### `scripts/build-prompt-bundle.mjs`

Builds per-slide prompt bundles from `slide_spec + page_plan + style_profile + brand_profile`.

### `scripts/validate-artifacts.mjs`

Validates one-to-one mapping and contract consistency across `outline`, `slide_spec`, `page_plan`, and `delivery_manifest`.

### `scripts/validate-svg.mjs`

Validates SVG hard rules such as viewBox, font floor, safe-zone issues, and footer citations.

### `scripts/build-preview.mjs`

Builds a static HTML preview from a directory of SVG files.

## Assets

### `assets/preview-template.html`

Static preview template used by `build-preview.mjs`.

## Evals

### `evals/evals.json`

Machine-readable workflow eval set covering positive and negative cases.

### `evals/trigger-evals.json`

Machine-readable trigger eval set for later description optimization.

## Maintenance recommendation

When the workflow changes, keep these artifacts aligned:

- `SKILL.md`
- reference templates and schemas
- style registry and preset files
- script input and output contracts
- the VitePress documentation site under `docs/`
