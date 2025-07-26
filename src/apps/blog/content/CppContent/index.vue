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
const navTabs = [{ id: "all", name: "All" }];
</script>
