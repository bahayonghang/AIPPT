# Repository Guidelines

## Project Structure & Module Organization
`skills/aippt/` is the source of truth. Keep workflow logic in `scripts/*.mjs`, reusable reference material in `references/`, subskill entrypoints in `subskills/*/SKILL.md`, and regression fixtures in `evals/`. Use `assets/` only for shared presentation assets such as the preview template. `docs/` contains the VitePress site, with English mirrors under `docs/en/`. Treat `output/` as generated workspace artifacts, not hand-authored source.

## Build, Test, and Development Commands
Run repo tasks from the root unless noted:

- `just docs`: start the VitePress docs site locally.
- `just docs-build`: build the docs for release verification.
- `just docs-preview`: preview the built docs locally.
- `just ci`: syntax-check the core `.mjs` scripts and run `docs:build`.
- `cd docs && npm run aippt:list-catalog`: list scenes, styles, and validators.
- `cd docs && npm run aippt:init-workspace -- --output-dir ../output --scene-id investor-pitch`: create a sample workspace.

## Coding Style & Naming Conventions
Use ES modules and keep scripts in plain `.mjs`. Follow the existing style: 2-space indentation in JSON/Markdown, kebab-case file names (`build-preview.mjs`, `policy-briefing.json`), and stable scene IDs that match `references/scenes/scene-catalog.json`. Prefer small, composable scripts over new abstractions. Do not add dependencies without a clear need; current tooling is Node + VitePress only.

## Testing Guidelines
There is no separate unit-test suite yet; validation is contract-driven. Before submitting, run `just ci` and the relevant validators from `docs/package.json`, especially `aippt:validate-artifacts` and `aippt:validate-svg` when you touch generation or SVG flows. When routing, scene logic, or trigger behavior changes, update `skills/aippt/evals/evals.json` or `skills/aippt/evals/trigger-evals.json` with a new `id` such as `scene-07-new-case`.

## Commit & Pull Request Guidelines
Recent history uses scoped Conventional Commits like `feat(aippt): ...` and `docs(aippt): ...`. Keep that subject style. This repo also requires Lore-style trailers in the commit body when committing, for example `Constraint:`, `Confidence:`, and `Tested:`. PRs should summarize user-facing impact, list affected paths, include screenshots for docs or preview changes, and note the exact validation commands you ran.

## Contributor Notes
Prefer editing canonical references once rather than duplicating inventories across docs. If you change scene metadata, keep `scene-catalog.json`, the subskill folder, and any related eval fixtures in sync.
