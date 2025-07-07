<template>
    <div class="content-wrapper">
        <h1>博客内容区域</h1>
        <p>这是一个可以滚动的内容区域</p>

        <!-- 添加长内容测试滚动 -->
        <div class="long-content">
            <div
                v-for="i in 50"
                :key="i"
                class="content-item"
            >
                <h3>内容块 {{ i }}</h3>
                <p>
                    这是第 {{ i }} 个内容块。Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat.
                </p>
                <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>

        <div class="bottom-marker">🎉 你已经滚动到底部了！</div>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.content-wrapper {
    /* 确保内容可以撑开容器 */
    min-height: 100%;
    padding: 20px;
}

.long-content {
    margin: 20px 0;
}

.content-item {
    margin-bottom: 30px;
    padding: 20px;
    background: white;
    border-radius: 8px;

    h3 {
        color: #333;
        margin-bottom: 15px;
        font-size: 18px;
    }

    p {
        color: #666;
        line-height: 1.6;
        margin-bottom: 10px;
    }
}

.bottom-marker {
    text-align: center;
    padding: 40px;
    font-size: 18px;
    color: #4caf50;
    font-weight: bold;
    background: #f0f8f0;
    border-radius: 8px;
    margin: 20px 0;
}
</style>
