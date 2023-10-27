import { fileURLToPath, URL } from 'node:url'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        IconResolver({
          prefix: 'Icon', //按需引入图标
        }),
        ElementPlusResolver(), //按需引入element plus
      ],
      imports: ['vue', 'vue-router'], //按需引入Vue 相关函数，如：ref, reactive, toRef 等
      dts: 'src/auto-import.d.ts',
    }),
    Components({
      resolvers: [
        IconResolver({
          enabledCollections: ['ep'],
        }),
        ElementPlusResolver(),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8888,
    https: false,
    //配置代理
    proxy: {
      '/front-api': {
        target: 'http://192.168.3.21:48080/', //代理的目标路径
        changeOrigin: true, //开启跨域
        rewrite: (path) => path.replace(/^\/front-api/, '/front-api'),
      },
    },
  },
})
