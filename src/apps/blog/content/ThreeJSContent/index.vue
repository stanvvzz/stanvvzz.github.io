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
const navTabs = [{ id: "all", name: "All" }];
</script>
