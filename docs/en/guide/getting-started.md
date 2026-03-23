# Getting Started

## 1. Understand the scope first

AIPPT is only for creating a **new deck from scratch**.

If the user already has a `.pptx`, `.ppt`, `.key`, or Google Slides file and only wants edits, review, polishing, or single-slide changes, that request should not go through the AIPPT workflow.

Core behavior is defined in: `skills/aippt/SKILL.md`

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

The standard AIPPT flow is:

1. Stage 0: Brand & asset intake
2. Stage 1: Brief alignment
3. Stage 2: Research protocol
4. Stage 3: Outline + slide spec
5. Stage 4: Page planning
6. Stage 5: Output mode execution
7. Stage 6: Verification

## 4. Choose a delivery mode

If the user does not specify one, the skill should conservatively default to `prompt_bundle_only`.

Available modes:

- `prompt_bundle_only`
- `svg_pages`
- `brand_ready_assets`

## 5. Run the documentation site

Start the local documentation site:

```bash
npm install
npm run docs:dev
```

Build the static site:

```bash
npm run docs:build
```

Preview the build:

```bash
npm run docs:preview
```
