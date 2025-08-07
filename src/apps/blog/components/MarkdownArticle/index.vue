<template>
    <div class="article-container">
        <div class="article-detail">
            <div class="article-header">
                <div class="article-meta">
                    <h1 class="article-title">{{ extractedTitle }}</h1>
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
import type { WebArticle } from "../../content/WebContent/config";
import { renderMarkdown } from "@/utils/markdown";
import "highlight.js/styles/github.css"; // 引入highlight.js样式
import "katex/dist/katex.min.css"; // 引入KaTeX样式

interface Props {
    article: WebArticle;
    markdownContent: string;
}

const props = defineProps<Props>();

// 从Markdown内容中提取标题
const extractedTitle = computed(() => {
    if (!props.markdownContent) return props.article.title;

    // 匹配第一个 # 标题
    const titleMatch = props.markdownContent.match(/^#\s+(.+)$/m);
    return titleMatch ? titleMatch[1].trim() : props.article.title;
});

// 渲染Markdown内容
const renderedMarkdown = computed(() => {
    return renderMarkdown(props.markdownContent, { removeFirstH1: true });
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
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
        "Oxygen", "Ubuntu", "Cantarell", sans-serif;
}

// 文章详情样式
.article-detail {
    position: relative;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 2rem;
    box-sizing: border-box;

    .article-header {
        margin-bottom: 3rem;

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
                    background: linear-gradient(
                        135deg,
                        #667eea 0%,
                        #764ba2 100%
                    );
                    color: #ffffff;
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 500;
                }

                .article-date {
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
        width: 100%;
        overflow-wrap: break-word;
        word-wrap: break-word;
        overflow: hidden;
        box-sizing: border-box;

        // Markdown 渲染的内容样式
        :deep(h1) {
            font-size: 2rem;
            font-weight: 700;
            color: #111827;
            margin: 2.5rem 0 1.5rem 0;
            border-bottom: 3px solid #e5e7eb;
            padding-bottom: 0.75rem;
            position: relative;

            &::after {
                content: "";
                position: absolute;
                bottom: -3px;
                left: 0;
                width: 60px;
                height: 3px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
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
            font-size: 1.1rem;
            line-height: 1.7;
        }

        :deep(ul),
        :deep(ol) {
            margin: 1rem 0;
            padding-left: 1.5rem;

            li {
                color: #374151;
                margin-bottom: 0.5rem;
                line-height: 1.6;
                font-size: 1.05rem;

                strong {
                    color: #111827;
                    font-weight: 600;
                }
            }
        }

        :deep(blockquote) {
            border-left: 4px solid #667eea;
            margin: 1.5rem 0;
            padding: 0 1.5rem;
            background: transparent;

            p {
                margin: 0;
                color: #374151;
                font-style: normal;
                font-size: 1.1rem;
                line-height: 1.7;
                font-weight: normal;
            }
        }

        :deep(.table-wrapper) {
            overflow-x: auto;
            margin: 1.5rem 0;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            max-width: 100%;
            box-sizing: border-box;
        }

        :deep(.markdown-table) {
            width: 100%;
            min-width: 500px;
            border-collapse: collapse;
            font-size: 0.9rem;
            box-sizing: border-box;

            th {
                background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
                color: #374151;
                font-weight: 600;
                padding: 1rem;
                text-align: left;
                border-bottom: 2px solid #e5e7eb;
                font-size: 0.85rem;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            td {
                padding: 1rem;
                border-bottom: 1px solid #f3f4f6;
                color: #374151;
                vertical-align: top;

                strong {
                    color: #111827;
                    font-weight: 600;
                }

                code {
                    background: #f1f5f9;
                    color: #1e293b;
                    padding: 0.25rem 0.5rem;
                    border-radius: 6px;
                    font-family: "Fira Code", "Monaco", "Menlo", monospace;
                    font-size: 0.85em;
                    font-weight: 500;
                }
            }

            tr:nth-child(even) {
                background: #f9fafb;
            }

            tr:hover {
                background: #f3f4f6;
                transition: background-color 0.2s ease;
            }
        }

        :deep(.code-block) {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            margin: 1.5rem 0;
            overflow: hidden;
            max-width: 100%;
            width: 100%;
            position: relative;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            box-sizing: border-box;

            .code-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                padding: 0.75rem 1rem;
                border-bottom: 1px solid #e5e7eb;
                font-size: 0.8rem;

                .code-lang {
                    color: #64748b;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    font-size: 0.75rem;
                }

                .copy-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.375rem;
                    background: #ffffff;
                    border: 1px solid #d1d5db;
                    border-radius: 6px;
                    padding: 0.375rem 0.75rem;
                    font-size: 0.75rem;
                    color: #374151;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-weight: 500;

                    &:hover {
                        background: #f9fafb;
                        border-color: #9ca3af;
                        transform: translateY(-1px);
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
                width: 100%;
                background: #ffffff;
                box-sizing: border-box;

                code {
                    font-family: "Fira Code", "JetBrains Mono", "Monaco",
                        "Menlo", monospace;
                    font-size: 0.95rem;
                    line-height: 1.6;
                    white-space: pre;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    display: block;
                    max-width: 100%;
                    width: 100%;
                    box-sizing: border-box;

                    // highlight.js 语法高亮样式覆盖
                    &.hljs {
                        background: transparent;
                        padding: 0;
                    }
                }
            }
        }

        :deep(code:not(pre code)) {
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            color: #1e293b;
            padding: 0.25rem 0.5rem;
            border-radius: 6px;
            font-family: "Fira Code", "Monaco", "Menlo", monospace;
            font-size: 0.9em;
            font-weight: 500;
            border: 1px solid #e2e8f0;
        }

        :deep(a) {
            color: #667eea;
            text-decoration: none;
            border-bottom: 1px solid transparent;
            transition: all 0.2s ease;
            font-weight: 500;

            &:hover {
                border-bottom-color: #667eea;
                color: #5a67d8;
            }
        }

        :deep(hr) {
            border: none;
            height: 2px;
            background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
            margin: 2rem 0;
            border-radius: 1px;
        }

        :deep(img) {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 2rem auto;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
            border-radius: 12px;
            background: #f8fafc;
        }

        // KaTeX 数学公式样式
        :deep(.katex-display) {
            margin: 1.5rem 0;
            text-align: center;
            overflow: visible;
            width: 100%;
            box-sizing: border-box;
            padding: 1rem 0;
            line-height: normal;

            .katex {
                font-size: 1.15em;
                display: inline-block;
                text-align: center;
                overflow: visible;
                line-height: normal;
                vertical-align: baseline;
            }
        }

        :deep(.katex) {
            font-size: 1.05em;
            overflow: visible;
            box-sizing: border-box;
            line-height: normal;
            vertical-align: baseline;

            .katex-html {
                color: #111827;
                overflow: visible;
                line-height: normal;
                vertical-align: baseline;
            }
        }

        // 修复下标上标位置
        :deep(.katex .vlist-t) {
            vertical-align: baseline;
        }

        :deep(.katex .vlist-r) {
            vertical-align: baseline;
        }

        :deep(.katex .vlist) {
            vertical-align: baseline;
        }

        // 数学公式块样式
        :deep(.math-block) {
            background: #f8fafc;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 1.5rem 1rem;
            margin: 1.5rem 0;
            overflow: visible;
            width: 100%;
            box-sizing: border-box;
            line-height: normal;

            .katex-display {
                margin: 0;
                overflow: visible;
                padding: 0;
                line-height: normal;
            }
        }

        // 确保公式完整显示
        :deep(.katex-display .katex) {
            white-space: nowrap;
            overflow: visible;
            min-height: auto;
            line-height: normal;
            vertical-align: baseline;
        }

        // 修复矩阵样式
        :deep(.katex .mord) {
            overflow: visible;
            vertical-align: baseline;
        }

        :deep(.katex .arraycolsep) {
            overflow: visible;
            vertical-align: baseline;
        }

        // HTML演示容器样式
        :deep(.demo-container) {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            margin: 2rem 0;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

            .demo-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                padding: 1rem 1.5rem;
                border-bottom: 1px solid #e5e7eb;

                .demo-title {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #111827;
                    margin: 0;
                }

                .demo-actions {
                    display: flex;
                    gap: 0.5rem;

                    .demo-btn {
                        display: flex;
                        align-items: center;
                        gap: 0.375rem;
                        background: #ffffff;
                        border: 1px solid #d1d5db;
                        border-radius: 6px;
                        padding: 0.5rem 0.75rem;
                        font-size: 0.8rem;
                        color: #374151;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        font-weight: 500;

                        &:hover {
                            background: #f9fafb;
                            border-color: #9ca3af;
                            transform: translateY(-1px);
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        }

                        svg {
                            width: 14px;
                            height: 14px;
                        }
                    }
                }
            }

            .demo-content {
                padding: 1.5rem;
                background: #ffffff;

                iframe {
                    width: 100%;
                    border: none;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                .demo-preview {
                    background: #f8fafc;
                    border: 1px solid #e5e7eb;
                    border-radius: 8px;
                    overflow: hidden;
                }
            }
        }
    }
}

// 响应式设计
@media (max-width: 768px) {
    .article-detail {
        padding: 0 1rem;

        .article-header .article-meta .article-title {
            font-size: 2rem;
        }

        .article-body {
            :deep(h1) {
                font-size: 1.6rem;
            }

            :deep(h2) {
                font-size: 1.4rem;
            }

            :deep(.code-block) {
                margin: 1rem -1rem;
                border-radius: 0;
            }

            // 移动端数学公式样式
            :deep(.katex-display) {
                overflow-x: auto;
                overflow-y: visible;
                padding: 1rem 0;
                margin: 1rem -1rem;
                padding-left: 1rem;
                padding-right: 1rem;
                line-height: normal;

                .katex {
                    font-size: 1em;
                    min-width: max-content;
                    white-space: nowrap;
                    line-height: normal;
                    vertical-align: baseline;
                }
            }

            :deep(.katex) {
                font-size: 0.9em;
                line-height: normal;
                vertical-align: baseline;
            }

            // 移动端演示容器样式
            :deep(.demo-container) {
                margin: 1rem -1rem;
                border-radius: 0;
                border-left: none;
                border-right: none;

                .demo-header {
                    padding: 0.75rem 1rem;

                    .demo-title {
                        font-size: 1rem;
                    }

                    .demo-actions {
                        .demo-btn {
                            padding: 0.4rem 0.6rem;
                            font-size: 0.75rem;

                            svg {
                                width: 12px;
                                height: 12px;
                            }
                        }
                    }
                }

                .demo-content {
                    padding: 1rem;

                    iframe {
                        border-radius: 4px;
                    }
                }
            }
        }
    }
}
</style>
