# Resource Menu

Use this file in **Stage 4** and **Stage 5** as a fast decision menu.

It is a guard against repetitive layout defaults and weak evidence shaping.

## 1. Story role to layout bias

| Story role | Usually fits | Avoid by default |
| --- | --- | --- |
| `anchor` | `cover`, `single-focus`, `hero-plus-two` | dense grids unless opening is evidence-heavy |
| `proof` | `asymmetric-two-column`, `two-by-two-dashboard`, `mixed-grid`, `media-text` | `cover` / `contents` |
| `bridge` | `hero-plus-two`, `hero-plus-three`, `three-column` | dashboard-heavy blocks |
| `breathing` | `single-focus`, `media-text`, `hero-plus-two` | high-card-count layouts |
| `closing` | `closing`, `single-focus`, `hero-plus-two` | dense comparison/table pages |

## 2. Page type to preferred families

| Page type | Preferred layouts |
| --- | --- |
| `cover` | `cover` |
| `contents` | `contents` |
| `comparison` | `symmetric-two-column`, `three-column` |
| `process` | `hero-plus-three`, `hero-plus-four` |
| `timeline` | `single-focus`, `hero-plus-three` |
| `kpi` | `asymmetric-two-column`, `two-by-two-dashboard`, `mixed-grid` |
| `case-study` | `media-text`, `hero-plus-two`, `asymmetric-two-column` |
| `mixed-media` | `media-text`, `mixed-grid` |
| `closing` | `closing`, `single-focus` |

## 3. Exhibit intent quick router

| Proof need | Prefer intent |
| --- | --- |
| option vs option | `comparison` or `matrix` |
| over-time movement | `trend` or `timeline` |
| total and drivers | `composition` |
| spread and variance | `distribution` |
| sequence and handoff | `process` |
| recommendation now | `decision` |
| dependencies/ecosystem | `relationship` |

Use `none` only for orientation slides.

## 4. Citation mode guidance

| Slide condition | Prefer |
| --- | --- |
| no external facts | `none` |
| 1-2 localized facts in one card | `card-local` |
| multiple metrics across cards | `page-footer` |

## 5. Density guardrails

Split instead of squeezing when:

- more than 5 cards are required
- more than one hero message competes on one page
- narrow cards would require long paragraphs
- reading order is unclear within 3 seconds
- citations/legend compete with main message

## 6. Rhythm guardrails

Pause and revise if:

- 3 adjacent content slides use the same `final_layout`
- 3 adjacent slides are all `proof` role
- a dense proof cluster has no `bridge` or `breathing` reset
- more than 30% of deck uses one layout family

## 7. Delivery mode chooser

| User need | Prefer |
| --- | --- |
| safest portable planning package | `prompt_bundle_only` |
| direct SVG output + preview | `svg_pages` |
| design handoff guidance package | `brand_ready_assets` |
