<template>
    <div
        class="sider-container"
        :class="{
            'sider-loaded': isLoaded,
            'sider-collapsed': layoutStore.siderCollapsed,
        }"
    >
        <!-- 侧边栏菜单列表 -->
        <div class="sider-menu">
            <div
                class="menu-item"
                :class="{ 'menu-item-loaded': isLoaded }"
                :style="{ animationDelay: '0.1s' }"
                @click="handleMenuClick('home')"
            >
                <span class="menu-text">首页</span>
                <img
                    class="menu-arrow"
                    src="/public/svg/right-arrow.svg"
                    alt=""
                />
            </div>

            <div
                class="menu-item"
                :class="{ 'menu-item-loaded': isLoaded }"
                :style="{ animationDelay: '0.2s' }"
                @click="handleMenuClick('chat')"
            >
                <span class="menu-text">JavaScript</span>
                <img
                    class="menu-arrow"
                    src="/public/svg/right-arrow.svg"
                    alt=""
                />
            </div>

            <div
                class="menu-item"
                :class="{ 'menu-item-loaded': isLoaded }"
                :style="{ animationDelay: '0.3s' }"
                @click="handleMenuClick('dalle')"
            >
                <span class="menu-text">Web</span>
                <img
                    class="menu-arrow"
                    src="/public/svg/right-arrow.svg"
                    alt=""
                />
            </div>

            <div
                class="menu-item"
                :class="{ 'menu-item-loaded': isLoaded }"
                :style="{ animationDelay: '0.4s' }"
                @click="handleMenuClick('sora')"
            >
                <span class="menu-text">Three.js</span>
                <img
                    class="menu-arrow"
                    src="/public/svg/right-arrow.svg"
                    alt=""
                />
            </div>

            <div
                class="menu-item"
                :class="{ 'menu-item-loaded': isLoaded }"
                :style="{ animationDelay: '0.5s' }"
                @click="handleMenuClick('api')"
            >
                <span class="menu-text">WebGL</span>
                <img
                    class="menu-arrow"
                    src="/public/svg/right-arrow.svg"
                    alt=""
                />
            </div>

            <div
                class="menu-item"
                :class="{ 'menu-item-loaded': isLoaded }"
                :style="{ animationDelay: '0.6s' }"
                @click="handleMenuClick('research')"
            >
                <span class="menu-text">C++</span>
                <img
                    class="menu-arrow"
                    src="/public/svg/right-arrow.svg"
                    alt=""
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useLayoutStore } from "@/apps/blog/stores/LayoutStore";

const layoutStore = useLayoutStore();

// 控制加载动画
const isLoaded = ref(false);

// 组件挂载后触发动画
onMounted(() => {
    // 稍微延迟一下，让侧边栏先渲染出来
    setTimeout(() => {
        isLoaded.value = true;
    }, 100);
});

// 处理菜单点击
const handleMenuClick = (menuType: string) => {
    console.log("点击菜单:", menuType);

    // 更新当前内容组件
    layoutStore.setCurrentContent(menuType);
};
</script>

<style lang="less" scoped>
.sider-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: white;
    overflow: hidden;

    /* 🔥 初始状态：从左侧滑入 */
    transform: translateX(-100%);
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);

    /* 🔥 加载完成后滑入 */
    &.sider-loaded {
        transform: translateX(0);
    }

    /* 🔥 侧边栏收起时滑出屏幕外 */
    &.sider-collapsed {
        transform: translateX(-100%);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
}

.sider-menu {
    flex: 1;
    padding: 20px 0;
    overflow-y: auto;
    /* 让菜单整体垂直居中 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;

    /* 隐藏滚动条 */
    &::-webkit-scrollbar {
        display: none;
    }
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.menu-item {
    /* 让文本在按钮内左对齐 */
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
    margin: 2px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    color: #374151;
    font-size: 14px;
    font-weight: 500;

    /* 菜单项初始状态 - 从左侧滑入并淡入 */
    opacity: 0;
    transform: translateX(-30px);
    animation: none;

    /* 菜单项加载完成后的动画 */
    &.menu-item-loaded {
        animation: slideInFromLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    /* 模仿 OpenAI 的悬停效果 */
    &:hover {
        background-color: #f7f7f8;
        color: #1f2937;

        .menu-arrow {
            opacity: 1;
            transform: translateX(0);
            filter: opacity(1);
        }
    }

    /* 激活状态 */
    &.active {
        background-color: #f0f0f0;
        color: #000;
    }

    /* 点击效果 */
    &:active {
        transform: scale(0.98);
        background-color: #e5e5e5;
    }
}

/* 🔥 当侧边栏收起时，菜单项快速淡出 */
.sider-collapsed .menu-item {
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 菜单项滑入动画 */
@keyframes slideInFromLeft {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.menu-text {
    /* 文本左对齐显示 */
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
}

.menu-arrow {
    /* 右箭头 SVG 样式 */
    opacity: 0;
    transform: translateX(-8px);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    width: 16px;
    height: 16px;
    margin-left: 8px;
    filter: opacity(0.6);
}

.sider-footer {
    border-top: 1px solid #e1e5e9;
    padding: 16px 0;

    .menu-item {
        margin: 2px 12px;
    }
}

/* 侧边栏折叠时的样式 */
.layout-sider.ant-layout-sider-collapsed {
    .sider-container {
        .menu-text {
            display: none;
        }

        .menu-arrow {
            display: none;
        }

        .menu-item {
            padding: 12px;
            margin: 2px 8px;
            justify-content: center;
        }
    }
}

/* 响应式设计 */
@media (max-width: 768px) {
    .sider-container {
        border-right: none;
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    }

    .menu-item {
        padding: 16px 24px;
        font-size: 16px;
    }
}

/* 深色主题支持（可选） */
.dark-theme {
    .sider-container {
        background: #1f2937;
        border-right-color: #374151;

        .menu-item {
            color: #d1d5db;

            &:hover {
                background-color: #374151;
                color: #f9fafb;
            }

            &.active {
                background-color: #4b5563;
                color: #ffffff;
            }
        }

        .sider-footer {
            border-top-color: #374151;
        }
    }
}
</style>
