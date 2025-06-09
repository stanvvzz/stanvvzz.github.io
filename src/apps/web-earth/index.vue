<template>
    <web-earth-layout>
        <template #header> </template>
        <template #sider> </template>
        <template #content>
            <web-earth-content></web-earth-content>
        </template>
    </web-earth-layout>
</template>

<script setup lang="ts">
import WebEarthLayout from "./layout/index.vue";
import WebEarthContent from "./content/index.vue";
</script>

<style lang="less" scoped></style>
