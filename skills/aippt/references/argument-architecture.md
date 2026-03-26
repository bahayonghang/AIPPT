# Argument Architecture

Use this file in **Stage 3** to convert research into a decision-ready deck argument.

The objective is to make the deck logically defensible before any visual layout work.

## Core model

Use this chain for the whole deck:

1. `governing_thought`: the deck's one-sentence answer
2. `pillar_map`: 3-4 argument pillars that must all hold
3. `action_titles`: each slide title is a conclusion, not a topic
4. `proof_chain`: every claim points to evidence refs

If any link is missing, the deck is not ready for layout planning.

## Governing thought

A strong governing thought:

- contains the recommendation or conclusion
- names scope and expected effect
- can be challenged with data

Bad: "AI is important for business."

Good: "A phased AI copilot rollout can cut support handling time by 28-35% in 12 months, with highest ROI in enterprise support queues."

## Pillar map

For each pillar define:

- `pillar_id`
- `title`
- `key_question`
- `must_be_true`
- `evidence_refs`

Each pillar should represent a non-overlapping requirement for the governing thought to hold.

## Action-title rule

For each slide, title must be:

- a complete sentence
- a claim the slide proves
- traceable to evidence

Avoid labels such as "Market Overview", "Data", "Analysis".

## Proof question

Each slide carries one `proof_question`:

- "What does this slide need to prove for the claim to stand?"

This question becomes a contract for exhibit intent and evidence selection in Stage 4.

## Quality gates

Run these before marking outline ready:

1. **Helicopter test**: read action titles only. Do they tell the full argument?
2. **Dead-slide test**: remove one slide. If nothing breaks, that slide is weak.
3. **Rising-stakes test**: narrative must move from context to conviction, not stay flat.

## Failure patterns

- Multiple claims on one slide.
- Claims without evidence refs.
- Evidence that does not answer the proof question.
- Pillars that overlap semantically.
- Conclusion appears only on final slide.

## Output expectation

By the end of Stage 3, the outline should already be implementation-ready for:

- Stage 4 exhibit intent routing
- Stage 5 page planning
- Stage 8 argument consistency validation
