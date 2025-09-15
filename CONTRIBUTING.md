# 贡献指南

感谢你对 Kapok Docs 项目的关注！我们欢迎任何形式的贡献，包括但不限于：

- 🐛 报告 Bug
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交代码修复
- ✨ 开发新功能
- 🎨 改进 UI/UX 设计

## 📋 目录

- [开始之前](#开始之前)
- [开发环境设置](#开发环境设置)
- [项目结构](#项目结构)
- [开发流程](#开发流程)
- [代码规范](#代码规范)
- [提交规范](#提交规范)
- [Pull Request 流程](#pull-request-流程)
- [问题报告](#问题报告)
- [功能建议](#功能建议)
- [文档贡献](#文档贡献)
- [社区准则](#社区准则)

## 🚀 开始之前

### 环境要求

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0
- **Git**: 最新版本
- **编辑器**: 推荐 VS Code

### 推荐工具

- **VS Code 扩展**:
    - Vue Language Features (Volar)
    - TypeScript Vue Plugin (Volar)
    - Sass
    - GitLens
    - Prettier
    - ESLint

## 🛠️ 开发环境设置

### 1. Fork 和克隆项目

```bash
# Fork 项目到你的 GitHub 账户
# 然后克隆你的 fork

git clone https://github.com/yourusername/kapok-docs.git
cd kapok-docs

# 添加上游仓库
git remote add upstream https://github.com/originalowner/kapok-docs.git
```

### 2. 安装依赖

```bash
# 安装项目依赖
npm install

# 验证安装
npm run docs:dev
```

### 3. 验证环境

访问 `http://localhost:5173` 确认开发服务器正常运行。

## 📁 项目结构

```
kapok-docs/
├── .github/                    # GitHub 配置
│   ├── workflows/              # GitHub Actions
│   ├── ISSUE_TEMPLATE/         # Issue 模板
│   └── PULL_REQUEST_TEMPLATE/  # PR 模板
├── docs/                       # 文档源码
│   ├── .vitepress/             # VitePress 配置
│   │   ├── config.mts          # 主配置文件
│   │   ├── theme/              # 自定义主题
│   │   │   ├── components/     # Vue 组件
│   │   │   ├── composables/    # 组合式函数
│   │   │   ├── layout/         # 布局组件
│   │   │   ├── config/         # 配置文件
│   │   │   ├── custom.css      # 自定义样式
│   │   │   └── index.ts        # 主题入口
│   │   └── dist/               # 构建输出
│   ├── public/                 # 静态资源
│   └── src/                    # 文档内容
├── package.json                # 项目配置
├── README.md                   # 项目说明
├── CHANGELOG.md                # 变更日志
├── CONTRIBUTING.md             # 贡献指南
└── CODE_OF_CONDUCT.md          # 行为准则
```

## 🔄 开发流程

### 1. 创建功能分支

```bash
# 确保在最新的 main 分支
git checkout main
git pull upstream main

# 创建新的功能分支
git checkout -b feature/your-feature-name
# 或者修复分支
git checkout -b fix/your-fix-name
```

### 2. 开发和测试

```bash
# 启动开发服务器
npm run docs:dev

# 在另一个终端运行构建测试
npm run docs:build

# 预览构建结果
npm run docs:preview
```

### 3. 提交更改

```bash
# 添加更改
git add .

# 提交更改（遵循提交规范）
git commit -m "feat: add new feature description"

# 推送到你的 fork
git push origin feature/your-feature-name
```

## 📝 代码规范

### TypeScript/JavaScript

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 配置
- 使用 Prettier 格式化代码
- 优先使用 ES6+ 语法

```typescript
// ✅ 好的示例
interface ThemeConfig {
    primaryColor: string;
    darkMode: boolean;
}

const config: ThemeConfig = {
    primaryColor: '#ff6b35',
    darkMode: true
};

// ❌ 避免的写法
var config = {
    primaryColor: '#ff6b35',
    darkMode: true
};
```

### Vue 组件

- 使用 Composition API
- 组件名使用 PascalCase
- Props 定义类型
- 使用 `<script setup>` 语法

```vue
<!-- ✅ 好的示例 -->
<script setup lang="ts">
  interface Props {
    title: string;
    description?: string;
  }

  const props = defineProps<Props>();
</script>

<template>
  <div class="component">
    <h1>{{ props.title }}</h1>
    <p v-if="props.description">{{ props.description }}</p>
  </div>
</template>

<style scoped>
  .component {
    padding: 1rem;
  }
</style>
```

### CSS/Sass

- 使用 Sass 预处理器
- 遵循 BEM 命名规范
- 使用 CSS 变量
- 移动端优先的响应式设计

```scss
// ✅ 好的示例
.hero {
  &__title {
    font-size: var(--font-size-xl);
    color: var(--color-primary);

    @media (max-width: 768px) {
      font-size: var(--font-size-lg);
    }
  }

  &__description {
    margin-top: 1rem;
    color: var(--color-text-secondary);
  }
}
```

### 文档编写

- 使用 Markdown 语法
- 添加适当的标题层级
- 包含代码示例
- 添加图片和图表说明

```markdown
# 标题

## 子标题

这是一个段落，包含**粗体**和*斜体*文本。

### 代码示例

\`\`\`typescript
// 这是一个代码示例
const example = 'Hello World';
console.log(example);
\`\`\`

### 注意事项

::: warning 警告
这是一个警告信息。
:::

::: tip 提示
这是一个提示信息。
:::
```

## 📋 提交规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

### 提交类型

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式修改
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动
- `ci`: CI/CD 相关

### 提交格式

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 示例

```bash
# 新功能
git commit -m "feat(theme): add dark mode toggle component"

# Bug 修复
git commit -m "fix(search): resolve search input focus issue"

# 文档更新
git commit -m "docs: update installation guide"

# 样式修改
git commit -m "style: format code with prettier"

# 重构
git commit -m "refactor(components): extract common hero logic"

# 性能优化
git commit -m "perf(build): optimize image loading"

# 破坏性变更
git commit -m "feat!: change theme configuration API

BREAKING CHANGE: theme configuration now requires explicit color definitions"
```

## 🔀 Pull Request 流程

### 1. 准备 PR

- 确保你的分支基于最新的 `main` 分支
- 运行所有测试并确保通过
- 更新相关文档
- 添加或更新测试用例（如适用）

### 2. 创建 PR

1. 推送你的分支到 GitHub
2. 在 GitHub 上创建 Pull Request
3. 填写 PR 模板
4. 链接相关的 Issue

### 3. PR 标题格式

```
<type>: <description>
```

示例：

- `feat: add theme switcher component`
- `fix: resolve mobile navigation issue`
- `docs: update contributing guidelines`

### 4. PR 描述模板

```markdown
## 📝 变更说明

简要描述这个 PR 的目的和内容。

## 🔗 相关 Issue

Closes #123

## 📋 变更类型

- [ ] Bug 修复
- [ ] 新功能
- [ ] 文档更新
- [ ] 样式修改
- [ ] 代码重构
- [ ] 性能优化
- [ ] 测试相关
- [ ] 其他

## 🧪 测试

描述你如何测试这些变更：

- [ ] 本地开发服务器测试
- [ ] 构建测试
- [ ] 移动端测试
- [ ] 不同浏览器测试

## 📷 截图

如果涉及 UI 变更，请提供截图。

## ✅ 检查清单

- [ ] 代码遵循项目规范
- [ ] 已添加必要的测试
- [ ] 文档已更新
- [ ] 变更日志已更新
- [ ] 所有测试通过
```

### 5. 代码审查

- 所有 PR 都需要至少一个维护者的审查
- 解决所有审查意见
- 确保 CI/CD 检查通过
- 保持 PR 范围小而专注

## 🐛 问题报告

### 报告 Bug

使用 [Bug Report 模板](https://github.com/yourusername/kapok-docs/issues/new?template=bug_report.md)：

1. **描述问题**: 清晰简洁地描述 bug
2. **重现步骤**: 详细的重现步骤
3. **预期行为**: 描述你期望发生什么
4. **实际行为**: 描述实际发生了什么
5. **环境信息**: 操作系统、浏览器、Node.js 版本等
6. **截图**: 如果适用，添加截图帮助解释问题

### Bug 报告示例

```markdown
**描述问题**
在移动设备上，导航菜单无法正常展开。

**重现步骤**

1. 在移动设备上访问网站
2. 点击汉堡菜单图标
3. 菜单没有展开

**预期行为**
点击汉堡菜单后，导航菜单应该展开显示所有菜单项。

**实际行为**
点击后没有任何反应，菜单保持关闭状态。

**环境信息**

- 设备: iPhone 12
- 浏览器: Safari 15.0
- 操作系统: iOS 15.0

**截图**
[添加截图]
```

## 💡 功能建议

使用 [Feature Request 模板](https://github.com/yourusername/kapok-docs/issues/new?template=feature_request.md)：

1. **功能描述**: 清晰描述你想要的功能
2. **使用场景**: 解释为什么需要这个功能
3. **解决方案**: 描述你期望的解决方案
4. **替代方案**: 描述你考虑过的替代方案
5. **附加信息**: 任何其他相关信息

## 📚 文档贡献

### 文档类型

- **用户文档**: 面向最终用户的使用指南
- **开发文档**: 面向开发者的技术文档
- **API 文档**: 接口和组件文档
- **教程**: 分步骤的学习指南

### 文档标准

- 使用清晰、简洁的语言
- 包含实际的代码示例
- 添加适当的图片和图表
- 保持内容的时效性
- 遵循一致的格式和风格

### 文档结构

```markdown
# 页面标题

简要介绍这个页面的内容。

## 概述

详细描述功能或概念。

## 快速开始

提供最简单的使用示例。

## 详细指南

### 子功能 1

详细说明和示例。

### 子功能 2

详细说明和示例。

## API 参考

如果适用，提供 API 文档。

## 常见问题

回答用户可能遇到的问题。

## 相关链接

- [相关文档链接]
- [外部资源链接]
```

## 🤝 社区准则

### 我们的承诺

为了营造一个开放和友好的环境，我们承诺：

- 使用友好和包容的语言
- 尊重不同的观点和经验
- 优雅地接受建设性批评
- 关注对社区最有利的事情
- 对其他社区成员表示同理心

### 不可接受的行为

- 使用性别化语言或图像，以及不受欢迎的性关注或性挑逗
- 恶意评论、侮辱/贬损评论，以及个人或政治攻击
- 公开或私下的骚扰
- 未经明确许可发布他人的私人信息
- 其他在专业环境中可能被认为不当的行为

### 执行

如果你遇到不当行为，请联系项目维护者。所有投诉都会被审查和调查。

## 🏆 认可贡献者

我们感谢所有贡献者的努力！贡献者将会：

- 在 README 中被提及
- 获得 GitHub 贡献者徽章
- 在发布说明中被感谢
- 成为项目社区的一员

## 📞 获取帮助

如果你需要帮助或有疑问：

- 📧 **邮件**: [your-email@example.com](mailto:your-email@example.com)
- 💬 **讨论**: [GitHub Discussions](https://github.com/yourusername/kapok-docs/discussions)
- 🐛 **问题**: [GitHub Issues](https://github.com/yourusername/kapok-docs/issues)
- 📖 **文档**: [项目文档](https://yourusername.github.io/kapok-docs/)

## 📄 许可证

通过贡献代码，你同意你的贡献将在 [MIT License](LICENSE) 下获得许可。

---

**再次感谢你对 Kapok Docs 项目的贡献！** 🙏

你的参与让这个项目变得更好！