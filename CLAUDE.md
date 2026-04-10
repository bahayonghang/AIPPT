# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

AIPPT is a **Claude Code skill package** (not an application). The shippable unit is `skills/aippt/`, a contract-first workflow for building brand-new decks from scratch. It is the strategy and contract layer — it is **not** a `.pptx/.ppt/.key` editor, not a `deck.json` runtime, and not an export tool. Existing-deck edits, critique-only, template tweaks, and single-slide requests are out of scope and must not be added here.

See `skills/aippt/SKILL.md` for the canonical positioning and workflow definition.

## Build / validate / docs commands

There is no root `package.json`. All npm scripts live in `docs/` and must be run from there:

```bash
cd docs
npm install                      # first-time only
npm run aippt:list-catalog       # list scenes, styles, delivery modes, validators
npm run aippt:init-workspace -- --output-dir ../output --scene-id investor-pitch
npm run aippt:build-prompts -- --slide-spec ... --page-plan ... --scene-pack ...
npm run aippt:validate-artifacts -- --outline ... --slide-spec ... --scene-pack ...
npm run docs:dev                 # VitePress docs site
```

Task runner (`justfile`) uses **PowerShell** on Windows (`pwsh.exe`), not bash:

- `just ci` — runs `node --check` on every script in `skills/aippt/scripts/` and then `docs:build`. This is the only automated quality gate — there is no test runner, no linter, no type checker. After editing any `.mjs` script, run `just ci` before claiming done.

## Hard gates (non-negotiable)

These gates exist in the skill contract and must be preserved across every change:

- **First outline pass must emit `outline.approved=false`.** No `slide_spec`, `page_plan`, prompt bundle, or SVG may be produced before explicit outline approval.
- **`delivery_manifest` is only valid after deterministic validator checks pass** (`validate-artifacts.mjs`, `validate-svg.mjs`).
- **Scene packs refine defaults, never bypass gates.** Routing into a subskill does not skip approval.
- **Do not introduce new top-level wrapper tags.** The canonical set is `[RESEARCH_DOSSIER]`, `[PPT_OUTLINE]`, `[SLIDE_SPEC]`, `[PAGE_PLAN]`, `[STYLE_PROFILE]`, `[REVIEW_REPORT]`, `[DELIVERY_MANIFEST]`.

If a change appears to weaken any of these, stop and confirm with the user first.

## Scene pack routing

Before running the generic workflow, check `skills/aippt/references/scenes/scene-catalog.json` for a matching scene pack (`company-intro`, `investor-pitch`, `board-briefing`, `policy-briefing`, `teaching-deck`, `thesis-defense`). If matched, load `skills/aippt/subskills/<scene>/SKILL.md` first and apply its defaults before resuming the generic stages. Scene packs set `required_sections`, `default_story_arc`, `preferred_style_preset`, `delivery_default`, `review_bias`, `audience_density_bias`, `layout_tendency` — and these values must propagate into downstream contracts, not just prose.

New scene packs are scaffolded with `scripts/create-scene-pack.mjs`, never hand-assembled.

## Single source of truth for file routing

`skills/aippt/references/resource-registry.md` is the canonical map for stage references, style presets, scene packs, scripts, and eval files. **Do not duplicate long file inventories in README, docs, SKILL.md prose, or script comments.** When a file list is needed, either link to the registry or point at `npm run aippt:list-catalog`. When adding or removing a reference/script/scene, update the registry in the same change.

## Mandatory update order when workflow behavior changes

When a change touches skill behavior, update files in this exact order so downstream consumers stay consistent:

1. scene pack JSON / style metadata
2. `skills/aippt/references/resource-registry.md`
3. `skills/aippt/SKILL.md`
4. `skills/aippt/scripts/*.mjs`
5. `skills/aippt/evals/{evals.json, trigger-evals.json}` and `references/eval-prompts.md`
6. `README.md` / `README_CN.md` / `docs/`

Skipping a step leaks inconsistency. The registry and evals are the most commonly forgotten.

## Code conventions

- **Plain Node.js ESM `.mjs` only.** No TypeScript, no bundler, no transpile. Scripts run directly via `node path/to/script.mjs`.
- **Shared helpers belong in `skills/aippt/scripts/_shared.mjs`.** Do not re-implement arg parsing, JSON read/write, path resolution, scene/style loading, or style-instruction building — reuse the exports there.
- **Script CLIs use `--flag value` and `--flag=value` form** (see `parseArgs` in `_shared.mjs`). Keep new flags in that style.
- **No new top-level directories under `skills/aippt/`** without updating `resource-registry.md` and the loader helpers in `_shared.mjs`.
- **Keep file and comment language consistent with the existing file being edited.** Most references and SKILL.md are English; some docs are Chinese — match what is already there.

## Preferences and config

User/project defaults come from `./.aippt/EXTEND.json` then `~/.aippt/EXTEND.json`, resolved by `scripts/read-preferences.mjs`. Supported keys are defined in `references/config/preferences-schema.md`. Do not read preferences from ad-hoc locations.

## Regression coverage expectations

Every workflow change must keep the three eval layers aligned:

- `evals/evals.json` — workflow regression and contract quality
- `evals/trigger-evals.json` — trigger-boundary and near-miss cases
- `references/eval-prompts.md` — human-readable catalog

Required invariants:

- generic new-deck requests still trigger AIPPT
- existing-deck edits, critique-only, and template tweaks still **do not** trigger
- each built-in scene pack has one positive route test and one near-miss negative test
- scene routing never bypasses `outline.approved=false`

## Gitignored paths (do not commit)

`node_modules/`, `output/` (the runtime workspace), `ref/` (external reference material), `.omc/`, `.omx/`, and VitePress cache/dist. If a generated artifact needs to be committed for review, stage it explicitly rather than loosening `.gitignore`.

## Partial regeneration rule

AIPPT still does not edit third-party decks. However, for artifacts generated **inside** this workflow, partial regeneration of named `slide_id`s is allowed only when: outline approval already happened, the scope stays inside `page_plan` / prompt bundle / review report / SVG output, and validation is rerun before claiming success.
