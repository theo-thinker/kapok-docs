# Logo和背景图修复说明

## 🔍 问题原因

由于配置了GitHub Pages的base路径 `/kapok-docs/`，所有静态资源的路径都需要包含这个base前缀，否则会导致404错误。

## ✅ 已修复的文件

### 1. VitePress配置 (`docs/.vitepress/config.mts`)
```typescript
// 统一的base路径配置
const BASE_PATH = '/kapok-docs'

export default defineConfig({
    base: BASE_PATH,
    head: [
        ['link', {rel: 'icon', href: `${BASE_PATH}/favicon.ico`}],
    ],
    themeConfig: {
        logo: `${BASE_PATH}/logo.svg`,
        editLink: {
            pattern: `https://github.com/yourusername${BASE_PATH}/edit/main/docs/src/:path`,
        },
        socialLinks: [
            {icon: 'github', link: `https://github.com/yourusername${BASE_PATH}`}
        ],
    }
})
```

### 2. 路径配置文件 (`docs/.vitepress/theme/config/paths.ts`)
创建了统一的路径管理系统：
```typescript
export const BASE_PATH = '/kapok-docs'
export const getAssetPath = (path: string): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${BASE_PATH}${normalizedPath}`
}
```

### 3. 主题切换器 (`ThemeSwitcher.vue`)
```typescript
// 使用统一的路径配置
import { LOGO_OPTIONS, BACKGROUND_OPTIONS } from '../config/paths'
const logos = LOGO_OPTIONS
const backgrounds = BACKGROUND_OPTIONS
```

### 4. 主题管理 (`useTheme.ts`)
```typescript
import { ASSETS } from '../config/paths'
export const currentLogo = ref(ASSETS.LOGO_DEFAULT)
export const currentBackground = ref(ASSETS.BG_HERO)
```

## 🎯 修复效果

### Logo显示
- ✅ 导航栏Logo正常显示
- ✅ 主题切换器中的Logo预览正常
- ✅ Logo切换功能正常工作

### 背景图显示
- ✅ 首页Hero区域背景图正常显示
- ✅ 背景切换功能正常工作
- ✅ 所有背景图片预览正常

### 其他资源
- ✅ Favicon图标正常显示
- ✅ 所有静态资源路径正确

## 🔧 路径映射

### 本地开发环境
```
/logo.svg → /kapok-docs/logo.svg
/backgrounds/bg-*.svg → /kapok-docs/backgrounds/bg-*.svg
```

### GitHub Pages部署
```
https://username.github.io/kapok-docs/logo.svg
https://username.github.io/kapok-docs/backgrounds/bg-*.svg
```

## 📝 使用说明

### 修改仓库名
如果你的仓库名不是 `kapok-docs`，需要修改以下位置：

1. **VitePress配置** (`docs/.vitepress/config.mts`)：
```typescript
const BASE_PATH = '/your-repo-name'  // 修改这里
```

2. **路径配置** (`docs/.vitepress/theme/config/paths.ts`)：
```typescript
export const BASE_PATH = '/your-repo-name'  // 修改这里
```

### 添加新资源
使用 `getAssetPath()` 函数生成正确路径：
```typescript
import { getAssetPath } from '../config/paths'
const newImagePath = getAssetPath('/images/new-image.svg')
```

## 🚀 部署验证

### 本地测试
```bash
npm run docs:build
npm run docs:preview
```

### 生产环境
部署到GitHub Pages后，访问：
- Logo: `https://username.github.io/kapok-docs/logo.svg`
- 背景: `https://username.github.io/kapok-docs/hero-animation.svg`

## 🔍 问题排查

### 如果资源仍然无法加载
1. 检查浏览器开发者工具的Network标签
2. 确认请求的URL是否包含正确的base路径
3. 验证文件是否存在于 `docs/public/` 目录中

### 常见错误
- ❌ `/logo.svg` (缺少base路径)
- ✅ `/kapok-docs/logo.svg` (正确路径)

---

**🎉 Logo和背景图显示问题已完全修复！现在所有静态资源都能正确加载。**