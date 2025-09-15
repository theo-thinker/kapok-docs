# VitePress 最新版本使用指南

## 概述

VitePress 是一个基于 Vite 的静态站点生成器，专为技术文档而设计。它提供了出色的性能、现代化的开发体验和强大的主题定制能力。

## 快速开始

### 安装

```bash
# 使用 npm
npm create vitepress@latest

# 使用 yarn
yarn create vitepress

# 使用 pnpm
pnpm create vitepress
```

### 项目初始化

```bash
# 进入项目目录
cd my-vitepress-site

# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev
```

## 项目结构

```
my-vitepress-site/
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts          # 配置文件
│   │   └── theme/              # 自定义主题
│   ├── public/                 # 静态资源
│   └── src/                    # 文档源文件
│       ├── index.md            # 首页
│       └── guide/              # 指南目录
├── package.json
└── README.md
```

## 配置文件

### 基础配置

在 `.vitepress/config.mts` 中配置站点：

```typescript
import {defineConfig} from 'vitepress'

export default defineConfig({
    // 站点基本信息
    title: "我的文档站点",
    description: "基于 VitePress 构建的文档",

    // 源文件目录
    srcDir: 'src',

    // 静态资源配置
    vite: {
        publicDir: '../public'
    },

    // HTML head 配置
    head: [
        ['link', {rel: 'icon', href: '/favicon.ico'}],
        ['meta', {name: 'theme-color', content: '#646cff'}]
    ],

    // 主题配置
    themeConfig: {
        // 导航栏
        nav: [
            {text: '首页', link: '/'},
            {text: '指南', link: '/guide/'},
            {text: 'API', link: '/api/'}
        ],

        // 侧边栏
        sidebar: {
            '/guide/': [
                {
                    text: '开始使用',
                    items: [
                        {text: '介绍', link: '/guide/'},
                        {text: '安装', link: '/guide/installation'},
                        {text: '配置', link: '/guide/configuration'}
                    ]
                }
            ]
        },

        // 社交链接
        socialLinks: [
            {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
        ],

        // 页脚
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024-present'
        },

        // 搜索
        search: {
            provider: 'local'
        }
    }
})
```

### 高级配置

```typescript
export default defineConfig({
    // 多语言支持
    locales: {
        root: {
            label: '简体中文',
            lang: 'zh-CN'
        },
        en: {
            label: 'English',
            lang: 'en-US',
            link: '/en/'
        }
    },

    // 构建配置
    build: {
        outDir: '../dist',
        assetsDir: 'assets'
    },

    // 部署配置
    base: '/my-docs/',

    // 开发服务器配置
    server: {
        port: 3000,
        host: true
    },

    // Markdown 配置
    markdown: {
        lineNumbers: true,
        theme: {
            light: 'github-light',
            dark: 'github-dark'
        },
        config: (md) => {
            // 添加自定义 markdown 插件
        }
    }
})
```

## 编写文档

### Frontmatter

每个 Markdown 文件可以包含 frontmatter：

```yaml
---
title: 页面标题
description: 页面描述
layout: doc
sidebar: true
prev: false
next:
  text: '下一页'
  link: '/guide/next-page'
---
```

### 内置组件

VitePress 提供了多个内置组件：

#### 信息框

```markdown
::: info 信息
这是一个信息提示框
:::

::: tip 提示
这是一个提示框
:::

::: warning 警告
这是一个警告框
:::

::: danger 危险
这是一个危险提示框
:::

::: details 点击查看详情
这是一个可折叠的详情框
:::
```

#### 代码组

```markdown
::: code-group

```js [config.js]
export default {
  name: 'config'
}
```

```ts [config.ts]
export default {
    name: 'config'
} as const
```

:::

```

#### 徽章

```markdown
### 标题 <Badge type="info" text="新功能" />
### API <Badge type="tip" text="稳定" />
### 实验性 <Badge type="warning" text="测试版" />
### 已废弃 <Badge type="danger" text="废弃" />
```

## 自定义主题

### 扩展默认主题

创建 `.vitepress/theme/index.ts`：

```typescript
import type {Theme} from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import CustomComponent from './components/CustomComponent.vue'
import './custom.css'

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // 自定义插槽
        })
    },
    enhanceApp({app, router, siteData}) {
        // 注册全局组件
        app.component('CustomComponent', CustomComponent)
    }
} satisfies Theme
```

### 自定义样式

创建 `.vitepress/theme/custom.css`：

```css
:root {
    /* 自定义 CSS 变量 */
    --vp-c-brand-1: #646cff;
    --vp-c-brand-2: #747bff;
    --vp-c-brand-3: #9499ff;
}

/* 自定义样式 */
.custom-block {
    padding: 16px;
    border-radius: 8px;
    margin: 16px 0;
}
```

### 布局插槽

VitePress 提供了多个布局插槽：

```vue

<template>
  <Layout>
    <template #nav-bar-title-before>
      <!-- 导航栏标题前 -->
    </template>

    <template #nav-bar-title-after>
      <!-- 导航栏标题后 -->
    </template>

    <template #nav-bar-content-before>
      <!-- 导航栏内容前 -->
    </template>

    <template #nav-bar-content-after>
      <!-- 导航栏内容后 -->
    </template>

    <template #sidebar-nav-before>
      <!-- 侧边栏导航前 -->
    </template>

    <template #sidebar-nav-after>
      <!-- 侧边栏导航后 -->
    </template>

    <template #page-top>
      <!-- 页面顶部 -->
    </template>

    <template #page-bottom>
      <!-- 页面底部 -->
    </template>

    <template #home-hero-before>
      <!-- 首页 Hero 前 -->
    </template>

    <template #home-hero-info>
      <!-- 首页 Hero 信息 -->
    </template>

    <template #home-hero-image>
      <!-- 首页 Hero 图片 -->
    </template>

    <template #home-hero-after>
      <!-- 首页 Hero 后 -->
    </template>

    <template #home-features-before>
      <!-- 首页特性前 -->
    </template>

    <template #home-features-after>
      <!-- 首页特性后 -->
    </template>

    <template #doc-footer-before>
      <!-- 文档页脚前 -->
    </template>

    <template #doc-before>
      <!-- 文档内容前 -->
    </template>

    <template #doc-after>
      <!-- 文档内容后 -->
    </template>

    <template #doc-top>
      <!-- 文档顶部 -->
    </template>

    <template #doc-bottom>
      <!-- 文档底部 -->
    </template>

    <template #aside-top>
      <!-- 右侧边栏顶部 -->
    </template>

    <template #aside-bottom>
      <!-- 右侧边栏底部 -->
    </template>

    <template #aside-outline-before>
      <!-- 大纲前 -->
    </template>

    <template #aside-outline-after>
      <!-- 大纲后 -->
    </template>

    <template #aside-ads-before>
      <!-- 广告前 -->
    </template>

    <template #aside-ads-after>
      <!-- 广告后 -->
    </template>
  </Layout>
</template>
```

## 部署

### GitHub Pages

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Install dependencies
        run: npm ci

      - name: Build with VitePress
        run: npm run docs:build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Netlify

在项目根目录创建 `netlify.toml`：

```toml
[build]
  command = "npm run docs:build"
  publish = "docs/.vitepress/dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Vercel

在项目根目录创建 `vercel.json`：

```json
{
  "buildCommand": "npm run docs:build",
  "outputDirectory": "docs/.vitepress/dist",
  "cleanUrls": true
}
```

## 最佳实践

### 1. 文档结构组织

```
docs/
├── src/
│   ├── guide/
│   │   ├── index.md
│   │   ├── getting-started.md
│   │   └── advanced.md
│   ├── api/
│   │   ├── index.md
│   │   └── reference.md
│   └── examples/
│       ├── index.md
│       └── basic.md
```

### 2. 图片资源管理

```markdown
<!-- 相对路径引用 -->
![本地图片](./images/screenshot.png)

<!-- 公共资源引用 -->
![公共图片](/images/logo.png)

<!-- 外部图片 -->
![外部图片](https://example.com/image.png)
```

### 3. 链接管理

```markdown
<!-- 内部链接 -->
[指南页面](./guide/)
[API 参考](/api/reference)

<!-- 外部链接 -->
[VitePress 官网](https://vitepress.dev)

<!-- 锚点链接 -->
[跳转到配置](#配置文件)
```

### 4. SEO 优化

```yaml
---
title: 页面标题 - 站点名称
description: 页面的详细描述，用于搜索引擎优化
head:
  - - meta
    - name: keywords
      content: vitepress, 文档, 静态站点
  - - meta
    - property: og:title
      content: 页面标题
  - - meta
    - property: og:description
      content: 页面描述
---
```

### 5. 性能优化

```typescript
export default defineConfig({
    // 启用构建缓存
    cacheDir: '.vitepress/cache',

    // 优化资源
    vite: {
        build: {
            minify: 'terser',
            rollupOptions: {
                output: {
                    manualChunks: {
                        vue: ['vue']
                    }
                }
            }
        }
    },

    // 启用 gzip 压缩
    build: {
        minify: true
    }
})
```

## 常见问题

### Q: 如何自定义 404 页面？

A: 创建 `404.md` 文件：

```yaml
---
layout: 404
---
```

### Q: 如何添加全局组件？

A: 在主题配置中注册：

```typescript
export default {
    extends: DefaultTheme,
    enhanceApp({app}) {
        app.component('GlobalComponent', GlobalComponent)
    }
}
```

### Q: 如何处理大型文档站点？

A: 使用动态导入和代码分割：

```typescript
export default defineConfig({
    vite: {
        build: {
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return 'vendor'
                        }
                        if (id.includes('/guide/')) {
                            return 'guide'
                        }
                    }
                }
            }
        }
    }
})
```

## 总结

VitePress 是一个功能强大且易于使用的静态站点生成器，特别适合构建技术文档。通过合理的配置和主题定制，可以创建出专业、美观且高性能的文档站点。

关键优势：

- 🚀 **极速开发**：基于 Vite 的快速热重载
- 📝 **Markdown 优先**：专注内容创作
- 🎨 **高度可定制**：灵活的主题系统
- 📱 **响应式设计**：完美适配各种设备
- ⚡ **优异性能**：静态生成，加载速度快
- 🔍 **SEO 友好**：内置 SEO 优化

开始使用 VitePress，让文档编写变得更加高效和愉悦！