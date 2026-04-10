# Style Instruction Schema

Use this file in **Stage 6** and **Stage 7**.

This schema defines the render-facing summary layer derived from `style_profile + slide_spec + page_plan`.

It does not replace `style_profile`. It makes style portable for prompt bundles, SVG generation, and downstream renderers.

## Purpose

Create one compact style block that downstream generators can consume without re-deriving visual logic from multiple files.

## Required output shape

Embed this under `style_profile.style_instruction_block`.

```json
{
  "style_instruction_block": {
    "design_direction": "Clean executive narrative with product-grade contrast.",
    "background_strategy": "Keep surfaces dark, reserve accent color for evidence and CTA states.",
    "heading_style": "Bold geometric sans with tight tracking and strong contrast.",
    "body_style": "Neutral sans body copy with stable line height and short paragraphs.",
    "visual_elements": [
      "Use one hero evidence container before secondary support cards.",
      "Prefer simple dividers, chips, and metric rails over ornamental illustration."
    ],
    "density_rule": "Balanced density: 2-4 content zones, no paragraph walls, whitespace must preserve scan order.",
    "do_rules": [
      "Lead with the claim before evidence detail.",
      "Keep citation carriers visible in the chosen citation mode."
    ],
    "dont_rules": [
      "Do not mix multiple visual metaphors on one page.",
      "Do not use accent color on low-priority metadata."
    ]
  }
}
```

## Derivation rules

1. `design_direction` should translate `style_direction + style_dimensions` into human-readable art direction.
2. `background_strategy` must explain how surface roles and contrast should behave.
3. `heading_style` / `body_style` should describe appearance, not just raw font names.
4. `visual_elements` should mention repeatable page primitives.
5. `density_rule` must align with the selected density dimension.
6. `do_rules` / `dont_rules` should be short, concrete, and render-relevant.

## Practical rule

If a renderer can only load one style payload, prefer this block plus the raw palette/typography roles.
