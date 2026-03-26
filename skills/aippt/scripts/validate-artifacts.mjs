import path from "node:path";
import { naturalSort, parseArgs, readWrappedJson } from "./_shared.mjs";

const args = parseArgs(process.argv);

function fail(message) {
  console.error(`validate-artifacts: ${message}`);
  process.exit(1);
}

function toBoolean(value, fallback = false) {
  if (value === undefined) {
    return fallback;
  }
  return String(value).toLowerCase() === "true";
}

function normalizeText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function sameText(left, right) {
  return normalizeText(left) === normalizeText(right);
}

const outlinePath = args.outline;
const slideSpecPath = args["slide-spec"];
const pagePlanPath = args["page-plan"];
const styleProfilePath = args["style-profile"];
const deliveryManifestPath = args["delivery-manifest"];
const allowLegacy = toBoolean(args["allow-legacy"], false);

if (!outlinePath || !slideSpecPath || !pagePlanPath) {
  fail(
    "Required arguments: --outline --slide-spec --page-plan [--style-profile] [--delivery-manifest] [--allow-legacy=true]"
  );
}

const outlineDocument = readWrappedJson(outlinePath, ["PPT_OUTLINE"]);
const slideSpecDocument = readWrappedJson(slideSpecPath, ["SLIDE_SPEC"]);
const pagePlanDocument = readWrappedJson(pagePlanPath, ["PAGE_PLAN"]);
const styleProfileDocument = styleProfilePath
  ? readWrappedJson(styleProfilePath, ["STYLE_PROFILE"])
  : null;
const deliveryManifestDocument = deliveryManifestPath
  ? readWrappedJson(deliveryManifestPath, ["DELIVERY_MANIFEST"])
  : null;

const outlineRaw = outlineDocument.outline ?? outlineDocument;
const slideSpecRaw = slideSpecDocument.slide_spec ?? slideSpecDocument;
const pagePlanRaw = pagePlanDocument.page_plan ?? pagePlanDocument;
const styleProfile = styleProfileDocument?.style_profile ?? styleProfileDocument;
const deliveryManifest =
  deliveryManifestDocument?.delivery_manifest ?? deliveryManifestDocument;

const allowedLayouts = new Set([
  "cover",
  "contents",
  "closing",
  "single-focus",
  "symmetric-two-column",
  "asymmetric-two-column",
  "three-column",
  "hero-plus-two",
  "hero-plus-three",
  "hero-plus-four",
  "two-by-two-dashboard",
  "mixed-grid",
  "media-text"
]);

const allowedPageTypes = new Set([
  "cover",
  "contents",
  "comparison",
  "process",
  "timeline",
  "kpi",
  "case-study",
  "mixed-media",
  "closing",
  "generic"
]);

const allowedStoryRoles = new Set(["anchor", "proof", "bridge", "breathing", "closing"]);
const allowedReviewFocus = new Set([
  "layout_balance",
  "readability",
  "density",
  "contrast",
  "chart_legibility",
  "citation_visibility",
  "hierarchy"
]);
const allowedCitationsMode = new Set(["none", "card-local", "page-footer"]);
const allowedCitationsPlacement = new Set(["none", "card-local", "page-footer"]);
const allowedExhibitIntent = new Set([
  "none",
  "comparison",
  "trend",
  "composition",
  "distribution",
  "process",
  "timeline",
  "matrix",
  "decision",
  "relationship"
]);
const allowedEvidenceLayers = new Set(["L1", "L2", "L3"]);
const allowedFitRisk = new Set(["low", "medium", "high"]);
const allowedOverflowDecision = new Set([
  "keep_single_page",
  "trim_secondary_copy",
  "move_to_sidebar",
  "convert_to_metric_stack",
  "split_slide"
]);
const allowedRhythmSlots = new Set([
  "anchor",
  "proof-cluster",
  "bridge",
  "breathing",
  "closing"
]);
const allowedStyleSources = new Set(["explicit_brand", "inferred_brand", "neutral_fallback"]);
const allowedDeliveryModes = new Set(["prompt_bundle_only", "svg_pages", "brand_ready_assets"]);
const allowedArchetypes = new Set([
  "growth",
  "profitability",
  "market_entry",
  "pricing",
  "product_launch",
  "policy_briefing",
  "education",
  "generic"
]);

const errors = [];
const warnings = [];
const legacyNotes = [];

function addError(message) {
  errors.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

function requireString(value, pathLabel) {
  if (typeof value !== "string" || normalizeText(value) === "") {
    addError(`${pathLabel} must be a non-empty string.`);
    return false;
  }
  return true;
}

function collectLegacyOutlineSlides(outline) {
  const slides = [];
  if (outline.cover) slides.push(outline.cover);
  if (outline.table_of_contents) slides.push(outline.table_of_contents);
  for (const section of outline.sections ?? []) {
    for (const slide of section.slides ?? []) {
      slides.push(slide);
    }
  }
  if (outline.closing) slides.push(outline.closing);
  return slides.sort((left, right) => naturalSort(left.slide_id, right.slide_id));
}

function inferIntentFromPageType(pageType) {
  switch (pageType) {
    case "comparison":
      return "comparison";
    case "timeline":
      return "timeline";
    case "process":
      return "process";
    case "kpi":
      return "comparison";
    case "case-study":
      return "relationship";
    case "closing":
      return "decision";
    default:
      return "none";
  }
}

function normalizeOutline(rawOutline) {
  if (Array.isArray(rawOutline?.slides)) {
    return rawOutline;
  }

  if (!allowLegacy) {
    addError(
      "Legacy outline shape detected. Re-generate outline with `outline.slides`, governing_thought, pillar_map, transition_map, and quality_gates, or pass --allow-legacy=true."
    );
    return rawOutline;
  }

  legacyNotes.push("Converted legacy outline shape to v2-compatible in-memory format.");
  const legacySlides = collectLegacyOutlineSlides(rawOutline);
  return {
    ...rawOutline,
    approved: typeof rawOutline.approved === "boolean" ? rawOutline.approved : false,
    governing_thought:
      rawOutline.governing_thought ??
      rawOutline.deck_goal ??
      "Legacy outline: governing thought needs explicit update.",
    engagement_archetype: rawOutline.engagement_archetype ?? "generic",
    quality_gates: rawOutline.quality_gates ?? {
      helicopter_test: "revise",
      dead_slide_test: "revise",
      rising_stakes_test: "revise"
    },
    pillar_map: rawOutline.pillar_map ?? [
      {
        pillar_id: "P-LEGACY",
        title: "Legacy pillar",
        key_question: "Legacy outline must be upgraded to explicit pillar map.",
        must_be_true: "Legacy structure not yet normalized.",
        evidence_refs: []
      }
    ],
    transition_map: rawOutline.transition_map ?? [],
    slides: legacySlides.map((slide) => ({
      slide_id: slide.slide_id,
      title: slide.title ?? slide.sub_title ?? "Untitled legacy slide",
      page_goal: slide.page_goal ?? "Legacy page goal must be upgraded.",
      story_role: slide.story_role ?? "proof",
      pillar_id: slide.pillar_id ?? "P-LEGACY",
      argument_claim: slide.argument_claim ?? slide.page_goal ?? slide.title ?? "",
      proof_question:
        slide.proof_question ?? "Legacy proof question missing; requires upgrade.",
      evidence_refs: slide.evidence_refs ?? []
    }))
  };
}

function normalizeSlideSpec(rawSlideSpec) {
  if (!Array.isArray(rawSlideSpec?.slides)) {
    return rawSlideSpec;
  }

  const legacyDetected = rawSlideSpec.slides.some(
    (slide) =>
      !slide.argument_claim ||
      !slide.proof_question ||
      !slide.exhibit_intent ||
      !slide.evidence_layer
  );

  if (legacyDetected && !allowLegacy) {
    addError(
      "Legacy slide_spec fields detected. Re-generate slide_spec with argument_claim, proof_question, exhibit_intent, evidence_layer, data_requirements, and fit_risk, or pass --allow-legacy=true."
    );
    return rawSlideSpec;
  }

  if (!legacyDetected) {
    return rawSlideSpec;
  }

  legacyNotes.push("Filled legacy slide_spec fields with conservative defaults.");
  return {
    ...rawSlideSpec,
    slides: rawSlideSpec.slides.map((slide) => ({
      ...slide,
      argument_claim: slide.argument_claim ?? slide.page_goal ?? slide.title ?? "",
      proof_question:
        slide.proof_question ??
        `How does this slide prove: ${slide.page_goal ?? slide.title ?? "the claim"}?`,
      exhibit_intent: slide.exhibit_intent ?? inferIntentFromPageType(slide.page_type),
      evidence_layer: slide.evidence_layer ?? (slide.story_role === "proof" ? "L2" : "L1"),
      data_requirements: slide.data_requirements ?? [],
      fit_risk: slide.fit_risk ?? "medium"
    }))
  };
}

function normalizePagePlan(rawPagePlan, specById) {
  if (!Array.isArray(rawPagePlan?.slides)) {
    return rawPagePlan;
  }

  const legacyDetected = rawPagePlan.slides.some(
    (slide) =>
      !slide.proof_trace ||
      !slide.exhibit_blueprint ||
      !slide.rhythm_slot ||
      !slide.adjacency_check ||
      !slide.overflow_decision
  );

  if (legacyDetected && !allowLegacy) {
    addError(
      "Legacy page_plan fields detected. Re-generate page_plan with proof_trace, exhibit_blueprint, rhythm_slot, adjacency_check, and overflow_decision, or pass --allow-legacy=true."
    );
    return rawPagePlan;
  }

  if (!legacyDetected) {
    return rawPagePlan;
  }

  legacyNotes.push("Filled legacy page_plan fields with conservative defaults.");
  return {
    ...rawPagePlan,
    slides: rawPagePlan.slides.map((slide, index, allSlides) => {
      const specSlide = specById.get(slide.slide_id);
      const previous = allSlides[index - 1];
      const next = allSlides[index + 1];
      return {
        ...slide,
        proof_trace: slide.proof_trace ?? {
          claim: specSlide?.argument_claim ?? "",
          question: specSlide?.proof_question ?? "",
          evidence_refs: specSlide?.evidence_refs ?? []
        },
        exhibit_blueprint: slide.exhibit_blueprint ?? {
          primary_intent: specSlide?.exhibit_intent ?? "none",
          secondary_intents: [],
          visual_strategy: "Legacy upgrade required.",
          encoding_notes: ""
        },
        rhythm_slot:
          slide.rhythm_slot ??
          (specSlide?.story_role === "proof" ? "proof-cluster" : specSlide?.story_role ?? "bridge"),
        adjacency_check: slide.adjacency_check ?? {
          previous_layout: previous?.final_layout ?? null,
          next_layout: next?.final_layout ?? null,
          has_three_in_row_risk: false
        },
        overflow_decision:
          slide.overflow_decision ??
          (slide.card_map?.some((card) => card.overflow_strategy === "split_slide")
            ? "split_slide"
            : "keep_single_page")
      };
    })
  };
}

const outline = normalizeOutline(outlineRaw);
const slideSpecInitial = normalizeSlideSpec(slideSpecRaw);
const slideSpecByIdInitial = new Map((slideSpecInitial.slides ?? []).map((s) => [s.slide_id, s]));
const pagePlan = normalizePagePlan(pagePlanRaw, slideSpecByIdInitial);
const slideSpec = normalizeSlideSpec(slideSpecInitial);

const outlineSlides = [...(outline.slides ?? [])].sort((left, right) =>
  naturalSort(left.slide_id, right.slide_id)
);
const specSlides = [...(slideSpec.slides ?? [])].sort((left, right) =>
  naturalSort(left.slide_id, right.slide_id)
);
const pagePlanSlides = [...(pagePlan.slides ?? [])].sort((left, right) =>
  naturalSort(left.slide_id, right.slide_id)
);

const specById = new Map(specSlides.map((slide) => [slide.slide_id, slide]));
const pagePlanById = new Map(pagePlanSlides.map((slide) => [slide.slide_id, slide]));

if (typeof outline.approved !== "boolean") {
  addError("outline.approved must exist and be boolean.");
}

requireString(outline.governing_thought, "outline.governing_thought");

if (!allowedArchetypes.has(outline.engagement_archetype)) {
  addError(
    `outline.engagement_archetype must be one of ${[...allowedArchetypes].join(", ")}.`
  );
}

if (!Array.isArray(outline.pillar_map) || outline.pillar_map.length === 0) {
  addError("outline.pillar_map must be a non-empty array.");
}

if (!Array.isArray(outline.transition_map)) {
  addError("outline.transition_map must be an array.");
}

if (!outline.quality_gates || typeof outline.quality_gates !== "object") {
  addError("outline.quality_gates must be an object.");
} else {
  for (const key of ["helicopter_test", "dead_slide_test", "rising_stakes_test"]) {
    const value = outline.quality_gates[key];
    if (!["pass", "revise"].includes(value)) {
      addError(`outline.quality_gates.${key} must be "pass" or "revise".`);
    }
  }
}

if (deliveryManifest && outline.approved !== true) {
  addError("outline.approved must be true before validating delivery artifacts.");
}

if (!outlineSlides.length) {
  addError("Outline does not contain any slides.");
}

if (outlineSlides.length !== specSlides.length) {
  addError(
    `Outline slide count (${outlineSlides.length}) does not match slide_spec count (${specSlides.length}).`
  );
}

if (specSlides.length !== pagePlanSlides.length) {
  addError(
    `slide_spec count (${specSlides.length}) does not match page_plan count (${pagePlanSlides.length}).`
  );
}

outlineSlides.forEach((outlineSlide, index) => {
  const specSlide = specSlides[index];

  if (!specSlide || outlineSlide.slide_id !== specSlide.slide_id) {
    addError(
      `Outline order mismatch around ${outlineSlide.slide_id}. slide_spec must map one-to-one to outline order.`
    );
    return;
  }

  requireString(outlineSlide.slide_id, "outline.slides[].slide_id");
  requireString(outlineSlide.title, `${outlineSlide.slide_id}.title`);
  requireString(outlineSlide.page_goal, `${outlineSlide.slide_id}.page_goal`);

  if (!allowedStoryRoles.has(outlineSlide.story_role)) {
    addError(`${outlineSlide.slide_id}: invalid outline story_role "${outlineSlide.story_role}".`);
  }

  requireString(outlineSlide.argument_claim, `${outlineSlide.slide_id}.argument_claim`);
  requireString(outlineSlide.proof_question, `${outlineSlide.slide_id}.proof_question`);

  if (!Array.isArray(outlineSlide.evidence_refs)) {
    addError(`${outlineSlide.slide_id}: outline evidence_refs must be an array.`);
  }
});

for (const slide of specSlides) {
  requireString(slide.slide_id, "slide_spec.slides[].slide_id");
  requireString(slide.title, `${slide.slide_id}.title`);
  requireString(slide.page_goal, `${slide.slide_id}.page_goal`);
  requireString(slide.audience_takeaway, `${slide.slide_id}.audience_takeaway`);
  requireString(slide.argument_claim, `${slide.slide_id}.argument_claim`);
  requireString(slide.proof_question, `${slide.slide_id}.proof_question`);

  if (!allowedPageTypes.has(slide.page_type)) {
    addError(`${slide.slide_id}: invalid page_type "${slide.page_type}".`);
  }

  if (!allowedStoryRoles.has(slide.story_role)) {
    addError(`${slide.slide_id}: invalid story_role "${slide.story_role}".`);
  }

  if (!allowedExhibitIntent.has(slide.exhibit_intent)) {
    addError(`${slide.slide_id}: invalid exhibit_intent "${slide.exhibit_intent}".`);
  }

  if (!allowedEvidenceLayers.has(slide.evidence_layer)) {
    addError(`${slide.slide_id}: invalid evidence_layer "${slide.evidence_layer}".`);
  }

  if (!allowedFitRisk.has(slide.fit_risk)) {
    addError(`${slide.slide_id}: invalid fit_risk "${slide.fit_risk}".`);
  }

  if (!Array.isArray(slide.evidence_refs)) {
    addError(`${slide.slide_id}: evidence_refs must be an array.`);
  }

  if (!Array.isArray(slide.data_requirements)) {
    addError(`${slide.slide_id}: data_requirements must be an array.`);
  }

  if (!Array.isArray(slide.layout_candidates) || slide.layout_candidates.length === 0) {
    addError(`${slide.slide_id}: layout_candidates must be a non-empty array.`);
  }

  for (const layoutName of slide.layout_candidates ?? []) {
    if (!allowedLayouts.has(layoutName)) {
      addError(`${slide.slide_id}: unknown layout candidate "${layoutName}".`);
    }
  }

  if (!slide.layout_candidates?.includes(slide.preferred_layout)) {
    addError(`${slide.slide_id}: preferred_layout must be one of layout_candidates.`);
  }

  if (!Array.isArray(slide.review_focus) || slide.review_focus.length === 0) {
    addError(`${slide.slide_id}: review_focus must be a non-empty array.`);
  } else {
    for (const focus of slide.review_focus) {
      if (!allowedReviewFocus.has(focus)) {
        addError(`${slide.slide_id}: invalid review_focus "${focus}".`);
      }
    }
  }

  if (!allowedCitationsMode.has(slide.citations_mode)) {
    addError(`${slide.slide_id}: invalid citations_mode "${slide.citations_mode}".`);
  }

  if ((slide.evidence_refs?.length ?? 0) > 0 && slide.citations_mode === "none") {
    addError(`${slide.slide_id}: fact-backed slides may not use citations_mode = none.`);
  }

  if (slide.story_role === "proof" && (slide.evidence_refs?.length ?? 0) === 0) {
    addWarning(`${slide.slide_id}: proof slide has no evidence_refs.`);
  }

  const outlineSlide = outlineSlides.find((item) => item.slide_id === slide.slide_id);
  if (outlineSlide) {
    if (!sameText(outlineSlide.argument_claim, slide.argument_claim)) {
      addWarning(
        `${slide.slide_id}: argument_claim differs between outline and slide_spec. Confirm this was intentional refinement.`
      );
    }
    if (!sameText(outlineSlide.proof_question, slide.proof_question)) {
      addWarning(
        `${slide.slide_id}: proof_question differs between outline and slide_spec. Confirm this was intentional refinement.`
      );
    }
  }

  const planSlide = pagePlanById.get(slide.slide_id);
  if (!planSlide) {
    addError(`${slide.slide_id}: missing page_plan entry.`);
    continue;
  }

  if (!slide.layout_candidates.includes(planSlide.final_layout)) {
    addError(`${slide.slide_id}: page_plan final_layout must stay inside layout_candidates.`);
  }

  if (!planSlide.proof_trace || typeof planSlide.proof_trace !== "object") {
    addError(`${slide.slide_id}: page_plan.proof_trace is required.`);
  } else {
    requireString(planSlide.proof_trace.claim, `${slide.slide_id}.proof_trace.claim`);
    requireString(planSlide.proof_trace.question, `${slide.slide_id}.proof_trace.question`);

    if (!sameText(planSlide.proof_trace.claim, slide.argument_claim)) {
      addError(
        `${slide.slide_id}: proof_trace.claim must match slide_spec.argument_claim.`
      );
    }

    if (!sameText(planSlide.proof_trace.question, slide.proof_question)) {
      addError(
        `${slide.slide_id}: proof_trace.question must match slide_spec.proof_question.`
      );
    }

    if (!Array.isArray(planSlide.proof_trace.evidence_refs)) {
      addError(`${slide.slide_id}: proof_trace.evidence_refs must be an array.`);
    } else {
      for (const refId of planSlide.proof_trace.evidence_refs) {
        if (!(slide.evidence_refs ?? []).includes(refId)) {
          addError(
            `${slide.slide_id}: proof_trace ref "${refId}" must exist in slide_spec evidence_refs.`
          );
        }
      }
    }
  }

  if (!planSlide.exhibit_blueprint || typeof planSlide.exhibit_blueprint !== "object") {
    addError(`${slide.slide_id}: page_plan.exhibit_blueprint is required.`);
  } else {
    const primaryIntent = planSlide.exhibit_blueprint.primary_intent;
    if (!allowedExhibitIntent.has(primaryIntent)) {
      addError(`${slide.slide_id}: invalid exhibit_blueprint.primary_intent "${primaryIntent}".`);
    }
    if (primaryIntent !== slide.exhibit_intent) {
      addError(
        `${slide.slide_id}: exhibit_blueprint.primary_intent (${primaryIntent}) must match slide_spec.exhibit_intent (${slide.exhibit_intent}).`
      );
    }
  }

  if (!Array.isArray(planSlide.card_map) || planSlide.card_map.length === 0) {
    addError(`${slide.slide_id}: page_plan card_map must be non-empty.`);
  }

  if (planSlide.card_map?.length > 5) {
    addWarning(`${slide.slide_id}: card_map has more than 5 cards. Consider split_slide.`);
  }

  if (!allowedCitationsPlacement.has(planSlide.citations_placement)) {
    addError(`${slide.slide_id}: invalid citations_placement "${planSlide.citations_placement}".`);
  }

  if (slide.citations_mode !== planSlide.citations_placement) {
    addError(
      `${slide.slide_id}: citations_placement (${planSlide.citations_placement}) must match citations_mode (${slide.citations_mode}).`
    );
  }

  if (!Array.isArray(planSlide.visual_emphasis_order) || planSlide.visual_emphasis_order.length === 0) {
    addError(`${slide.slide_id}: visual_emphasis_order must be non-empty.`);
  }

  if (!allowedRhythmSlots.has(planSlide.rhythm_slot)) {
    addError(`${slide.slide_id}: invalid rhythm_slot "${planSlide.rhythm_slot}".`);
  }

  if (!planSlide.adjacency_check || typeof planSlide.adjacency_check !== "object") {
    addError(`${slide.slide_id}: adjacency_check is required.`);
  } else if (typeof planSlide.adjacency_check.has_three_in_row_risk !== "boolean") {
    addError(`${slide.slide_id}: adjacency_check.has_three_in_row_risk must be boolean.`);
  }

  if (!allowedOverflowDecision.has(planSlide.overflow_decision)) {
    addError(`${slide.slide_id}: invalid overflow_decision "${planSlide.overflow_decision}".`);
  }

  let usedRefsCount = 0;
  for (const card of planSlide.card_map ?? []) {
    if (!card.card_id || !card.slot || !Array.isArray(card.content_items)) {
      addError(`${slide.slide_id}: each card requires card_id, slot, content_items.`);
      continue;
    }

    const { slot } = card;
    for (const dimension of ["x", "y", "w", "h"]) {
      if (typeof slot[dimension] !== "number" || Number.isNaN(slot[dimension])) {
        addError(`${slide.slide_id}/${card.card_id}: slot.${dimension} must be numeric.`);
      }
    }

    if (slot.x < 40 || slot.y < 100 || slot.x + slot.w > 1240 || slot.y + slot.h > 680) {
      addWarning(
        `${slide.slide_id}/${card.card_id}: slot appears outside content safe zone (x=40..1240, y=100..680).`
      );
    }

    if (!Array.isArray(card.source_refs)) {
      addError(`${slide.slide_id}/${card.card_id}: source_refs must be an array.`);
    } else {
      usedRefsCount += card.source_refs.length;
      for (const refId of card.source_refs) {
        if (!(slide.evidence_refs ?? []).includes(refId)) {
          addError(
            `${slide.slide_id}/${card.card_id}: source ref "${refId}" must exist in slide_spec evidence_refs.`
          );
        }
      }
    }
  }

  if ((slide.evidence_refs?.length ?? 0) > 0 && usedRefsCount === 0) {
    addWarning(`${slide.slide_id}: evidence_refs exist but no card_map source_refs were assigned.`);
  }
}

for (let index = 0; index < pagePlanSlides.length; index += 1) {
  const current = pagePlanSlides[index];
  const nextA = pagePlanSlides[index + 1];
  const nextB = pagePlanSlides[index + 2];
  if (nextA && nextB && current.final_layout === nextA.final_layout && current.final_layout === nextB.final_layout) {
    addError(
      `Rhythm violation: layout "${current.final_layout}" repeats 3 times in a row starting at ${current.slide_id}.`
    );
  }
}

for (let index = 0; index < specSlides.length; index += 1) {
  const current = specSlides[index];
  const nextA = specSlides[index + 1];
  const nextB = specSlides[index + 2];
  if (
    nextA &&
    nextB &&
    current.story_role === "proof" &&
    nextA.story_role === "proof" &&
    nextB.story_role === "proof"
  ) {
    addError(
      `Rhythm violation: proof-wall of 3 consecutive slides starting at ${current.slide_id}.`
    );
  }
}

if (styleProfilePath) {
  if (!styleProfile || typeof styleProfile !== "object") {
    addError("style_profile must parse to an object.");
  } else {
    requireString(styleProfile.preset_id, "style_profile.preset_id");
    requireString(styleProfile.selection_reason, "style_profile.selection_reason");
    requireString(styleProfile.style_file, "style_profile.style_file");
    requireString(styleProfile.style_direction, "style_profile.style_direction");

    if (!allowedStyleSources.has(styleProfile.source)) {
      addError(
        `style_profile.source must be one of ${[...allowedStyleSources].join(", ")}.`
      );
    }

    if (!styleProfile.palette_roles || typeof styleProfile.palette_roles !== "object") {
      addError("style_profile.palette_roles must be an object.");
    } else {
      for (const role of [
        "surface_dark",
        "surface",
        "surface_muted",
        "text",
        "text_muted",
        "accent",
        "positive",
        "warning"
      ]) {
        if (!styleProfile.palette_roles[role]) {
          addError(`style_profile.palette_roles.${role} is required.`);
        }
      }
    }

    if (!styleProfile.typography_roles || typeof styleProfile.typography_roles !== "object") {
      addError("style_profile.typography_roles must be an object.");
    } else {
      for (const role of ["heading", "body", "meta"]) {
        if (!styleProfile.typography_roles[role]) {
          addError(`style_profile.typography_roles.${role} is required.`);
        }
      }
    }

    if (!styleProfile.brand_override_rules || typeof styleProfile.brand_override_rules !== "object") {
      addError("style_profile.brand_override_rules must be an object.");
    }

    if (styleProfile.overrides && !Array.isArray(styleProfile.overrides)) {
      addError("style_profile.overrides must be an array when present.");
    }
  }
} else {
  addWarning("style_profile was not validated because --style-profile was not provided.");
}

if (deliveryManifest) {
  const manifestSlides = deliveryManifest.slides ?? [];

  if (!allowedDeliveryModes.has(deliveryManifest.mode)) {
    addError(
      `delivery manifest mode must be one of ${[...allowedDeliveryModes].join(", ")}.`
    );
  }

  if (manifestSlides.length !== specSlides.length) {
    addError(
      `delivery manifest slide count (${manifestSlides.length}) does not match slide_spec count (${specSlides.length}).`
    );
  }

  const manifestIds = new Set(manifestSlides.map((slide) => slide.slide_id));
  for (const slide of specSlides) {
    if (!manifestIds.has(slide.slide_id)) {
      addError(`${slide.slide_id}: missing from delivery manifest.`);
    }
  }

  for (const manifestSlide of manifestSlides) {
    if (!manifestSlide.slide_id || !manifestSlide.title) {
      addError("delivery manifest slide entries must include slide_id and title.");
    }
    if (!manifestSlide.prompt_file) {
      addWarning(`${manifestSlide.slide_id}: delivery manifest is missing prompt_file.`);
    }
    if (deliveryManifest.mode === "svg_pages" && !manifestSlide.svg_file) {
      addWarning(
        `${manifestSlide.slide_id}: mode is svg_pages but svg_file is not declared.`
      );
    }
  }

  if (styleProfilePath && deliveryManifest.input_files?.style_profile_file) {
    const manifestStylePath = path.resolve(deliveryManifest.input_files.style_profile_file);
    const resolvedStylePath = path.resolve(styleProfilePath);
    if (manifestStylePath !== resolvedStylePath) {
      addWarning(
        `delivery manifest style_profile_file (${manifestStylePath}) differs from --style-profile (${resolvedStylePath}).`
      );
    }
  }
}

const summary = {
  outline_file: path.resolve(outlinePath),
  slide_spec_file: path.resolve(slideSpecPath),
  page_plan_file: path.resolve(pagePlanPath),
  style_profile_file: styleProfilePath ? path.resolve(styleProfilePath) : null,
  delivery_manifest_file: deliveryManifestPath ? path.resolve(deliveryManifestPath) : null,
  legacy_mode: allowLegacy,
  legacy_notes: legacyNotes,
  errors,
  warnings
};

console.log(JSON.stringify(summary, null, 2));

if (errors.length > 0) {
  process.exit(1);
}
