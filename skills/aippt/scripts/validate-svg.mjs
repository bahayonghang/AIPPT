import fs from "node:fs";
import path from "node:path";
import { naturalSort, parseArgs } from "./_shared.mjs";

const args = parseArgs(process.argv);
const inputPath = args.input;

function fail(message) {
  console.error(`validate-svg: ${message}`);
  process.exit(1);
}

if (!inputPath) {
  fail("Required argument: --input <svg-file-or-directory>");
}

const minFontSize = Number(args["min-font"] ?? 12);
const softBodyFloor = Number(args["body-floor"] ?? 14);

function collectSvgFiles(targetPath) {
  const resolved = path.resolve(targetPath);
  const stats = fs.statSync(resolved);

  if (stats.isFile()) {
    return [resolved];
  }

  return fs
    .readdirSync(resolved)
    .filter((entry) => entry.toLowerCase().endsWith(".svg"))
    .sort(naturalSort)
    .map((entry) => path.join(resolved, entry));
}

function parseNumericAttribute(attributes, name) {
  const attrMatch = attributes.match(new RegExp(`${name}=["'](-?\\d+(?:\\.\\d+)?)["']`, "i"));

  if (attrMatch) {
    return Number(attrMatch[1]);
  }

  const styleMatch = attributes.match(
    new RegExp(`${name}\\s*:\\s*(-?\\d+(?:\\.\\d+)?)(?:px)?`, "i")
  );

  return styleMatch ? Number(styleMatch[1]) : null;
}

const files = collectSvgFiles(inputPath);
const results = [];

for (const file of files) {
  const raw = fs.readFileSync(file, "utf8");
  const errors = [];
  const warnings = [];

  if (!raw.includes("<svg")) {
    errors.push("Missing <svg root.");
  }

  if (!raw.includes("</svg>")) {
    errors.push("Missing closing </svg> tag.");
  }

  if (!raw.includes('viewBox="0 0 1280 720"')) {
    errors.push('Missing required viewBox="0 0 1280 720".');
  }

  if (!raw.includes("<text")) {
    warnings.push("No <text> elements found.");
  }

  const fontSizes = [];
  const attributeFontMatches = raw.matchAll(/font-size=["'](\d+(?:\.\d+)?)["']/gi);

  for (const match of attributeFontMatches) {
    fontSizes.push(Number(match[1]));
  }

  const styleFontMatches = raw.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px/gi);

  for (const match of styleFontMatches) {
    fontSizes.push(Number(match[1]));
  }

  for (const fontSize of fontSizes) {
    if (fontSize < minFontSize) {
      errors.push(`Font size ${fontSize}px is below hard floor ${minFontSize}px.`);
    } else if (fontSize < softBodyFloor) {
      warnings.push(`Font size ${fontSize}px is below preferred body floor ${softBodyFloor}px.`);
    }
  }

  const textTagMatches = raw.matchAll(/<text\b([^>]*)>([\s\S]*?)<\/text>/gi);

  for (const match of textTagMatches) {
    const attributes = match[1];
    const content = match[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    const x = parseNumericAttribute(attributes, "x");
    const y = parseNumericAttribute(attributes, "y");

    if (x !== null && (x < 40 || x > 1240)) {
      errors.push(`Text "${content.slice(0, 40)}" has x=${x}, outside safe horizontal range.`);
    }

    if (y !== null && (y < 40 || y > 710)) {
      errors.push(`Text "${content.slice(0, 40)}" has y=${y}, outside safe vertical range.`);
    }

    if (/^sources?:/i.test(content) && y !== null && (y < 690 || y > 710)) {
      errors.push(`Citation line "${content.slice(0, 40)}" is not placed in footer band.`);
    }
  }

  results.push({
    file,
    passed: errors.length === 0,
    errors,
    warnings
  });
}

const summary = {
  checked_files: files.length,
  passed_files: results.filter((item) => item.passed).length,
  results
};

console.log(JSON.stringify(summary, null, 2));

if (results.some((item) => !item.passed)) {
  process.exit(1);
}
