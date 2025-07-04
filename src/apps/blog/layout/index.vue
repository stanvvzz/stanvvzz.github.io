<template>
    <a-layout class="layout-container">
        <!-- 顶部导航栏插槽 -->
        <a-layout-header class="layout-header">
            <slot name="header">
                <div class="default-header">默认页头</div>
            </slot>
        </a-layout-header>

        <a-layout class="main-section">
            <!-- 侧边栏插槽 -->
            <a-layout-sider
                class="layout-sider"
                :width="layoutStore.siderWidth"
                :collapsed="layoutStore.siderCollapsed"
                :collapsible="layoutStore.siderCollapsible"
                :collapsed-width="layoutStore.collapsedWidth"
                @collapse="handleCollapse"
            >
                <slot name="sider">
                    <div class="default-sider">默认侧边栏</div>
                </slot>
            </a-layout-sider>

            <!-- 主内容区插槽 -->
            <a-layout-content class="layout-content">
                <slot name="content">
                    <div class="default-content">默认内容区</div>
                </slot>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts">
import { useLayoutStore } from "@/apps/blog/stores/LayoutStore";

const layoutStore = useLayoutStore();

const handleCollapse = (val: boolean) => {
    layoutStore.setCollapsed(val);
};
</script>

<!-- 样式保持不变 -->
<style lang="less" scoped>
/* ...原有样式保持不变... */
.layout-container {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.layout-header {
    height: 64px;
    line-height: 64px;
    background-color: #fff;
    padding: 0 20px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 10;
}

.main-section {
    flex: 1;
    display: flex;
    min-height: 0;
}

.layout-sider {
    background-color: #fff;
    border-right: 1px solid #e8e8e8;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
}

.layout-content {
    flex: 1;
    padding: 12px;
    overflow: auto;
    background-color: #f5f5f5;
    overflow: hidden;
    min-height: 0;
}

.default-header,
.default-sider,
.default-content {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #888;
    font-size: 14px;
}

.default-content {
    height: 100%;
    background-color: #fafafa;
    border: 1px dashed #e0e0e0;
    border-radius: 4px;
}
</style>
