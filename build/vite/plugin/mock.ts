/**
 * vite-plugin-mock:
 * Provide local and prod mocks for vite.
 * url: https://www.npmjs.com/package/vite-plugin-mock
 */

import { viteMockServe } from 'vite-plugin-mock'

export function configMockPlugin(isBuild: boolean) {

  return viteMockServe({
    mockPath: '/src/api/mock',
    // 开发打包开关
    localEnabled: !isBuild,
    // 生产打包开关
    prodEnabled: !isBuild,
    // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
    supportTs: true,
    // 监视文件更改
    watchFiles: true
  });
}
