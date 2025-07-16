<template>
    <ContentPage
        :articles="webArticles"
        :loadMarkdownContent="loadMarkdownContent"
        pageTitle="Web"
        :navTabs="navTabs"
    />
</template>

<script setup lang="ts">
import ContentPage from "../../components/ContentPage/index.vue";
import { webArticles, navTabs, loadMarkdownContent } from "./config";
</script>
