# SVG Design Prompt Template

Use this file in **Stage 5** after page planning is stable.

This template converts one page-planning brief into a render-ready SVG prompt.

## Required inputs

- `{{STYLE_THEME}}`
- `{{BRAND_PROFILE}}`
- `{{SLIDE_SPEC}}`
- `{{PAGE_PLAN}}`

## Prompt template

```text
你是一名精通信息架构与 SVG 编码的演示设计师。请把以下页面规划转成一页可读、可编辑、结构清晰的 SVG 演示文稿页面。

## Canvas and safety
1. SVG root 必须以 `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">` 开头。
2. 主内容必须保持在安全区 `x=40..1240`, `y=40..680`。
3. 页面标题位于 `y=40..90`。
4. 如果该页使用 `page-footer` citations，主内容底线必须高于 `y=664`，引用页脚放在 `y=690..710`。

## Typography
1. 使用安全字体：`Microsoft YaHei, PingFang SC, Helvetica Neue, Arial, sans-serif`
2. 页面标题建议 `28-36px`
3. 卡片标题建议 `18-22px`
4. 正文建议 `14-16px`
5. 辅助说明与页脚建议 `10-12px`
6. 不要把正文压缩到 `12px` 以下；如果放不下，请删减内容或拆页

## Layout discipline
1. 严格遵循页面规划中给出的最终布局名称与坐标
2. 不要自创新的卡片尺寸
3. 卡片圆角统一为 `12`
4. 卡片间距保持 `20`
5. 卡片内边距保持 `24`

## Text budget guidance
1. `1200x580` 大卡片：1 个标题 + 最多 4 条 bullet，或 1 段不超过约 110 个中文字符的正文
2. `780x580` / `590x580` 卡片：1 个标题 + 最多 3-4 条 bullet，或不超过约 80 个中文字符的正文
3. `400x580` / `387x580` 卡片：1 个标题 + 最多 3 条 bullet，或短段落 / 指标堆栈
4. `285x340` / `387x280` / `400x280` 小卡片：优先放单一数字、简短标签、2 条以内要点
5. 如果超预算，先精简文字，再调整结构，最后才考虑轻微缩字

## Asset rules
1. 仅使用页面规划中明确提供或允许的 logo / image / chart / icon
2. 不要伪造产品截图、人物照片、客户 logo、地图细节或不存在的数据图
3. 如果图片资源不存在，使用干净的占位区域并清楚标注用途，例如 `Image placeholder: product screenshot`
4. 只有在页面规划提供了明确数字时才绘制图表；否则用指标卡、对比卡或占位图表表达结构

## Citation rules
1. 如果 `citations_mode = none`，不要生成页脚引用
2. 如果 `citations_mode = card-local`，在对应卡片内用小号 source chip 标注，例如 `Source: R3`
3. 如果 `citations_mode = page-footer`，在页脚区域生成紧凑来源行，例如 `Sources: R1 2025 Annual Report; R3 IDC 2025`
4. 来源编号必须与页面规划和 slide spec 中的 `evidence_refs` 一致

## Overflow handling
1. 使用 `<text>` 与 `<tspan>` 分行，不允许文字溢出卡片边界
2. 标题、正文、页脚都必须保持在安全区内
3. 不要通过极端压缩字间距来“硬塞”内容
4. 如果内容密度仍然过高，宁可保留核心信息并留出明显空间，也不要把页面做成字墙

## Brand profile
{{BRAND_PROFILE}}

## Style theme
{{STYLE_THEME}}

## Slide spec
{{SLIDE_SPEC}}

## Page plan
{{PAGE_PLAN}}

## Output requirements
1. 只输出完整 SVG 代码，不要附带解释
2. 所有可编辑文字使用 `<text>` / `<tspan>`
3. 用 `<rect>`、简单几何图形、线条、图表组件表达布局
4. 如果存在 unresolved image/chart/logo 资源，使用明确占位而不是杜撰内容
5. 保持高级感、简洁感、专业感，但不能牺牲可读性与事实可追溯性
```

## Suggested style presets

### Business

- Background: `#f7fafc`
- Card background: `#ffffff`
- Primary text: `#1a365d`
- Accent: `#2b6cb0`
- Body text: `#2d3748`
- Secondary text: `#718096`

### Technology

- Background: `#0d1117`
- Card background: `#161b22`
- Primary text: `#f0f6fc`
- Accent: `#58a6ff`
- Body text: `#c9d1d9`
- Secondary text: `#8b949e`

### Minimal

- Background: `#ffffff`
- Card background: `#f5f5f5`
- Primary text: `#1a1a1a`
- Accent: `#666666`
- Body text: `#333333`
- Secondary text: `#999999`

### Academic

- Background: `#fffffe`
- Card background: `#f7f7f7`
- Primary text: `#2d3748`
- Accent: `#4a5568`
- Body text: `#4a4a4a`
- Secondary text: `#8a8a8a`

If a real brand system exists, override these presets with brand-approved colors and typography.
