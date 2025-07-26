<template>
    <div class="blog-header">
        <div class="logo-container">
            <!-- Blog 文字 -->
            <div
                class="blog"
                :class="{ 'blog-hidden': isScrolled }"
            >
                Blog
            </div>

            <!-- 🔥 模仿 OpenAI 的 SVG 实现 -->
            <img
                src="/public/svg/blog-icon.svg"
                alt="Blog Icon"
                class="blog-icon"
                :class="{
                    'blog-icon-visible': isScrolled,
                    'blog-icon-hidden': !isScrolled,
                }"
                width="28"
                height="28"
            />
        </div>

        <div class="side-button">
            <img
                :src="currentIcon"
                alt="侧边栏按钮"
                class="icon"
                @click="handleIconClick"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useLayoutStore } from "@/apps/blog/stores/LayoutStore";

const layoutStore = useLayoutStore();

// 滚动状态
const isScrolled = ref(false);
// 滚动阈值
const scrollThreshold = 64;

const currentIcon = computed(() => {
    return layoutStore.siderCollapsed
        ? "/public/svg/side-button2.svg"
        : "/public/svg/side-button.svg";
});

function handleIconClick() {
    layoutStore.toggleCollapsed();
}

// 监听内容区域滚动
const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop;

    // 当滚动超过 64px 时显示 SVG，否则显示 Blog 文字
    isScrolled.value = scrollTop > scrollThreshold;
};

// 在组件挂载时添加滚动监听
onMounted(() => {
    // 查找内容区域元素
    const contentElement = document.querySelector(".content-container");
    if (contentElement) {
        contentElement.addEventListener("scroll", handleScroll);
    }
});

// 在组件卸载时移除滚动监听
onUnmounted(() => {
    const contentElement = document.querySelector(".layout-content");
    if (contentElement) {
        contentElement.removeEventListener("scroll", handleScroll);
    }
});
</script>

<style lang="less" scoped>
.blog-header {
    padding-left: 2rem;
    padding-right: 2rem;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 64px;
    background: white;
    z-index: 1000;
}

.logo-container {
    position: relative;
    width: 100px;
    height: 32px;
    display: flex;
    align-items: center;
}

.blog {
    font-size: 24px;
    font-weight: 400;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);

    opacity: 1;
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &.blog-hidden {
        opacity: 0;
    }
}

.blog-icon {
    position: absolute;
    left: 0;
    top: 50%;
    transform-origin: center;

    /* 默认状态 */
    &.blog-icon-hidden {
        opacity: 0;
        transform: translateY(-50%) rotate(-20deg) scale(0.8);
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    /* 显示状态 */
    &.blog-icon-visible {
        opacity: 1;
        transform: translateY(-50%) rotate(0deg) scale(1);
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
}

.side-button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .icon {
        opacity: 0.44;
        width: 18px;
        height: 18px;
        transition: opacity 0.2s ease;

        &:hover {
            opacity: 1;
        }
    }
}
</style>
