# Bento Grid Layout System

Use this file in **Stage 5** while converting `slide_spec` into `page_plan`.

The purpose of this file is to provide a **canonical layout library** so later prompts do not invent conflicting coordinates or degrade into arbitrary grids.

## Global canvas rules

- SVG viewBox: `0 0 1280 720`
- Safe zone: `x=40..1240`, `y=40..680`
- Title band: `y=40..90`
- Main content band: `y=100..680`
- Optional citation footer band: `y=690..710`
- Standard horizontal gap: `20`
- Standard vertical gap: `20`
- Standard card padding: `24`
- Standard card radius: `12`

## Canonical layout names and coordinates

### 1. `single-focus`

Use for one dominant statement, one large chart, or one core visual.

- Card A: `x=40, y=100, w=1200, h=580`

### 2. `symmetric-two-column`

Use for balanced comparisons and before/after stories.

- Card A: `x=40, y=100, w=590, h=580`
- Card B: `x=650, y=100, w=590, h=580`

### 3. `asymmetric-two-column`

Use for main narrative plus support data, evidence stack, or side panel.

- Card A: `x=40, y=100, w=780, h=580`
- Card B: `x=840, y=100, w=400, h=580`

### 4. `three-column`

Use for three-way comparisons, three steps, or three feature pillars.

- Card A: `x=40, y=100, w=387, h=580`
- Card B: `x=447, y=100, w=387, h=580`
- Card C: `x=854, y=100, w=386, h=580`

### 5. `hero-plus-two`

Use for one lead message plus two support cards.

- Hero: `x=40, y=100, w=1200, h=260`
- Card A: `x=40, y=380, w=590, h=300`
- Card B: `x=650, y=380, w=590, h=300`

### 6. `hero-plus-three`

Use for one lead message plus three supporting blocks.

- Hero: `x=40, y=100, w=1200, h=180`
- Card A: `x=40, y=300, w=387, h=380`
- Card B: `x=447, y=300, w=387, h=380`
- Card C: `x=854, y=300, w=386, h=380`

### 7. `hero-plus-four`

Use for process pages, launch agendas, or milestone-driven content.

- Hero: `x=40, y=100, w=1200, h=220`
- Card A: `x=40, y=340, w=285, h=340`
- Card B: `x=345, y=340, w=285, h=340`
- Card C: `x=650, y=340, w=285, h=340`
- Card D: `x=955, y=340, w=285, h=340`

### 8. `two-by-two-dashboard`

Use for KPI dashboards and metric comparisons.

- Card A: `x=40, y=100, w=590, h=280`
- Card B: `x=650, y=100, w=590, h=280`
- Card C: `x=40, y=400, w=590, h=280`
- Card D: `x=650, y=400, w=590, h=280`

### 9. `mixed-grid`

Use for content-dense pages with one major block plus several smaller supports.

- Card A: `x=40, y=100, w=780, h=280`
- Card B: `x=840, y=100, w=400, h=280`
- Card C: `x=40, y=400, w=387, h=280`
- Card D: `x=447, y=400, w=387, h=280`
- Card E: `x=854, y=400, w=386, h=280`

### 10. `media-text`

Use for case studies, screenshot-driven explanations, or image-led storytelling.

- Media card: `x=40, y=100, w=610, h=580`
- Text card A: `x=670, y=100, w=570, h=280`
- Text card B: `x=670, y=400, w=570, h=280`

## Special page prototypes

### `cover`

Do not use a dense card grid.

- full-canvas background or restrained backdrop
- dominant title block
- optional subtitle, proof line, logo, or presenter metadata
- minimal copy only

### `contents`

Use a clean list-based structure.

- title in the title band
- 3-6 section titles vertically stacked
- optional accent panel or simple geometry on the opposite side

### `closing`

Do not use a dense grid.

- strong closing headline
- optional CTA or contact block
- minimal secondary content

## Page type to layout mapping

Use these as defaults before making local exceptions:

- `cover` -> `cover`
- `contents` -> `contents`
- `comparison` -> `symmetric-two-column`, `three-column`
- `process` -> `hero-plus-three`, `hero-plus-four`
- `timeline` -> `single-focus`, `hero-plus-three`
- `kpi` -> `asymmetric-two-column`, `two-by-two-dashboard`, `mixed-grid`
- `case-study` -> `media-text`, `hero-plus-two`, `asymmetric-two-column`
- `mixed-media` -> `media-text`, `mixed-grid`
- `closing` -> `closing`, `single-focus`

## Story-role layout bias

Use `story_role` to keep page families varied:

- `anchor` -> `cover`, `single-focus`, `hero-plus-two`
- `proof` -> `asymmetric-two-column`, `two-by-two-dashboard`, `mixed-grid`, `media-text`
- `bridge` -> `hero-plus-two`, `hero-plus-three`, `three-column`
- `breathing` -> `single-focus`, `media-text`, `hero-plus-two`
- `closing` -> `closing`, `single-focus`, `hero-plus-two`

## Selection rules

- Use **one** canonical layout name per slide.
- Do not invent widths like `390`, `380`, `800`, or any ad hoc card sizes when a canonical layout exists.
- Put the most important idea into the largest card.
- Narrow cards should hold short lists, metrics, citations, or concise support copy, not wall-of-text paragraphs.
- If the slide contains 3 or more source-backed facts, prefer `page-footer` citations in the slide spec.

## Split-slide rules

Split the slide instead of compressing it if any of these are true:

- the slide needs more than 5 cards
- the slide needs more than one hero message
- long paragraphs would land in narrow cards
- citations begin to compete with the main message
- the reading order is not obvious within 3 seconds

## Anti-patterns

Avoid these mistakes:

- shrinking everything until the slide is unreadable
- putting dense paragraphs in 285px or 386px cards
- mixing unrelated alignments on one page
- using a generic “beautiful layout” with no relation to content density
- repeating the same layout on 3 adjacent content slides without a strong reason
