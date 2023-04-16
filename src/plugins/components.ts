
// 引入全局样式
import '@/styles/pages/index.scss'
// 引入动画
import 'animate.css/animate.min.css'
// 引入标尺
import 'vue3-sketch-ruler/lib/style.css'

import Vue3Lottie from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import { setupNaive } from '@/plugins'

/**
 * 全局注册组件
 * @param app
 */
export function setupComponents(app: App) {
    // 注册全局常用的 naive-ui 组件
    setupNaive(app)
    // Lottie 动画
    app.use(Vue3Lottie)
}
  