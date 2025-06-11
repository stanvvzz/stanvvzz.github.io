<!-- src/apps/web-earth/sider/panels/TopoLinesPanel.vue -->
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
                        @change="handleConfigChange"
                    />
                </a-form-item>

                <a-form-item label="投影模式">
                    <a-select
                        v-model="config.projection"
                        @change="handleConfigChange"
                    >
                        <a-option value="ellipsoid">椭球面</a-option>
                        <a-option value="plane">平面</a-option>
                    </a-select>
                </a-form-item>

                <a-form-item label="线条粗细">
                    <a-slider
                        v-model="config.thickness"
                        :min="1"
                        :max="10"
                        :show-tooltip="true"
                        @change="handleConfigChange"
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
                            @change="handleConfigChange"
                            class="color-picker"
                        />
                        <a-input
                            v-model="config.topoColor"
                            placeholder="#ffffff"
                            @change="handleConfigChange"
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
                        @change="handleConfigChange"
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
                            @change="handleConfigChange"
                            class="color-picker"
                        />
                        <a-input
                            v-model="config.cartoColor"
                            placeholder="#ffffff"
                            @change="handleConfigChange"
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
                        :format-tooltip="
                            (value:number) => `${Math.round(value * 100)}%`
                        "
                        @change="handleConfigChange"
                    />
                </a-form-item>
            </a-form>
        </a-card>

        <!-- 操作按钮 -->
        <div class="panel-actions">
            <a-button
                type="primary"
                @click="applySettings"
                :loading="applying"
            >
                应用设置
            </a-button>
            <a-button @click="resetSettings"> 重置 </a-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { Message } from "@arco-design/web-vue";

// 配置数据
const config = reactive({
    display: false,
    projection: "ellipsoid",
    thickness: 1,
    topoColor: "#ffffff",
    topoOpacity: 0.5,
    cartoColor: "#ffffff",
    cartoOpacity: 0.5,
});

const applying = ref(false);

// 配置变化处理（防抖）
let configTimeout: number; // 使用 number 替代 NodeJS.Timeout
const handleConfigChange = () => {
    clearTimeout(configTimeout);
    configTimeout = setTimeout(() => {
        console.log("地形等高线配置变化:", config);
        // 这里可以实时更新地球渲染
    }, 300);
};

// 应用设置
const applySettings = async () => {
    applying.value = true;
    try {
        // 模拟API调用
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log("应用地形等高线设置:", config);
        Message.success("设置已应用");
    } catch (error) {
        console.error("应用设置失败:", error);
        Message.error("应用设置失败");
    } finally {
        applying.value = false;
    }
};

// 重置设置
const resetSettings = () => {
    Object.assign(config, {
        display: false,
        projection: "ellipsoid",
        thickness: 1,
        topoColor: "#ffffff",
        topoOpacity: 0.5,
        cartoColor: "#ffffff",
        cartoOpacity: 0.5,
    });
    Message.info("设置已重置");
};
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
