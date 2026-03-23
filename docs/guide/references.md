# 参考文件

AIPPT 的实际行为由 `skills/aippt/` 下的 skill 定义和 reference 文件共同约束。本页只描述仓库中真实存在的文件。

## 核心定义

### `skills/aippt/SKILL.md`

这是 Skill 的主文件，定义：

- 适用范围
- 非目标场景
- 能力依赖
- 核心规则
- 全阶段工作流
- 三种输出模式
- Office 兼容性说明
- 验证要求
- 回归测试入口

## 参考文件列表

### `skills/aippt/references/brand-intake.md`

用于 Stage 0，定义品牌与素材收集清单、优先级、提问方式以及 `brand_profile` 输出模板。

### `skills/aippt/references/research-protocol.md`

用于 Stage 2，定义研究来源优先级、source entry 模板、research dossier 模板，以及 anti-fabrication 规则。

### `skills/aippt/references/outline-prompt.md`

用于 Stage 3A，定义 `outline` 的生成规则、输出 JSON 包裹格式，以及 story-first 的结构约束。

### `skills/aippt/references/slide-spec-schema.md`

用于 Stage 3B，定义 `slide_spec` 的字段结构、预算规则与字段解释。

### `skills/aippt/references/bento-grid-system.md`

用于 Stage 4，定义标准化页面布局名称、坐标、尺寸、间距、特殊页面原型与反模式。

### `skills/aippt/references/design-prompt.md`

用于 Stage 5，把页面规划转换为 render-ready SVG prompt，并约束字体、安全区、引用、占位与溢出处理方式。

### `skills/aippt/references/svg-quality-checklist.md`

用于 Stage 6，检查 research integrity、story completeness、layout integrity、overflow、citation visibility、SVG 技术要求与交付完整性。

### `skills/aippt/references/eval-prompts.md`

用于回归测试，提供正向触发案例与负向触发案例，用来验证：

- 新建 deck 请求是否正确触发 AIPPT
- 现有 deck 编辑请求是否被正确排除
- 工作流是否仍能稳定产出 source-backed 工件

## 建议的维护方式

如果更新了 Skill 流程，建议同步检查以下内容是否一致：

- `SKILL.md` 中的阶段定义
- reference 文件中的模板与字段
- README 中的对外说明
- `docs/` 站点中的说明与导航
