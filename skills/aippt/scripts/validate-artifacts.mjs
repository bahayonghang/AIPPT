import path from "node:path";
import {
  naturalSort,
  parseArgs,
  readWrappedJson
} from "./_shared.mjs";

const args = parseArgs(process.argv);

function fail(message) {
  console.error(`validate-artifacts: ${message}`);
  process.exit(1);
}

const outlinePath = args.outline;
const slideSpecPath = args["slide-spec"];
const pagePlanPath = args["page-plan"];
const deliveryManifestPath = args["delivery-manifest"];

if (!outlinePath || !slideSpecPath || !pagePlanPath) {
  fail("Required arguments: --outline --slide-spec --page-plan [--delivery-manifest]");
}

const outlineDocument = readWrappedJson(outlinePath, ["PPT_OUTLINE"]);
const slideSpecDocument = readWrappedJson(slideSpecPath, ["SLIDE_SPEC"]);
const pagePlanDocument = readWrappedJson(pagePlanPath, ["PAGE_PLAN"]);

const outline = outlineDocument.outline ?? outlineDocument;
const slideSpec = slideSpecDocument.slide_spec ?? slideSpecDocument;
const pagePlan = pagePlanDocument.page_plan ?? pagePlanDocument;
const deliveryManifest = deliveryManifestPath
  ? readWrappedJson(deliveryManifestPath, ["DELIVERY_MANIFEST"])
  : null;

const allowedLayouts = new Set([
  "cover",
  "single-focus",
  "symmetric-two-column",
  "asymmetric-two-column",
  "three-column",
  "hero-plus-two",
  "hero-plus-three",
  "hero-plus-four",
  "two-by-two-dashboard",
  "mixed-grid",
  "media-text",
  "contents"
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

const errors = [];
const warnings = [];

function addError(message) {
  errors.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

function collectOutlineSlides(node) {
  const slides = [];

  if (node.cover) {
    slides.push(node.cover);
  }

  if (node.table_of_contents) {
    slides.push(node.table_of_contents);
  }

  for (const section of node.sections ?? []) {
    for (const slide of section.slides ?? []) {
      slides.push(slide);
    }
  }

  if (node.closing) {
    slides.push(node.closing);
  }

  return slides.sort((left, right) => naturalSort(left.slide_id, right.slide_id));
}

if (typeof outline.approved !== "boolean") {
  addError("outline.approved must exist and be boolean.");
}

const outlineSlides = collectOutlineSlides(outline);
const specSlides = [...(slideSpec.slides ?? [])].sort((left, right) =>
  naturalSort(left.slide_id, right.slide_id)
);
const pagePlanSlides = [...(pagePlan.slides ?? [])].sort((left, right) =>
  naturalSort(left.slide_id, right.slide_id)
);

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

const pagePlanById = new Map(pagePlanSlides.map((slide) => [slide.slide_id, slide]));

outlineSlides.forEach((outlineSlide, index) => {
  const specSlide = specSlides[index];

  if (!specSlide || outlineSlide.slide_id !== specSlide.slide_id) {
    addError(
      `Outline order mismatch around ${outlineSlide.slide_id}. slide_spec must map one-to-one to outline order.`
    );
  }
});

for (const slide of specSlides) {
  if (!slide.slide_id || !slide.page_type || !slide.page_goal) {
    addError(`slide_spec ${slide.slide_id || "<unknown>"} is missing required core fields.`);
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

  if (!allowedStoryRoles.has(slide.story_role)) {
    addError(`${slide.slide_id}: invalid story_role "${slide.story_role}".`);
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

  if ((slide.evidence_refs?.length ?? 0) === 0 && slide.citations_mode !== "none") {
    addWarning(`${slide.slide_id}: citations_mode is set but evidence_refs is empty.`);
  }

  const planSlide = pagePlanById.get(slide.slide_id);

  if (!planSlide) {
    addError(`${slide.slide_id}: missing page_plan entry.`);
    continue;
  }

  if (!slide.layout_candidates.includes(planSlide.final_layout)) {
    addError(`${slide.slide_id}: page_plan final_layout must stay inside layout_candidates.`);
  }

  if (!Array.isArray(planSlide.card_map) || planSlide.card_map.length === 0) {
    addError(`${slide.slide_id}: page_plan card_map must be non-empty.`);
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
    addError(`${slide.slide_id}: page_plan visual_emphasis_order must be non-empty.`);
  }
}

if (deliveryManifest) {
  const manifest = deliveryManifest.delivery_manifest ?? deliveryManifest;
  const manifestSlides = manifest.slides ?? [];

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
}

const summary = {
  outline_file: path.resolve(outlinePath),
  slide_spec_file: path.resolve(slideSpecPath),
  page_plan_file: path.resolve(pagePlanPath),
  delivery_manifest_file: deliveryManifestPath ? path.resolve(deliveryManifestPath) : null,
  errors,
  warnings
};

console.log(JSON.stringify(summary, null, 2));

if (errors.length > 0) {
  process.exit(1);
}
