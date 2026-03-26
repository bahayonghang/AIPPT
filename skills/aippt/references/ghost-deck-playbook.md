# Ghost Deck Playbook

Use this file in **Stage 3** after research dossier is complete and before `slide_spec`.

The ghost deck is the narrative skeleton: no final layouts, no rendering, only argument structure.

## Build order

1. Define `governing_thought`.
2. Classify `engagement_archetype`.
3. Build 3-4 `pillar_map` entries.
4. Draft ordered action-title slides.
5. Attach `proof_question` and `evidence_refs` per slide.
6. Run quality gates.
7. Set `approved=false` for first release.

## Engagement archetypes

Pick one primary archetype:

- `growth`
- `profitability`
- `market_entry`
- `pricing`
- `product_launch`
- `policy_briefing`
- `education`
- `generic`

Archetype determines likely transitions and proof rhythm, not final visual style.

## Transition map

For each pillar boundary, define:

- `from_pillar`
- `to_pillar`
- `transition_type`
- `purpose`

Allowed `transition_type`:

- `context_to_diagnosis`
- `diagnosis_to_options`
- `options_to_recommendation`
- `evidence_to_action`
- `chapter_reset`

## Rhythm targets

- avoid 3 consecutive proof-heavy slides without a bridge/breathing moment
- include at least one explicit orientation or reset slide per major section
- make closing slide resolve decision, not repeat one more proof block

## Minimal slide contract at ghost stage

Each slide needs:

- `slide_id`
- `title` (action title)
- `page_goal`
- `story_role` (`anchor|proof|bridge|breathing|closing`)
- `pillar_id`
- `argument_claim`
- `proof_question`
- `evidence_refs`

## Approval policy

First-pass outline must remain:

```json
{ "approved": false }
```

Only set `approved=true` after human review or explicit user acceptance.
