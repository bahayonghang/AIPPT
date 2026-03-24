# 评估、脚本与回归测试

AIPPT 现在同时提供：

- 人工可读的评估提示集：`skills/aippt/references/eval-prompts.md`
- 机器可读的 workflow eval：`skills/aippt/evals/evals.json`
- 机器可读的 trigger eval：`skills/aippt/evals/trigger-evals.json`

它们共同用于验证 **触发质量**、**工作流完整性** 和 **工具链契约一致性**。

## 评估维度

每个测试用例都应该检查：

1. `aippt` 是否在正确场景触发或保持静默
2. 是否收集了品牌信息与 brief 关键信息
3. 是否生成了带 source ID 的 research 输出
4. 是否同时生成了 `outline`、`slide_spec`、`page_plan` 和 `style_profile`
5. 是否在 `outline.approved = true` 之前阻止渲染
6. 是否选择了合理的布局族与交付模式
7. 是否在需要时能产出 `delivery_manifest` 与 `review_report`

## 正向触发案例

这些场景应该触发 AIPPT：

- 企业介绍
- 融资路演
- 产品发布会
- 教学课件
- 年度复盘
- 数据密集型汇报
- 政策解读
- 无网络但有材料的 deck 生成

共同条件是：

> 用户需要从零创建一套新的演示文稿，而不是编辑已有文件。

## 负向触发案例

这些场景不应该触发 AIPPT：

- 修改现有 PPTX 的某一页
- 审校或点评一套已经做好的 deck
- 只想微调某一页版式或标题
- 只需要封面图或单页素材

这些任务属于“编辑 / 审核现有演示”或“单页创作”，不属于 AIPPT 的“从零搭建新 deck”职责。

## 推荐回归测试方法

每次调整以下文件后，建议至少复跑评估：

- `skills/aippt/SKILL.md`
- `skills/aippt/references/outline-prompt.md`
- `skills/aippt/references/slide-spec-schema.md`
- `skills/aippt/references/page-plan-schema.md`
- `skills/aippt/references/design-prompt.md`
- `skills/aippt/references/review-taxonomy.md`
- `skills/aippt/references/styles/*.yaml`

## 脚本校验层

除了 prompt regression，还建议跑脚本校验：

```bash
cd docs
npm run aippt:validate-artifacts
npm run aippt:validate-svg
```

它们分别验证：

- `outline`、`slide_spec`、`page_plan`、`delivery_manifest` 的映射关系
- SVG 的 viewBox、字号、安全区与 citation footer 等硬规则

## 成功标准

一个健康的新版 AIPPT 应该满足：

- 能可靠识别“新建演示”型请求
- 不会吞掉“修改已有 deck”型请求
- 工作流能稳定输出 `brand_profile`、`brief_summary`、`research_dossier`
- 工作流能稳定输出 `outline`、`slide_spec`、`page_plan`、`style_profile`
- 在 `outline.approved = false` 时不会进入渲染阶段
- 页面规划和最终交付模式可验证
