<template>
    <div class="content-page">
        <h1>C++</h1>
        <div class="content-body">
            <p>
                C++ 是一种通用的编程语言，支持面向对象、泛型和过程化编程范式。
            </p>
            <ul>
                <li>内存管理</li>
                <li>模板编程</li>
                <li>标准模板库 (STL)</li>
                <li>多线程编程</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
// C++ 内容组件
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
