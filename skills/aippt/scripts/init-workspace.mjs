import path from "node:path";
import {
  ensureDir,
  parseArgs,
  resolveScenePackPath,
  writeJson
} from "./_shared.mjs";

const args = parseArgs(process.argv);
const outputDir = path.resolve(args["output-dir"] ?? "output");
const deckId = args["deck-id"] ?? path.basename(outputDir);
const sceneId = args["scene-id"] ?? "generic";
const language = args.language ?? "zh-CN";
const deliveryMode = args["delivery-mode"] ?? "prompt_bundle_only";
const scenePackFile =
  sceneId !== "generic" ? resolveScenePackPath(sceneId) : null;

const artifactPaths = {
  briefing_dir: "briefing",
  specs_dir: "specs",
  prompts_dir: "prompts",
  svg_dir: "svg",
  preview_dir: "preview",
  project_file: "project.json",
  brand_profile_file: "briefing/brand-profile.md",
  brief_summary_file: "briefing/brief-summary.md",
  research_dossier_file: "briefing/research-dossier.md",
  outline_file: "specs/outline.json",
  slide_spec_file: "specs/slide-spec.json",
  page_plan_file: "specs/page-plan.json",
  style_profile_file: "specs/style-profile.json",
  review_report_file: "specs/review-report.json",
  delivery_manifest_file: "prompts/delivery-manifest.json",
  preview_file: "preview/index.html"
};

for (const relativeDir of [
  artifactPaths.briefing_dir,
  artifactPaths.specs_dir,
  artifactPaths.prompts_dir,
  artifactPaths.svg_dir,
  artifactPaths.preview_dir
]) {
  ensureDir(path.join(outputDir, relativeDir));
}

writeJson(path.join(outputDir, artifactPaths.project_file), {
  deck_id: deckId,
  scene_id: sceneId,
  language,
  delivery_mode: deliveryMode,
  status: "initialized",
  artifact_paths: artifactPaths,
  approval_state: "outline_pending",
  scene_pack_file: scenePackFile
});

console.log(
  JSON.stringify(
    {
      output_dir: outputDir,
      deck_id: deckId,
      scene_id: sceneId,
      project_file: path.join(outputDir, artifactPaths.project_file)
    },
    null,
    2
  )
);
