import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useLayoutStore = defineStore("layout", () => {
    const siderCollapsed = ref(false); // 是否折叠
    const siderCollapsible = ref(true); // 是否可折叠
    const siderWidth = ref(200); // 宽度
    const collapsedWidth = ref(0); // 折叠后宽度

    const siderStatusText = computed(() =>
        siderCollapsed.value ? "已折叠" : "已展开"
    );

    const canToggle = computed(() => siderCollapsible.value);

    const toggleCollapsed = () => {
        if (siderCollapsible.value) {
            siderCollapsed.value = !siderCollapsed.value;
        }
    };

    const setCollapsed = (collapsed: boolean) => {
        if (siderCollapsible.value) {
            siderCollapsed.value = collapsed;
        }
    };

    const expandSider = () => {
        siderCollapsed.value = false;
    };

    const collapseSider = () => {
        if (siderCollapsible.value) {
            siderCollapsed.value = true;
        }
    };

    const toggleCollapsible = () => {
        siderCollapsible.value = !siderCollapsible.value;
        // 如果禁用折叠功能，自动展开
        if (!siderCollapsible.value) {
            siderCollapsed.value = false;
        }
    };

    const setSiderWidth = (width: number) => {
        siderWidth.value = width;
    };

    return {
        // State
        siderCollapsed,
        siderCollapsible,
        siderWidth,
        collapsedWidth,

        // Getters
        siderStatusText,
        canToggle,

        // Actions
        toggleCollapsed,
        setCollapsed,
        expandSider,
        collapseSider,
        toggleCollapsible,
        setSiderWidth,
    };
});
