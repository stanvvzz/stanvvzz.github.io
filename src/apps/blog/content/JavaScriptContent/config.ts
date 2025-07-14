// JavaScript内容配置 - 统一管理卡片数据和Markdown文件映射
export interface JavaScriptArticle {
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
export const javaScriptArticles: JavaScriptArticle[] = [
    {
        id: 1,
        title: "JavaScript ES6+ 现代特性详解",
        category: ["JavaScript", "ES6", "Modern"],
        date: "Jan 12, 2025",
        description: "深入学习JavaScript ES6+的新特性，提升编程效率",
        imageClass: "gradient-orange",
        icon: "🚀",
        markdownPath: "/md/javascript/1.md",
    },
    {
        id: 2,
        title: "异步编程：Promise与async/await",
        category: ["JavaScript", "Async", "Promise"],
        date: "Jan 11, 2025",
        description: "掌握JavaScript异步编程的核心概念和最佳实践",
        imageClass: "gradient-blue",
        icon: "⚡",
        markdownPath: "/md/javascript/2.md",
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
export const getArticleById = (id: number): JavaScriptArticle | undefined => {
    return javaScriptArticles.find((article) => article.id === id);
};
