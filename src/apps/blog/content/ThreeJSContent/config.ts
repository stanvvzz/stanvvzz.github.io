// ThreeJS内容配置 - 统一管理卡片数据和Markdown文件映射
export interface ThreeJSArticle {
    id: number;
    title: string;
    category: Array<string>;
    date: string;
    description: string;
    imageClass: string;
    icon: string;
    // Markdown文件路径
    markdownPath?: string;
}

// 卡片数据配置
export const threeJSArticles: ThreeJSArticle[] = [
    {
        id: 1,
        title: "Three.js 基础入门指南",
        category: ["Three.js", "WebGL", "3D"],
        date: "Jan 12, 2025",
        description: "从零开始学习Three.js，创建你的第一个3D场景",
        imageClass: "gradient-purple",
        icon: "🎮",
        markdownPath: "/md/threejs/1.md",
    },
    {
        id: 2,
        title: "Three.js 光照系统详解",
        category: ["Three.js", "Lighting", "Shader"],
        date: "Jan 11, 2025",
        description: "深入理解Three.js中的各种光源类型和阴影渲染",
        imageClass: "gradient-yellow",
        icon: "💡",
        markdownPath: "/md/threejs/2.md",
    },
    {
        id: 3,
        title: "Three.js 性能优化最佳实践",
        category: ["Three.js", "Performance", "Optimization"],
        date: "Jan 09, 2025",
        description: "提升Three.js应用性能的关键技巧和优化策略",
        imageClass: "gradient-green",
        icon: "⚡",
        markdownPath: "/md/threejs/3.md",
    },
    {
        id: 4,
        title: "Three.js 动画系统进阶",
        category: ["Three.js", "Animation", "Timeline"],
        date: "Jan 08, 2025",
        description: "掌握Three.js动画系统，创建流畅的3D动画效果",
        imageClass: "gradient-pink",
        icon: "🎬",
        markdownPath: "/md/threejs/4.md",
    },
];

// 动态加载Markdown内容的工厂函数
export const loadMarkdownContent = async (
    markdownPath: string
): Promise<string> => {
    try {
        // 使用fetch来获取markdown文件
        const response = await fetch(markdownPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();
        return content;
    } catch (error) {
        console.warn(`Failed to load markdown: ${markdownPath}`, error);
        return "# 文章加载失败\n\n无法加载文章内容，请稍后再试。";
    }
};

// 根据ID获取文章信息
export const getArticleById = (id: number): ThreeJSArticle | undefined => {
    return threeJSArticles.find((article) => article.id === id);
};
