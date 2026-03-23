# SVG Quality Checklist

Use this file before claiming the deck is ready.

## 1. Research integrity

- [ ] Every fact-heavy slide references source IDs from the research dossier
- [ ] Dates are visible for time-sensitive claims
- [ ] Weak or conflicting facts are not presented as settled truth

## 2. Story and spec completeness

- [ ] `outline` exists and matches the agreed story flow
- [ ] `slide_spec` exists and maps one-to-one to the outline order
- [ ] Every slide has one clear `page_goal`
- [ ] Page count stays within the agreed range unless the user approved a change

## 3. Layout integrity

- [ ] Every slide uses one canonical layout from `bento-grid-system.md`
- [ ] No ad hoc card sizes such as `390`, `380`, `800`, or other off-grid widths remain
- [ ] Card gaps are `20`
- [ ] Major content stays inside the safe zone

## 4. Typography and overflow

- [ ] Page titles are readable and not clipped
- [ ] Card titles fit within their cards
- [ ] Body copy does not overflow card boundaries
- [ ] No body text is reduced below `12px`
- [ ] Long copy was shortened or split instead of being crushed into a small card

## 5. Assets and placeholders

- [ ] No fabricated screenshots, logos, or chart data were inserted
- [ ] Missing assets use clearly labeled placeholders
- [ ] Real logos and images follow the brand constraints from the intake

## 6. Citations and evidence visibility

- [ ] `citations_mode` is respected on each slide
- [ ] `card-local` source chips are attached to the correct cards
- [ ] `page-footer` citations are visible and not colliding with content

## 7. SVG technical checks

- [ ] Root element begins with `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">`
- [ ] Text is built with `<text>` / `<tspan>`
- [ ] Fonts use a sane fallback chain
- [ ] Shapes and spacing remain editable and visually clean

## 8. Delivery checks

- [ ] The requested output mode was actually produced
- [ ] Prompt bundle files or inline prompts are complete and self-contained
- [ ] SVG files exist for every requested page in `svg_pages` mode
- [ ] Brand guidance artifacts exist in `brand_ready_assets` mode

## Office compatibility note

Treat SVG import/editing support as:

- High confidence: Microsoft 365, PowerPoint 2024, 2021, 2019
- Validate locally: PowerPoint 2016

If the user targets PowerPoint 2016, explicitly note that local validation is still required.
