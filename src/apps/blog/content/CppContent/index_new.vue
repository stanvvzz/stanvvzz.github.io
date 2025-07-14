<template>
    <ContentPage
        :articles="cppArticles"
        :loadMarkdownContent="loadMarkdownContent"
        pageTitle="C++"
        :navTabs="navTabs"
    />
</template>

<script setup lang="ts">
import ContentPage from "../../components/ContentPage/index.vue";
import { cppArticles, loadMarkdownContent } from "./config";

// 导航标签配置
const navTabs = [
    { id: "all", name: "全部" },
    { id: "modern", name: "现代C++" },
    { id: "memory", name: "内存管理" },
    { id: "template", name: "模板编程" },
    { id: "concurrent", name: "并发编程" },
];
</script>
