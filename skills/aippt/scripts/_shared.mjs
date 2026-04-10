import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
export const SCRIPTS_DIR = path.dirname(__filename);
export const SKILL_ROOT = path.resolve(SCRIPTS_DIR, "..");
export const REFERENCES_DIR = path.join(SKILL_ROOT, "references");
export const STYLES_DIR = path.join(REFERENCES_DIR, "styles");
export const SCENES_DIR = path.join(REFERENCES_DIR, "scenes");
export const SUBSKILLS_DIR = path.join(SKILL_ROOT, "subskills");
export const PROJECT_PREFERENCES_FILE = ".aippt/EXTEND.json";
export const USER_PREFERENCES_FILE = ".aippt/EXTEND.json";
export const DELIVERY_MODES = [
  "outline_only",
  "spec_only",
  "prompt_bundle_only",
  "svg_pages",
  "brand_ready_assets"
];
export const STAGED_STOP_MODES = ["outline_only", "spec_only"];
export const SUPPORTED_PREFERENCE_KEYS = [
  "default_scene",
  "default_style_preset",
  "default_delivery_mode",
  "default_language",
  "strict_review",
  "style_dimensions"
];

export function parseArgs(argv) {
  const args = {};

  for (let index = 2; index < argv.length; index += 1) {
    const part = argv[index];

    if (!part.startsWith("--")) {
      continue;
    }

    const withoutPrefix = part.slice(2);

    if (withoutPrefix.includes("=")) {
      const [rawKey, ...rest] = withoutPrefix.split("=");
      args[rawKey] = rest.join("=");
      continue;
    }

    const next = argv[index + 1];

    if (!next || next.startsWith("--")) {
      args[withoutPrefix] = "true";
      continue;
    }

    args[withoutPrefix] = next;
    index += 1;
  }

  return args;
}

export function ensureDir(targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });
}

export function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

export function readJson(filePath) {
  return JSON.parse(readText(filePath));
}

export function writeJson(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export function writeText(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, data, "utf8");
}

export function naturalSort(left, right) {
  return left.localeCompare(right, undefined, {
    numeric: true,
    sensitivity: "base"
  });
}

export function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function htmlEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function extractWrappedJson(raw, tags = []) {
  for (const tag of tags) {
    const pattern = new RegExp(`\\[${tag}\\]\\s*([\\s\\S]*?)\\s*\\[\\/${tag}\\]`, "m");
    const match = raw.match(pattern);

    if (match) {
      return match[1].trim();
    }
  }

  const trimmed = raw.trim();

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    return trimmed;
  }

  throw new Error(`Could not extract JSON payload. Expected wrappers: ${tags.join(", ") || "none"}.`);
}

export function readWrappedJson(filePath, tags = []) {
  const raw = readText(filePath);
  return JSON.parse(extractWrappedJson(raw, tags));
}

export function firstCodeBlock(markdown) {
  const match = markdown.match(/```(?:text|md|markdown)?\n([\s\S]*?)```/);

  if (!match) {
    throw new Error("Could not find a fenced code block in the template file.");
  }

  return match[1].trim();
}

export function listJsonFiles(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    return [];
  }

  return fs
    .readdirSync(directoryPath)
    .filter((entry) => entry.toLowerCase().endsWith(".json"))
    .sort(naturalSort);
}

export function loadStyleIndex() {
  return readJson(path.join(STYLES_DIR, "index.json"));
}

export function loadSceneCatalog() {
  return readJson(path.join(SCENES_DIR, "scene-catalog.json"));
}

export function loadScenePack(scenePackPathOrId) {
  const candidatePath = scenePackPathOrId.endsWith(".json")
    ? path.resolve(scenePackPathOrId)
    : path.join(SCENES_DIR, `${scenePackPathOrId}.json`);
  return readJson(candidatePath);
}

export function resolveScenePackPath(scenePackPathOrId) {
  return scenePackPathOrId.endsWith(".json")
    ? path.resolve(scenePackPathOrId)
    : path.join(SCENES_DIR, `${scenePackPathOrId}.json`);
}

export function getPreferenceSearchPaths(cwd = process.cwd()) {
  const homeDir = process.env.HOME || process.env.USERPROFILE || null;
  const paths = [path.resolve(cwd, PROJECT_PREFERENCES_FILE)];

  if (homeDir) {
    paths.push(path.resolve(homeDir, USER_PREFERENCES_FILE));
  }

  return paths;
}

export function loadPreferences(preferencesPath) {
  const searchPaths = preferencesPath
    ? [path.resolve(preferencesPath)]
    : getPreferenceSearchPaths();

  for (const candidate of searchPaths) {
    if (!fs.existsSync(candidate)) {
      continue;
    }

    return {
      path: candidate,
      preferences: readJson(candidate)
    };
  }

  return null;
}

export function isStagedStopMode(mode) {
  return STAGED_STOP_MODES.includes(mode);
}

export function isDeliveryMode(mode) {
  return DELIVERY_MODES.includes(mode);
}

export function requiresApprovedOutline(mode) {
  return !isStagedStopMode(mode);
}

export function writesPromptArtifacts(mode) {
  return !isStagedStopMode(mode);
}

export function pickPreferenceValues(preferences = {}) {
  return Object.fromEntries(
    SUPPORTED_PREFERENCE_KEYS.map((key) => [key, preferences[key] ?? null])
  );
}

export function buildStyleInstructions(styleProfile, slideSpec, pagePlan) {
  const palette = styleProfile.palette_roles ?? {};
  const typography = styleProfile.typography_roles ?? {};
  const dimensions = styleProfile.style_dimensions ?? {};
  const instruction = styleProfile.style_instruction_block ?? {};
  const doRules = instruction.do_rules ?? [];
  const dontRules = instruction.dont_rules ?? [];
  const visualElements = instruction.visual_elements ?? [];
  const slideIntent = slideSpec?.exhibit_intent ?? pagePlan?.exhibit_blueprint?.primary_intent ?? "none";
  const layoutArchetype = pagePlan?.layout_hint ?? "generic";
  const geometryChoice = pagePlan?.layout_family ?? pagePlan?.final_layout ?? "generic";

  return [
    "<STYLE_INSTRUCTIONS>",
    `Design Direction: ${instruction.design_direction ?? styleProfile.style_direction ?? "portable-contract"}`,
    `Style Preset: ${styleProfile.preset_id ?? "custom"}`,
    `Texture / Mood / Typography / Density: ${dimensions.texture ?? "clean"} / ${dimensions.mood ?? "neutral"} / ${dimensions.typography ?? "geometric"} / ${dimensions.density ?? "balanced"}`,
    `Selection Reason: ${styleProfile.selection_reason ?? "No explicit reason provided."}`,
    "",
    "Background Strategy:",
    `- Canvas mood: ${instruction.background_strategy ?? "Use restrained contrast and keep whitespace intentional."}`,
    `- Surface roles: dark=${palette.surface_dark ?? "n/a"}, base=${palette.surface ?? "n/a"}, muted=${palette.surface_muted ?? "n/a"}`,
    "",
    "Typography Strategy:",
    `- Heading: ${instruction.heading_style ?? typography.heading?.font_family ?? "Heading role from style profile"}`,
    `- Body: ${instruction.body_style ?? typography.body?.font_family ?? "Body role from style profile"}`,
    `- Meta: ${typography.meta?.font_family ?? "Meta role from style profile"}`,
    "",
    "Color Roles:",
    `- Text: ${palette.text ?? "n/a"}`,
    `- Muted text: ${palette.text_muted ?? "n/a"}`,
    `- Accent: ${palette.accent ?? "n/a"}`,
    `- Positive / Warning: ${palette.positive ?? "n/a"} / ${palette.warning ?? "n/a"}`,
    "",
    "Visual Elements:",
    ...visualElements.map((item) => `- ${item}`),
    ...(visualElements.length === 0 ? ["- Favor simple geometric accents and explicit evidence grouping."] : []),
    "",
    "Density Rules:",
    `- Density target: ${instruction.density_rule ?? `${dimensions.density ?? "balanced"} information load with readable spacing.`}`,
    `- Layout archetype: ${layoutArchetype}`,
    `- Geometry choice: ${geometryChoice}`,
    `- Exhibit intent: ${slideIntent}`,
    "",
    "Do:",
    ...doRules.map((item) => `- ${item}`),
    ...(doRules.length === 0 ? ["- Keep the main claim visually dominant.", "- Make evidence references visible."] : []),
    "",
    "Don't:",
    ...dontRules.map((item) => `- ${item}`),
    ...(dontRules.length === 0 ? ["- Do not invent uncited facts.", "- Do not let decorative elements override the proof chain."] : []),
    "</STYLE_INSTRUCTIONS>"
  ].join("\n");
}
