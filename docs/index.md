---
layout: home

hero:
  name: AIPPT
  text: 从零创建新演示文稿的研究驱动型 Skill
  tagline: "用“论证合同 + 生产合同”替代“先排版后补逻辑”，让每页结论、证据与版面都可追溯、可校验。"
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 查看工作流
      link: /guide/workflow
    - theme: alt
      text: GitHub
      link: https://github.com/bahayonghang/AIPPT

features:
  - title: 只做新 deck
    details: "面向从主题、资料和品牌约束出发的新建 deck，不吞掉现有 deck 编辑与点评场景。"
  - title: 研究先于结论
    details: "所有关键事实、数字和时间线都必须能回溯到 `research_dossier` 与 source ID。"
  - title: 大纲有 Hard Stop
    details: "`outline.approved` 是执行门槛，在 sticky-note 大纲确认前不能进入渲染阶段。"
  - title: 双合同规划
    details: "outline 锁 `governing_thought/pillar/proof`，`slide_spec + page_plan` 锁 WHAT/HOW，避免中途拍脑袋决策。"
  - title: 资源层可控
    details: "通过 `resource-registry`、`resource-menu` 和 `narrative-rhythm` 管理轻量资源层，而不是回到超重型模板库。"
  - title: 脚本与交付可验证
    details: "支持 prompt bundle、SVG、preview 与 delivery manifest；`validate-artifacts` / `validate-svg` 可做硬规则校验。"
---

## 为什么新版 AIPPT 要强调“中间工件”

很多“帮我做一套 PPT”请求，其实同时包含：

- 需求澄清
- 品牌约束
- 资料研究
- 叙事设计
- 页面规划
- 交付模式选择
- 最终验证

如果这些步骤混在一起，结果通常会退化成：

- 先做版式，后补内容
- 没证据链的“像真的”数字
- 品牌元素被随意猜测
- 页面过密，靠缩字体硬撑
- 虽然导出了文件，但不知道是否真的可交付

AIPPT 把这些步骤拆成 staged workflow，并为每一步定义输入、输出和 hard stop。

## 核心工件

AIPPT 当前的核心工件包括：

- `brand_profile`
- `brief_summary`
- `research_dossier`
- `outline`
- `slide_spec`
- `page_plan`
- `style_profile`
- `delivery_manifest`
- `review_report`

## 文档入口

- [快速开始](/guide/getting-started)
- [完整工作流](/guide/workflow)
- [工件与输出树](/guide/artifacts)
- [输出模式](/guide/output-modes)
- [脚本说明](/guide/scripts)
- [参考文件与资源层](/guide/references)
- [评估、脚本与回归测试](/guide/evaluation)
- [English Documentation](/en/)
