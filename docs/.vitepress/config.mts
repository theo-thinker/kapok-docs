/*
 * Copyright 2024 Kapok Docs Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {defineConfig} from 'vitepress'

// 路径配置 - 请将 'kapok-docs' 修改为你的实际仓库名
const BASE_PATH = '/kapok-docs'

export default defineConfig({
    title: "Kapok Docs",
    description: "企业级个人日常开发文档网站",
    srcDir: 'src',
    // 语言配置
    lang: 'zh-CN',
    // GitHub Pages 部署配置
    base: BASE_PATH,
    vite: {
        publicDir: '../public'
    },
    head: [
        // 现代浏览器 SVG favicon - VitePress会自动处理base路径
        ['link', {rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml'}],
        // 传统浏览器 fallback
        ['link', {rel: 'icon', href: '/favicon.ico', type: 'image/x-icon'}],
        // 强制刷新favicon缓存
        ['link', {rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon'}],
        // Apple Touch Icon
        ['link', {rel: 'apple-touch-icon', href: '/favicon-32x32.svg', sizes: '180x180'}],
        // 不同尺寸的图标
        ['link', {rel: 'icon', href: '/favicon-16x16.svg', sizes: '16x16', type: 'image/svg+xml'}],
        ['link', {rel: 'icon', href: '/favicon-32x32.svg', sizes: '32x32', type: 'image/svg+xml'}],
        ['meta', {name: 'viewport', content: 'width=device-width,initial-scale=1'}],
        ['meta', {name: 'keywords', content: 'VitePress, 文档, Kapok, 开发文档'}],
        ['meta', {name: 'theme-color', content: '#ff6b35'}]
    ],
    // 启用最后更新时间
    lastUpdated: true,
    themeConfig: {
        logo: '/logo.svg',
        siteTitle: 'Kapok Docs',
        // 启用最后更新时间显示
        lastUpdatedText: '最后更新',
        
        // 中文界面文本配置
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        
        // 大纲标题
        outlineTitle: '页面导航',
        
        // 返回顶部
        returnToTopLabel: '回到顶部',
        
        // 外部链接图标
        externalLinkIcon: true,
        
        // 侧边栏菜单标签
        sidebarMenuLabel: '菜单',
        
        // 深色模式切换标签
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        
        // 搜索功能中文配置
        search: {
            provider: 'local',
            options: {
                locales: {
                    root: {
                        translations: {
                            button: {
                                buttonText: '搜索文档',
                                buttonAriaLabel: '搜索文档'
                            },
                            modal: {
                                noResultsText: '无法找到相关结果',
                                resetButtonTitle: '清除查询条件',
                                footer: {
                                    selectText: '选择',
                                    navigateText: '切换',
                                    closeText: '关闭'
                                }
                            }
                        }
                    }
                }
            }
        },
        nav: [
            {text: '首页', link: '/'},
            {text: '指南', link: '/markdown-examples'},
            {text: 'API', link: '/api-examples'},
            {text: 'VitePress指南', link: '/vitepress-guide'},
            {text: '主题切换', link: '/theme-switcher'},
            {text: '许可证', link: '/license'}
        ],
        sidebar: [
            {
                text: '开始使用',
                items: [
                    {text: 'Markdown 示例', link: '/markdown-examples'},
                    {text: 'Runtime API 示例', link: '/api-examples'}
                ]
            },
            {
                text: '文档指南',
                items: [
                    {text: 'VitePress 使用指南', link: '/vitepress-guide'}
                ]
            },
            {
                text: '项目信息',
                items: [
                    {text: '许可证信息', link: '/license'}
                ]
            }
        ],
        // 编辑链接配置
        editLink: {
            pattern: 'https://github.com/yourusername/kapok-docs/edit/main/docs/src/:path',
            text: '在 GitHub 上编辑此页'
        },
        socialLinks: [
            {icon: 'github', link: 'https://github.com/yourusername/kapok-docs'}
        ],
        footer: {
            message: 'Released under the Apache License 2.0.',
            copyright: 'Copyright © 2024 Kapok Docs Contributors'
        }
    }
})