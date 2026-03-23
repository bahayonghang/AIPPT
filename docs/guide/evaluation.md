# 评估与回归测试

AIPPT 自带一份评估提示词集合：`skills/aippt/references/eval-prompts.md`。

它的作用不是演示设计内容本身，而是验证 Skill 的 **触发质量** 与 **工作流完整性**。

## 评估维度

每个测试用例都应该检查以下问题：

1. `aippt` 是否在正确的场景触发或保持静默
2. 是否收集了品牌信息与 brief 关键信息
3. 是否生成了带 source ID 的 research 输出
4. 是否同时生成了 `outline` 与 `slide_spec`
5. 是否选择了合理的布局族与输出模式

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

这些案例共同指向一个条件：

> 用户需要从零创建一套新的演示文稿，而不是编辑已有文件。

## 负向触发案例

这些场景不应该触发 AIPPT：

- 修改现有 PPTX 的某一页
- 审校或点评一套已经做好的 deck

原因是这些任务属于“编辑 / 审核现有演示”，不属于 AIPPT 的“从零搭建新 deck”职责。

## 建议的回归测试方法

每次调整以下文件后，建议复跑评估：

- `skills/aippt/SKILL.md`
- `skills/aippt/references/outline-prompt.md`
- `skills/aippt/references/slide-spec-schema.md`
- `skills/aippt/references/bento-grid-system.md`
- `skills/aippt/references/design-prompt.md`

重点确认：

- 新建 deck 需求仍然稳定触发
- 编辑已有 deck 的需求仍然不会误触发
- 事实密集型页面仍然保留 citation refs
- outline 与 slide spec 仍是一一对应关系
- 页面规划仍然使用规范布局而不是临时坐标

## 成功标准

根据 `eval-prompts.md`，一个健康的 AIPPT 应该满足：

- 能可靠识别“新建演示”型请求
- 不会吞掉“修改已有 deck”型请求
- 工作流仍能输出 source-backed 的 `outline`
- 工作流仍能输出 source-backed 的 `slide_spec`
- 页面规划和最终交付模式可验证
