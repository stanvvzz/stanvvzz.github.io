<template>
    <div class="content-page">
        <h1>Vue.js</h1>
        <div class="content-body">
            <p>Vue.js 是一个用于构建用户界面的渐进式框架。</p>
            <ul>
                <li>响应式数据绑定</li>
                <li>组件化开发</li>
                <li>虚拟 DOM</li>
                <li>指令系统</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
// Vue 内容组件
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
