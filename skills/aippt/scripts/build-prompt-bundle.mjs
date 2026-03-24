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

const args = parseArgs(process.argv);
const slideSpecPath = args["slide-spec"];
const pagePlanPath = args["page-plan"];
const brandProfilePath = args["brand-profile"];
const styleProfilePath = args["style-profile"];
const outputDir = args["output-dir"];

if (!slideSpecPath || !pagePlanPath || !brandProfilePath || !styleProfilePath || !outputDir) {
  fail("Required arguments: --slide-spec --page-plan --brand-profile --style-profile --output-dir");
}

const designPromptPath =
  args["design-prompt"] ?? path.resolve(__dirname, "../references/design-prompt.md");

const slideSpecDocument = readWrappedJson(slideSpecPath, ["SLIDE_SPEC"]);
const pagePlanDocument = readWrappedJson(pagePlanPath, ["PAGE_PLAN"]);
const slideSpec = slideSpecDocument.slide_spec ?? slideSpecDocument;
const pagePlan = pagePlanDocument.page_plan ?? pagePlanDocument;

const brandProfile = readText(brandProfilePath).trim();
const styleProfile = readText(styleProfilePath).trim();
const reviewNotes = args["review-notes"] ? readText(args["review-notes"]).trim() : "None.";
const promptTemplate = firstCodeBlock(readText(designPromptPath));

const planBySlideId = new Map(pagePlan.slides.map((slide) => [slide.slide_id, slide]));
const promptsDir = path.resolve(outputDir);

ensureDir(promptsDir);

const manifest = {
  mode: "prompt_bundle_only",
  generated_at: new Date().toISOString(),
  slide_spec_file: slideSpecPath,
  page_plan_file: pagePlanPath,
  style_profile_file: styleProfilePath,
  brand_profile_file: brandProfilePath,
  slides: []
};

slideSpec.slides.forEach((slide, index) => {
  const plan = planBySlideId.get(slide.slide_id);

  if (!plan) {
    fail(`Missing page plan for ${slide.slide_id}`);
  }

  const prompt = promptTemplate
    .replaceAll("{{STYLE_PROFILE}}", styleProfile)
    .replaceAll("{{BRAND_PROFILE}}", brandProfile)
    .replaceAll("{{SLIDE_SPEC}}", JSON.stringify(slide, null, 2))
    .replaceAll("{{PAGE_PLAN}}", JSON.stringify(plan, null, 2))
    .replaceAll("{{REVIEW_NOTES}}", reviewNotes);

  const fileName = `${String(index + 1).padStart(2, "0")}-${slide.slide_id.toLowerCase()}-${slugify(slide.title)}.md`;
  const filePath = path.join(promptsDir, fileName);

  fs.writeFileSync(filePath, `${prompt}\n`, "utf8");

  manifest.slides.push({
    slide_id: slide.slide_id,
    title: slide.title,
    prompt_file: fileName
  });
});

writeJson(path.join(promptsDir, "delivery-manifest.json"), manifest);

console.log(`Generated ${manifest.slides.length} prompt bundle files in ${promptsDir}`);
