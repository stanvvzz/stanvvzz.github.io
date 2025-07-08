<template>
    <div class="content-page">
        <h1>WebGL</h1>
        <div class="content-body">
            <p>
                WebGL 是一种 JavaScript
                API，用于在任何兼容的网页浏览器中渲染高性能的交互式 3D 和 2D
                图形。
            </p>
            <ul>
                <li>着色器编程</li>
                <li>图形渲染管线</li>
                <li>纹理映射</li>
                <li>缓冲区管理</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
// WebGL 内容组件
</script>

<style lang="less" scoped>
.content-page {
    padding: 24px;

    h1 {
        font-size: 2rem;
        margin-bottom: 16px;
        color: #1f2937;
    }

    .content-body {
        font-size: 16px;
        line-height: 1.6;
        color: #374151;

        ul {
            margin-top: 16px;
            padding-left: 20px;

            li {
                margin-bottom: 8px;
            }
        }
    }
}
</style>
