<!-- src/apps/web-earth/sider/panels/TopoLinesPanel/index.vue -->
<template>
    <div class="topo-lines-panel">
        <!-- 基础设置 -->
        <a-card
            title="基础设置"
            :bordered="false"
        >
            <a-form
                layout="vertical"
                :model="config"
            >
                <a-form-item label="显示等高线">
                    <a-switch
                        v-model="config.display"
                        @change="handleDisplayChange"
                    />
                </a-form-item>

                <a-form-item label="线条粗细">
                    <a-slider
                        v-model="config.thickness"
                        :min="1"
                        :max="10"
                        :show-tooltip="true"
                        @change="handleThicknessChange"
                    />
                </a-form-item>
            </a-form>
        </a-card>

        <!-- 等高线样式 -->
        <a-card
            title="等高线样式"
            :bordered="false"
            class="mt-16"
        >
            <a-form layout="vertical">
                <a-form-item label="颜色">
                    <div class="color-input-wrapper">
                        <input
                            type="color"
                            v-model="config.topoColor"
                            @change="handleTopoColorChange"
                            class="color-picker"
                        />
                        <a-input
                            v-model="config.topoColor"
                            placeholder="#ffffff"
                            @change="handleTopoColorChange"
                            class="color-text"
                        />
                    </div>
                </a-form-item>

                <a-form-item label="透明度">
                    <a-slider
                        v-model="config.topoOpacity"
                        :min="0"
                        :max="1"
                        :step="0.1"
                        :show-tooltip="true"
                        :format-tooltip="(value: number) => `${Math.round(value * 100)}%`"
                        @change="handleTopoOpacityChange"
                    />
                </a-form-item>
            </a-form>
        </a-card>

        <!-- 坐标网格样式 -->
        <a-card
            title="坐标网格样式"
            :bordered="false"
            class="mt-16"
        >
            <a-form layout="vertical">
                <a-form-item label="颜色">
                    <div class="color-input-wrapper">
                        <input
                            type="color"
                            v-model="config.cartoColor"
                            @change="handleCartoColorChange"
                            class="color-picker"
                        />
                        <a-input
                            v-model="config.cartoColor"
                            placeholder="#ffffff"
                            @change="handleCartoColorChange"
                            class="color-text"
                        />
                    </div>
                </a-form-item>

                <a-form-item label="透明度">
                    <a-slider
                        v-model="config.cartoOpacity"
                        :min="0"
                        :max="1"
                        :step="0.1"
                        :show-tooltip="true"
                        :format-tooltip="(value: number) => `${Math.round(value * 100)}%`"
                        @change="handleCartoOpacityChange"
                    />
                </a-form-item>
            </a-form>
        </a-card>

        <!-- 操作按钮 -->
        <div class="panel-actions">
            <a-button
                type="primary"
                @click="syncFromViewer"
                :disabled="!viewerStore.isViewerReady()"
            >
                刷新配置
            </a-button>
            <a-button @click="resetSettings"> 重置 </a-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, watch, onMounted } from "vue";
import { Message } from "@arco-design/web-vue";
import { useViewerStore } from "@/apps/web-earth/stores/ViewerStore";
import { Color } from "three";

const viewerStore = useViewerStore();

// 配置数据 - 仅用于界面显示
const config = reactive({
    display: false,
    projection: "ellipsoid",
    thickness: 1,
    topoColor: "#ffffff",
    topoOpacity: 0.5,
    cartoColor: "#ffffff",
    cartoOpacity: 0.5,
});

// 监听 Viewer 初始化状态
watch(
    () => viewerStore.isInitialized,
    (initialized) => {
        if (initialized) {
            syncFromViewer();
        }
    }
);

// 从 Viewer 同步配置到界面
const syncFromViewer = (): void => {
    const viewer = viewerStore.getViewer();
    if (!viewer || !viewerStore.isViewerReady()) {
        console.warn("Viewer 未准备就绪");
        return;
    }

    try {
        // 从 Viewer 的 getter 读取当前配置
        config.display = viewer.displayTopoLines;
        config.thickness = viewer.topoLinesThickness;

        // 颜色需要转换为十六进制字符串
        if (viewer.topoLineTopoColor) {
            config.topoColor = `#${viewer.topoLineTopoColor.getHexString()}`;
        }
        if (viewer.topoLineCartoColor) {
            config.cartoColor = `#${viewer.topoLineCartoColor.getHexString()}`;
        }

        config.topoOpacity = viewer.topoLinesOpacity || 0.5;
        config.cartoOpacity = viewer.topoLinesCartoOpacity;
    } catch (error) {
        console.error("从 Viewer 同步配置失败:", error);
        Message.error("读取配置失败");
    }
};

// 显示状态变化处理
const handleDisplayChange = (): void => {
    const viewer = viewerStore.getViewer();
    if (!viewer || !viewerStore.isViewerReady()) return;

    try {
        viewer.displayTopoLines = config.display;
    } catch (error) {
        console.error("设置显示状态失败:", error);
        Message.error("设置显示状态失败");
    }
};

// 线条粗细变化处理
const handleThicknessChange = (): void => {
    const viewer = viewerStore.getViewer();
    if (!viewer || !viewerStore.isViewerReady()) return;

    try {
        viewer.topoLinesThickness = config.thickness;
    } catch (error) {
        console.error("设置线条粗细失败:", error);
        Message.error("设置线条粗细失败");
    }
};

// 等高线颜色变化处理
const handleTopoColorChange = (): void => {
    const viewer = viewerStore.getViewer();
    if (!viewer || !viewerStore.isViewerReady()) return;

    try {
        viewer.topoLineTopoColor = new Color(config.topoColor);
    } catch (error) {
        console.error("设置等高线颜色失败:", error);
        Message.error("设置等高线颜色失败");
    }
};

// 等高线透明度变化处理
const handleTopoOpacityChange = (): void => {
    const viewer = viewerStore.getViewer();
    if (!viewer || !viewerStore.isViewerReady()) return;

    try {
        viewer.topoLinesOpacity = config.topoOpacity;
    } catch (error) {
        console.error("设置等高线透明度失败:", error);
        Message.error("设置等高线透明度失败");
    }
};

// 坐标网格颜色变化处理
const handleCartoColorChange = (): void => {
    const viewer = viewerStore.getViewer();
    if (!viewer || !viewerStore.isViewerReady()) return;

    try {
        viewer.topoLineCartoColor = new Color(config.cartoColor);
    } catch (error) {
        console.error("设置坐标网格颜色失败:", error);
        Message.error("设置坐标网格颜色失败");
    }
};

// 坐标网格透明度变化处理
const handleCartoOpacityChange = (): void => {
    const viewer = viewerStore.getViewer();
    if (!viewer || !viewerStore.isViewerReady()) return;

    viewer.topoLinesCartoOpacity = config.cartoOpacity;
};

// 重置设置
const resetSettings = (): void => {
    const viewer = viewerStore.getViewer();
    if (!viewer || !viewerStore.isViewerReady()) {
        Message.warning("Viewer 未准备就绪");
        return;
    }

    try {
        // 重置 Viewer 的设置
        viewer.displayTopoLines = false;
        viewer.topoLinesThickness = 1;
        viewer.topoLineTopoColor = new Color("#ffffff");
        viewer.topoLineCartoColor = new Color("#ffffff");
        viewer.topoLinesOpacity = 0.5;
        viewer.topoLinesCartoOpacity = 0.5;

        // 同步界面
        syncFromViewer();

        Message.success("设置已重置");
    } catch (error) {
        console.error("重置设置失败:", error);
        Message.error("重置设置失败");
    }
};

// 组件挂载时同步配置
onMounted(() => {
    if (viewerStore.isViewerReady()) {
        syncFromViewer();
    }
});
</script>

<style lang="less" scoped>
.topo-lines-panel {
    padding: 16px;

    .mt-16 {
        margin-top: 16px;
    }

    .color-input-wrapper {
        display: flex;
        gap: 8px;
        align-items: center;

        .color-picker {
            width: 40px;
            height: 32px;
            border: 1px solid #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            padding: 0;
            background: none;

            &:hover {
                border-color: #165dff;
            }

            &::-webkit-color-swatch-wrapper {
                padding: 0;
            }

            &::-webkit-color-swatch {
                border: none;
                border-radius: 4px;
            }
        }

        .color-text {
            flex: 1;
        }
    }

    .panel-actions {
        margin-top: 24px;
        padding: 16px;
        border-top: 1px solid #f0f0f0;
        display: flex;
        gap: 12px;

        .arco-btn {
            flex: 1;
        }
    }
}

:deep(.arco-card) {
    margin-bottom: 0;

    .arco-card-header {
        padding: 12px 16px;
        border-bottom: 1px solid #f0f0f0;
        background: #fafafa;
    }

    .arco-card-body {
        padding: 16px;
    }
}

:deep(.arco-form-item) {
    margin-bottom: 16px;

    &:last-child {
        margin-bottom: 0;
    }
}
</style>
