<template>
    <BlogLayout>
        <template #header>
            <BlogHeader></BlogHeader>
        </template>

        <template #sider>
            <BlogSider></BlogSider>
        </template>

        <template #content>
            <BlogContent></BlogContent>
        </template>
    </BlogLayout>
</template>

<script setup lang="ts">
import BlogLayout from "./layout/index.vue";
import BlogHeader from "./header/index.vue";
import BlogSider from "./sider/index.vue";
import BlogContent from "./content/index.vue";
</script>

<style lang="less" scoped></style>
