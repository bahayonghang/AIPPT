# AIPPT

## 安装

```bash
npx skills add bahayonghang/AIPPT
```

AIPPT 是用于**全新 deck 项目**的 Claude Code Skill，核心是 contract-first：先研究、论证、规划，再交付。

它也支持完整新 deck 流程里的阶段停点，比如 `outline_only` 和 `spec_only`；但如果只是随口要一个不接合同的提纲，就不属于 AIPPT。

下面这些场景不应该走 AIPPT：

- 只做轻量提纲，不接后续合同
- 只点评 / review 现有 deck
- 只做单页
- 只做导出 / 转格式
- 只改模板
- 修改现有 `.pptx/.ppt/.key/Google Slides`

## 当前能力面

AIPPT 现在是两层路由：

- `generic AIPPT`：默认 staged workflow
- `scene packs`：高频场景的窄子技能
- `golden-path.md`：标准新 deck 请求的默认最短路径
- `./.aippt/EXTEND.json` 与 `~/.aippt/EXTEND.json`：项目/用户默认配置入口
- 双层 style / layout 系统：style preset + style dimensions，layout archetype + final geometry
- 可脚本化交付：prompt bundle、SVG 校验、静态 preview、scene-pack 脚手架

内置 6 个 scene pack：

- `company-intro`
- `investor-pitch`
- `board-briefing`
- `policy-briefing`
- `teaching-deck`
- `thesis-defense`

根技能仍然只管合同与路由，不会变成 PPT 编辑器。

## Golden path

默认最短路径是：

1. route + intake
2. `brand_profile` + `brief_summary`
3. `research_dossier`
4. outline hard stop
5. `slide_spec`
6. `page_plan`
7. `style_profile`
8. delivery + validation

硬门：第一次 outline 必须保持 `approved=false`。

scene pack 只会细化默认值，不会绕过门禁。

## 输出结构

默认 workspace：

```text
output/
├── briefing/
├── specs/
├── prompts/
├── svg/
├── preview/
└── project.json
```

交付模式：

- `outline_only`
- `spec_only`
- `prompt_bundle_only`
- `svg_pages`
- `brand_ready_assets`

## 常用命令 / 脚本入口

- `cd docs && npm run aippt:list-catalog`
- `cd docs && npm run aippt:init-workspace -- --output-dir ../output --scene-id investor-pitch`
- `node skills/aippt/scripts/read-preferences.mjs`
- `cd docs && npm run aippt:create-scene-pack -- --id customer-story --label "Customer Story" --description "Use first-party case proof and before/after narrative."`
- `cd docs && npm run aippt:build-prompts -- --slide-spec ../output/specs/slide-spec.json --page-plan ../output/specs/page-plan.json --brand-profile ../output/briefing/brand-profile.md --style-profile ../output/specs/style-profile.json --scene-pack investor-pitch --output-dir ../output/prompts`
- `cd docs && npm run aippt:validate-artifacts -- --outline ../output/specs/outline.json --slide-spec ../output/specs/slide-spec.json --page-plan ../output/specs/page-plan.json --style-profile ../output/specs/style-profile.json --delivery-manifest ../output/prompts/delivery-manifest.json --scene-pack investor-pitch`
- `cd docs && npm run aippt:validate-svg -- --input ../output/svg --page-plan ../output/specs/page-plan.json --manifest ../output/prompts/delivery-manifest.json`
- `cd docs && npm run aippt:build-preview -- --svg-dir ../output/svg --output ../output/preview/index.html --manifest ../output/prompts/delivery-manifest.json`

## 唯一映射入口

- [`skills/aippt/references/resource-registry.md`](skills/aippt/references/resource-registry.md)
- [`skills/aippt/references/golden-path.md`](skills/aippt/references/golden-path.md)
- [`skills/aippt/references/scenes/scene-catalog.json`](skills/aippt/references/scenes/scene-catalog.json)

## 评测

回归来源：

- `skills/aippt/evals/evals.json`
- `skills/aippt/evals/trigger-evals.json`
- `skills/aippt/references/eval-prompts.md`
- `skills/aippt/evals/scene-stubs/README.md` 与生成出来的 stub 文件（作为待晋升的脚手架用例）

## 文档

- 英文 README：`README.md`
- VitePress 文档：`docs/`

```bash
cd docs
npm install
npm run docs:dev
```
