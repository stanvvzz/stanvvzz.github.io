<template>
    <a-tooltip :content="isFullscreen ? '退出全屏' : '全屏'">
        <a-button
            type="text"
            shape="circle"
            @click="handleFullscreen"
            :disabled="!isFullscreenSupported()"
        >
            <template #icon>
                <IconFullscreenExit v-if="isFullscreen" />
                <IconFullscreen v-else />
            </template>
        </a-button>
    </a-tooltip>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import IconFullscreen from "@arco-design/web-vue/es/icon/icon-fullscreen";
import IconFullscreenExit from "@arco-design/web-vue/es/icon/icon-fullscreen-exit";

// Props
interface Props {
    /** 是否支持键盘快捷键 F11 */
    enableKeyboard?: boolean;
    /** 全屏元素选择器，默认为整个页面 */
    targetSelector?: string;
}

const props = withDefaults(defineProps<Props>(), {
    enableKeyboard: true,
    targetSelector: "",
});

// Emits
const emit = defineEmits<{
    change: [isFullscreen: boolean];
    error: [error: Error];
}>();

// 全屏状态
const isFullscreen = ref(false);

// 检查是否支持全屏API
const isFullscreenSupported = (): boolean => {
    const doc = document as any;
    return !!(
        document.fullscreenEnabled ||
        doc.webkitFullscreenEnabled ||
        doc.mozFullScreenEnabled ||
        doc.msFullscreenEnabled
    );
};

// 获取目标元素
const getTargetElement = (): Element => {
    if (props.targetSelector) {
        const element = document.querySelector(props.targetSelector);
        return element || document.documentElement;
    }
    return document.documentElement;
};

// 进入全屏
const enterFullscreen = async (): Promise<void> => {
    const element = getTargetElement() as any;

    try {
        if (element.requestFullscreen) {
            await element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            await element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            await element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            await element.msRequestFullscreen();
        }
    } catch (error) {
        console.error("进入全屏失败:", error);
        emit("error", error as Error);
    }
};

// 退出全屏
const exitFullscreen = async (): Promise<void> => {
    const doc = document as any;

    try {
        if (document.exitFullscreen) {
            await document.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
            await doc.webkitExitFullscreen();
        } else if (doc.mozCancelFullScreen) {
            await doc.mozCancelFullScreen();
        } else if (doc.msExitFullscreen) {
            await doc.msExitFullscreen();
        }
    } catch (error) {
        console.error("退出全屏失败:", error);
        emit("error", error as Error);
    }
};

// 切换全屏状态
const handleFullscreen = async (): Promise<void> => {
    if (!isFullscreenSupported()) {
        console.warn("当前浏览器不支持全屏功能");
        return;
    }

    if (isFullscreen.value) {
        await exitFullscreen();
    } else {
        await enterFullscreen();
    }
};

// 监听全屏状态变化
const handleFullscreenChange = (): void => {
    const doc = document as any;
    const newFullscreenState = !!(
        document.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
    );

    isFullscreen.value = newFullscreenState;
    emit("change", newFullscreenState);
};

// 键盘事件处理
const handleKeydown = (event: KeyboardEvent): void => {
    if (props.enableKeyboard && event.key === "F11") {
        event.preventDefault();
        handleFullscreen();
    }
};

// 生命周期
onMounted(() => {
    // 添加全屏状态变化监听器
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    // 添加键盘监听器
    if (props.enableKeyboard) {
        document.addEventListener("keydown", handleKeydown);
    }
});

onUnmounted(() => {
    // 移除监听器
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
    document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
    );
    document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
    document.removeEventListener("MSFullscreenChange", handleFullscreenChange);

    if (props.enableKeyboard) {
        document.removeEventListener("keydown", handleKeydown);
    }
});

// 暴露方法供父组件调用
defineExpose({
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    handleFullscreen,
});
</script>
