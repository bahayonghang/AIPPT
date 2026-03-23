# AIPPT

AIPPT 是一个用于 **从零创建全新演示文稿 / PPT / slide deck** 的 Claude Code Skill。

它可以把主题、需求简报、官网、白皮书、笔记或品牌素材，转化为一套完整的演示工作流，包括品牌素材收集、证据化研究、提纲生成、逐页 slide spec、页面规划，以及最终交付产物。

## 特性

- 面向 **新建 deck**，不是修改现有 PPTX。
- 可从主题、brief、网站、PDF、笔记或品牌素材启动。
- 强制采用阶段化流程：品牌 intake → brief 对齐 → 研究 → outline → slide spec → 页面规划 → 交付 → 验证。
- 支持三种交付模式：
  - `prompt_bundle_only`
  - `svg_pages`
  - `brand_ready_assets`
- 所有重要事实都要求可追溯到 research dossier 与 source ID。
- 使用 Bento Grid 规范中的标准页面布局。
- 通过 SVG 质量检查清单做最终验收。

## 项目结构

```text
skills/aippt/
├── SKILL.md
└── references/
    ├── bento-grid-system.md
    ├── brand-intake.md
    ├── design-prompt.md
    ├── eval-prompts.md
    ├── outline-prompt.md
    ├── research-protocol.md
    ├── slide-spec-schema.md
    └── svg-quality-checklist.md
```

## 快速开始

### 1. 阅读核心技能定义

核心文件位于：

```text
skills/aippt/SKILL.md
```

### 2. 在“新建 deck”场景中触发

典型触发示例：

```text
帮我从零做一套新的企业介绍 PPT。
请做一套 AI SaaS 产品的融资路演 deck。
我要一套 45 分钟的 Transformer 入门教学课件。
```

### 3. 按工作流执行

AIPPT 的标准流程包括：

1. 品牌与素材 intake
2. 简报对齐
3. 研究协议
4. 提纲与 slide spec
5. 页面规划
6. 输出模式执行
7. 验证

## 适用场景

以下情况适合使用 AIPPT：

- 需要创建一套 **全新的** 演示文稿
- 需要从主题、资料或品牌约束出发构建 deck
- 需要生成有研究依据的结构化演示内容
- 需要 SVG-ready prompt 或面向设计/排版交接的资产包

## 不适用场景

以下情况 **不应该** 使用 AIPPT：

- 修改现有 `.pptx`、`.ppt`、`.key` 或 Google Slides 文件
- 审校、润色一套已经完成的 deck
- 仅修改已有模板中的单页
- 在没有 Office 自动化能力时承诺原生 Office 导出

## 交付模式

### `prompt_bundle_only`
输出可移植的逐页 prompt、品牌摘要、outline、slide spec 和渲染注意事项。

### `svg_pages`
在运行环境支持安全生成 SVG 时，输出逐页 prompt 与对应 SVG 页面。

### `brand_ready_assets`
输出面向设计师或 PPT 操作人员的交接包，包括品牌规范、页面家族规则、使用规则、prompt bundle，以及按需附加的 SVG 页面。

## 参考文档

Skill 的具体行为由以下参考文件约束：

- `skills/aippt/references/brand-intake.md`
- `skills/aippt/references/research-protocol.md`
- `skills/aippt/references/outline-prompt.md`
- `skills/aippt/references/slide-spec-schema.md`
- `skills/aippt/references/bento-grid-system.md`
- `skills/aippt/references/design-prompt.md`
- `skills/aippt/references/svg-quality-checklist.md`
- `skills/aippt/references/eval-prompts.md`

## 文档

- 英文 README：`README.md`
- 中文 README：`README_CN.md`
- VitePress 文档站：`docs/`

## 文档开发

项目已包含最小可用的 VitePress 文档配置。

安装依赖并启动本地文档站：

```bash
npm install
npm run docs:dev
```

构建静态文档：

```bash
npm run docs:build
```

预览构建结果：

```bash
npm run docs:preview
```

## 贡献建议

请始终以 `skills/aippt/SKILL.md` 与 `skills/aippt/references/` 中的实际内容为准。

如果修改了 skill 工作流，也应同步更新：

- `README.md`
- `README_CN.md`
- `docs/` 下的文档

## License

TODO：如果后续需要公开分发，请补充许可证文件。
