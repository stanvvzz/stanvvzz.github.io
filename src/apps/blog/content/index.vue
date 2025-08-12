<template>
    <div class="content-container">
        <component :is="currentContentComponent" />
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useLayoutStore } from "@/apps/blog/stores/LayoutStore";

// 导入所有内容组件
import HomeContent from "./HomeContent/index.vue";
import JavaScriptContent from "./JavaScriptContent/index.vue";
import WebContent from "./WebContent/index.vue";
import ThreeJSContent from "./ThreeJSContent/index.vue";
import WebGLContent from "./WebGLContent/index.vue";
// import CppContent from "./CppContent/index.vue";
import GeographyContent from "./GeographyContent/index.vue";
import MathContent from "./MathContent/index.vue";

const layoutStore = useLayoutStore();

// 内容组件映射
const contentComponents = {
    home: HomeContent, // 首页欢迎页面
    chat: JavaScriptContent, // JavaScript
    dalle: WebContent, // Vue
    sora: ThreeJSContent, // Three.js
    api: WebGLContent, // WebGL
    // research: CppContent, // C++
    geo: GeographyContent,
    math: MathContent,
};

// 计算当前应该显示的组件
const currentContentComponent = computed(() => {
    return (
        contentComponents[
            layoutStore.currentContent as keyof typeof contentComponents
        ] || HomeContent
    );
});
</script>

<style lang="less" scoped>
.content-container {
    height: 100%;
    width: 100%;
    overflow-y: auto;

    // 隐藏滚动条
    &::-webkit-scrollbar {
        display: none;
    }
    scrollbar-width: none;
    -ms-overflow-style: none;
}
</style>
