<template>
    <div class="header-container">
        <div class="header-left">
            <a-button-group>
                <a-button
                    type="text"
                    @click="handleLayerManage"
                >
                    <template #icon><IconLayers /></template>
                    图层管理
                </a-button>

                <a-button
                    type="text"
                    @click="handleViewMode"
                >
                    <template #icon><IconEye /></template>
                    视图模式
                </a-button>
            </a-button-group>
        </div>

        <!-- 右侧区域：用户操作和设置 -->
        <div class="header-right">
            <a-tooltip content="搜索">
                <a-button
                    type="text"
                    shape="circle"
                    @click="handleSearch"
                >
                    <template #icon><IconSearch /></template>
                </a-button>
            </a-tooltip>

            <FullscreenButton
                @change="onFullscreenChange"
                @error="onFullscreenError"
            />

            <a-tooltip content="设置">
                <a-button
                    type="text"
                    shape="circle"
                    @click="handleSettings"
                >
                    <template #icon><IconSettings /></template>
                </a-button>
            </a-tooltip>

            <a-dropdown>
                <a-button
                    type="text"
                    shape="circle"
                >
                    <template #icon><IconUser /></template>
                </a-button>
                <template #content>
                    <a-doption>个人信息</a-doption>
                    <a-doption>偏好设置</a-doption>
                    <a-doption>退出登录</a-doption>
                </template>
            </a-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import IconLayers from "@arco-design/web-vue/es/icon/icon-layers";
import IconEye from "@arco-design/web-vue/es/icon/icon-eye";
import IconSearch from "@arco-design/web-vue/es/icon/icon-search";
import IconSettings from "@arco-design/web-vue/es/icon/icon-settings";
import IconUser from "@arco-design/web-vue/es/icon/icon-user";
// 全屏组件
import FullscreenButton from "@/components/common/FullscreenButton/index.vue";

// 事件处理函数
const handleLayerManage = () => {
    console.log("图层管理");
};

const handleViewMode = () => {
    console.log("视图模式");
};

const handleSearch = () => {
    console.log("搜索");
};

const handleSettings = () => {
    console.log("设置");
};

// 全屏状态变化回调
const onFullscreenChange = (isFullscreen: boolean) => {
    console.log("全屏状态变化:", isFullscreen);
};

// 全屏错误回调
const onFullscreenError = (error: Error) => {
    console.error("全屏操作失败:", error);
};
</script>

<style lang="less" scoped>
.header-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    background-color: #fff;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 12px;

    :deep(.arco-btn-group) {
        .arco-btn {
            color: #4e5969;

            &:hover {
                color: #165dff;
                background-color: rgba(22, 93, 255, 0.08);
            }
        }
    }
}

.header-right {
    display: flex;
    align-items: center;
    gap: 8px;

    :deep(.arco-btn) {
        color: #4e5969;

        &:hover {
            color: #165dff;
            background-color: rgba(22, 93, 255, 0.08);
        }
    }
}

// 响应式设计
@media (max-width: 768px) {
    .header-center {
        display: none;
    }

    .header-left .title {
        display: none;
    }
}
</style>
