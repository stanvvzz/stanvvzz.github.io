<template>
    <div class="latlon-box">
        <span class="label">经度：</span
        ><span class="value">{{ longitude.toFixed(6) }}</span>
        <span class="label">纬度：</span
        ><span class="value">{{ latitude.toFixed(6) }}</span>
        <span class="label">高度：</span
        ><span class="value">{{ height.toFixed(2) }} m</span>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useViewerStore } from "@/stores/ViewerStore/index";

const viewerStore = useViewerStore();
const longitude = ref(0);
const latitude = ref(0);
const height = ref(0);

let handler: any = null;

onMounted(async () => {
    const viewer = await viewerStore.waitForViewer();
    handler = (e: any) => {
        const data = e.data ?? e;
        longitude.value = data.longitude ?? 0;
        latitude.value = data.latitude ?? 0;
        height.value = data.height ?? 0;
    };
    viewer.addEventListener("camera-move", handler);
    if (typeof viewer.longitude === "number")
        longitude.value = viewer.longitude;
    if (typeof viewer.latitude === "number") latitude.value = viewer.latitude;
    if (typeof viewer.height === "number") height.value = viewer.height;
});

onUnmounted(() => {
    const viewer = viewerStore.getViewer();
    if (viewer && handler) {
        viewer.removeEventListener("camera-move", handler);
    }
});
</script>

<style scoped>
.latlon-box {
    position: absolute;
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    display: flex;
    gap: 12px;
    left: 10px;
    bottom: 10px;
    align-items: center;
}
.label {
    min-width: 38px;
    display: inline-block;
    text-align: right;
}
.value {
    min-width: 90px;
    display: inline-block;
    text-align: left;
    font-variant-numeric: tabular-nums;
}
</style>
