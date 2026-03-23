# Workflow

This page summarizes the full AIPPT workflow from the actual files in `skills/aippt/SKILL.md` and `skills/aippt/references/`.

## Overview

The core rules are:

- Content first, styling second
- Research before claims
- Brand before decoration
- Page planning before SVG
- Verification before claiming readiness

Full stage sequence:

1. Stage 0: Brand & asset intake
2. Stage 1: Brief alignment
3. Stage 2: Research protocol
4. Stage 3: Outline + slide spec
5. Stage 4: Page planning
6. Stage 5: Output mode execution
7. Stage 6: Verification

Stages 0-3 may be compressed for speed, but they must not be skipped.

## Stage 0: Brand & asset intake

Reference: `skills/aippt/references/brand-intake.md`

This stage collects or infers:

- organization, product, or project name
- official website and first-party materials
- logo assets and logo restrictions
- brand colors, fonts, icon style
- photo or illustration direction
- chart styling and metric formatting rules
- tone of voice
- forbidden elements
- compliance notes and required disclaimers
- mandatory sections or required claims

Output: a compact `brand_profile`

## Stage 1: Brief alignment

Before heavy research begins, the deck brief must be locked.

At minimum, the workflow aligns on:

- audience
- purpose
- desired audience action
- presenter context
- speaking duration
- page budget
- required sections
- language
- success criteria

Output: `brief_summary`

## Stage 2: Research protocol

Reference: `skills/aippt/references/research-protocol.md`

Research rules:

- prioritize official and first-party sources
- treat search as discovery, not proof
- keep dates visible for time-sensitive material
- do not promote unsupported numbers or claims to slide content
- record conflicting evidence instead of blending it away

Outputs:

- human-readable research summary
- structured `research_dossier`

## Stage 3: Outline + slide spec

References:

- `skills/aippt/references/outline-prompt.md`
- `skills/aippt/references/slide-spec-schema.md`

### Outline

The outline defines the story arc and page order.

Requirements include:

- story-first structure
- informative slide titles
- one main communication task per page
- evidence-backed facts only

### Slide spec

The slide spec converts the outline into an execution contract.

Key fields include:

- `slide_id`
- `page_type`
- `page_goal`
- `audience_takeaway`
- `evidence_refs`
- `content_budget`
- `layout_candidates`
- `preferred_layout`
- `visual_priority`
- `asset_needs`
- `citations_mode`

## Stage 4: Page planning

Reference: `skills/aippt/references/bento-grid-system.md`

Each slide spec becomes a concrete page-planning brief with:

- final layout
- card inventory
- content allocation per card
- chart, KPI, and image slots
- citation placement
- visual emphasis order

Important constraints:

- use canonical layout names
- avoid invented card sizes
- split overcrowded slides instead of shrinking text too far
- keep long paragraphs out of narrow cards

## Stage 5: Output mode execution

References:

- `skills/aippt/references/design-prompt.md`
- `skills/aippt/references/svg-quality-checklist.md`

This stage produces the final deliverables based on the chosen mode.

Shared rules:

- write artifacts under `output/` when filesystem is available
- keep page prompts self-contained
- keep citation refs visible when external facts are used

## Stage 6: Verification

Before claiming completion, the workflow checks at least:

- research coverage and source traceability
- page count and story flow
- outline-to-slide-spec mapping
- layout consistency and spacing
- overflow and safe-zone issues
- font fallback sanity
- citation visibility
- whether the requested output mode was actually produced
