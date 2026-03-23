# AIPPT

## Recommended Installation

Install the skill with:

```bash
npx skills add bahayonghang/AIPPT
```

AIPPT is a Claude Code skill for creating brand-aware, research-backed presentation decks from scratch.

It turns a topic, brief, website, white paper, notes, or brand assets into a complete deck workflow with brand intake, evidence-based research, outline generation, slide specifications, page planning, and final delivery artifacts.

## Features

- Build a **new deck from scratch** instead of editing an existing PPTX.
- Start from a topic, brief, website, PDF, notes, or brand assets.
- Enforce a staged workflow: brand intake → brief alignment → research → outline → slide spec → page planning → delivery → verification.
- Support three delivery modes:
  - `prompt_bundle_only`
  - `svg_pages`
  - `brand_ready_assets`
- Keep claims traceable with source IDs and research dossiers.
- Use canonical slide layouts defined by the Bento grid system.
- Validate deliverables with an SVG quality checklist.

## Project Structure

```text
skills/aippt/
├── SKILL.md
└── references/
    ├── bento-grid-system.md
    ├── brand-intake.md
    ├── design-prompt.md
    ├── eval-prompts.md
    ├── outline-prompt.md
    ├── research-protocol.md
    ├── slide-spec-schema.md
    └── svg-quality-checklist.md
```

## Quick Start

### 1. Open the skill definition

Read the core skill file:

```text
skills/aippt/SKILL.md
```

### 2. Use the skill for new-deck requests

Typical trigger examples:

```text
Help me create a new company introduction deck from scratch.
Build a new investor pitch deck for an AI SaaS product.
Create a new 45-minute teaching slide deck about Transformer basics.
```

### 3. Follow the workflow

AIPPT is designed around these stages:

1. Brand & asset intake
2. Brief alignment
3. Research protocol
4. Outline + slide spec
5. Page planning
6. Output mode execution
7. Verification

## When to Use

Use AIPPT when the user wants to:

- create a **new** presentation deck
- build a deck from a topic, materials, or brand constraints
- generate research-backed slide structures and planning artifacts
- prepare SVG-ready prompts or brand-ready handoff assets

## When Not to Use

Do not use AIPPT for:

- editing an existing `.pptx`, `.ppt`, `.key`, or Google Slides file
- polishing or reviewing an existing finished deck
- modifying a single slide in an existing template
- promising native Office export when Office automation is unavailable

## Delivery Modes

### `prompt_bundle_only`
Return portable page prompts, brand summary, outline, slide spec, and rendering notes.

### `svg_pages`
Return page prompts plus per-page SVG outputs when the runtime can safely generate SVG.

### `brand_ready_assets`
Return a designer/operator handoff package with brand guidance, page family rules, usage rules, prompt bundle, and optional SVG pages.

## Reference Documents

The skill behavior is defined by these reference files:

- `skills/aippt/references/brand-intake.md`
- `skills/aippt/references/research-protocol.md`
- `skills/aippt/references/outline-prompt.md`
- `skills/aippt/references/slide-spec-schema.md`
- `skills/aippt/references/bento-grid-system.md`
- `skills/aippt/references/design-prompt.md`
- `skills/aippt/references/svg-quality-checklist.md`
- `skills/aippt/references/eval-prompts.md`

## Documentation

- English README: `README.md`
- Chinese README: `README_CN.md`
- VitePress docs: `docs/`

## Development

This repository now includes a minimal VitePress documentation setup.

```bash
npm install
npm run docs:dev
```

Build static documentation:

```bash
npm run docs:build
```

Preview the built site:

```bash
npm run docs:preview
```

## Contributing

Keep documentation aligned with the actual skill behavior in `skills/aippt/SKILL.md` and the files under `skills/aippt/references/`.

When updating the workflow, also update the VitePress docs and both README files.

## License

TODO: Add a project license if you want to publish or distribute this skill repository.
