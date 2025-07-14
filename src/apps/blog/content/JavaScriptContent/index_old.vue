<template>
    <div class="content-page">
        <h1>JavaScript</h1>
        <div class="content-body">
            <p>JavaScript 是一种高级的、解释型的编程语言。</p>
            <ul>
                <li>动态类型</li>
                <li>函数式编程</li>
                <li>面向对象编程</li>
                <li>异步编程</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
// JavaScript 内容组件
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
