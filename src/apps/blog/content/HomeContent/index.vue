<template>
    <div class="home-page">
        <div class="welcome-section">
            <h1 class="welcome-title">欢迎来到我的技术博客</h1>
            <p class="welcome-subtitle">在这里分享我的编程学习之旅与技术见解</p>

            <div class="feature-cards">
                <div class="feature-card">
                    <div class="card-icon">🚀</div>
                    <h3>前端技术</h3>
                    <p>JavaScript、Vue.js、Three.js 等现代前端技术分享</p>
                </div>

                <div class="feature-card">
                    <div class="card-icon">🎨</div>
                    <h3>图形编程</h3>
                    <p>WebGL、Three.js 3D 图形编程实践与案例</p>
                </div>

                <div class="feature-card">
                    <div class="card-icon">⚡</div>
                    <h3>性能优化</h3>
                    <p>C++ 底层优化与高性能编程技巧</p>
                </div>
            </div>
        </div>

        <div class="intro-section">
            <h2>关于我</h2>
            <p>
                我是一名热爱编程的开发者，专注于前端技术和图形编程。在这个博客中，我会分享我在学习和工作中遇到的技术问题、解决方案以及一些有趣的项目经验。
            </p>

            <div class="skills-section">
                <h3>技术栈</h3>
                <div class="skills-list">
                    <span class="skill-tag">JavaScript</span>
                    <span class="skill-tag">Vue.js</span>
                    <span class="skill-tag">Three.js</span>
                    <span class="skill-tag">WebGL</span>
                    <span class="skill-tag">C++</span>
                    <span class="skill-tag">TypeScript</span>
                </div>
            </div>
        </div>

        <div class="navigation-hint">
            <p>👈 点击左侧菜单选择你感兴趣的技术领域</p>
        </div>
    </div>
</template>

<script setup lang="ts">
// Home 欢迎页面组件
</script>

<style lang="less" scoped>
.home-page {
    padding: 40px;
    max-width: 1000px;
    margin: 0 auto;

    .welcome-section {
        text-align: center;
        margin-bottom: 60px;

        .welcome-title {
            font-size: 3rem;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 16px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .welcome-subtitle {
            font-size: 1.25rem;
            color: #6b7280;
            margin-bottom: 40px;
        }
    }

    .feature-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 24px;
        margin-bottom: 60px;

        .feature-card {
            background: white;
            border-radius: 12px;
            padding: 32px 24px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            border: 1px solid #e5e7eb;
            transition: all 0.3s ease;
            text-align: center;

            &:hover {
                transform: translateY(-4px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            }

            .card-icon {
                font-size: 2.5rem;
                margin-bottom: 16px;
            }

            h3 {
                font-size: 1.25rem;
                font-weight: 600;
                color: #1f2937;
                margin-bottom: 12px;
            }

            p {
                color: #6b7280;
                line-height: 1.6;
            }
        }
    }

    .intro-section {
        background: #f9fafb;
        border-radius: 12px;
        padding: 40px;
        margin-bottom: 40px;

        h2 {
            font-size: 2rem;
            color: #1f2937;
            margin-bottom: 20px;
        }

        p {
            font-size: 1.1rem;
            line-height: 1.7;
            color: #4b5563;
            margin-bottom: 32px;
        }

        .skills-section {
            h3 {
                font-size: 1.25rem;
                color: #1f2937;
                margin-bottom: 16px;
            }

            .skills-list {
                display: flex;
                flex-wrap: wrap;
                gap: 12px;

                .skill-tag {
                    background: linear-gradient(
                        135deg,
                        #667eea 0%,
                        #764ba2 100%
                    );
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    font-weight: 500;
                }
            }
        }
    }

    .navigation-hint {
        text-align: center;
        padding: 24px;
        background: #eff6ff;
        border-radius: 8px;
        border-left: 4px solid #3b82f6;

        p {
            color: #1e40af;
            font-size: 1.1rem;
            margin: 0;
        }
    }
}

// 响应式设计
@media (max-width: 768px) {
    .home-page {
        padding: 20px;

        .welcome-section {
            .welcome-title {
                font-size: 2rem;
            }

            .welcome-subtitle {
                font-size: 1rem;
            }
        }

        .feature-cards {
            grid-template-columns: 1fr;
        }

        .intro-section {
            padding: 24px;
        }
    }
}
</style>
