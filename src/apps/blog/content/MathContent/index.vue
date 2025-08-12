<template>
    <ContentPage
        :articles="mathArticles"
        :loadMarkdownContent="loadMarkdownContent"
        pageTitle="Math"
        :navTabs="navTabs"
    />
</template>

<script setup lang="ts">
import ContentPage from "../../components/ContentPage/index.vue";
import { mathArticles, loadMarkdownContent, navTabs } from "./config";
</script>
