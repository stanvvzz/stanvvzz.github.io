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
import { webGLArticles, loadMarkdownContent } from "./config";

// 导航标签配置
const navTabs = [{ id: "all", name: "All" }];
</script>
