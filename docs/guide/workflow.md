# 工作流

本页根据 [SKILL.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/SKILL.md) 与 `skills/aippt/references/` 中的当前定义整理 AIPPT 的完整执行流程。

## 总览

AIPPT 的核心原则是：

- Content first, styling second
- Research before claims
- Outline before rendering
- Planning before SVG
- Brand constraints before decoration
- Verification before claiming readiness

当前完整阶段：

1. Stage 0: Brand and asset intake
2. Stage 1: Brief alignment hard stop
3. Stage 2: Research dossier
4. Stage 3: Sticky-note outline hard stop
5. Stage 4: Slide spec
6. Stage 5: Page plan
7. Stage 6: Style profile and delivery mode
8. Stage 7: Delivery execution
9. Stage 8: Verification and review

可以压缩表达，但不能跳过阶段。

## Stage 0：品牌与素材 intake

对应参考文件：[brand-intake.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/brand-intake.md)

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
- style preset 候选

这一阶段输出一个紧凑的 `brand_profile`。

## Stage 1：简报对齐 Hard Stop

在进入重研究之前，先锁定简报范围。

至少要确认：

- audience
- purpose
- desired audience action
- presenter context
- speaking duration
- page budget
- language
- must-have sections
- success criteria

这一阶段输出 `brief_summary`。

## Stage 2：研究 dossier

对应参考文件：[research-protocol.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/research-protocol.md)

研究规则：

- 优先官方与第一手来源
- 搜索仅用于发现，不等于证据
- 时间敏感信息必须带日期
- 没有来源的数字、时间线、结论不能进入 slide 内容
- 若证据冲突，必须记录冲突，不可平滑处理

输出包括：

- human-readable research summary
- structured `research_dossier`

## Stage 3：Sticky-note Outline Hard Stop

对应参考文件：

- [outline-prompt.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/outline-prompt.md)
- [cognitive-design-principles.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/cognitive-design-principles.md)

这一阶段产出：

- `outline`
- sticky-note 风格预览

关键规则：

- 初次生成时 `outline.approved = false`
- 每页只承担一个主要沟通任务
- 页标题必须有信息量
- 只能使用 research dossier 中有证据支持的事实

Hard Stop：

- 在 outline 获批前，不能进入 `slide_spec`、`page_plan`、prompt bundle 或 SVG 执行

## Stage 4：Slide Spec

对应参考文件：[slide-spec-schema.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/slide-spec-schema.md)

`slide_spec` 是逐页执行合同。当前关键字段包括：

- `slide_id`
- `page_type`
- `page_goal`
- `audience_takeaway`
- `evidence_refs`
- `content_budget`
- `layout_candidates`
- `preferred_layout`
- `story_role`
- `review_focus`
- `visual_priority`
- `asset_needs`
- `citations_mode`

新增点：

- `story_role` 区分 `anchor / proof / bridge / breathing / closing`
- `review_focus` 明确这页后续重点看什么，如 `layout_balance`、`density`、`citation_visibility`

## Stage 5：Page Plan

对应参考文件：

- [bento-grid-system.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/bento-grid-system.md)
- [page-plan-schema.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/page-plan-schema.md)

目标是把 `slide_spec` 变成真正可执行的页面规划合同。

每页都要明确：

- `final_layout`
- `layout_rationale`
- `card_map`
- `citations_placement`
- `visual_emphasis_order`
- `overflow_strategy`
- unresolved asset placeholders

重要约束：

- 使用标准布局名称
- 不要发明脱离规范的卡片宽度
- 内容超预算时优先拆页，而不是压缩字体
- 窄卡片不能塞长段落

## Stage 6：Style Profile 与交付模式

对应资源：

- [references/styles/index.json](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/styles/index.json)
- `references/styles/*.yaml`

这一阶段要确定：

- 使用哪个 style preset
- 是否来自显式品牌、品牌推断，还是 neutral fallback
- 交付模式是 `prompt_bundle_only`、`svg_pages` 还是 `brand_ready_assets`

输出 `style_profile`。

## Stage 7：交付执行

对应参考文件：[design-prompt.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/design-prompt.md)

这一阶段根据交付模式产出：

- briefing
- specs
- prompts
- svg
- preview

共享规则：

- 每页 prompt 必须自包含
- 有外部事实的页面必须保留 citation refs
- 不能跳过 `slide_spec` 与 `page_plan`

## Stage 8：验证与 Review

对应参考文件：

- [svg-quality-checklist.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/svg-quality-checklist.md)
- [review-taxonomy.md](D:/Documents/Code/Agents/AIPPT/skills/aippt/references/review-taxonomy.md)

执行顺序：

1. 先做 deterministic hard-rule validation
2. 再做 typed review / refinement

至少要确认：

- `outline.approved = true`
- `outline`、`slide_spec`、`page_plan` 一一映射
- citations 在需要时可见
- 布局、尺寸、间距一致
- 无文字溢出与安全区越界
- 字体 fallback 合理
- 交付模式确实产出了对应文件
- 必要时返回 `review_report`
