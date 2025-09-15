import type {Theme} from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './layout/Layout.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import HeroImage from './components/HeroImage.vue'
import './custom.css'

const theme: Theme = {
    extends: DefaultTheme,
    Layout,
    enhanceApp({app}) {
        app.component('ThemeSwitcher', ThemeSwitcher)
        app.component('HeroImage', HeroImage)
    }
}

export default theme