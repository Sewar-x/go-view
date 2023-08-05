import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import monacoEditorPlugin from 'vite-plugin-monaco-editor'
import { configImageminPlugin } from "./imagemin";
import { configCompressPlugin } from "./compress";
import { configMockPlugin } from "./mock";

/**
 * 创建插件数组
 * @param viteEnv 环境配置变量
 * @param isBuild 构建环境变量
 * @returns 
 */
export function createVitePlugin(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_MOCK,
    VITE_USE_IMAGEMIN,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
    monacoEditorPlugin({
      languageWorkers: ['editorWorkerService', 'typescript', 'json', 'html']
    }),
  ];

  // @vitejs/plugin-legacy 兼容旧浏览器
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));




  if (isBuild) {
    // vite-plugin-imagemin 图片压缩
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // rollup-plugin-gzip 文件压缩
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
    );
  }

  return vitePlugins;
}
