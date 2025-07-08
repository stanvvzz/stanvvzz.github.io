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
.layout-container {
    width: 100vw;
    // 确保容器存在高度
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    // 防止主容器滚动
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
    flex-shrink: 0;
}

.main-section {
    flex: 1;
    display: flex;
    min-height: 0;
    overflow: hidden;
}

.layout-sider {
    background-color: #fff;
    border-right: 1px solid #e8e8e8;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);

    // flex-shrink: 0; 是 CSS Flexbox 布局中的属性，用于控制 flex 项目在容器空间不足时是否被压缩。
    flex-shrink: 0;

    /* 自定义侧边栏收起展开动画 */
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;

    /* 覆盖 Arco Design 默认动画 */
    :deep(.arco-layout-sider-children) {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* 控制触发区域的动画 */
    :deep(.arco-layout-sider-trigger) {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        background-color: #f5f5f5;

        &:hover {
            background-color: #e6f7ff;
        }
    }
}

.layout-content {
    flex: 1;
    padding: 12px;
    background-color: #f5f5f5;

    // 设置内容区域可以滚动
    overflow: auto;
    overflow-y: scroll;
    // 防止水平滚动
    overflow-x: hidden;
    min-height: 0;

    // chorme
    &::-webkit-scrollbar {
        display: none;
    }

    /* 隐藏滚动条 - Firefox */
    scrollbar-width: none;

    /* 隐藏滚动条 - IE/Edge (旧版) */
    -ms-overflow-style: none;
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
    background-color: #fafafa;
    border: 1px dashed #e0e0e0;
    border-radius: 4px;
    min-height: 200px;
}
</style>
