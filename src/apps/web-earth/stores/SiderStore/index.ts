// src/stores/ui.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useSiderStore = defineStore("sider", () => {
    // 明确的类型声明
    const siderVisible = ref<boolean>(false);
    const activeSiderPanel = ref<string | null>(null);

    // 计算属性
    const hasActivePanel = computed<boolean>(
        () => activeSiderPanel.value !== null
    );

    const isPanelActive = (panelName: string): boolean => {
        return activeSiderPanel.value === panelName;
    };

    // 方法
    const toggleSiderPanel = (panelName: string): void => {
        if (activeSiderPanel.value === panelName) {
            siderVisible.value = false;
            activeSiderPanel.value = null;
        } else {
            siderVisible.value = true;
            activeSiderPanel.value = panelName;
        }
    };

    const closeSider = (): void => {
        siderVisible.value = false;
        activeSiderPanel.value = null;
    };

    return {
        siderVisible,
        activeSiderPanel,
        hasActivePanel,
        isPanelActive,
        toggleSiderPanel,
        closeSider,
    };
});
