<template>
    <div class="earth-content">
        <div
            class="earth-container"
            ref="earthContainer"
        ></div>

        <LatLonBox />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useViewerStore } from "@/stores/ViewerStore/index";
import LatLonBox from "@/apps/web-earth/components/common/LatLonBox/index.vue";

const earthContainer = ref<HTMLElement | null>(null);
const viewerStore = useViewerStore();

// 即使在onMounted中，dom元素可能还未完全渲染，因此使用nextTick确保在DOM更新后执行初始化
onMounted(() => {
    // 工具函数，在DOM更新后执行callback
    nextTick(async () => {
        if (earthContainer.value) {
            try {
                await viewerStore.initViewer(earthContainer.value, {
                    useBatchedMesh: false,
                    errorTarget: 20,
                });
            } catch (error) {
                console.error("地球初始化失败:", error);
            }
        }
    });
});
</script>

<style lang="less" scoped>
.earth-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;

    .earth-container {
        flex: 1;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
}
</style>
