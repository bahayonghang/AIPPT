import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { htmlEscape, naturalSort, parseArgs, readWrappedJson } from "./_shared.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = parseArgs(process.argv);
const svgDir = args["svg-dir"];
const outputPath = args.output;

function fail(message) {
  console.error(`build-preview: ${message}`);
  process.exit(1);
}

if (!svgDir || !outputPath) {
  fail("Required arguments: --svg-dir --output [--manifest] [--title] [--logo] [--accent]");
}

const templatePath =
  args.template ?? path.resolve(__dirname, "../assets/preview-template.html");
const template = fs.readFileSync(templatePath, "utf8");

let slides = [];

if (args.manifest) {
  const manifestDocument = readWrappedJson(args.manifest, ["DELIVERY_MANIFEST"]);
  const manifest = manifestDocument.delivery_manifest ?? manifestDocument;

  slides = (manifest.slides ?? []).map((slide) => ({
    file: slide.svg_file ?? slide.file ?? `${slide.slide_id}.svg`,
    label: slide.title ?? slide.slide_id
  }));
}

if (slides.length === 0) {
  slides = fs
    .readdirSync(path.resolve(svgDir))
    .filter((entry) => entry.toLowerCase().endsWith(".svg"))
    .sort(naturalSort)
    .map((entry) => ({
      file: entry,
      label: entry.replace(/\.svg$/i, "")
    }));
}

const title = htmlEscape(args.title ?? "AIPPT Preview");
const logo = htmlEscape(args.logo ?? "AI");
const accent = htmlEscape(args.accent ?? "#2563EB");

const finalHtml = template
  .replaceAll("{{TITLE}}", title)
  .replaceAll("{{LOGO}}", logo)
  .replaceAll("{{ACCENT_COLOR}}", accent)
  .replaceAll("{{SLIDES_JSON}}", JSON.stringify(slides));

fs.mkdirSync(path.dirname(path.resolve(outputPath)), { recursive: true });
fs.writeFileSync(path.resolve(outputPath), finalHtml, "utf8");

console.log(`Preview written to ${path.resolve(outputPath)}`);
