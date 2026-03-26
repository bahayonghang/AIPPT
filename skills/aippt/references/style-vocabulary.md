# Style Vocabulary

Use this file in **Stage 0** and **Stage 6**.

This vocabulary defines portable style tokens for AIPPT contracts.

## Style direction

Choose one primary `style_direction`:

- `institutional`
- `data-forward`
- `editorial`
- `minimal`
- `modern-product`
- `high-contrast`

Direction influences composition and emphasis behavior, not brand overrides.

## Palette roles (8 required)

`style_profile.palette_roles` should define all roles:

1. `surface_dark`
2. `surface`
3. `surface_muted`
4. `text`
5. `text_muted`
6. `accent`
7. `positive`
8. `warning`

Optional:

- `negative`
- `text_on_dark`
- `chart_primary`
- `chart_secondary`

Brand colors override preset colors when conflict exists.

## Typography roles

`style_profile.typography_roles` should include:

- `heading`:
  - `font_family`
  - `weights`
  - `tracking`
- `body`:
  - `font_family`
  - `weights`
  - `line_height`
- `meta`:
  - `font_family`
  - `size_floor`

## Brand override rules

`style_profile.brand_override_rules` should state:

- which brand constraints are mandatory
- which preset defaults were replaced
- what was inferred vs confirmed

## Practical rule

Do not encode style as only one preset name. Always expose tokens so downstream prompts remain deterministic and editable.
