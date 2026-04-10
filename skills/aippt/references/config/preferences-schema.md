# Preferences Schema

Use this file for project-level or user-level defaults.

## Search order

1. `./.aippt/EXTEND.json`
2. `~/.aippt/EXTEND.json`

Project config overrides user config.

## JSON shape

```json
{
  "default_scene": "investor-pitch",
  "default_style_preset": "tech",
  "default_delivery_mode": "prompt_bundle_only",
  "default_language": "zh-CN",
  "strict_review": true,
  "style_dimensions": {
    "texture": "grid",
    "mood": "cool",
    "typography": "geometric",
    "density": "balanced"
  }
}
```

## Field meanings

- `default_scene`: preferred scene-pack route when the request is ambiguous.
- `default_style_preset`: preset to use unless the scene or user overrides it.
- `default_delivery_mode`: preferred stage-7 packaging mode.
- `default_language`: default output language.
- `strict_review`: if true, favor validation + review report before delivery.
- `style_dimensions`: optional preference bias layered on top of the preset.

## Guardrail

Preferences are defaults, not hard overrides. Explicit user instructions still win.
