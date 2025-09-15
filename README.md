# Kapok Docs

<div style="align-items: center">

![Kapok Docs Logo](docs/public/logo.svg)

**企业级个人日常开发文档网站**

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://yourusername.github.io/kapok-docs/)
[![VitePress](https://img.shields.io/badge/VitePress-1.6.4-blue)](https://vitepress.dev/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.5.21-green)](https://vuejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

## 📖 项目简介

Kapok Docs 是一个基于 VitePress 构建的企业级个人开发文档网站，专为开发者打造的优雅、高效、专业的文档解决方案。

### ✨ 特性

- 🚀 **高性能** - 基于 VitePress 构建，享受极速的开发体验和构建速度
- 📝 **Markdown 优先** - 专注内容创作，使用 Markdown 语法轻松编写文档
- 🎨 **主题定制** - 支持深度定制，打造符合企业品牌的文档风格
- 💡 **智能搜索** - 内置全文搜索功能，快速定位所需内容
- 📱 **响应式设计** - 完美适配各种设备，随时随地查阅文档
- ⚡ **现代化** - 采用最新的前端技术栈，提供流畅的用户体验
- 🌙 **主题切换** - 支持明暗主题切换，个性化阅读体验
- 🔍 **本地搜索** - 快速全文搜索，支持中文搜索
- 📊 **自动部署** - GitHub Actions 自动化部署到 GitHub Pages

## 🛠️ 技术栈

- **框架**: [VitePress](https://vitepress.dev/) v1.6.4
- **前端**: [Vue.js](https://vuejs.org/) v3.5.21
- **样式**: [Sass](https://sass-lang.com/) v1.92.1
- **构建工具**: [Vite](https://vitejs.dev/)
- **部署**: GitHub Actions + GitHub Pages
- **字体**: Ubuntu Mono (代码块字体)

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- npm >= 8

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/yourusername/kapok-docs.git
cd kapok-docs

# 安装依赖
npm install
```

### 本地开发

```bash
# 启动开发服务器
npm run docs:dev

# 或者使用简化命令
npm run dev
```

访问 `http://localhost:5173` 查看网站。

### 构建部署

```bash
# 构建生产版本
npm run docs:build

# 本地预览构建结果
npm run docs:preview
```

## 📁 项目结构

```
kapok-docs/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions 部署配置
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts              # VitePress 主配置文件
│   │   ├── theme/                  # 自定义主题
│   │   │   ├── components/         # Vue 组件
│   │   │   ├── composables/        # 组合式函数
│   │   │   ├── layout/             # 布局组件
│   │   │   ├── config/             # 主题配置
│   │   │   ├── custom.css          # 自定义样式
│   │   │   └── index.ts            # 主题入口
│   │   └── dist/                   # 构建输出目录
│   ├── public/                     # 静态资源
│   │   ├── favicon.svg             # 网站图标
│   │   ├── logo.svg                # Logo
│   │   ├── backgrounds/            # 背景图片
│   │   └── logos/                  # Logo 变体
│   └── src/                        # 文档源文件
│       ├── index.md                # 首页
│       ├── markdown-examples.md    # Markdown 示例
│       ├── api-examples.md         # API 示例
│       ├── vitepress-guide.md      # VitePress 指南
│       └── theme-switcher.md       # 主题切换说明
├── package.json                    # 项目配置
├── package-lock.json              # 依赖锁定文件
└── README.md                      # 项目说明
```

## 🎨 自定义配置

### 修改网站信息

编辑 `docs/.vitepress/config.mts`:

```typescript
export default defineConfig({
    title: "你的网站标题",
    description: "你的网站描述",
    base: '/你的仓库名/',
    // ... 其他配置
})
```

### 自定义主题

- **样式**: 编辑 `docs/.vitepress/theme/custom.css`
- **组件**: 在 `docs/.vitepress/theme/components/` 添加 Vue 组件
- **布局**: 修改 `docs/.vitepress/theme/layout/Layout.vue`

### 添加新页面

1. 在 `docs/src/` 目录下创建 `.md` 文件
2. 在 `config.mts` 中添加导航和侧边栏配置

## 🌐 部署到 GitHub Pages

### 自动部署（推荐）

1. **创建 GitHub 仓库**并推送代码
2. **配置 base 路径**：修改 `docs/.vitepress/config.mts` 中的 `base` 为你的仓库名
3. **启用 GitHub Pages**：
    - 进入仓库 Settings → Pages
    - Source 选择 "GitHub Actions"
4. **推送代码**触发自动部署

### 手动部署

```bash
# 构建
npm run docs:build

# 部署到 gh-pages 分支
npm run deploy
```

## 📝 使用指南

### 编写文档

- 使用 Markdown 语法编写文档
- 支持 Vue 组件和自定义容器
- 代码块使用 Ubuntu Mono 字体
- 支持数学公式、图表等扩展功能

### 主题切换

网站支持明暗主题切换，用户可以：

- 点击导航栏的主题切换按钮
- 系统会记住用户的主题偏好
- 支持跟随系统主题

### 搜索功能

- 内置本地搜索，支持中文
- 快捷键：`Ctrl/Cmd + K`
- 支持模糊搜索和关键词高亮

## 🔧 开发说明

### 开发规范

- 使用 TypeScript 进行类型检查
- 遵循 Vue 3 Composition API 规范
- CSS 使用 Sass 预处理器
- 组件命名采用 PascalCase

### 代码风格

- 代码块字体：Ubuntu Mono
- 主色调：渐变橘黄色 (#ff6b35)
- 响应式设计，移动端优先

### 构建优化

- 自动压缩图片和资源
- CSS 和 JS 代码分割
- 支持 PWA（可选）

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目基于 [Apache License 2.0](LICENSE) 开源协议。

### 许可证摘要

- ✅ **商业使用** - 可以用于商业目的
- ✅ **修改** - 可以修改源代码
- ✅ **分发** - 可以分发原始或修改后的代码
- ✅ **专利使用** - 提供明确的专利许可
- ✅ **私人使用** - 可以私人使用和修改
- ⚠️ **商标使用** - 不授予商标权
- ⚠️ **责任** - 作者不承担责任
- ⚠️ **保证** - 不提供任何保证

详细信息请查看 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- [VitePress](https://vitepress.dev/) - 优秀的静态站点生成器
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [GitHub Pages](https://pages.github.com/) - 免费的静态网站托管服务

## 📞 联系方式

- **项目地址**: [https://github.com/theo-thinker/kapok-docs](https://github.com/theo-thinker/kapok-docs)
- **在线预览**: [https://theo-thinker.github.io/kapok-docs/](https://theo-thinker.github.io/kapok-docs/)
- **问题反馈**: [Issues](https://github.com/theo-thinker/kapok-docs/issues)

---

<div style="align-items: center">

**⭐ 如果这个项目对你有帮助，请给它一个 Star！**

Made with ❤️ by [Your Name](https://github.com/yourusername)

</div>