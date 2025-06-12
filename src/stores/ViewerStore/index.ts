// src/stores/ViewerStore/index.ts
import { defineStore } from "pinia";
import { shallowRef, type ShallowRef } from "vue";
import { Viewer } from "@/earth-sdk";

export const useViewerStore = defineStore("viewer", () => {
    const viewer: ShallowRef<Viewer | null> = shallowRef(null);
    const isInitialized = shallowRef<boolean>(false);
    const isLoading = shallowRef<boolean>(false);

    const initViewer = async (
        container: HTMLElement,
        options?: any
    ): Promise<void> => {
        if (viewer.value) {
            console.warn("Viewer 已经初始化了");
            return;
        }

        isLoading.value = true;

        try {
            viewer.value = new Viewer(container, {
                useBatchedMesh: false,
                errorTarget: 20,
                ...options,
            });

            // 开发环境下挂载到 window 便于调试
            if (import.meta.env.DEV) {
                // @ts-ignore
                window.viewer = viewer.value;
            }

            isInitialized.value = true;
            console.log("Viewer 初始化成功");
        } catch (error) {
            console.error("Viewer 初始化失败:", error);
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    const getViewer = (): Viewer | null => {
        return viewer.value;
    };

    const isViewerReady = (): boolean => {
        return viewer.value !== null && isInitialized.value;
    };

    const waitForViewer = (): Promise<Viewer> => {
        return new Promise((resolve, reject) => {
            if (isViewerReady() && viewer.value) {
                resolve(viewer.value);
                return;
            }

            const checkInterval = setInterval(() => {
                if (isViewerReady() && viewer.value) {
                    clearInterval(checkInterval);
                    resolve(viewer.value);
                }
            }, 100);

            // 10秒超时
            setTimeout(() => {
                clearInterval(checkInterval);
                reject(new Error("Viewer 初始化超时"));
            }, 10000);
        });
    };

    return {
        // 状态
        viewer,
        isInitialized,
        isLoading,
        // 方法
        initViewer,
        getViewer,
        isViewerReady,
        waitForViewer,
    };
});
