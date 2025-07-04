<template>
    <div class="blog-header">
        <div class="blog">Blog</div>
        <div class="side-button">
            <img
                :src="currentIcon"
                alt="侧边栏按钮"
                class="icon"
                @click="handleIconClick"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useLayoutStore } from "@/apps/blog/stores/LayoutStore";

// 🔥 使用 layout store
const layoutStore = useLayoutStore();

// 🔥 根据 store 状态计算图标
const currentIcon = computed(() => {
    return layoutStore.siderCollapsed
        ? "/public/side-button2.svg" // 折叠状态图标
        : "/public/side-button.svg"; // 展开状态图标
});

// 🔥 点击直接调用 store 方法
function handleIconClick() {
    layoutStore.toggleCollapsed();
}
</script>

<!-- 样式保持不变 -->
<style lang="less" scoped>
.blog-header {
    padding-left: 2rem;
    padding-right: 2rem;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.blog {
    font-size: 24px;
    font-weight: 400;
}

.side-button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding-left: 16px;

    .icon {
        opacity: 0.44;
        width: 18px;
        height: 18px;
        transition: opacity 0.2s ease;

        &:hover {
            opacity: 1;
        }
    }
}
</style>
