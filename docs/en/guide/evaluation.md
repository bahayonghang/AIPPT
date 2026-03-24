# Evaluation, Scripts, and Regression

AIPPT now ships with:

- human-readable evaluation prompts: `skills/aippt/references/eval-prompts.md`
- machine-readable workflow evals: `skills/aippt/evals/evals.json`
- machine-readable trigger evals: `skills/aippt/evals/trigger-evals.json`

Together they validate **trigger quality**, **workflow completeness**, and **tooling contract consistency**.

## What to evaluate

Each test case should check:

1. whether `aippt` triggered or stayed silent correctly
2. whether brand and brief context were collected where needed
3. whether source-backed research outputs kept source IDs visible
4. whether `outline`, `slide_spec`, `page_plan`, and `style_profile` were all produced
5. whether rendering was blocked before `outline.approved = true`
6. whether the chosen layout family and delivery mode made sense
7. whether `delivery_manifest` and `review_report` were available when needed

## Positive trigger cases

These requests should trigger AIPPT:

- company introduction deck
- investor pitch deck
- product launch slides
- teaching deck
- annual business review deck
- dense board or market report deck
- policy interpretation deck
- offline-material-only deck creation

Shared condition:

> the user wants to create a new presentation deck from scratch.

## Negative trigger cases

These requests should not trigger AIPPT:

- editing a specific slide in an existing PPTX
- reviewing or critiquing an already finished deck
- tweaking one page layout or title
- creating only a cover image or one-off slide asset

Those tasks belong to editing, review, or single-slide creation workflows, not to AIPPT's new-deck workflow.

## Recommended regression checks

After updating these files, rerun evaluation:

- `skills/aippt/SKILL.md`
- `skills/aippt/references/outline-prompt.md`
- `skills/aippt/references/slide-spec-schema.md`
- `skills/aippt/references/page-plan-schema.md`
- `skills/aippt/references/design-prompt.md`
- `skills/aippt/references/review-taxonomy.md`
- `skills/aippt/references/styles/*.yaml`

## Script validation layer

In addition to prompt regression, run:

```bash
cd docs
npm run aippt:validate-artifacts
npm run aippt:validate-svg
```

These validate:

- one-to-one mapping across `outline`, `slide_spec`, `page_plan`, and `delivery_manifest`
- SVG hard rules such as viewBox, font floor, safe-zone placement, and footer citations

## Success criteria

A healthy current AIPPT should:

- reliably recognize new-deck requests
- avoid swallowing existing-deck edit requests
- consistently produce `brand_profile`, `brief_summary`, and `research_dossier`
- consistently produce `outline`, `slide_spec`, `page_plan`, and `style_profile`
- block rendering when `outline.approved = false`
- keep planning outputs and delivery outputs verifiable
