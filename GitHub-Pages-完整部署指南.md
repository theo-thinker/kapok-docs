# GitHub Pages 完整部署指南

## 📋 目录

1. [GitHub Pages 基础概念](#github-pages-基础概念)
2. [VitePress 项目部署步骤](#vitepress-项目部署步骤)
3. [配置要求与限制](#配置要求与限制)
4. [常见错误与解决方案](#常见错误与解决方案)
5. [高级配置与优化](#高级配置与优化)
6. [故障排查清单](#故障排查清单)

---

## GitHub Pages 基础概念

### 🎯 什么是 GitHub Pages

GitHub Pages 是 GitHub 提供的免费静态网站托管服务，支持：

- **用户/组织站点**：`https://<username>.github.io`
- **项目站点**：`https://<username>.github.io/<repository>`

### 📁 支持的发布源

1. **分支发布**：直接从指定分支（如 `main`、`gh-pages`）发布
2. **GitHub Actions**：通过自定义工作流构建和部署（推荐）

### 🛠️ 支持的静态站点生成器

- **内置支持**：Jekyll（自动构建）
- **通过 GitHub Actions**：VitePress、Hugo、Hexo、Gatsby、Next.js 等

---

## VitePress 项目部署步骤

### 第一步：项目结构检查

确保你的项目结构如下：

```
your-repo/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 工作流
├── docs/
│   ├── .vitepress/
│   │   └── config.mts          # VitePress 配置文件
│   ├── public/                 # 静态资源
│   └── src/                    # 文档源文件
├── package.json
└── README.md
```

### 第二步：配置 VitePress

#### 1. 设置 base 路径

在 `docs/.vitepress/config.mts` 中：

```typescript
import {defineConfig} from 'vitepress'

// 重要：将 'your-repo-name' 替换为实际的仓库名
const BASE_PATH = '/your-repo-name'

export default defineConfig({
    title: "Your Site Title",
    description: "Your site description",

    // GitHub Pages 部署必需配置
    base: BASE_PATH,

    // 其他配置...
})
```

#### 2. 配置 package.json 脚本

```json
{
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  }
}
```

### 第三步：创建 GitHub Actions 工作流

在 `.github/workflows/deploy.yml` 创建文件：

```yaml
# GitHub Pages 部署 VitePress 站点
name: Deploy VitePress site to Pages

on:
  # 在推送到主分支时触发
  push:
    branches: [ main, master ]
  # 允许手动触发工作流
  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限以允许部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 只允许一个并发部署，跳过正在运行和最新队列之间的运行队列
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # 获取完整Git历史，支持lastUpdated功能

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm # 或 pnpm / yarn

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Install dependencies
        run: npm ci

      - name: Build with VitePress
        run: |
          npm run docs:build
          touch docs/.vitepress/dist/.nojekyll

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  # 部署工作
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

### 第四步：配置 GitHub 仓库

1. **推送代码到 GitHub**：
   ```bash
   git add .
   git commit -m "feat: 配置 GitHub Pages 部署"
   git push origin main
   ```

2. **启用 GitHub Pages**：
    - 进入仓库 Settings → Pages
    - 在 "Build and deployment" 部分
    - Source 选择：**GitHub Actions**
    - 保存设置

3. **等待部署完成**：
    - 查看 Actions 标签页的部署状态
    - 绿色 ✅ 表示部署成功

### 第五步：访问网站

部署成功后，访问：

- **项目站点**：`https://<username>.github.io/<repository-name>/`
- 例如：`https://theo-thinker.github.io/kapok-docs/`

---

## 配置要求与限制

### 📏 仓库限制

| 项目   | 限制            |
|------|---------------|
| 仓库大小 | 1 GB          |
| 构建流量 | 100 GB/月      |
| 构建频率 | 每分钟最多 10 次    |
| 文件大小 | 单个文件最大 100 MB |

### 🔐 权限要求

- 仓库管理员或维护者权限
- GitHub Actions 权限（自动启用）
- Pages 写入权限（在工作流中配置）

### 🌐 域名配置

- **默认域名**：`<username>.github.io/<repository>`
- **自定义域名**：需配置 DNS 和 CNAME 文件

---

## 常见错误与解决方案

### 🚨 404 错误

#### 问题 1：页面完全无法访问

**原因**：

- GitHub Pages 未正确启用
- 发布源配置错误
- 构建失败

**解决方案**：

1. 检查 Settings → Pages 配置
2. 确认选择了 "GitHub Actions" 作为源
3. 查看 Actions 标签页的构建日志

#### 问题 2：静态资源 404（CSS/JS/图片）

**原因**：

- `base` 路径配置错误
- 仓库名与配置不匹配

**解决方案**：

```typescript
// 确保 base 路径与仓库名一致
export default defineConfig({
    base: '/actual-repo-name/', // 必须与 GitHub 仓库名完全一致
})
```

#### 问题 3：子页面刷新后 404

**原因**：

- SPA 路由配置问题
- 缺少 `.nojekyll` 文件

**解决方案**：
在构建步骤中添加：

```yaml
- name: Build with VitePress
  run: |
    npm run docs:build
    touch docs/.vitepress/dist/.nojekyll  # 禁用 Jekyll 处理
```

### 🔧 构建失败

#### 问题 1：GitHub Actions 权限不足

**错误信息**：`Error: Resource not accessible by integration`

**解决方案**：
确保工作流包含正确的权限：

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

#### 问题 2：Node.js 版本不兼容

**错误信息**：`The engine "node" is incompatible with this module`

**解决方案**：
更新工作流中的 Node.js 版本：

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: 22  # 使用最新 LTS 版本
```

#### 问题 3：依赖安装失败

**错误信息**：`npm ERR! code ENOENT`

**解决方案**：

1. 确保 `package-lock.json` 已提交
2. 使用 `npm ci` 而不是 `npm install`
3. 清理缓存：
   ```yaml
   - name: Setup Node.js
     uses: actions/setup-node@v4
     with:
       node-version: 22
       cache: npm
   ```

### 🔄 部署延迟

#### 问题：部署成功但内容未更新

**原因**：

- 浏览器缓存
- CDN 缓存
- DNS 传播延迟

**解决方案**：

1. 强制刷新浏览器（Ctrl+F5）
2. 清除浏览器缓存
3. 等待 5-10 分钟让 CDN 更新
4. 使用无痕模式测试

### 🎨 样式问题

#### 问题：CSS 样式丢失或错乱

**原因**：

- 资源路径错误
- 缓存问题
- 构建配置错误

**解决方案**：

1. 检查 `base` 配置
2. 确保 `publicDir` 配置正确：
   ```typescript
   export default defineConfig({
     base: '/repo-name/',
     vite: {
       publicDir: '../public'  // 相对于 .vitepress 目录
     }
   })
   ```

---

## 高级配置与优化

### 🚀 性能优化

#### 1. 启用缓存

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: 22
    cache: npm  # 启用依赖缓存
```

#### 2. 并行构建

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [ 22 ]  # 可配置多版本测试
```

#### 3. 条件部署

```yaml
on:
  push:
    branches: [ main ]
    paths:
      - 'docs/**'      # 仅当文档变更时触发
      - '.github/workflows/deploy.yml'
```

### 🔒 安全配置

#### 1. 环境保护

```yaml
deploy:
  environment:
    name: github-pages
    url: ${{ steps.deployment.outputs.page_url }}
  # 添加环境保护规则（在仓库设置中配置）
```

#### 2. 分支保护

在仓库 Settings → Branches 中：

- 启用分支保护规则
- 要求状态检查通过
- 要求分支为最新

### 🌍 自定义域名

#### 1. 配置 DNS

在域名提供商处添加记录：

```
# A 记录（根域名）
@  A  185.199.108.153
@  A  185.199.109.153
@  A  185.199.110.153
@  A  185.199.111.153

# CNAME 记录（子域名）
www  CNAME  username.github.io
```

#### 2. 添加 CNAME 文件

在 `docs/public/CNAME` 文件中：

```
yourdomain.com
```

#### 3. 启用 HTTPS

在仓库 Settings → Pages 中：

- 勾选 "Enforce HTTPS"
- 等待证书生成（可能需要几分钟）

---

## 故障排查清单

### ✅ 部署前检查

- [ ] 项目结构正确
- [ ] `base` 路径配置正确
- [ ] `package.json` 脚本配置完整
- [ ] GitHub Actions 工作流文件存在
- [ ] 本地构建测试通过（`npm run docs:build`）

### ✅ 部署配置检查

- [ ] GitHub Pages 设置为 "GitHub Actions"
- [ ] 工作流权限配置正确
- [ ] 分支名称匹配（main/master）
- [ ] 构建输出路径正确

### ✅ 部署后检查

- [ ] Actions 工作流运行成功
- [ ] 网站可以正常访问
- [ ] 静态资源加载正常
- [ ] 所有页面链接有效
- [ ] 移动端显示正常

### 🔍 问题诊断步骤

1. **检查 Actions 日志**：
    - 进入仓库 → Actions 标签页
    - 查看最新的工作流运行
    - 展开失败的步骤查看详细错误

2. **本地复现问题**：
   ```bash
   # 本地构建测试
   npm run docs:build
   npm run docs:preview
   
   # 检查构建输出
   ls -la docs/.vitepress/dist/
   ```

3. **网络工具诊断**：
   ```bash
   # 检查 DNS 解析
   nslookup username.github.io
   
   # 检查 HTTP 响应
   curl -I https://username.github.io/repo-name/
   ```

4. **浏览器开发者工具**：
    - 检查 Network 标签页的 404 错误
    - 查看 Console 的 JavaScript 错误
    - 验证资源路径是否正确

### 📞 获取帮助

如果问题仍未解决：

1. **GitHub 社区**：[GitHub Community Discussions](https://github.com/orgs/community/discussions/categories/pages)
2. **VitePress 文档**：[VitePress Deploy Guide](https://vitepress.dev/guide/deploy)
3. **GitHub 支持**：通过仓库 Settings → Support 联系

---

## 🎉 总结

通过本指南，你应该能够：

- ✅ 成功部署 VitePress 项目到 GitHub Pages
- ✅ 理解常见错误的原因和解决方法
- ✅ 配置高级功能如自定义域名和性能优化
- ✅ 独立排查和解决部署问题

**记住关键要点**：

1. **base 路径必须与仓库名一致**
2. **使用 GitHub Actions 而不是分支部署**
3. **添加 .nojekyll 文件禁用 Jekyll 处理**
4. **配置正确的权限和环境**

祝你部署成功！🚀