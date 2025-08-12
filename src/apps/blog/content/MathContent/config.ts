// JavaScript内容配置 - 统一管理卡片数据和Markdown文件映射
export interface MathArticle {
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
export const mathArticles: MathArticle[] = [
    {
        id: 1,
        title: "点乘和叉乘的区别",
        category: ["manual"],
        date: "2025-08-12",
        description: "",
        imageClass: "",
        icon: "",
        markdownPath: "/md/math/1.md",
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
export const getArticleById = (id: number): MathArticle | undefined => {
    return mathArticles.find((article) => article.id === id);
};

// 导航标签配置
export const navTabs = [
    { id: "all", name: "All" },
    { id: "manual", name: "Manual" },
];
