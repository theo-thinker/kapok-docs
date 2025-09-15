# GitHub Pages 部署指南

## 📋 部署概览

本项目已配置为自动部署到 GitHub Pages，使用 GitHub Actions 进行 CI/CD。

## 🚀 部署步骤

### 1. 创建 GitHub 仓库
1. 在 GitHub 上创建新仓库（如：`kapok-docs`）
2. 将本地代码推送到仓库

### 2. 配置 base 路径
在 `docs/.vitepress/config.mts` 中：
```typescript
export default defineConfig({
  // 将 'kapok-docs' 替换为你的实际仓库名
  base: '/kapok-docs/',
  // ... 其他配置
})
```

### 3. 启用 GitHub Pages
1. 进入仓库 Settings → Pages
2. 在 "Build and deployment" 部分
3. Source 选择：**GitHub Actions**

### 4. 推送代码触发部署
```bash
git add .
git commit -m "feat: 配置 GitHub Pages 部署"
git push origin main
```

## 🔧 自动化配置

### GitHub Actions 工作流
- 文件位置：`.github/workflows/deploy.yml`
- 触发条件：推送到 `main` 或 `master` 分支
- 构建环境：Ubuntu Latest + Node.js 20
- 自动部署到 GitHub Pages

### 构建流程
1. **Checkout** - 检出代码
2. **Setup Node.js** - 设置 Node.js 环境
3. **Install dependencies** - 安装依赖 (`npm ci`)
4. **Build** - 构建静态文件 (`npm run docs:build`)
5. **Deploy** - 部署到 GitHub Pages

## 📁 项目结构

```
kapok-docs/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 工作流
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts          # VitePress 配置
│   │   ├── theme/
│   │   └── dist/               # 构建输出目录
│   ├── public/                 # 静态资源
│   └── src/                    # 文档源文件
├── package.json                # 项目配置
└── README.md
```

## 🌐 访问地址

部署成功后，你的网站将在以下地址可用：
- **GitHub Pages URL**: `https://<username>.github.io/<repository-name>/`
- 例如：`https://yourusername.github.io/kapok-docs/`

## 🔍 部署状态检查

### 查看部署状态
1. 进入仓库 → Actions 标签页
2. 查看最新的 "Deploy VitePress site to Pages" 工作流
3. 绿色 ✅ 表示部署成功，红色 ❌ 表示部署失败

### 常见问题排查
1. **构建失败**：检查 Actions 日志中的错误信息
2. **404 错误**：确认 `base` 配置是否正确
3. **资源加载失败**：检查静态资源路径

## ⚙️ 高级配置

### 自定义域名（可选）
1. 在 `docs/public/` 目录下创建 `CNAME` 文件
2. 文件内容为你的域名，如：`docs.yourdomain.com`
3. 在域名提供商处配置 DNS 记录

### 环境变量
如需使用环境变量，可在 GitHub 仓库的 Settings → Secrets and variables → Actions 中配置。

## 📝 维护说明

### 更新部署
- 每次推送到主分支都会自动触发部署
- 无需手动操作，完全自动化

### 本地预览
```bash
# 开发模式
npm run docs:dev

# 构建预览
npm run docs:build
npm run docs:preview
```

### 版本更新
定期更新依赖：
```bash
npm update
```

## 🎯 部署检查清单

- [ ] 仓库已创建并推送代码
- [ ] `base` 路径配置正确
- [ ] GitHub Pages 设置为 "GitHub Actions"
- [ ] Actions 工作流运行成功
- [ ] 网站可正常访问
- [ ] 所有页面和资源加载正常

---

**🎉 恭喜！你的 VitePress 文档网站已成功部署到 GitHub Pages！**