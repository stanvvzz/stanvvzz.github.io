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
                    <span class="article-read-time">12 分钟阅读</span>
                </div>
                <p class="article-summary">{{ article.description }}</p>
            </div>
        </div>

        <div class="article-body">
            <h2>Vue Router 4.0 新特性</h2>
            <p>
                Vue Router 4.0 是为 Vue 3
                设计的全新版本，带来了许多重要的改进和新特性。它提供了更好的
                TypeScript 支持、更小的体积和更强大的功能。
            </p>

            <h3>主要改进</h3>
            <ul>
                <li>
                    <strong>Composition API 支持</strong> - 原生支持 Vue 3
                    Composition API
                </li>
                <li>
                    <strong>更好的 TypeScript 支持</strong> - 完整的类型定义
                </li>
                <li><strong>动态路由匹配</strong> - 更灵活的路由配置</li>
                <li><strong>导航守卫增强</strong> - 更强大的路由守卫功能</li>
            </ul>

            <h3>路由懒加载</h3>
            <p>在 Vue Router 4.0 中，我们可以很容易地实现路由懒加载：</p>
            <div class="code-block">
                <pre><code>import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})</code></pre>
            </div>

            <h3>Composition API 中使用路由</h3>
            <div class="code-block">
                <pre><code>import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    const goToAbout = () => {
      router.push('/about')
    }

    return {
      route,
      goToAbout
    }
  }
}</code></pre>
            </div>

            <h3>路由守卫最佳实践</h3>
            <p>合理使用路由守卫可以提高应用的安全性和用户体验：</p>
            <ol>
                <li><strong>全局前置守卫</strong> - 用于身份验证和权限检查</li>
                <li><strong>路由独享守卫</strong> - 针对特定路由的逻辑</li>
                <li><strong>组件内守卫</strong> - 组件级别的路由逻辑</li>
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

            &.gradient-purple {
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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
