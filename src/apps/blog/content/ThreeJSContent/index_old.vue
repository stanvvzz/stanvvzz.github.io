<template>
    <div class="content-page">
        <h1>Three.js</h1>
        <div class="content-body">
            <p>
                Three.js 是一个跨浏览器的 JavaScript
                库，用于在网页上创建和显示动画的 3D 计算机图形。
            </p>
            <ul>
                <li>3D 场景渲染</li>
                <li>几何体和材质</li>
                <li>光照系统</li>
                <li>动画控制</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
// Three.js 内容组件
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
