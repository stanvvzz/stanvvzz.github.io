<template>
    <div class="home-page">
        <div class="center-content">
            <h1 class="main-title">
                构建更好的 <span class="gradient-text">虚拟世界</span>
            </h1>
            <p class="main-desc">
                探索前端技术和图形编程的无限可能。<br />
                在这里分享我的编程学习之旅与技术见解。
            </p>

            <div class="contact-info">
                <a
                    href="https://github.com/stanvvzz"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    class="contact-link"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        role="img"
                    >
                        <path
                            d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"
                        ></path>
                    </svg>
                    <span>stanvvzz</span>
                </a>
                <a
                    href="mailto:zly1241582922@163.com"
                    aria-label="Email"
                    class="contact-link"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        role="img"
                    >
                        <path
                            d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"
                        />
                    </svg>
                    <span>zly1241582922@163.com</span>
                </a>
            </div>

            <div class="additional-info">
                <p class="info-item">
                    本科 (2019 - 2023) · 南京信息工程大学 · 地理信息科学
                </p>
                <p class="info-item">
                    GIS开发工程师 (2023 - 至今) · 从事二三维地图SDK的研发工作
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.home-page {
    min-height: 100%;
    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%);
    color: #1f2937;
    display: flex;
    align-items: center;
    justify-content: center;
    // min-height: 100vh;
}

.center-content {
    text-align: center;
    max-width: 700px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    padding: 0 24px;
    box-sizing: border-box;
}

.main-title {
    font-size: 3rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 24px;
    letter-spacing: -0.02em;
}

.gradient-text {
    background: linear-gradient(135deg, #059669 0%, #0ea5e9 50%, #7c3aed 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.main-desc {
    font-size: 1.25rem;
    line-height: 1.7;
    color: #6b7280;
    margin-bottom: 32px;
}

.contact-info {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 16px 24px;
}

.contact-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #4b5563;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    transition: color 0.3s ease;

    svg {
        transition: transform 0.3s ease;
    }

    &:hover {
        color: #111827;
        svg {
            transform: scale(1.1);
        }
    }
}

.additional-info {
    margin-top: 24px;
    border-top: 1px solid #e5e7eb;
    padding-top: 24px;
}

.info-item {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #9ca3af;
    margin: 0 0 8px 0;

    &:last-child {
        margin-bottom: 0;
    }
}

@media (max-width: 640px) {
    .main-title {
        font-size: 2.5rem;
    }
    .main-desc {
        font-size: 1.1rem;
    }
    .contact-info {
        flex-direction: column;
        gap: 12px;
        align-items: center;
    }
    .additional-info {
        margin-top: 20px;
        padding-top: 20px;
    }
}
</style>
