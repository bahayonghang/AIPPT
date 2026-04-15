---
layout: home

hero:
  name: AIPPT
  text: 从零创建全新 deck 项目的 scene-first Skill
  tagline: "先路由、再 intake、再合同；用 golden path、硬门和 validator 把论证、风格、布局和交付串成可追溯流程。"
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
  - title: Scene-first routing
    details: "6 个内置 scene pack 先定默认值，再回到通用 staged contract。"
  - title: Golden path
    details: "标准新 deck 路径是 intake → research → outline hard stop → slide_spec → page_plan → style_profile → delivery。"
  - title: Hard gate 保持
    details: "第一次 outline 必须 `approved=false`；`outline_only` 和 `spec_only` 只是合法阶段停点，不是绕门。"
  - title: 偏好可注入
    details: "可从 `./.aippt/EXTEND.json` 与 `~/.aippt/EXTEND.json` 读取项目/用户默认值。"
  - title: 双层样式系统
    details: "style preset、style dimensions、layout tendency 与 `style_instruction_block` 一起下传。"
  - title: 预览与校验
    details: "支持 scene pack 脚手架、prompt bundle、SVG pages、preview 和 validator 运行。"
---

## 为什么 AIPPT 强调中间工件

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
