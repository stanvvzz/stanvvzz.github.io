<template>
    <a-layout class="layout-container">
        <!-- 顶部导航栏插槽 -->
        <a-layout-header class="layout-header">
            <slot name="header">
                <!-- 默认顶部导航内容 -->
                <div class="default-header">默认页头</div>
            </slot>
        </a-layout-header>

        <a-layout class="main-section">
            <!-- 侧边栏插槽 -->
            <a-layout-sider
                class="layout-sider"
                :width="siderWidth"
                :collapsed="collapsed"
                :collapsible="collapsible"
                :collapsed-width="collapsedWidth"
                @collapse="handleCollapse"
            >
                <slot name="sider">
                    <div class="default-sider">默认侧边栏</div>
                </slot>
            </a-layout-sider>

            <!-- 主内容区插槽 -->
            <a-layout-content class="layout-content">
                <slot name="content">
                    <!-- 默认主内容 -->
                    <div class="default-content">默认内容区</div>
                </slot>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 定义组件属性
const props = defineProps({
    siderWidth: {
        type: Number,
        default: 300,
    },
    defaultCollapsed: {
        type: Boolean,
        default: false,
    },
    collapsible: {
        type: Boolean,
        default: true,
    },
    collapsedWidth: {
        type: Number,
        default: 48,
    },
});

// 侧边栏折叠状态
const collapsed = ref(props.defaultCollapsed);

// 处理折叠状态变化
const handleCollapse = (val: boolean) => {
    collapsed.value = val;
};
</script>

<style lang="less" scoped>
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
    border-bottom: 1px solid #e8e8e8;
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

// 默认样式
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
