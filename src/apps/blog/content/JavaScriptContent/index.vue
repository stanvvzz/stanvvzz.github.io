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
import { javaScriptArticles, loadMarkdownContent } from "./config";

// 导航标签配置
const navTabs = [{ id: "all", name: "All" }];
</script>
