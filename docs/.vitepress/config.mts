import { defineConfig } from 'vitepress'

const repo = 'https://github.com/bahayonghang/AIPPT'

export default defineConfig({
  title: 'AIPPT',
  titleTemplate: ':title · AIPPT',
  description: 'Professional workflow documentation for the AIPPT Claude Code skill.',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    ['meta', { name: 'author', content: 'bahayonghang' }],
    ['meta', { name: 'keywords', content: 'AIPPT, Claude Code, presentation, slides, skill, VitePress, SVG' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'AIPPT' }],
    ['meta', { property: 'og:title', content: 'AIPPT Documentation' }],
    ['meta', { property: 'og:description', content: 'Professional workflow documentation for the AIPPT Claude Code skill.' }],
    ['meta', { property: 'og:url', content: repo }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'AIPPT Documentation' }],
    ['meta', { name: 'twitter:description', content: 'Professional workflow documentation for the AIPPT Claude Code skill.' }],
    ['link', { rel: 'canonical', href: repo }]
  ],
  themeConfig: {
    search: {
      provider: 'local'
    },
    socialLinks: [{ icon: 'github', link: repo }],
    editLink: {
      pattern: 'https://github.com/bahayonghang/AIPPT/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    lastUpdatedText: '最后更新',
    outline: {
      label: '本页导航'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    footer: {
      message: 'Documentation generated from the actual AIPPT skill files.',
      copyright: 'MIT Licensed · Copyright © 2026 bahayonghang'
    }
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '工作流', link: '/guide/workflow' },
          { text: '工件与输出', link: '/guide/artifacts' },
          { text: '输出模式', link: '/guide/output-modes' },
          { text: '脚本', link: '/guide/scripts' },
          { text: '参考文件', link: '/guide/references' },
          { text: '评估用例', link: '/guide/evaluation' },
          { text: 'English', link: '/en/' }
        ],
        sidebar: [
          {
            text: '文档',
            items: [
              { text: '概览', link: '/' },
              { text: '快速开始', link: '/guide/getting-started' },
              { text: '工作流', link: '/guide/workflow' },
              { text: '工件与输出', link: '/guide/artifacts' },
              { text: '输出模式', link: '/guide/output-modes' },
              { text: '脚本', link: '/guide/scripts' },
              { text: '参考文件', link: '/guide/references' },
              { text: '评估用例', link: '/guide/evaluation' }
            ]
          }
        ]
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'AIPPT',
      description: 'Professional workflow documentation for the AIPPT Claude Code skill.',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Getting Started', link: '/en/guide/getting-started' },
          { text: 'Workflow', link: '/en/guide/workflow' },
          { text: 'Artifacts', link: '/en/guide/artifacts' },
          { text: 'Output Modes', link: '/en/guide/output-modes' },
          { text: 'Scripts', link: '/en/guide/scripts' },
          { text: 'References', link: '/en/guide/references' },
          { text: 'Evaluation', link: '/en/guide/evaluation' },
          { text: '简体中文', link: '/' }
        ],
        sidebar: [
          {
            text: 'Documentation',
            items: [
              { text: 'Overview', link: '/en/' },
              { text: 'Getting Started', link: '/en/guide/getting-started' },
              { text: 'Workflow', link: '/en/guide/workflow' },
              { text: 'Artifacts', link: '/en/guide/artifacts' },
              { text: 'Output Modes', link: '/en/guide/output-modes' },
              { text: 'Scripts', link: '/en/guide/scripts' },
              { text: 'References', link: '/en/guide/references' },
              { text: 'Evaluation', link: '/en/guide/evaluation' }
            ]
          }
        ],
        editLink: {
          pattern: 'https://github.com/bahayonghang/AIPPT/edit/main/docs/:path',
          text: 'Edit this page on GitHub'
        },
        lastUpdatedText: 'Last updated',
        outline: {
          label: 'On this page'
        },
        docFooter: {
          prev: 'Previous page',
          next: 'Next page'
        }
      }
    }
  }
})
