<template>
    <ContentPage
        :articles="webGLArticles"
        :loadMarkdownContent="loadMarkdownContent"
        pageTitle="WebGL"
        :navTabs="navTabs"
    />
</template>

<script setup lang="ts">
import ContentPage from "../../components/ContentPage/index.vue";
import {
    webGLArticles,
    loadMarkdownContent,
} from "./config";

// 导航标签配置
const navTabs = [
    { id: "all", name: "全部" },
    { id: "basic", name: "基础概念" },
    { id: "shader", name: "着色器" },
    { id: "advanced", name: "高级技术" },
    { id: "optimization", name: "性能优化" },
];
</script>
