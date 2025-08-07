import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080/', // 目标后端接口地址
          changeOrigin: true,                   // 是否修改请求头中的origin
          rewrite: (path) => path.replace(/^\/api/, ''), // 去掉路径前缀/api
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue'],

        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          ElementPlusResolver(),

          // Auto import icon components
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon',
          }),
        ],

        dts: path.resolve('src/auto-imports.d.ts'),
      }),

      Components({
        resolvers: [
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          }),
          // Auto register Element Plus components
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
        ],

        dts: path.resolve('src/components.d.ts'),
      }),

      Icons({
        autoInstall: true,
      }),

      viteMockServe({
        mockPath: 'src/mock',             // mock 文件夹路径
        enable: command === 'serve',  // 仅开发模式启用
        watchFiles: true                   // 自动热更新 mock 文件
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    }
  }
})
