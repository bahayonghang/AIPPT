import fs from "node:fs";
import path from "node:path";
import {
  SCENES_DIR,
  SUBSKILLS_DIR,
  loadSceneCatalog,
  naturalSort,
  parseArgs,
  slugify,
  writeJson,
  writeText
} from "./_shared.mjs";

function fail(message) {
  console.error(`create-scene-pack: ${message}`);
  process.exit(1);
}

function sceneTemplate({
  id,
  label,
  description,
  stylePreset,
  deliveryMode
}) {
  return {
    id,
    label,
    trigger_phrases: [label, id.replaceAll("-", " ")],
    audience_defaults: ["primary stakeholders"],
    page_budget: {
      default: 12,
      min: 8,
      max: 16
    },
    required_sections: [
      "context",
      "core message",
      "proof points",
      "recommended next action"
    ],
    default_story_arc: ["anchor", "proof", "bridge", "proof", "closing"],
    evidence_policy: description,
    preferred_style_preset: stylePreset,
    delivery_default: deliveryMode,
    review_bias: ["hierarchy", "layout_balance"],
    eval_ids: [`scene-${id}-positive`, `scene-${id}-negative`]
  };
}

function subskillTemplate({ id, label, stylePreset, deliveryMode }) {
  return `---
name: aippt-${id}
description: >
  Route new ${label} deck requests here before generic AIPPT. Use this whenever the user wants a
  net-new ${label} presentation from scratch rather than editing an existing deck.
---

# ${label}

Use this scene pack before the generic workflow when the request clearly matches ${label}.

## Defaults

- Style preset: \`${stylePreset}\`
- Delivery default: \`${deliveryMode}\`
- Story arc: \`anchor -> proof -> bridge -> proof -> closing\`

## Required sections

- context
- core message
- proof points
- recommended next action

## Outline starter

Read \`references/outline-starter.md\` before resuming the main AIPPT stages.
`;
}

function outlineStarterTemplate(label) {
  return `# ${label} Outline Starter

1. Context and why this deck matters
2. Core message
3. Proof points
4. Risks, caveats, or constraints
5. Recommended next action
`;
}

function evalStubTemplate(id, label) {
  return {
    scene_id: id,
    label,
    evals: [
      {
        id: `scene-${id}-positive`,
        prompt: `请从零开始做一套新的${label} deck，需要完整 research、outline、slide spec、page plan 和 delivery manifest。`,
        expected: "should trigger the scene pack and keep outline.approved=false before approval"
      },
      {
        id: `scene-${id}-negative`,
        prompt: `我已经有一份${label} PPTX，只想改其中两页。`,
        expected: "should not trigger the scene pack because this is an existing-deck edit"
      }
    ]
  };
}

const args = parseArgs(process.argv);
const rawId = args.id ?? args.slug;
const label = args.label;
const description =
  args.description ?? "Scene-specific evidence and pacing guidance should be filled in.";
const stylePreset = args["style-preset"] ?? "business";
const deliveryMode = args["delivery-mode"] ?? "prompt_bundle_only";

if (!rawId || !label) {
  fail(
    "Required arguments: --id <scene-id> --label <scene label> [--description] [--style-preset] [--delivery-mode]"
  );
}

const id = slugify(rawId);
const scenePath = path.join(SCENES_DIR, `${id}.json`);
const subskillDir = path.join(SUBSKILLS_DIR, id);
const subskillPath = path.join(subskillDir, "SKILL.md");
const outlineStarterPath = path.join(subskillDir, "references", "outline-starter.md");
const evalStubPath = path.join(path.resolve(SCENES_DIR, "..", "..", "evals", "scene-stubs"), `${id}.json`);

for (const target of [scenePath, subskillPath, evalStubPath]) {
  if (fs.existsSync(target)) {
    fail(`Refusing to overwrite existing file: ${target}`);
  }
}

writeJson(scenePath, sceneTemplate({ id, label, description, stylePreset, deliveryMode }));
writeText(subskillPath, subskillTemplate({ id, label, stylePreset, deliveryMode }));
writeText(outlineStarterPath, outlineStarterTemplate(label));
writeJson(evalStubPath, evalStubTemplate(id, label));

const catalog = loadSceneCatalog();
const nextScenes = [...(catalog.scenes ?? []), {
  id,
  label,
  file: `${id}.json`,
  subskill: `subskills/${id}/SKILL.md`
}].sort((left, right) => naturalSort(left.id, right.id));

writeJson(path.join(SCENES_DIR, "scene-catalog.json"), {
  ...catalog,
  last_updated: new Date().toISOString().slice(0, 10),
  scenes: nextScenes
});

console.log(
  JSON.stringify(
    {
      scene_file: scenePath,
      subskill_file: subskillPath,
      outline_starter_file: outlineStarterPath,
      eval_stub_file: evalStubPath
    },
    null,
    2
  )
);
