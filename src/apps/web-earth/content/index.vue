<template>
    <div class="earth-content">
        <div
            class="earth-container"
            ref="earthContainer"
        ></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef, nextTick } from "vue";
import { Viewer } from "@/earth-sdk";

const earthContainer = ref<HTMLElement | null>(null);
const viewer = shallowRef<Viewer | null>(null);

onMounted(() => {
    nextTick(() => {
        if (earthContainer.value) {
            viewer.value = new Viewer(earthContainer.value, {
                useBatchedMesh: false,
                errorTarget: 20,
            });
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

    .earth-container {
        flex: 1;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
}
</style>
