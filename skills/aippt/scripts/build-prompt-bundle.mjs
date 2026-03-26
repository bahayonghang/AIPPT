import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  ensureDir,
  firstCodeBlock,
  parseArgs,
  readText,
  readWrappedJson,
  slugify,
  writeJson
} from "./_shared.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function fail(message) {
  console.error(`build-prompt-bundle: ${message}`);
  process.exit(1);
}

function normalizeText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function sameText(left, right) {
  return normalizeText(left) === normalizeText(right);
}

const args = parseArgs(process.argv);
const slideSpecPath = args["slide-spec"];
const pagePlanPath = args["page-plan"];
const brandProfilePath = args["brand-profile"];
const styleProfilePath = args["style-profile"];
const outputDir = args["output-dir"];
const deliveryMode = args["delivery-mode"] ?? "prompt_bundle_only";
const svgDir = args["svg-dir"] ? path.resolve(args["svg-dir"]) : null;
const previewFile = args["preview-file"] ? path.resolve(args["preview-file"]) : null;

if (!slideSpecPath || !pagePlanPath || !brandProfilePath || !styleProfilePath || !outputDir) {
  fail(
    "Required arguments: --slide-spec --page-plan --brand-profile --style-profile --output-dir [--delivery-mode] [--svg-dir] [--preview-file]"
  );
}

const allowedDeliveryModes = new Set(["prompt_bundle_only", "svg_pages", "brand_ready_assets"]);
if (!allowedDeliveryModes.has(deliveryMode)) {
  fail(`Unsupported delivery mode "${deliveryMode}".`);
}

const designPromptPath =
  args["design-prompt"] ?? path.resolve(__dirname, "../references/design-prompt.md");

const slideSpecDocument = readWrappedJson(slideSpecPath, ["SLIDE_SPEC"]);
const pagePlanDocument = readWrappedJson(pagePlanPath, ["PAGE_PLAN"]);
const styleProfileDocument = readWrappedJson(styleProfilePath, ["STYLE_PROFILE"]);
const slideSpec = slideSpecDocument.slide_spec ?? slideSpecDocument;
const pagePlan = pagePlanDocument.page_plan ?? pagePlanDocument;
const styleProfileParsed = styleProfileDocument.style_profile ?? styleProfileDocument;

if (!Array.isArray(slideSpec.slides) || !slideSpec.slides.length) {
  fail("slide_spec.slides must be a non-empty array.");
}

if (!Array.isArray(pagePlan.slides) || !pagePlan.slides.length) {
  fail("page_plan.slides must be a non-empty array.");
}

if (!styleProfileParsed?.style_profile && typeof styleProfileParsed !== "object") {
  fail("style-profile must parse to an object.");
}

const brandProfile = readText(brandProfilePath).trim();
const styleProfile = readText(styleProfilePath).trim();
const reviewNotes = args["review-notes"] ? readText(args["review-notes"]).trim() : "None.";
const promptTemplate = firstCodeBlock(readText(designPromptPath));

const planBySlideId = new Map(pagePlan.slides.map((slide) => [slide.slide_id, slide]));
const promptsDir = path.resolve(outputDir);

ensureDir(promptsDir);

const manifest = {
  delivery_manifest: {
    skill: "aippt",
    schema_version: "2.0.0",
    contract_version: "argument-production-v2",
    mode: deliveryMode,
    generated_at: new Date().toISOString(),
    input_files: {
      slide_spec_file: path.resolve(slideSpecPath),
      page_plan_file: path.resolve(pagePlanPath),
      style_profile_file: path.resolve(styleProfilePath),
      brand_profile_file: path.resolve(brandProfilePath),
      review_notes_file: args["review-notes"] ? path.resolve(args["review-notes"]) : null
    },
    outputs: {
      prompts_dir: promptsDir,
      svg_dir: svgDir,
      preview_file: previewFile
    },
    slides: []
  }
};

slideSpec.slides.forEach((slide, index) => {
  const plan = planBySlideId.get(slide.slide_id);

  if (!plan) {
    fail(`Missing page plan for ${slide.slide_id}`);
  }

  if (!slide.argument_claim || !slide.proof_question || !slide.exhibit_intent) {
    fail(
      `${slide.slide_id}: slide_spec must include argument_claim, proof_question, and exhibit_intent.`
    );
  }

  if (!plan.proof_trace || !plan.exhibit_blueprint) {
    fail(`${slide.slide_id}: page_plan must include proof_trace and exhibit_blueprint.`);
  }

  if (!sameText(plan.proof_trace.claim, slide.argument_claim)) {
    fail(`${slide.slide_id}: proof_trace.claim must match slide_spec.argument_claim.`);
  }

  if (!sameText(plan.proof_trace.question, slide.proof_question)) {
    fail(`${slide.slide_id}: proof_trace.question must match slide_spec.proof_question.`);
  }

  if (plan.exhibit_blueprint.primary_intent !== slide.exhibit_intent) {
    fail(`${slide.slide_id}: exhibit intent mismatch between slide_spec and page_plan.`);
  }

  const prompt = promptTemplate
    .replaceAll("{{STYLE_PROFILE}}", styleProfile)
    .replaceAll("{{BRAND_PROFILE}}", brandProfile)
    .replaceAll("{{SLIDE_SPEC}}", JSON.stringify(slide, null, 2))
    .replaceAll("{{PAGE_PLAN}}", JSON.stringify(plan, null, 2))
    .replaceAll("{{REVIEW_NOTES}}", reviewNotes);

  const baseName = `${String(index + 1).padStart(2, "0")}-${slide.slide_id.toLowerCase()}-${slugify(slide.title)}`;
  const promptFileName = `${baseName}.md`;
  const filePath = path.join(promptsDir, promptFileName);

  fs.writeFileSync(filePath, `${prompt}\n`, "utf8");

  manifest.delivery_manifest.slides.push({
    slide_id: slide.slide_id,
    title: slide.title,
    story_role: slide.story_role,
    argument_claim: slide.argument_claim,
    proof_question: slide.proof_question,
    exhibit_intent: slide.exhibit_intent,
    evidence_refs: slide.evidence_refs ?? [],
    prompt_file: promptFileName,
    svg_file:
      deliveryMode === "svg_pages" ? `${slide.slide_id}.svg` : null
  });
});

writeJson(path.join(promptsDir, "delivery-manifest.json"), manifest);

console.log(
  `Generated ${manifest.delivery_manifest.slides.length} prompt bundle files in ${promptsDir}`
);
