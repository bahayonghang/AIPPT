# Getting Started

## 1. Understand the scope first

AIPPT is only for creating a **new deck from scratch**.

If the user already has a `.pptx`, `.ppt`, `.key`, or Google Slides file and only wants edits, review, polishing, or single-slide changes, that request should not go through the AIPPT workflow.

Core behavior is defined in [SKILL.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/SKILL.md).

## 2. Gather the right inputs

Recommended inputs include:

- topic or project name
- target audience
- presentation purpose
- desired audience action after the presentation
- page budget
- language
- source materials such as websites, white papers, reports, PDFs, or notes
- brand assets such as logo, color system, typography, icon style, and forbidden elements

If brand assets are incomplete, AIPPT can infer them only from official sources and must explicitly mark inferred items.

## 3. Follow the staged workflow

The current AIPPT flow is:

1. Stage 0: Brand and asset intake
2. Stage 1: Brief alignment hard stop
3. Stage 2: Research dossier
4. Stage 3: Sticky-note outline hard stop
5. Stage 4: Slide spec
6. Stage 5: Page plan
7. Stage 6: Style profile and delivery mode
8. Stage 7: Delivery execution
9. Stage 8: Verification and review

Important changes from the earlier workflow:

- `outline.approved` is now a hard execution gate
- `slide_spec` and `page_plan` are separate contracts
- `style_profile` is a first-class artifact
- `review_report` and `delivery_manifest` are part of the formal delivery surface

## 4. Choose a delivery mode

If the user does not specify one, the skill should conservatively default to `prompt_bundle_only`.

Available modes:

- `prompt_bundle_only`
- `svg_pages`
- `brand_ready_assets`

## 5. Use the script layer

These npm scripts are now exposed by `docs/package.json`. Enter the `docs/` directory before running them.

```bash
cd docs
npm run aippt:build-prompts
npm run aippt:validate-artifacts
npm run aippt:validate-svg
npm run aippt:build-preview
```

These map to:

- [build-prompt-bundle.mjs](D:/Documents/Code/Agents/AIPPT/skills/aippt/scripts/build-prompt-bundle.mjs)
- [validate-artifacts.mjs](D:/Documents/Code/Agents/AIPPT/skills/aippt/scripts/validate-artifacts.mjs)
- [validate-svg.mjs](D:/Documents/Code/Agents/AIPPT/skills/aippt/scripts/validate-svg.mjs)
- [build-preview.mjs](D:/Documents/Code/Agents/AIPPT/skills/aippt/scripts/build-preview.mjs)

## 6. Run the documentation site

Start the local documentation site:

```bash
cd docs
npm install
npm run docs:dev
```

Build the static site:

```bash
cd docs
npm run docs:build
```

Preview the build:

```bash
cd docs
npm run docs:preview
```
