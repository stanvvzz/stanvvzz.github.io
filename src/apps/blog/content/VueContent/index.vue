<template>
    <ContentPage
        :articles="vueArticles"
        :loadMarkdownContent="loadMarkdownContent"
        pageTitle="Vue.js"
        :navTabs="navTabs"
    />
</template>

<script setup lang="ts">
import ContentPage from "../../components/ContentPage/index.vue";
import { vueArticles, navTabs, loadMarkdownContent } from "./config";
</script>
