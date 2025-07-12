import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VueDevTools(), // 添加 Vue DevTools 插件
    ],
    assetsInclude: ["**/*.md"], // 允许将 .md 文件作为资源导入
    resolve: {
        alias: {
            "@": new URL("./src", import.meta.url).pathname,
        },
    },
});
