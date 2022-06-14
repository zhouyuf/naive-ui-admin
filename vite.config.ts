import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: './mock',
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.json', '.ts'],
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(__dirname, 'src/styles/var.less')}";`,
      },
    },
  },
});
