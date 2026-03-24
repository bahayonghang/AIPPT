---
layout: home

hero:
  name: AIPPT
  text: 从零创建新演示文稿的研究驱动型 Skill
  tagline: 让 deck 生成从“直接排版”升级为“品牌 intake + 证据研究 + sticky-note 大纲 + page plan + 可验证交付”。
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
  - title: 只做新 deck，不碰旧稿编辑
    details: "面向全新 deck 创建场景，避免把“编辑已有 PPTX”与“从零策划新 deck”混在一起。"
  - title: 先研究，再写结论
    details: "所有重要事实、数字、时间线都要求能回溯到 `research_dossier` 与 source ID。"
  - title: 大纲有 Hard Stop
    details: "`outline.approved` 是执行门槛，在 sticky-note 大纲确认之前不能进入渲染阶段。"
  - title: Slide Spec + Page Plan 双合同
    details: "先用 `slide_spec` 锁叙事与预算，再用 `page_plan` 锁布局、卡片和引用位置。"
  - title: Style Profile 可配置
    details: "内置 style registry，可根据品牌显式选择或保守 fallback 到 neutral preset。"
  - title: 交付可验证
    details: "支持 `prompt_bundle_only`、`svg_pages`、`brand_ready_assets`，并提供 artifact / SVG 校验与静态 preview 工具。"
---

## 为什么需要新版 AIPPT

很多“帮我做一套 PPT”请求，本质上同时包含：

- 需求澄清
- 品牌与素材约束
- 研究取证
- 信息架构
- 页面规划
- 渲染交付
- 最终验收

如果这些步骤没有拆开，结果通常会退化成：

- 先画版式，后补内容
- 没证据链的“像真的”数字
- 品牌元素被随意猜测
- 一页塞太多内容，最后靠缩字体硬撑
- 明明导出了文件，却不知道是否真的可交付

新版 AIPPT 把这些步骤明确拆成 staged workflow，并给每一阶段定义产物和验证边界。

## 你会得到什么

基于 `skills/aippt/SKILL.md` 的当前定义，AIPPT 的核心工件包括：

- `brand_profile`
- `brief_summary`
- `research_dossier`
- `outline`
- `slide_spec`
- `page_plan`
- `style_profile`
- `review_report`
- `delivery_manifest`

## 适合什么场景

- 企业介绍
- 融资路演
- 产品发布会 slides
- 教学课件
- 管理层经营复盘
- 政策与行业解读型演示
- 董事会或高密度行业汇报

## 不适合什么场景

- 修改现有 `.pptx` / `.ppt` / `.key` / Google Slides
- 审校一套现成 deck
- 只润色单页标题、文案或排版
- 只要一张图或一个封面页，不需要完整 deck workflow

## 文档入口

- [快速开始](/guide/getting-started)
- [完整工作流](/guide/workflow)
- [输出模式](/guide/output-modes)
- [参考文件与资源层](/guide/references)
- [评估、脚本与回归测试](/guide/evaluation)
- [English Documentation](/en/)
