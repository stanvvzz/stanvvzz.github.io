<template>
    <div class="home-page">
        <div class="center-content">
            <h1 class="main-title">
                构建更好的 <span class="gradient-text">虚拟世界</span>
            </h1>
            <p class="main-desc">
                探索前端技术、图形编程和性能优化的无限可能。<br />
                在这里分享我的编程学习之旅与技术见解。
            </p>
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
}

.center-content {
    text-align: center;
    max-width: 600px;
    width: 100%;
    height: 100%;
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
    margin-bottom: 32px;
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
    margin-bottom: 0;
}
</style>
