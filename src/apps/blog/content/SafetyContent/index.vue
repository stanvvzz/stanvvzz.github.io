<template>
    <div class="safety-content">
        <div class="content-header">
            <h1>AI 安全与伦理</h1>
            <p class="content-subtitle">
                探讨人工智能的安全性、伦理问题以及负责任的AI开发
            </p>
        </div>

        <div class="content-body">
            <section class="section">
                <h2>AI 安全原则</h2>
                <div class="principle-cards">
                    <div class="principle-card">
                        <div class="principle-icon">🛡️</div>
                        <h3>安全性优先</h3>
                        <p>确保AI系统在各种情况下都能安全运行，避免意外伤害</p>
                    </div>

                    <div class="principle-card">
                        <div class="principle-icon">⚖️</div>
                        <h3>公平性</h3>
                        <p>防止算法偏见，确保AI系统对所有用户群体公平对待</p>
                    </div>

                    <div class="principle-card">
                        <div class="principle-icon">🔍</div>
                        <h3>透明度</h3>
                        <p>提供可解释的AI决策过程，让用户理解系统的工作原理</p>
                    </div>

                    <div class="principle-card">
                        <div class="principle-icon">🔒</div>
                        <h3>隐私保护</h3>
                        <p>严格保护用户数据隐私，遵循数据保护法规</p>
                    </div>
                </div>
            </section>

            <section class="section">
                <h2>安全研究方向</h2>
                <div class="research-list">
                    <div class="research-item">
                        <h3>对抗性攻击防护</h3>
                        <p>
                            研究如何防御针对AI模型的恶意攻击，提高模型的鲁棒性。包括对抗性样本检测、防御性蒸馏等技术。
                        </p>
                    </div>

                    <div class="research-item">
                        <h3>模型可解释性</h3>
                        <p>
                            开发可解释AI技术，让复杂的深度学习模型的决策过程变得透明可理解。
                        </p>
                    </div>

                    <div class="research-item">
                        <h3>联邦学习</h3>
                        <p>
                            在保护数据隐私的前提下，实现分布式机器学习，让数据不出本地也能参与模型训练。
                        </p>
                    </div>

                    <div class="research-item">
                        <h3>AI治理框架</h3>
                        <p>
                            建立AI开发和部署的治理框架，确保AI技术的负责任使用。
                        </p>
                    </div>
                </div>
            </section>

            <section class="section">
                <h2>最佳实践</h2>
                <div class="best-practices">
                    <div class="practice-item">
                        <span class="practice-number">01</span>
                        <div class="practice-content">
                            <h3>AI伦理审查</h3>
                            <p>
                                在AI项目启动前进行伦理风险评估，识别潜在的社会影响。
                            </p>
                        </div>
                    </div>

                    <div class="practice-item">
                        <span class="practice-number">02</span>
                        <div class="practice-content">
                            <h3>多样化团队</h3>
                            <p>
                                建立多元化的开发团队，从不同角度审视AI系统的设计。
                            </p>
                        </div>
                    </div>

                    <div class="practice-item">
                        <span class="practice-number">03</span>
                        <div class="practice-content">
                            <h3>持续监控</h3>
                            <p>
                                部署后持续监控AI系统的表现，及时发现和修正问题。
                            </p>
                        </div>
                    </div>

                    <div class="practice-item">
                        <span class="practice-number">04</span>
                        <div class="practice-content">
                            <h3>用户赋权</h3>
                            <p>
                                给用户提供控制选项，让他们能够影响AI系统的决策。
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
// Safety content for AI ethics and security
</script>

<style lang="less" scoped>
.safety-content {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    color: #e5e5e5;
}

.content-header {
    text-align: center;
    margin-bottom: 3rem;

    h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
        background: linear-gradient(135deg, #ff6b6b, #ffd93d);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .content-subtitle {
        font-size: 1.1rem;
        color: #b3b3b3;
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.6;
    }
}

.section {
    margin-bottom: 3rem;

    h2 {
        font-size: 1.8rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        color: #ffffff;
        border-left: 4px solid #ff6b6b;
        padding-left: 1rem;
    }
}

.principle-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.principle-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        border-color: rgba(255, 107, 107, 0.5);
        box-shadow: 0 10px 30px rgba(255, 107, 107, 0.1);
    }

    .principle-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    h3 {
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #ffffff;
    }

    p {
        color: #b3b3b3;
        line-height: 1.5;
        font-size: 0.9rem;
    }
}

.research-list {
    display: grid;
    gap: 1.5rem;
}

.research-item {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 1.5rem;
    transition: all 0.3s ease;

    &:hover {
        border-color: rgba(255, 107, 107, 0.3);
        background: rgba(255, 255, 255, 0.05);
    }

    h3 {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
        color: #ffffff;
    }

    p {
        color: #b3b3b3;
        line-height: 1.6;
        font-size: 0.95rem;
    }
}

.best-practices {
    display: grid;
    gap: 1.5rem;
}

.practice-item {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
        border-color: rgba(255, 107, 107, 0.3);
        background: rgba(255, 255, 255, 0.05);
    }
}

.practice-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #ff6b6b, #ffd93d);
    color: #000;
    font-weight: 700;
    border-radius: 50%;
    flex-shrink: 0;
    font-size: 0.9rem;
}

.practice-content {
    flex: 1;

    h3 {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #ffffff;
    }

    p {
        color: #b3b3b3;
        line-height: 1.6;
        font-size: 0.95rem;
    }
}

// 响应式设计
@media (max-width: 768px) {
    .safety-content {
        padding: 1rem;
    }

    .content-header h1 {
        font-size: 2rem;
    }

    .principle-cards {
        grid-template-columns: 1fr;
    }

    .practice-item {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
    }
}
</style>
