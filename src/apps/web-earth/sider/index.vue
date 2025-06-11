<!-- src/apps/web-earth/sider/index.vue -->
<template>
    <div
        class="sider-container"
        v-if="siderStore.siderVisible"
    >
        <!-- 头部：标题 + 关闭按钮 -->
        <div class="sider-header">
            <h3 class="sider-title">{{ getPanelTitle() }}</h3>
            <a-button
                type="text"
                shape="circle"
                size="small"
                @click="siderStore.closeSider()"
            >
                <template #icon><IconClose /></template>
            </a-button>
        </div>

        <!-- 动态内容区 -->
        <div class="sider-content">
            <component
                :is="getCurrentComponent()"
                v-if="getCurrentComponent()"
            />
            <div
                v-else
                class="empty-panel"
            >
                <a-empty description="暂无内容" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSiderStore } from "@/stores/SiderStore";
import IconClose from "@arco-design/web-vue/es/icon/icon-close";

// 动态导入面板组件
import TopoLinesPanel from "./panels/TopoLinesPanel/index.vue";

const siderStore = useSiderStore();

// 组件映射
const panelComponents = {
    topoLines: TopoLinesPanel,
} as const;

// 标题映射
const panelTitles = {
    topoLines: "地形等高线设置",
    layers: "图层管理",
    tools: "测量工具",
    settings: "系统设置",
} as const;

// 获取当前组件
const getCurrentComponent = () => {
    if (!siderStore.activeSiderPanel) return null;
    return panelComponents[
        siderStore.activeSiderPanel as keyof typeof panelComponents
    ];
};

// 获取面板标题
const getPanelTitle = () => {
    if (!siderStore.activeSiderPanel) return "";
    return (
        panelTitles[siderStore.activeSiderPanel as keyof typeof panelTitles] ||
        ""
    );
};
</script>

<style lang="less" scoped>
.sider-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
    border-right: 1px solid #e8e8e8;
}

.sider-header {
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fafafa;

    .sider-title {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: #1d2129;
    }
}

.sider-content {
    flex: 1;
    overflow-y: auto;
    padding: 0;
}

.empty-panel {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

// 自定义滚动条
.sider-content::-webkit-scrollbar {
    width: 6px;
}

.sider-content::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.sider-content::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
}

.sider-content::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}
</style>
