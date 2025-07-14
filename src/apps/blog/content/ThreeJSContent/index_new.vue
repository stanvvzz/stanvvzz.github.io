<template>
    <ContentPage
        :articles="threeJSArticles"
        :loadMarkdownContent="loadMarkdownContent"
        pageTitle="Three.js"
        :navTabs="navTabs"
    />
</template>

<script setup lang="ts">
import ContentPage from "../../components/ContentPage/index.vue";
import { threeJSArticles, loadMarkdownContent } from "./config";

// 导航标签配置
const navTabs = [
    { id: "all", name: "全部" },
    { id: "basic", name: "基础入门" },
    { id: "advanced", name: "进阶技巧" },
    { id: "performance", name: "性能优化" },
];
</script>
