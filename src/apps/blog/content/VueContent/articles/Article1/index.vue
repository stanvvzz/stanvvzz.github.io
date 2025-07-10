<template>
    <div class="article-container">
        <div class="article-detail">
            <div class="article-header">
                <div class="article-meta">
                    <h1 class="article-title">{{ article.title }}</h1>
                    <div class="article-info">
                        <div
                            v-for="(category, index) in article.category"
                            :key="index"
                        >
                            <span class="article-category">{{ category }}</span>
                        </div>
                        <span class="article-date">{{ article.date }}</span>
                    </div>
                    <p class="article-summary">{{ article.description }}</p>
                </div>
            </div>

            <div class="article-body">
                <h3 id="core-implementation">核心实现原理</h3>
                <p>这个功能主要基于以下几个核心技术点：</p>
                <ul>
                    <li><strong>滚动监听</strong> - 监听特定容器的滚动事件</li>
                    <li>
                        <strong>响应式状态</strong> - 使用 Vue 3 的 ref
                        管理滚动状态
                    </li>
                    <li>
                        <strong>条件渲染</strong> - 根据滚动状态切换显示内容
                    </li>
                    <li>
                        <strong>CSS动画</strong> - 通过CSS类实现平滑过渡效果
                    </li>
                </ul>

                <h3 id="scroll-listener">滚动监听机制</h3>
                <div class="code-block">
                    <pre><code>// 滚动状态
const isScrolled = ref(false);
// 滚动阈值
const scrollThreshold = 64;

// 监听内容区域滚动
const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop;

    // 当滚动超过 64px 时显示 SVG，否则显示 Blog 文字
    isScrolled.value = scrollTop > scrollThreshold;
};

// 在组件挂载时添加滚动监听
onMounted(() => {
    const contentElement = document.querySelector(".content-container");
    if (contentElement) {
        contentElement.addEventListener("scroll", handleScroll);
    }
});</code></pre>
                </div>

                <h3 id="animation-effects">动画效果</h3>
                <p>通过CSS类的动态绑定实现Logo的平滑切换：</p>
                <div class="code-block">
                    <pre><code>&lt;!-- Blog 文字 --&gt;
&lt;div
    class="blog"
    :class="{ 'blog-hidden': isScrolled }"
&gt;
    Blog
&lt;/div&gt;

&lt;!-- SVG 图标 --&gt;
&lt;img
    src="/public/blog-icon.svg"
    alt="Blog Icon"
    class="blog-icon"
    :class="{
        'blog-icon-visible': isScrolled,
        'blog-icon-hidden': !isScrolled,
    }"
/&gt;</code></pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { VueArticle } from "../../config";

interface Props {
    article: VueArticle;
}

defineProps<Props>();
</script>

<style lang="less" scoped>
.article-container {
    display: flex;
    position: relative;
}

// 文章详情样式
.article-detail {
    position: relative;

    // 文章目录
    .article-toc {
        position: fixed;
        left: 50px;
        top: 50%;
        transform: translateY(-50%);
        width: 700px;
        height: fit-content;
        background: #ffffff;
        padding: 1rem;
        z-index: 100;

        .toc-title {
            font-size: 0.9rem;
            font-weight: 600;
            color: #374151;
            margin-bottom: 0.75rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #f3f4f6;
        }

        .toc-list {
            list-style: none;
            padding: 0;
            margin: 0;

            .toc-item {
                margin-bottom: 0.25rem;
                cursor: pointer;
                transition: all 0.2s ease;

                span {
                    display: block;
                    padding: 0.25rem 0;
                    font-size: 0.8rem;
                    color: #6b7280;
                    border-left: 2px solid transparent;
                    padding-left: 0.5rem;
                    transition: all 0.2s ease;

                    &.level-2 {
                        font-weight: 500;
                    }

                    &.level-3 {
                        padding-left: 1rem;
                        font-size: 0.75rem;
                    }
                }

                &:hover span {
                    color: #4f46e5;
                }

                &.active span {
                    color: #4f46e5;
                    border-left-color: #4f46e5;
                    font-weight: 500;
                }
            }
        }
    }

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

            &.gradient-blue {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }

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
</style>
