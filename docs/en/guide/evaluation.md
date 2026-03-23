# Evaluation

AIPPT ships with a regression prompt set in `skills/aippt/references/eval-prompts.md`.

Its purpose is to validate both **trigger quality** and **workflow completeness**.

## What to evaluate

Each test case should check:

1. whether `aippt` triggered or stayed silent correctly
2. whether brand and brief context were collected where needed
3. whether source-backed research outputs kept source IDs visible
4. whether both `outline` and `slide_spec` were produced
5. whether the chosen layout family and output mode made sense

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

Those tasks belong to deck editing or review workflows, not to AIPPT's new-deck workflow.

## Recommended regression checks

After updating these files, rerun the evaluation prompts:

- `skills/aippt/SKILL.md`
- `skills/aippt/references/outline-prompt.md`
- `skills/aippt/references/slide-spec-schema.md`
- `skills/aippt/references/bento-grid-system.md`
- `skills/aippt/references/design-prompt.md`

Confirm that:

- new-deck prompts still trigger reliably
- existing-deck edit prompts still do not trigger
- fact-heavy slides still keep citation refs visible
- outline and slide spec remain one-to-one
- page planning still uses canonical layouts instead of ad-hoc coordinates

## Success criteria

According to `eval-prompts.md`, a healthy AIPPT should:

- reliably recognize new-deck requests
- avoid swallowing existing-deck edit requests
- produce source-backed `outline`
- produce source-backed `slide_spec`
- keep page-planning and delivery outputs verifiable
