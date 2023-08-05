import { fileURLToPath, URL } from "node:url";
import { loadEnv, type ConfigEnv, type UserConfig } from "vite";
import { wrapperEnv } from "./build/utils";
import { createVitePlugin } from "./build/vite/plugin";
import { createProxy } from "./build/vite/proxy";
import { OUTPUT_DIR, chunkSizeWarningLimit, terserOptions, rollupOptions } from './build/constant'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const url = import.meta.url;

  // process.cwd()方法返回Node.js进程的当前工作目录。
  const root = process.cwd();

  // 加载 root 中的 .env 文件。
  const env = loadEnv(mode, root);

  // loadEnv读取的布尔类型是一个字符串。这个函数可以转换为布尔类型
  const viteEnv = wrapperEnv(env);
  // command 为 package.json 中 scripts 脚本中 vite 命令后接参数
  const isBuild = command === "build";

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

  return {
    // 打包路径
    base: VITE_PUBLIC_PATH,
    // 打包后根目录
    root,
    // 文件解析
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", url)), // 源文件目录别名
        "#": fileURLToPath(new URL("./types", url)),// 类型定义文件目录别名
        "vue-i18n": 'vue-i18n/dist/vue-i18n.cjs.js', //解决i8n警告
      },
    },
    // 本地开发服务
    server: {
      host: true,
      port: VITE_PORT,
      open: true,
      cors: true,
      hmr: true, // 开启热更新
      proxy: createProxy(VITE_PROXY),
    },
    // 插件
    plugins: createVitePlugin(viteEnv, isBuild),
    // 构建参数
    esbuild: {
      // 删除对控制台API方法(如console.log)的所有调用
      pure: VITE_DROP_CONSOLE ? ["console.log", "debugger"] : [],
    },

    build: {
      target: "es2015",
      minify: 'terser',
      outDir: OUTPUT_DIR,
      terserOptions: terserOptions,
      rollupOptions: rollupOptions,
      chunkSizeWarningLimit: chunkSizeWarningLimit
    },
    // 全局 css 注册
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@import "src/styles/common/style.scss";`
        }
      }
    },
  };
};
