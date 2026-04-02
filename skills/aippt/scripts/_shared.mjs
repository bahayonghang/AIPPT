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
