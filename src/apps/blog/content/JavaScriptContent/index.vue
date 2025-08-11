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
import { javaScriptArticles, loadMarkdownContent, navTabs } from "./config";
</script>
