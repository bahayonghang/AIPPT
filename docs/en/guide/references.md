# References

The actual AIPPT behavior is defined by `skills/aippt/SKILL.md` and the reference files under `skills/aippt/references/`.

## Core definition

### `skills/aippt/SKILL.md`

This is the main skill file. It defines:

- scope
- non-goals
- capability assumptions
- core rules
- staged workflow
- output modes
- Office compatibility note
- verification rules
- regression testing entry point

## Reference files

### `skills/aippt/references/brand-intake.md`

Used in Stage 0. Defines the intake checklist, brand signal priority, direct intake questions, and the `brand_profile` template.

### `skills/aippt/references/research-protocol.md`

Used in Stage 2. Defines source priority, source entry templates, research dossier structure, and anti-fabrication rules.

### `skills/aippt/references/outline-prompt.md`

Used in Stage 3A. Defines the outline prompt structure, JSON wrapper format, and story-first requirements.

### `skills/aippt/references/slide-spec-schema.md`

Used in Stage 3B. Defines the `slide_spec` fields, page-budget guidance, and structural rules.

### `skills/aippt/references/bento-grid-system.md`

Used in Stage 4. Defines canonical layout names, coordinates, card sizes, spacing rules, special page prototypes, and anti-patterns.

### `skills/aippt/references/design-prompt.md`

Used in Stage 5. Converts page plans into render-ready SVG prompts with rules for canvas, typography, citations, overflow handling, and placeholders.

### `skills/aippt/references/svg-quality-checklist.md`

Used in Stage 6. Validates research integrity, story completeness, layout integrity, typography, asset handling, citations, SVG technical quality, and delivery completeness.

### `skills/aippt/references/eval-prompts.md`

Used for regression testing. Includes positive and negative trigger cases to validate routing quality and workflow completeness.

## Maintenance recommendation

When the skill workflow changes, keep these artifacts aligned:

- `SKILL.md`
- reference file templates and schemas
- both README files
- the VitePress documentation site under `docs/`
