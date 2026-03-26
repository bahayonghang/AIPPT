# Exhibit Intent Taxonomy

Use this file in **Stage 4** while creating `slide_spec`.

The goal is to choose exhibit intent from proof needs, not visual preference.

## Allowed exhibit intents

- `none`
- `comparison`
- `trend`
- `composition`
- `distribution`
- `process`
- `timeline`
- `matrix`
- `decision`
- `relationship`

## Intent routing guide

| Proof question shape | Intent | Typical evidence pattern |
| --- | --- | --- |
| Which option is better and why? | `comparison` | ranked metrics, delta tables, side-by-side criteria |
| How did this change over time? | `trend` | time series, period deltas, inflection points |
| What contributes to the total? | `composition` | parts-of-whole, stacked splits, share decomposition |
| How spread or uneven is performance? | `distribution` | cohort spread, percentile bands, variance view |
| What sequence drives the outcome? | `process` | steps, dependencies, stage conversion |
| When should actions happen? | `timeline` | milestone schedule, deadlines, phase windows |
| How do criteria and options score? | `matrix` | 2x2 placement, criteria grids, evaluation tables |
| What decision should be made now? | `decision` | option scorecard, risk-return framing, go/no-go |
| How are entities connected? | `relationship` | ecosystem map, dependency graph, stakeholder links |

Use `none` only when a slide is orientation-only or summary-only.

## Data requirement hints

Minimum data requirements by intent:

- `comparison`: at least 2 comparable entities and one shared metric
- `trend`: at least 3 ordered time points
- `composition`: total + component breakdown
- `distribution`: sample buckets or quantiles
- `process`: ordered steps + handoff criteria
- `timeline`: dated milestones
- `matrix`: row/column dimensions + scoring basis
- `decision`: options + decision criteria + recommendation rationale
- `relationship`: nodes + relation semantics

## Fit-risk guidance

Set `fit_risk` in `slide_spec`:

- `low`: intent cleanly matches proof question and data shape
- `medium`: intent works but requires assumptions or simplification
- `high`: intent is forced due to missing data or mixed claims

High risk should usually trigger a split or revised proof question.
