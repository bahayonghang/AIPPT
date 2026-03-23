# Research Protocol

Use this file in **Stage 2**.

The goal is to produce a research dossier that is usable for both story planning and on-slide citations.

## Operating rules

- Prefer official and first-party sources.
- Treat search as discovery, not proof.
- Keep dates visible for anything time-sensitive.
- Never promote a claim to slide content unless it can be traced to a source entry.
- If evidence conflicts, record the conflict instead of blending it away.

## Source priority

Use this order unless the user gives stricter instructions:

1. Official company, product, regulator, agency, or institution pages
2. Annual reports, filings, white papers, documentation, primary datasets
3. Official blog posts, press releases, conference talks, product updates
4. High-quality analyst or original reporting
5. Secondary summaries only for discovery, not final proof

## Capability-aware tool choice

If the runtime supports **search grounding + URL context**, prefer that sequence:

1. grounding for discovery
2. URL context for deep reading
3. extract structured claims with dates and source IDs

If those capabilities do not exist, fall back to the platform's search + fetch/browser workflow while preserving the same evidence structure.

## Research workflow

1. Derive 3-6 research themes from the brief.
2. Collect source entries with stable IDs like `R1`, `R2`, `R3`.
3. For each source, extract only facts that are relevant to the deck.
4. Build chapter packets so each future section already knows its evidence.
5. Mark uncertain or weak facts with lower confidence.

## Source entry template

```markdown
### R1
- Source type: official / report / documentation / analyst / news
- Publisher: ...
- Title: ...
- URL: ...
- Publication date: YYYY-MM-DD or unknown
- Access date: YYYY-MM-DD
- Why it matters: ...
- Key facts:
  - ...
  - ...
- Quotable numbers:
  - ...
- Confidence: high / medium / low
```

## Research dossier template

```markdown
## Research Summary
- Main storyline evidence: ...
- Strongest numeric proof points: ...
- Gaps or weak areas: ...

## Section Evidence Map
### Section 1
- Goal: ...
- Evidence refs: R1, R3
- Facts to use on slides:
  - ...

### Section 2
- Goal: ...
- Evidence refs: R2, R4
- Facts to use on slides:
  - ...
```

## Structured fallback format

When the runtime supports structured output, you may also produce:

```text
[RESEARCH_DOSSIER]
{
  "research_dossier": {
    "entries": [
      {
        "ref_id": "R1",
        "source_type": "official",
        "publisher": "Example Corp",
        "title": "2025 Annual Report",
        "url": "https://example.com",
        "publication_date": "2025-03-18",
        "access_date": "2026-03-23",
        "facts": ["..."],
        "numbers": ["..."],
        "confidence": "high"
      }
    ]
  }
}
[/RESEARCH_DOSSIER]
```

## Anti-fabrication rule

If you do not have a number, date, quote, or ranking from a source entry, do not invent it for the deck.
