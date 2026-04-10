# Style Dimensions

Use this file in **Stage 0** and **Stage 6**.

AIPPT keeps preset-based styling, but now also exposes four portable dimensions so style choices remain explainable.

## Dimensions

### 1. `texture`

- `clean`: crisp surfaces, restrained decoration, sharp edges
- `grid`: structural guides, measurement feel, technical framing
- `organic`: softer blocks, human touch, more fluid separators
- `editorial`: magazine-like composition, strong cropping, bold type hierarchy

### 2. `mood`

- `neutral`: sober, low-saturation, executive-safe
- `cool`: analytical, precise, modern, technical
- `warm`: approachable, teaching-friendly, more human
- `vibrant`: campaign-like emphasis and stronger contrast

### 3. `typography`

- `geometric`: structured sans, stable product look
- `humanist`: readable, softer rhythm, training-friendly
- `editorial`: contrast-heavy hierarchy, stronger title voice
- `technical`: utilitarian, data-table and chart friendly

### 4. `density`

- `minimal`: one dominant idea, generous whitespace
- `balanced`: 2-4 content zones, normal business density
- `dense`: evidence-heavy, board/research style, but still scannable

## Preset mapping

| Preset | Texture | Mood | Typography | Density |
| --- | --- | --- | --- | --- |
| `business` | `clean` | `neutral` | `geometric` | `balanced` |
| `tech` | `grid` | `cool` | `geometric` | `balanced` |
| `minimal` | `clean` | `neutral` | `humanist` | `minimal` |
| `scientific` | `grid` | `cool` | `technical` | `dense` |
| `editorial-infographic` | `editorial` | `cool` | `editorial` | `dense` |
| `creative` | `organic` | `vibrant` | `editorial` | `balanced` |

## Usage rule

Always persist `style_dimensions` inside `style_profile`, even when the user chose a preset directly.
