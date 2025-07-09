<template>
    <div class="vue-content-page">
        <!-- 页面标题 -->
        <div class="page-header">
            <h1 class="page-title">Vue.js</h1>
        </div>

        <!-- 卡片列表视图 -->
        <div v-if="pageMode === 'list'">
            <!-- 导航栏和控制按钮 -->
            <div class="content-nav">
                <div class="nav-tabs">
                    <button
                        v-for="tab in navTabs"
                        :key="tab.id"
                        :class="['nav-tab', { active: activeTab === tab.id }]"
                        @click="activeTab = tab.id"
                    >
                        {{ tab.name }}
                    </button>
                </div>

                <div class="nav-controls">
                    <button class="control-btn filter-btn">
                        <span>Filter</span>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                        >
                            <path
                                d="M4.5 12L4.5 4L6 4L6 12L4.5 12ZM10 8L10 4L11.5 4L11.5 8L10 8ZM10 12L10 9.5L11.5 9.5L11.5 12L10 12Z"
                            />
                        </svg>
                    </button>

                    <button class="control-btn sort-btn">
                        <span>Sort</span>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                        >
                            <path d="M8 2L8 14M8 2L11 5M8 2L5 5" />
                        </svg>
                    </button>

                    <div class="view-toggle">
                        <button
                            :class="[
                                'view-btn',
                                { active: viewMode === 'grid' },
                            ]"
                            @click="viewMode = 'grid'"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                            >
                                <rect
                                    x="1"
                                    y="1"
                                    width="6"
                                    height="6"
                                    rx="1"
                                />
                                <rect
                                    x="9"
                                    y="1"
                                    width="6"
                                    height="6"
                                    rx="1"
                                />
                                <rect
                                    x="1"
                                    y="9"
                                    width="6"
                                    height="6"
                                    rx="1"
                                />
                                <rect
                                    x="9"
                                    y="9"
                                    width="6"
                                    height="6"
                                    rx="1"
                                />
                            </svg>
                        </button>
                        <button
                            :class="[
                                'view-btn',
                                { active: viewMode === 'list' },
                            ]"
                            @click="viewMode = 'list'"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                            >
                                <rect
                                    x="1"
                                    y="2"
                                    width="14"
                                    height="2"
                                    rx="1"
                                />
                                <rect
                                    x="1"
                                    y="6"
                                    width="14"
                                    height="2"
                                    rx="1"
                                />
                                <rect
                                    x="1"
                                    y="10"
                                    width="14"
                                    height="2"
                                    rx="1"
                                />
                                <rect
                                    x="1"
                                    y="14"
                                    width="14"
                                    height="2"
                                    rx="1"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- 内容卡片区域 -->
            <div :class="['content-grid', viewMode]">
                <div
                    v-for="card in paginatedCards"
                    :key="card.id"
                    class="content-card"
                    @click="handleCardClick(card)"
                >
                    <div class="card-image">
                        <div :class="['card-placeholder', card.imageClass]">
                            <div class="card-icon">{{ card.icon }}</div>
                        </div>
                    </div>

                    <div class="card-content">
                        <h3 class="card-title">{{ card.title }}</h3>
                        <div class="card-meta">
                            <span class="card-category">{{
                                card.category
                            }}</span>
                            <span class="card-date">{{ card.date }}</span>
                        </div>
                        <p class="card-description">{{ card.description }}</p>
                    </div>
                </div>
            </div>

            <!-- 分页控件 -->
            <div
                class="pagination"
                v-if="totalPages > 1"
            >
                <button
                    class="pagination-btn prev-btn"
                    :disabled="currentPage === 1"
                    @click="goToPage(currentPage - 1)"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                    >
                        <path d="M10 12L6 8L10 4" />
                    </svg>
                    Previous
                </button>

                <div class="page-numbers">
                    <button
                        v-for="page in visiblePages"
                        :key="page"
                        :class="[
                            'page-btn',
                            {
                                active: currentPage === page,
                                dots: page === '...',
                            },
                        ]"
                        :disabled="page === '...'"
                        @click="page !== '...' && goToPage(page as number)"
                    >
                        {{ page }}
                    </button>
                </div>

                <button
                    class="pagination-btn next-btn"
                    :disabled="currentPage === totalPages"
                    @click="goToPage(currentPage + 1)"
                >
                    Next
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                    >
                        <path d="M6 4L10 8L6 12" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- 详细内容视图 -->
        <div v-else-if="pageMode === 'detail' && selectedCard">
            <!-- 返回按钮 -->
            <div class="detail-header">
                <button
                    class="back-btn"
                    @click="backToList"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                    >
                        <path d="M10 12L6 8L10 4" />
                    </svg>
                    返回列表
                </button>
                <div class="breadcrumb">
                    <span class="breadcrumb-item">Vue.js</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item">{{
                        selectedCard.category
                    }}</span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item current">{{
                        selectedCard.title
                    }}</span>
                </div>
            </div>

            <!-- 动态内容组件 -->
            <div class="detail-content">
                <Suspense>
                    <template #default>
                        <component
                            :is="dynamicComponent"
                            v-if="dynamicComponent"
                            :article="selectedCard"
                        />
                    </template>
                    <template #fallback>
                        <div class="loading-detail">
                            <div class="loading-spinner"></div>
                            <p>加载内容中...</p>
                        </div>
                    </template>
                </Suspense>

                <!-- 默认内容（当没有找到对应组件时） -->
                <div
                    v-if="!dynamicComponent"
                    class="article-detail"
                >
                    <div class="article-header">
                        <div
                            class="article-hero"
                            :class="selectedCard.imageClass"
                        >
                            <div class="hero-icon">{{ selectedCard.icon }}</div>
                        </div>
                        <div class="article-meta">
                            <h1 class="article-title">
                                {{ selectedCard.title }}
                            </h1>
                            <div class="article-info">
                                <span class="article-category">{{
                                    selectedCard.category
                                }}</span>
                                <span class="article-date">{{
                                    selectedCard.date
                                }}</span>
                                <span class="article-read-time"
                                    >阅读时间约 10 分钟</span
                                >
                            </div>
                            <p class="article-summary">
                                {{ selectedCard.description }}
                            </p>
                        </div>
                    </div>
                    <div class="article-body">
                        <div class="placeholder-content">
                            <h2>内容正在准备中...</h2>
                            <p>这篇文章的详细内容正在编写中，敬请期待！</p>
                            <p>您可以：</p>
                            <ul>
                                <li>点击上方的"返回列表"按钮浏览其他文章</li>
                                <li>查看已完成的文章内容</li>
                                <li>关注我们的更新获取最新内容</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, shallowRef } from "vue";
import {
    vueArticles,
    navTabs,
    loadArticleComponent,
    type VueArticle,
} from "./config";

// 当前活动标签
const activeTab = ref("all");

// 视图模式 (grid/list)
const viewMode = ref("grid");

// 页面状态管理
const pageMode = ref<"list" | "detail">("list");
const selectedCard = ref<VueArticle | null>(null);

// 动态组件引用
const dynamicComponent = shallowRef(null);

// 分页相关
const currentPage = ref(1);
const itemsPerPage = ref(6);

// 使用配置文件中的数据
const allCards = ref(vueArticles);

// 计算总页数
const totalPages = computed(() => {
    return Math.ceil(allCards.value.length / itemsPerPage.value);
});

// 计算当前页面的卡片
const paginatedCards = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return allCards.value.slice(start, end);
});

// 计算可见的页码
const visiblePages = computed(() => {
    const pages = [];
    const total = totalPages.value;
    const current = currentPage.value;

    if (total <= 7) {
        for (let i = 1; i <= total; i++) {
            pages.push(i);
        }
    } else {
        if (current <= 4) {
            for (let i = 1; i <= 5; i++) {
                pages.push(i);
            }
            pages.push("...");
            pages.push(total);
        } else if (current >= total - 3) {
            pages.push(1);
            pages.push("...");
            for (let i = total - 4; i <= total; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            pages.push("...");
            for (let i = current - 1; i <= current + 1; i++) {
                pages.push(i);
            }
            pages.push("...");
            pages.push(total);
        }
    }

    return pages;
});

// 跳转到指定页面
const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
};

// 点击卡片查看详情
const handleCardClick = async (card: VueArticle) => {
    selectedCard.value = card;
    pageMode.value = "detail";

    // 动态加载对应的组件
    if (card.component) {
        try {
            const component = await loadArticleComponent(card.component);
            dynamicComponent.value = component;
        } catch (error) {
            console.error("Failed to load article component:", error);
            // 显示错误组件或占位符
            dynamicComponent.value = null;
        }
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
};

// 返回到卡片列表
const backToList = () => {
    pageMode.value = "list";
    selectedCard.value = null;
    dynamicComponent.value = null;
    window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style lang="less" scoped>
.vue-content-page {
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    color: #374151;
    background: #ffffff;
    min-height: 100vh;
}

.page-header {
    margin-bottom: 2rem;

    .page-title {
        font-size: 3rem;
        font-weight: 700;
        color: #111827;
        margin: 0;
        letter-spacing: -0.02em;
    }
}

.content-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 1rem;
}

.nav-tabs {
    display: flex;
    gap: 0.5rem;

    .nav-tab {
        padding: 0.5rem 1rem;
        background: none;
        border: none;
        color: #6b7280;
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        border-radius: 6px;
        transition: all 0.2s ease;

        &:hover {
            color: #111827;
            background: rgba(0, 0, 0, 0.05);
        }

        &.active {
            color: #111827;
            background: rgba(0, 0, 0, 0.1);
        }
    }
}

.nav-controls {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.control-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: none;
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: #6b7280;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.2s ease;

    &:hover {
        color: #111827;
        border-color: rgba(0, 0, 0, 0.3);
        background: rgba(0, 0, 0, 0.05);
    }

    svg {
        width: 14px;
        height: 14px;
    }
}

.view-toggle {
    display: flex;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    overflow: hidden;

    .view-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        background: none;
        border: none;
        color: #6b7280;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            color: #111827;
            background: rgba(0, 0, 0, 0.05);
        }

        &.active {
            color: #111827;
            background: rgba(0, 0, 0, 0.1);
        }

        svg {
            width: 14px;
            height: 14px;
        }
    }
}

.content-grid {
    display: grid;
    gap: 1.5rem;

    &.grid {
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    }

    &.list {
        grid-template-columns: 1fr;
        gap: 1rem;

        .content-card {
            display: flex;
            flex-direction: row;

            .card-image {
                width: 200px;
                height: 120px;
                flex-shrink: 0;
            }

            .card-content {
                flex: 1;
                padding: 1rem;
            }
        }
    }
}

.content-card {
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    &:hover {
        transform: translateY(-2px);
        border-color: rgba(0, 0, 0, 0.15);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }
}

.card-image {
    width: 100%;
    height: 200px;
    position: relative;
    overflow: hidden;

    .card-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        &.gradient-blue {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        &.gradient-purple {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        &.gradient-green {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        &.gradient-orange {
            background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
        }

        &.gradient-red {
            background: linear-gradient(135deg, #ff6b6b 0%, #ffd93d 100%);
        }

        &.gradient-cyan {
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
        }

        .card-icon {
            font-size: 3rem;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }
    }
}

.card-content {
    padding: 1.5rem;

    .card-title {
        font-size: 1.2rem;
        font-weight: 600;
        color: #111827;
        margin: 0 0 0.75rem 0;
        line-height: 1.3;
    }

    .card-meta {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.75rem;

        .card-category {
            background: rgba(0, 0, 0, 0.1);
            color: #374151;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 500;
        }

        .card-date {
            color: #6b7280;
            font-size: 0.8rem;
        }
    }

    .card-description {
        color: #6b7280;
        font-size: 0.9rem;
        line-height: 1.5;
        margin: 0;
    }
}

// 详细页面样式
.detail-header {
    margin-bottom: 2rem;

    .back-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: none;
        border: 1px solid rgba(0, 0, 0, 0.1);
        color: #6b7280;
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        border-radius: 6px;
        transition: all 0.2s ease;
        margin-bottom: 1rem;

        &:hover {
            color: #111827;
            border-color: rgba(0, 0, 0, 0.3);
            background: rgba(0, 0, 0, 0.05);
        }

        svg {
            width: 16px;
            height: 16px;
        }
    }

    .breadcrumb {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: #6b7280;

        .breadcrumb-item {
            &.current {
                color: #111827;
                font-weight: 500;
            }
        }

        .breadcrumb-separator {
            color: #d1d5db;
        }
    }
}

.detail-content {
    max-width: 800px;
    margin: 0 auto;
}

.article-detail {
    .article-header {
        margin-bottom: 3rem;

        .article-hero {
            width: 100%;
            height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            margin-bottom: 2rem;

            .hero-icon {
                font-size: 4rem;
                filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
            }
        }

        .article-meta {
            .article-title {
                font-size: 2.5rem;
                font-weight: 700;
                color: #111827;
                margin: 0 0 1rem 0;
                line-height: 1.2;
            }

            .article-info {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1rem;

                .article-category {
                    background: rgba(0, 0, 0, 0.1);
                    color: #374151;
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 500;
                }

                .article-date,
                .article-read-time {
                    color: #6b7280;
                    font-size: 0.9rem;
                }
            }

            .article-summary {
                font-size: 1.1rem;
                color: #6b7280;
                line-height: 1.6;
                margin: 0;
            }
        }
    }

    .article-body {
        line-height: 1.8;

        h2 {
            font-size: 1.8rem;
            font-weight: 600;
            color: #111827;
            margin: 2rem 0 1rem 0;
            border-bottom: 2px solid #f3f4f6;
            padding-bottom: 0.5rem;
        }

        h3 {
            font-size: 1.4rem;
            font-weight: 600;
            color: #111827;
            margin: 1.5rem 0 0.75rem 0;
        }

        p {
            color: #374151;
            margin-bottom: 1rem;
        }

        ul,
        ol {
            margin: 1rem 0;
            padding-left: 1.5rem;

            li {
                color: #374151;
                margin-bottom: 0.5rem;

                strong {
                    color: #111827;
                }
            }
        }

        .code-block {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            margin: 1.5rem 0;
            overflow-x: auto;

            pre {
                margin: 0;
                padding: 1.5rem;

                code {
                    font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
                    font-size: 0.9rem;
                    line-height: 1.5;
                    color: #2d3748;
                }
            }
        }
    }
}

// 分页样式
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-top: 3rem;
    padding: 2rem 0;
}

.pagination-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: #6b7280;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
        color: #111827;
        border-color: rgba(0, 0, 0, 0.3);
        background: rgba(0, 0, 0, 0.05);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    svg {
        width: 16px;
        height: 16px;
    }
}

.page-numbers {
    display: flex;
    gap: 0.25rem;
    margin: 0 1rem;
}

.page-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    height: 40px;
    padding: 0.5rem;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: #6b7280;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.2s ease;

    &:hover:not(:disabled):not(.dots) {
        color: #111827;
        border-color: rgba(0, 0, 0, 0.3);
        background: rgba(0, 0, 0, 0.05);
    }

    &.active {
        color: #ffffff;
        background: #111827;
        border-color: #111827;
    }

    &.dots {
        cursor: default;
        border: none;
        background: none;

        &:hover {
            background: none;
            border: none;
        }
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
}

// 动态组件加载状态样式
.loading-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
    text-align: center;

    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #e5e7eb;
        border-top: 3px solid #3b82f6;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
    }

    p {
        color: #6b7280;
        font-size: 1rem;
        margin: 0;
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

// 占位符内容样式
.placeholder-content {
    padding: 2rem;
    text-align: center;
    background: #f9fafb;
    border-radius: 12px;
    border: 1px solid #e5e7eb;

    h2 {
        color: #374151;
        margin-bottom: 1rem;
    }

    p {
        color: #6b7280;
        margin-bottom: 1rem;
        line-height: 1.6;
    }

    ul {
        text-align: left;
        max-width: 400px;
        margin: 1.5rem auto 0;

        li {
            color: #6b7280;
            margin-bottom: 0.5rem;
        }
    }
}

// 响应式设计
@media (max-width: 1024px) {
    .vue-content-page {
        padding: 1rem;
    }

    .content-nav {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
    }

    .nav-controls {
        align-self: flex-end;
    }

    .content-grid.grid {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }

    .pagination {
        margin-top: 2rem;
        padding: 1rem 0;
    }

    .pagination-btn {
        padding: 0.4rem 0.8rem;
        font-size: 0.8rem;

        span {
            display: none;
        }

        &.prev-btn svg {
            margin-right: 0;
        }

        &.next-btn svg {
            margin-left: 0;
        }
    }

    .page-numbers {
        margin: 0 0.5rem;
    }

    .page-btn {
        min-width: 36px;
        height: 36px;
        font-size: 0.8rem;
    }
}

@media (max-width: 768px) {
    .page-header .page-title {
        font-size: 2.5rem;
    }

    .nav-tabs {
        flex-wrap: wrap;
        gap: 0.25rem;

        .nav-tab {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
        }
    }

    .nav-controls {
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .content-grid.grid {
        grid-template-columns: 1fr;
    }

    .content-grid.list .content-card {
        flex-direction: column;

        .card-image {
            width: 100%;
            height: 150px;
        }
    }

    .pagination {
        flex-wrap: wrap;
        gap: 0.25rem;
        margin-top: 1.5rem;
        padding: 1rem 0;
    }

    .pagination-btn {
        padding: 0.4rem 0.6rem;
        font-size: 0.8rem;

        span {
            display: none;
        }
    }

    .page-numbers {
        margin: 0 0.25rem;
        flex-wrap: wrap;
    }

    .page-btn {
        min-width: 32px;
        height: 32px;
        font-size: 0.8rem;
        padding: 0.25rem;
    }
}
</style>
