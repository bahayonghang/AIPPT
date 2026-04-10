# Getting Started

## 1. Decide between generic AIPPT and a scene pack

Check the catalog first:

```bash
cd docs
npm run aippt:list-catalog
```

Use a scene pack when the request clearly matches a recurring deck type such as:

- company intro
- investor pitch
- board briefing
- policy briefing
- teaching deck
- thesis defense

## 2. Initialize the workspace

```bash
cd docs
npm run aippt:init-workspace -- --output-dir ../output --scene-id investor-pitch
```

If you use defaults, prepare one of:

- `./.aippt/EXTEND.json`
- `~/.aippt/EXTEND.json`

Supported defaults include scene, style preset, delivery mode, language, strict review, and style dimensions.

## 3. Run the staged workflow

- Stage 0-2: brand, brief, research
- Stage 3: outline hard stop
- Stage 4-5: slide spec and page plan
- Stage 6-8: style, delivery, validation

The first outline must keep `approved=false`.

## 4. Build and validate

Build first, then validate.

If you are using a scene-aware workflow, pass `--scene-pack` to both scripts.

If you want to stop at a stage boundary, use staged modes:

- `outline_only`
- `spec_only`

These modes do not bypass approvals and do not generate prompt bundles early.
