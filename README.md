# AIPPT

## Installation

Install the skill with:

```bash
npx skills add bahayonghang/AIPPT
```

AIPPT is a Claude Code skill for building a **new presentation deck from scratch** with a research-driven workflow.

It turns a topic, brief, website, white paper, PDF, notes, or brand asset pack into a complete deck contract with:

- brand intake
- brief alignment
- evidence-backed research
- sticky-note outline approval
- slide spec
- page plan
- style profile
- delivery manifest

## What AIPPT is for

Use AIPPT when the user wants:

- a new company introduction deck
- a new investor pitch deck
- a product launch or keynote deck
- a teaching slide deck
- an annual review or board deck
- a policy or market briefing deck
- a full deck workflow rather than one-off slide drafting

Trigger it even when the user says “help me make a PPT about X” or “turn these materials into a presentation”, as long as the intent is a **new deck**, not edits to an existing file.

## What AIPPT is not for

Do **not** use AIPPT for:

- editing an existing `.pptx`, `.ppt`, `.key`, or Google Slides file
- reviewing or critiquing a finished deck
- changing a few pages inside an existing template
- polishing copy only
- creating only a cover page
- returning only a lightweight outline with no downstream deck-planning workflow

## Workflow

AIPPT keeps a strict 8-stage flow:

1. Stage 0: Brand and asset intake
2. Stage 1: Brief alignment hard stop
3. Stage 2: Research dossier
4. Stage 3: Sticky-note outline hard stop
5. Stage 4: Slide spec
6. Stage 5: Page plan
7. Stage 6: Style profile and delivery mode
8. Stage 7: Delivery execution
9. Stage 8: Verification and review

Key gates:

- `outline.approved` must remain `false` until the outline is reviewed
- `slide_spec` and `page_plan` are separate contracts and must both exist before rendering
- SVG output is not considered ready until hard-rule validation passes

## Artifact contract

Planned deck artifacts:

- `brand_profile`
- `brief_summary`
- `research_dossier`
- `outline`
- `slide_spec`
- `page_plan`
- `style_profile`

Delivered deck artifacts:

- `delivery_manifest`
- `review_report` when validation or refinement finds issues

## Delivery modes

AIPPT supports three delivery modes:

- `prompt_bundle_only`
- `svg_pages`
- `brand_ready_assets`

Default conservatively to `prompt_bundle_only` unless the user explicitly wants SVG pages or a handoff package.

## Preferred output tree

When filesystem access is available, AIPPT should write artifacts under:

```text
output/
├── briefing/
├── specs/
├── prompts/
├── svg/
└── preview/
```

Mode-specific expectations:

- `prompt_bundle_only`: `briefing/`, `specs/`, `prompts/`
- `svg_pages`: everything above plus `svg/`, optionally `preview/`
- `brand_ready_assets`: everything from `prompt_bundle_only`, plus handoff guidance and optional SVG pages

## References and resource layer

The skill definition lives in:

- `skills/aippt/SKILL.md`

Core references live in:

- `skills/aippt/references/brand-intake.md`
- `skills/aippt/references/research-protocol.md`
- `skills/aippt/references/outline-prompt.md`
- `skills/aippt/references/narrative-rhythm.md`
- `skills/aippt/references/slide-spec-schema.md`
- `skills/aippt/references/resource-menu.md`
- `skills/aippt/references/bento-grid-system.md`
- `skills/aippt/references/page-plan-schema.md`
- `skills/aippt/references/design-prompt.md`
- `skills/aippt/references/review-taxonomy.md`
- `skills/aippt/references/svg-quality-checklist.md`
- `skills/aippt/references/resource-registry.md`

## Scripts

Available helper scripts:

- `build-prompt-bundle.mjs`
- `validate-artifacts.mjs`
- `validate-svg.mjs`
- `build-preview.mjs`

Run them from `docs/` with explicit arguments, for example:

```bash
cd docs
npm run aippt:validate-artifacts -- \
  --outline ../output/specs/outline.json \
  --slide-spec ../output/specs/slide-spec.json \
  --page-plan ../output/specs/page-plan.json \
  --style-profile ../output/specs/style-profile.json \
  --delivery-manifest ../output/prompts/delivery-manifest.json
```

## Evaluation

AIPPT includes:

- human-readable eval prompts: `skills/aippt/references/eval-prompts.md`
- workflow evals: `skills/aippt/evals/evals.json`
- trigger-boundary evals: `skills/aippt/evals/trigger-evals.json`

These cover:

- should-trigger new deck requests
- should-not-trigger existing-deck edits and critiques
- near-miss cases such as outline-only requests, template tweaks, or single-slide asks

## Documentation

- Chinese README: `README_CN.md`
- VitePress docs: `docs/`

Start the docs site:

```bash
cd docs
npm install
npm run docs:dev
```

Build docs:

```bash
cd docs
npm run docs:build
```

## Contributing

Keep the following in sync whenever the workflow changes:

- `skills/aippt/SKILL.md`
- `skills/aippt/references/`
- `skills/aippt/scripts/`
- `README.md`
- `README_CN.md`
- `docs/`

Use `skills/aippt/references/resource-registry.md` as the canonical map of the current resource layer.
