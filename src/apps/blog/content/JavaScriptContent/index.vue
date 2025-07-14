<template>
    <ContentPage
        :articles="javaScriptArticles"
        :loadMarkdownContent="loadMarkdownContent"
        pageTitle="JavaScript"
        :navTabs="navTabs"
    />
</template>

<script setup lang="ts">
import ContentPage from "../../components/ContentPage/index.vue";
import {
    javaScriptArticles,
    loadMarkdownContent,
} from "./config";

// 导航标签配置
const navTabs = [
    { id: "all", name: "全部" },
    { id: "basic", name: "基础语法" },
    { id: "async", name: "异步编程" },
    { id: "advanced", name: "进阶技巧" },
    { id: "patterns", name: "设计模式" },
];
</script>
