# 工作流

本页根据 `skills/aippt/SKILL.md` 和 `skills/aippt/references/` 中的实际内容整理 AIPPT 的完整执行流程。

## 总览

AIPPT 的核心原则是：

- Content first, styling second
- Research before claims
- Brand before decoration
- Page planning before SVG
- Verification before claiming readiness

完整阶段：

1. Stage 0: Brand & asset intake
2. Stage 1: Brief alignment
3. Stage 2: Research protocol
4. Stage 3: Outline + slide spec
5. Stage 4: Page planning
6. Stage 5: Output mode execution
7. Stage 6: Verification

虽然 0-3 阶段可以压缩执行，但不能直接跳过。

## Stage 0：品牌与素材 intake

对应参考文件：`skills/aippt/references/brand-intake.md`

需要收集或推断：

- 组织 / 产品 / 项目名称
- 官网与官方资料
- logo 与 logo 限制
- 品牌颜色、字体、图标风格
- 照片 / 插画方向
- 图表风格与数字格式规则
- 语气风格
- 禁止元素
- 法务 / 合规说明
- 必须出现的 section 或 mandatory claims

这一阶段的输出是一个紧凑的 `brand_profile`。

## Stage 1：简报对齐

在进入重研究之前，先锁定简报范围。

至少要确认：

- audience
- purpose
- desired audience action
- presenter context
- speaking duration
- page budget
- must-have sections
- language
- success criteria

这一阶段输出 `brief_summary`。

## Stage 2：研究协议

对应参考文件：`skills/aippt/references/research-protocol.md`

研究规则：

- 优先官方与第一手来源
- 搜索仅用于发现，不等于证据
- 时间敏感信息必须带日期
- 没有来源的数字、时间线、结论不能进入 slide 内容
- 若证据冲突，必须记录冲突，不可平滑处理

输出包括：

- human-readable research summary
- structured `research_dossier`

## Stage 3：Outline 与 Slide Spec

对应参考文件：

- `skills/aippt/references/outline-prompt.md`
- `skills/aippt/references/slide-spec-schema.md`

需要产出两个强绑定工件：

### Outline

用于定义故事弧线和页面顺序。

要求：

- story-first
- 页级标题必须有信息量
- 每页只承担一个主要沟通任务
- 仅使用 research dossier 中有证据支持的事实

### Slide Spec

用于把 outline 转换为后续阶段可执行的合同。

关键字段包括：

- `slide_id`
- `page_type`
- `page_goal`
- `audience_takeaway`
- `evidence_refs`
- `content_budget`
- `layout_candidates`
- `preferred_layout`
- `visual_priority`
- `asset_needs`
- `citations_mode`

要求：

- `slide_id` 与最终顺序一一对应
- 事实密集页必须带 `evidence_refs`
- `layout_candidates` 必须来自 Bento Grid 参考
- `preferred_layout` 必须是候选之一

## Stage 4：页面规划

对应参考文件：`skills/aippt/references/bento-grid-system.md`

目标是把每个 slide spec 变成真正可渲染的页面规划 brief。

每页都要明确：

- 最终布局
- 卡片清单
- 每张卡片的内容分配
- 图表 / 指标 / 图片槽位
- 来源 source chip 或页脚引用方式
- 视觉强调顺序

重要约束：

- 使用标准布局名称
- 不要发明脱离规范的卡片宽度
- 内容超预算时优先拆页，而不是压缩字体
- 窄卡片不能塞长段落

## Stage 5：输出模式执行

对应参考文件：

- `skills/aippt/references/design-prompt.md`
- `skills/aippt/references/svg-quality-checklist.md`

在这一阶段，根据用户选择的交付模式生成最终产物。

共享规则：

- 如果有文件系统，产物建议写入 `output/`
- 每页 prompt 必须是 self-contained
- 有外部事实的页面必须保留 citation refs

建议的输出目录：

```text
output/
├── briefing/
├── specs/
├── prompts/
├── svg/
└── brand/
```

## Stage 6：验证

完成后必须执行检查清单，至少确认：

- research coverage 与 source traceability
- page count 与 story flow
- outline 与 slide spec 的一一映射
- 布局、尺寸、间距一致
- 无文字溢出与安全区越界
- 字体 fallback 合理
- 引用在需要时可见
- 请求的交付模式确实产出了对应文件
