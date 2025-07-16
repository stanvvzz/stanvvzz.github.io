<template>
    <div class="content-page">
        <!-- 页面标题 -->
        <div class="page-header">
            <h1 class="page-title">{{ pageTitle }}</h1>
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
                    v-for="card in filteredAndPaginatedCards"
                    :key="card.id"
                    class="content-card"
                    @click="handleCardClick(card)"
                >
                    <div class="card-image">
                        <!-- 如果 imageClass 是图片路径，显示图片；否则显示渐变背景 -->
                        <div
                            v-if="isImagePath(card.imageClass)"
                            class="card-image-container"
                        >
                            <img
                                :src="card.imageClass"
                                :alt="card.title"
                                class="card-img"
                                @error="handleImageError($event, card)"
                            />
                            <div class="card-overlay">
                                <div
                                    class="card-icon"
                                    v-if="card.icon"
                                >
                                    {{ card.icon }}
                                </div>
                            </div>
                        </div>
                        <div
                            v-else
                            :class="['card-placeholder', card.imageClass]"
                        >
                            <div class="card-icon">{{ card.icon }}</div>
                        </div>
                    </div>

                    <div class="card-content">
                        <h3 class="card-title">{{ card.title }}</h3>
                        <div class="card-meta">
                            <div
                                v-for="(category, index) in card.category"
                                :key="index"
                            >
                                <span class="card-category">{{
                                    category
                                }}</span>
                            </div>
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
            </div>

            <!-- 动态内容组件 -->
            <div class="detail-content">
                <Suspense>
                    <template #default>
                        <MarkdownArticle
                            v-if="markdownContent"
                            :article="selectedCard"
                            :markdownContent="markdownContent"
                        />
                    </template>
                    <template #fallback>
                        <div class="loading-detail">
                            <div class="loading-spinner"></div>
                            <p>加载内容中...</p>
                        </div>
                    </template>
                </Suspense>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import MarkdownArticle from "../MarkdownArticle/index.vue";

export interface Article {
    id: number;
    title: string;
    category: Array<string>;
    date: string;
    description: string;
    imageClass: string;
    icon: string;
    markdownPath?: string;
}

export interface NavTab {
    id: string;
    name: string;
}

interface Props {
    pageTitle: string;
    articles: Article[];
    navTabs: NavTab[];
    loadMarkdownContent: (path: string) => Promise<string>;
}

const props = defineProps<Props>();

// 当前活动标签
const activeTab = ref("all");

// 视图模式 (grid/list)
const viewMode = ref("grid");

// 页面状态管理
const pageMode = ref<"list" | "detail">("list");
const selectedCard = ref<Article | null>(null);

// Markdown内容
const markdownContent = ref("");

// 分页相关
const currentPage = ref(1);
const itemsPerPage = ref(6);

// 根据活动标签过滤文章
const filteredCards = computed(() => {
    if (activeTab.value === "all") {
        return props.articles;
    }
    return props.articles.filter((card) =>
        card.category.some((cat) =>
            cat.toLowerCase().includes(activeTab.value.toLowerCase())
        )
    );
});

// 计算总页数
const totalPages = computed(() => {
    return Math.ceil(filteredCards.value.length / itemsPerPage.value);
});

// 计算当前页面的卡片
const filteredAndPaginatedCards = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredCards.value.slice(start, end);
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

// 监听筛选变化，重置到第一页
watch(activeTab, () => {
    currentPage.value = 1;
});

// 跳转到指定页面
const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
};

// 点击卡片查看详情
const handleCardClick = async (card: Article) => {
    selectedCard.value = card;
    pageMode.value = "detail";

    // 动态加载Markdown内容
    if (card.markdownPath) {
        try {
            const content = await props.loadMarkdownContent(card.markdownPath);
            markdownContent.value = content;
        } catch (error) {
            console.error("Failed to load markdown content:", error);
            markdownContent.value =
                "# 文章加载失败\n\n无法加载文章内容，请稍后再试。";
        }
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
};

// 返回到卡片列表
const backToList = () => {
    pageMode.value = "list";
    selectedCard.value = null;
    markdownContent.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
};

// 判断是否为图片路径
const isImagePath = (imageClass: string): boolean => {
    // 检查是否为图片文件路径
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    return (
        imageExtensions.some((ext) => imageClass.toLowerCase().includes(ext)) ||
        imageClass.startsWith("/") ||
        imageClass.startsWith("http")
    );
};

// 处理图片加载错误
const handleImageError = (event: Event, card: Article) => {
    console.warn(`Failed to load image for card: ${card.title}`);
    // 图片加载失败时，可以设置默认图片或隐藏图片
    const img = event.target as HTMLImageElement;
    img.style.display = "none";
};
</script>

<style lang="less" scoped>
.content-page {
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

    /* 图片容器样式 */
    .card-image-container {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .card-img {
            width: 100%;
            height: 100%;
            object-fit: cover; /* 保持宽高比，填充整个容器 */
            object-position: center; /* 居中显示 */
            transition: transform 0.3s ease;
        }

        .card-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;

            .card-icon {
                font-size: 3rem;
                color: white;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
            }
        }
    }

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

        &.gradient-pink {
            background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
        }

        &.gradient-yellow {
            background: linear-gradient(135deg, #f7b731 0%, #f1c40f 100%);
        }

        &.gradient-teal {
            background: linear-gradient(135deg, #1dd1a1 0%, #10ac84 100%);
        }

        &.gradient-indigo {
            background: linear-gradient(135deg, #5352ed 0%, #3742fa 100%);
        }

        &.gradient-lime {
            background: linear-gradient(135deg, #7bed9f 0%, #2ed573 100%);
        }

        &.gradient-slate {
            background: linear-gradient(135deg, #57606f 0%, #2f3542 100%);
        }

        &.gradient-zinc {
            background: linear-gradient(135deg, #747d8c 0%, #57606f 100%);
        }

        &.gradient-stone {
            background: linear-gradient(135deg, #a4b0be 0%, #747d8c 100%);
        }

        &.gradient-gray {
            background: linear-gradient(135deg, #ced6e0 0%, #a4b0be 100%);
        }

        .card-icon {
            font-size: 3rem;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }
    }
}

/* 悬浮效果 */
.content-card:hover .card-image-container {
    .card-img {
        transform: scale(1.05);
    }

    .card-overlay {
        opacity: 1;
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
}

.detail-content {
    max-width: 800px;
    margin: 0 auto;
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

// 响应式设计
@media (max-width: 1024px) {
    .content-page {
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
}
</style>
