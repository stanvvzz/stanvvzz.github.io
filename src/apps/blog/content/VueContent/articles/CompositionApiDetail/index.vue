<template>
    <div class="article-detail">
        <div class="article-header">
            <div
                class="article-hero"
                :class="article.imageClass"
            >
                <div class="hero-icon">{{ article.icon }}</div>
            </div>
            <div class="article-meta">
                <h1 class="article-title">{{ article.title }}</h1>
                <div class="article-info">
                    <span class="article-category">{{ article.category }}</span>
                    <span class="article-date">{{ article.date }}</span>
                    <span class="article-read-time">15 分钟阅读</span>
                </div>
                <p class="article-summary">{{ article.description }}</p>
            </div>
        </div>

        <div class="article-body">
            <h2>什么是 Composition API？</h2>
            <p>
                Vue 3 的 Composition API 是一套全新的
                API，它提供了一种更灵活的方式来组织组件逻辑。与 Options API
                相比，Composition API
                让我们能够根据逻辑功能来组织代码，而不是根据选项类型。
            </p>

            <h3>核心概念</h3>
            <ul>
                <li><strong>reactive()</strong> - 创建响应式对象</li>
                <li><strong>ref()</strong> - 创建响应式引用</li>
                <li><strong>computed()</strong> - 创建计算属性</li>
                <li><strong>watch()</strong> - 监听响应式数据变化</li>
            </ul>

            <h3>基础示例</h3>
            <div class="code-block">
                <pre><code>import { ref, computed, watch } from 'vue'

export default {
  setup() {
    // 响应式状态
    const count = ref(0)

    // 计算属性
    const doubleCount = computed(() => count.value * 2)

    // 监听器
    watch(count, (newVal, oldVal) => {
      console.log(\`count changed from \${oldVal} to \${newVal}\`)
    })

    // 方法
    const increment = () => {
      count.value++
    }

    return {
      count,
      doubleCount,
      increment
    }
  }
}</code></pre>
            </div>

            <h3>优势</h3>
            <ol>
                <li>
                    <strong>更好的逻辑复用</strong> - 通过组合函数实现逻辑复用
                </li>
                <li><strong>更好的类型推导</strong> - TypeScript 支持更完善</li>
                <li>
                    <strong>更灵活的代码组织</strong> - 相关逻辑可以组织在一起
                </li>
                <li><strong>更小的打包体积</strong> - 支持 tree-shaking</li>
            </ol>
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
// 文章详情样式
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
