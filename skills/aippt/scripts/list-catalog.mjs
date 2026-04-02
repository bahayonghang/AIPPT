import path from "node:path";
import {
  SCENES_DIR,
  STYLES_DIR,
  loadSceneCatalog,
  loadStyleIndex,
  parseArgs
} from "./_shared.mjs";

const DELIVERY_MODES = ["prompt_bundle_only", "svg_pages", "brand_ready_assets"];
const VALIDATORS = [
  "validate-artifacts.mjs",
  "validate-svg.mjs",
  "build-preview.mjs"
];

function printSection(title, items) {
  console.log(`\n${title}`);
  for (const item of items) {
    console.log(`- ${item}`);
  }
}

const args = parseArgs(process.argv);
const sceneCatalog = loadSceneCatalog();
const styleIndex = loadStyleIndex();

const sceneLines = (sceneCatalog.scenes ?? []).map(
  (scene) => `${scene.id} | ${scene.label} | ${scene.file} | ${scene.subskill}`
);
const styleLines = (styleIndex.presets ?? []).map(
  (preset) => `${preset.id} | ${preset.name} | ${preset.file}`
);

const payload = {
  scenes_dir: SCENES_DIR,
  styles_dir: STYLES_DIR,
  scenes: sceneCatalog.scenes ?? [],
  styles: styleIndex.presets ?? [],
  delivery_modes: DELIVERY_MODES,
  validators: VALIDATORS
};

if (args.json === "true") {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

console.log("AIPPT v3 Catalog");
console.log(`Scene packs: ${(sceneCatalog.scenes ?? []).length}`);
console.log(`Style presets: ${(styleIndex.presets ?? []).length}`);
printSection("Scene Packs", sceneLines);
printSection("Style Presets", styleLines);
printSection("Delivery Modes", DELIVERY_MODES);
printSection(
  "Validators",
  VALIDATORS.map((item) => path.join("scripts", item))
);
