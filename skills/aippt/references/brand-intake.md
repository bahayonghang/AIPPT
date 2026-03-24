# Brand And Asset Intake

Use this file in **Stage 0** before deep research or layout planning.

The goal is to constrain later design choices with real brand and asset signals rather than generic taste.

## Intake checklist

Collect these items when available:

- brand / company / product name
- official website or landing page
- company profile, brochure, annual report, white paper, PDF, notes
- logo files or logo placement rules
- official colors
- typography rules or known fonts
- icon style
- photo / illustration direction
- chart style and number-formatting rules
- tone of voice
- compliance or legal constraints
- forbidden elements
- existing sample decks or visual references

If the user cannot provide assets, infer only from official sources and mark every inferred item clearly.

## Priority order for conflicting brand signals

1. Official brand manual or design system
2. Official corporate or product website
3. Official press kit / media kit
4. User-provided approved deck
5. Neutral fallback theme

## What to ask or infer

- Which organization or product is this deck for?
- Which sources are official and safe to trust?
- Are there required colors, fonts, icon styles, or chart rules?
- Is there anything visually forbidden?
- Are there mandatory disclaimers or legal lines?
- Does the brand clearly fit one of the built-in style presets, or should we stay neutral?

## Output template

Return a compact `brand_profile` before moving on:

```markdown
## Brand Profile
- Brand: ...
- Official sources: ...
- Logo status: provided / inferred / missing
- Color system: ...
- Typography: ...
- Icon style: ...
- Photo / illustration direction: ...
- Chart rules: ...
- Tone of voice: ...
- Forbidden elements: ...
- Required disclaimers: ...
- Recommended style presets: business / tech / scientific
- Inferred items that still need confirmation: ...
```

## Fallback rule

If there is no trustworthy brand material, use a restrained neutral system and explicitly say the deck is using an inferred visual system rather than an approved brand system.
