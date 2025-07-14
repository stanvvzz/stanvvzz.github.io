<template>
    <div class="home-page">
        <!-- 主要英雄区域 -->
        <div class="hero-section">
            <div class="hero-content">
                <div class="hero-badge">
                    <span class="badge-text">🚀 持续学习，分享技术</span>
                </div>

                <h1 class="hero-title">
                    构建更好的
                    <span class="gradient-text">技术世界</span>
                </h1>

                <p class="hero-description">
                    探索前端技术、图形编程和性能优化的无限可能。<br />
                    在这里分享我的编程学习之旅与技术见解。
                </p>

                <div class="hero-actions">
                    <button class="primary-button">
                        开始阅读
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M6 4l4 4-4 4"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                    <button class="secondary-button">了解更多</button>
                </div>
            </div>

            <!-- 视觉装饰 -->
            <div class="hero-visual">
                <div class="floating-card card-1">
                    <div class="card-content">
                        <div class="card-icon">⚡</div>
                        <span>性能优化</span>
                    </div>
                </div>
                <div class="floating-card card-2">
                    <div class="card-content">
                        <div class="card-icon">🎨</div>
                        <span>Three.js</span>
                    </div>
                </div>
                <div class="floating-card card-3">
                    <div class="card-content">
                        <div class="card-icon">🚀</div>
                        <span>Vue.js</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 特性展示区域 -->
        <div class="features-section">
            <div class="features-header">
                <h2>技术领域</h2>
                <p>专注于现代前端技术和高性能编程</p>
            </div>

            <div class="features-grid">
                <div class="feature-item">
                    <div class="feature-icon">
                        <div class="icon-wrapper frontend">
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                            >
                                <rect
                                    x="4"
                                    y="8"
                                    width="24"
                                    height="16"
                                    rx="2"
                                    stroke="currentColor"
                                    stroke-width="2"
                                />
                                <path
                                    d="M12 14l3 2-3 2M16 18h4"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                />
                            </svg>
                        </div>
                    </div>
                    <h3>前端开发</h3>
                    <p>
                        JavaScript、Vue.js、TypeScript
                        等现代前端技术栈的深度实践与最佳方案分享
                    </p>
                </div>

                <div class="feature-item">
                    <div class="feature-icon">
                        <div class="icon-wrapper graphics">
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                            >
                                <path
                                    d="M16 4l8 12H8l8-12z"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linejoin="round"
                                />
                                <circle
                                    cx="16"
                                    cy="22"
                                    r="6"
                                    stroke="currentColor"
                                    stroke-width="2"
                                />
                                <path
                                    d="M12 22h8"
                                    stroke="currentColor"
                                    stroke-width="2"
                                />
                            </svg>
                        </div>
                    </div>
                    <h3>图形编程</h3>
                    <p>
                        WebGL、Three.js 3D
                        图形编程实践，从基础概念到复杂场景渲染的完整指南
                    </p>
                </div>

                <div class="feature-item">
                    <div class="feature-icon">
                        <div class="icon-wrapper performance">
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                            >
                                <path
                                    d="M4 20l4-4 4 4 4-8 4 4 4-4 4 4"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M28 12v8h-8"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                    <h3>性能优化</h3>
                    <p>
                        C++ 底层优化、算法优化与 Web
                        性能提升，追求极致的用户体验
                    </p>
                </div>
            </div>
        </div>

        <!-- 技术栈展示 -->
        <div class="tech-stack-section">
            <div class="tech-header">
                <h2>技术栈</h2>
                <p>使用的技术和工具</p>
            </div>

            <div class="tech-grid">
                <div class="tech-category">
                    <h4>前端技术</h4>
                    <div class="tech-tags">
                        <span class="tech-tag primary">JavaScript</span>
                        <span class="tech-tag primary">Vue.js</span>
                        <span class="tech-tag primary">TypeScript</span>
                    </div>
                </div>

                <div class="tech-category">
                    <h4>图形技术</h4>
                    <div class="tech-tags">
                        <span class="tech-tag secondary">Three.js</span>
                        <span class="tech-tag secondary">WebGL</span>
                        <span class="tech-tag secondary">Canvas</span>
                    </div>
                </div>

                <div class="tech-category">
                    <h4>系统编程</h4>
                    <div class="tech-tags">
                        <span class="tech-tag tertiary">C++</span>
                        <span class="tech-tag tertiary">算法优化</span>
                        <span class="tech-tag tertiary">性能调优</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 行动召唤区域 -->
        <div class="cta-section">
            <div class="cta-content">
                <h2>开始探索技术之旅</h2>
                <p>选择你感兴趣的技术领域，开始深度学习</p>
                <button class="cta-button">
                    浏览文章
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                    >
                        <path
                            d="M7.5 5l5 5-5 5"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Home 欢迎页面组件
</script>

<style lang="less" scoped>
.home-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%);
    color: #1f2937;
    overflow-x: hidden;
}

// 英雄区域
.hero-section {
    position: relative;
    min-height: 90vh;
    display: flex;
    align-items: center;
    padding: 60px 40px;
    max-width: 1200px;
    margin: 0 auto;

    .hero-content {
        flex: 1;
        max-width: 600px;
        z-index: 2;

        .hero-badge {
            display: inline-flex;
            align-items: center;
            background: rgba(99, 102, 241, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(99, 102, 241, 0.2);
            border-radius: 50px;
            padding: 8px 20px;
            margin-bottom: 32px;
            transition: all 0.3s ease;

            &:hover {
                background: rgba(99, 102, 241, 0.15);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1);
            }

            .badge-text {
                font-size: 0.9rem;
                font-weight: 500;
                color: #6366f1;
            }
        }

        .hero-title {
            font-size: 4.5rem;
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: 24px;
            color: #111827;

            .gradient-text {
                background: linear-gradient(
                    135deg,
                    #059669 0%,
                    #0ea5e9 50%,
                    #7c3aed 100%
                );
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
        }

        .hero-description {
            font-size: 1.25rem;
            line-height: 1.6;
            color: #6b7280;
            margin-bottom: 40px;
            max-width: 500px;
        }

        .hero-actions {
            display: flex;
            gap: 16px;
            align-items: center;

            .primary-button {
                display: flex;
                align-items: center;
                gap: 8px;
                background: linear-gradient(135deg, #059669 0%, #0ea5e9 100%);
                color: white;
                border: none;
                border-radius: 50px;
                padding: 16px 32px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 20px rgba(5, 150, 105, 0.25);

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 30px rgba(5, 150, 105, 0.35);
                }

                svg {
                    transition: transform 0.3s ease;
                }

                &:hover svg {
                    transform: translateX(4px);
                }
            }

            .secondary-button {
                background: transparent;
                color: #374151;
                border: 2px solid #d1d5db;
                border-radius: 50px;
                padding: 14px 28px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;

                &:hover {
                    background: #f9fafb;
                    border-color: #9ca3af;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }
            }
        }
    }

    .hero-visual {
        position: absolute;
        right: 40px;
        top: 50%;
        transform: translateY(-50%);
        width: 400px;
        height: 400px;
        z-index: 1;

        .floating-card {
            position: absolute;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(229, 231, 235, 0.5);
            border-radius: 16px;
            padding: 16px 20px;
            animation: float 6s ease-in-out infinite;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);

            .card-content {
                display: flex;
                align-items: center;
                gap: 12px;
                color: #374151;
                font-weight: 600;
                font-size: 0.9rem;

                .card-icon {
                    font-size: 1.5rem;
                }
            }

            &.card-1 {
                top: 20%;
                right: 10%;
                animation-delay: 0s;
            }

            &.card-2 {
                top: 50%;
                right: 40%;
                animation-delay: 2s;
            }

            &.card-3 {
                bottom: 20%;
                right: 20%;
                animation-delay: 4s;
            }
        }
    }
}

@keyframes float {
    0%,
    100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-20px);
    }
}

// 特性区域
.features-section {
    padding: 120px 40px;
    max-width: 1200px;
    margin: 0 auto;

    .features-header {
        text-align: center;
        margin-bottom: 80px;

        h2 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 16px;
            background: linear-gradient(135deg, #059669 0%, #0ea5e9 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        p {
            font-size: 1.25rem;
            color: #6b7280;
        }
    }

    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 40px;

        .feature-item {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(229, 231, 235, 0.5);
            border-radius: 20px;
            padding: 40px 32px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 1px;
                background: linear-gradient(
                    90deg,
                    transparent 0%,
                    rgba(156, 163, 175, 0.3) 50%,
                    transparent 100%
                );
            }

            &:hover {
                transform: translateY(-8px);
                background: rgba(255, 255, 255, 0.95);
                border-color: rgba(156, 163, 175, 0.3);
                box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
            }

            .feature-icon {
                margin-bottom: 24px;

                .icon-wrapper {
                    width: 64px;
                    height: 64px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;

                    &.frontend {
                        background: linear-gradient(
                            135deg,
                            #059669 0%,
                            #047857 100%
                        );
                    }

                    &.graphics {
                        background: linear-gradient(
                            135deg,
                            #0ea5e9 0%,
                            #0284c7 100%
                        );
                    }

                    &.performance {
                        background: linear-gradient(
                            135deg,
                            #7c3aed 0%,
                            #6d28d9 100%
                        );
                    }

                    svg {
                        color: white;
                        z-index: 1;
                    }
                }
            }

            h3 {
                font-size: 1.5rem;
                font-weight: 700;
                margin-bottom: 16px;
                color: #111827;
            }

            p {
                font-size: 1rem;
                line-height: 1.6;
                color: #6b7280;
            }
        }
    }
}

// 技术栈区域
.tech-stack-section {
    padding: 80px 40px;
    max-width: 1000px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 24px;
    border: 1px solid rgba(229, 231, 235, 0.5);
    margin-bottom: 80px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);

    .tech-header {
        text-align: center;
        margin-bottom: 60px;

        h2 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 16px;
            color: #111827;
        }

        p {
            font-size: 1.1rem;
            color: #6b7280;
        }
    }

    .tech-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 40px;

        .tech-category {
            h4 {
                font-size: 1.25rem;
                font-weight: 600;
                color: #374151;
                margin-bottom: 16px;
            }

            .tech-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 12px;

                .tech-tag {
                    padding: 8px 16px;
                    border-radius: 50px;
                    font-size: 0.9rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    cursor: pointer;

                    &.primary {
                        background: linear-gradient(
                            135deg,
                            #059669 0%,
                            #047857 100%
                        );
                        color: white;
                        box-shadow: 0 4px 15px rgba(5, 150, 105, 0.2);
                    }

                    &.secondary {
                        background: linear-gradient(
                            135deg,
                            #0ea5e9 0%,
                            #0284c7 100%
                        );
                        color: white;
                        box-shadow: 0 4px 15px rgba(14, 165, 233, 0.2);
                    }

                    &.tertiary {
                        background: linear-gradient(
                            135deg,
                            #7c3aed 0%,
                            #6d28d9 100%
                        );
                        color: white;
                        box-shadow: 0 4px 15px rgba(124, 58, 237, 0.2);
                    }

                    &:hover {
                        transform: translateY(-2px);
                        filter: brightness(1.1);
                    }
                }
            }
        }
    }
}

// 行动召唤区域
.cta-section {
    padding: 100px 40px;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;

    .cta-content {
        h2 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 24px;
            background: linear-gradient(
                135deg,
                #059669 0%,
                #0ea5e9 50%,
                #7c3aed 100%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        p {
            font-size: 1.25rem;
            color: #6b7280;
            margin-bottom: 40px;
        }

        .cta-button {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            background: linear-gradient(135deg, #059669 0%, #0ea5e9 100%);
            color: white;
            border: none;
            border-radius: 50px;
            padding: 20px 40px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 8px 30px rgba(5, 150, 105, 0.25);

            &:hover {
                transform: translateY(-4px);
                box-shadow: 0 12px 40px rgba(5, 150, 105, 0.35);
            }

            svg {
                transition: transform 0.3s ease;
            }

            &:hover svg {
                transform: translateX(4px);
            }
        }
    }
}

// 响应式设计
@media (max-width: 1024px) {
    .hero-section {
        .hero-visual {
            display: none;
        }

        .hero-content {
            max-width: 100%;
        }
    }
}

@media (max-width: 768px) {
    .home-page {
        .hero-section {
            padding: 40px 20px;
            min-height: 70vh;

            .hero-content {
                .hero-title {
                    font-size: 3rem;
                }

                .hero-description {
                    font-size: 1.1rem;
                }

                .hero-actions {
                    flex-direction: column;
                    align-items: stretch;

                    .primary-button,
                    .secondary-button {
                        justify-content: center;
                    }
                }
            }
        }

        .features-section {
            padding: 80px 20px;

            .features-grid {
                grid-template-columns: 1fr;
                gap: 24px;
            }

            .features-header h2 {
                font-size: 2.5rem;
            }
        }

        .tech-stack-section {
            padding: 60px 20px;
            margin: 0 20px 60px;

            .tech-grid {
                grid-template-columns: 1fr;
                gap: 30px;
            }
        }

        .cta-section {
            padding: 80px 20px;

            .cta-content h2 {
                font-size: 2.5rem;
            }
        }
    }
}
</style>
