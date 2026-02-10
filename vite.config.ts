import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue({
      // Support Markdown content imports
      include: [/\.vue$/, /\.md$/, /\.db$/],
    }),
  ],
  build: {
    target: "es2020",
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }
          if (id.includes("monaco-editor")) {
            return "vendor-monaco";
          }
          if (id.includes("sql.js")) {
            return "vendor-sqljs";
          }
          if (
            id.includes("@bytemd") ||
            id.includes("highlight.js") ||
            id.includes("github-markdown-css")
          ) {
            return "vendor-markdown";
          }
          if (
            id.includes("openai") ||
            id.includes("@anthropic-ai") ||
            id.includes("@google/generative-ai")
          ) {
            return "vendor-ai";
          }
          if (id.includes("ant-design-vue") || id.includes("@ant-design")) {
            return "vendor-antd";
          }
          if (
            id.includes("vue") ||
            id.includes("vue-router") ||
            id.includes("pinia")
          ) {
            return "vendor-vue";
          }
          return "vendor-misc";
        },
      },
    },
  },
});
