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

            <div
                class="article-body"
                v-html="renderedMarkdown"
            ></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import type { VueArticle } from "../../config";
import { renderMarkdown } from "@/utils/markdown";
import markdownContent from "./1.md?raw";
import "highlight.js/styles/github.css"; // 引入highlight.js样式

interface Props {
    article: VueArticle;
}

defineProps<Props>();

// 渲染Markdown内容
const renderedMarkdown = computed(() => {
    return renderMarkdown(markdownContent);
});

// 复制到剪贴板功能
onMounted(() => {
    // 在全局添加复制函数
    (window as any).copyToClipboard = async (elementId: string) => {
        try {
            const element = document.getElementById(elementId);
            if (element) {
                const text = element.textContent || element.innerText;
                await navigator.clipboard.writeText(text);

                // 显示复制成功提示
                const btn =
                    element.parentElement?.parentElement?.querySelector(
                        ".copy-btn"
                    );
                if (btn) {
                    const originalText = btn.innerHTML;
                    btn.innerHTML = "✓ 已复制";
                    btn.classList.add("copied");

                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.classList.remove("copied");
                    }, 2000);
                }
            }
        } catch (err) {
            console.error("复制失败:", err);
        }
    };
});
</script>

<style lang="less" scoped>
.article-container {
    display: flex;
    position: relative;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
}

// 文章详情样式
.article-detail {
    position: relative;
    width: 100%;
    max-width: 100%;
    padding: 0 2rem;
    box-sizing: border-box;

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
        max-width: 100%;
        overflow-wrap: break-word;
        word-wrap: break-word;

        // Markdown 渲染的内容样式
        :deep(h1) {
            font-size: 2rem;
            font-weight: 700;
            color: #111827;
            margin: 2.5rem 0 1.5rem 0;
            border-bottom: 3px solid #f3f4f6;
            padding-bottom: 0.75rem;
        }

        :deep(h2) {
            font-size: 1.8rem;
            font-weight: 600;
            color: #111827;
            margin: 2rem 0 1rem 0;
            border-bottom: 2px solid #f3f4f6;
            padding-bottom: 0.5rem;
        }

        :deep(h3) {
            font-size: 1.4rem;
            font-weight: 600;
            color: #111827;
            margin: 1.5rem 0 0.75rem 0;
        }

        :deep(h4) {
            font-size: 1.2rem;
            font-weight: 600;
            color: #111827;
            margin: 1.25rem 0 0.5rem 0;
        }

        :deep(p) {
            color: #374151;
            margin-bottom: 1rem;
        }

        :deep(ul),
        :deep(ol) {
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

        :deep(blockquote) {
            border-left: 4px solid #4f46e5;
            margin: 1.5rem 0;
            padding: 1rem 1.5rem;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 0 8px 8px 0;
            position: relative;

            &::before {
                content: '"';
                position: absolute;
                left: 1rem;
                top: 0.5rem;
                font-size: 2rem;
                color: #4f46e5;
                opacity: 0.3;
                font-family: Georgia, serif;
            }

            p {
                margin: 0;
                color: #374151;
                font-style: italic;
                padding-left: 1rem;
                font-size: 1.05rem;
                line-height: 1.6;
            }
        }

        :deep(.table-wrapper) {
            overflow-x: auto;
            margin: 1.5rem 0;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }

        :deep(.markdown-table) {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;

            th {
                background: #f9fafb;
                color: #374151;
                font-weight: 600;
                padding: 0.75rem 1rem;
                text-align: left;
                border-bottom: 2px solid #e5e7eb;
            }

            td {
                padding: 0.75rem 1rem;
                border-bottom: 1px solid #e5e7eb;
                color: #374151;

                strong {
                    color: #111827;
                    font-weight: 600;
                }

                code {
                    background: #f1f5f9;
                    color: #1e293b;
                    padding: 0.125rem 0.25rem;
                    border-radius: 4px;
                    font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
                    font-size: 0.85em;
                }
            }

            tr:hover {
                background: #f9fafb;
            }
        }

        :deep(.code-block) {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            margin: 1.5rem 0;
            overflow: hidden;
            max-width: 100%;
            position: relative;

            .code-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: #f1f5f9;
                padding: 0.5rem 1rem;
                border-bottom: 1px solid #e2e8f0;
                font-size: 0.8rem;

                .code-lang {
                    color: #64748b;
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .copy-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    background: #ffffff;
                    border: 1px solid #d1d5db;
                    border-radius: 4px;
                    padding: 0.25rem 0.5rem;
                    font-size: 0.75rem;
                    color: #374151;
                    cursor: pointer;
                    transition: all 0.2s ease;

                    &:hover {
                        background: #f9fafb;
                        border-color: #9ca3af;
                    }

                    &.copied {
                        background: #dcfce7;
                        color: #166534;
                        border-color: #bbf7d0;
                    }

                    svg {
                        width: 14px;
                        height: 14px;
                    }
                }
            }

            pre {
                margin: 0;
                padding: 1.5rem;
                overflow-x: auto;
                max-width: 100%;
                background: #ffffff;

                code {
                    font-family: "Fira Code", "Monaco", "Menlo", "Ubuntu Mono",
                        monospace;
                    font-size: 0.9rem;
                    line-height: 1.5;
                    white-space: pre;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    display: block;

                    // highlight.js 语法高亮样式覆盖
                    &.hljs {
                        background: transparent;
                        padding: 0;
                    }
                }
            }
        }

        :deep(code:not(pre code)) {
            background: #f1f5f9;
            color: #1e293b;
            padding: 0.125rem 0.25rem;
            border-radius: 4px;
            font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
            font-size: 0.85em;
        }

        :deep(a) {
            color: #4f46e5;
            text-decoration: none;
            border-bottom: 1px solid transparent;
            transition: border-color 0.2s ease;

            &:hover {
                border-bottom-color: #4f46e5;
            }
        }

        :deep(hr) {
            border: none;
            height: 2px;
            background: #f3f4f6;
            margin: 2rem 0;
            border-radius: 1px;
        }
    }
}
</style>
