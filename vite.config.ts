import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      // 支持 Markdown 文件加载
      include: [/\.vue$/, /\.md$/, /\.db$/],
    }),
  ],
});
