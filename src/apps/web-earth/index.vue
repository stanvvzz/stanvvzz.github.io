<template>
    <web-earth-layout>
        <template #header>
            <web-earth-header></web-earth-header>
        </template>
        <template #sider>
            <web-earth-sider></web-earth-sider>
        </template>
        <template #content>
            <web-earth-content></web-earth-content>
        </template>
    </web-earth-layout>
</template>

<script setup lang="ts">
import WebEarthLayout from "./layout/index.vue";
import WebEarthContent from "./content/index.vue";
import WebEarthHeader from "./header/index.vue";
import WebEarthSider from "./sider/index.vue";
</script>

<style lang="less" scoped></style>
