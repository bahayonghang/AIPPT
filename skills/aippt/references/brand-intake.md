# Brand & Asset Intake

Use this file in **Stage 0** before deep research or layout planning.

The goal is to collect enough brand and asset context that later design choices are constrained by reality instead of generic taste.

## Intake checklist

Collect these items when available:

- brand / company / product name
- official website or landing page
- company profile, white paper, annual report, brochure, PDFs, notes
- logo files or logo placement rules
- official colors
- preferred fonts or type hierarchy
- icon style
- photo / illustration direction
- chart style and number formatting rules
- tone of voice
- compliance or legal constraints
- forbidden elements
- existing sample decks or visual references

If the user cannot provide assets, infer only from official sources and clearly mark each inferred decision.

## Priority order for conflicting brand signals

1. Official brand manual or design system
2. Official corporate website or product site
3. Official press kit / media kit
4. Existing approved deck from the user
5. Neutral fallback theme

## What to ask

Use direct, practical questions:

- Which organization or product is this deck for?
- Do you already have an official website, PDF, logo, or sample deck?
- Are there required brand colors, fonts, or icon styles?
- Is there anything visually forbidden?
- Do charts need to match an internal style?
- Are there any mandatory disclaimers or compliance rules?

## Output template

Return a compact brand profile before moving on:

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
- Inferred items that still need confirmation: ...
```

## Fallback rule

If there is no trustworthy brand material, use a restrained neutral system and explicitly say the deck is using an inferred visual system rather than an approved brand system.
