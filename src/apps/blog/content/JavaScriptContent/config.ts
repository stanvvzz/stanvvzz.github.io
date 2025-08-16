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
        title: "手写reduce",
        category: ["manual"],
        date: "2025-08-06",
        description: "",
        imageClass: "",
        icon: "",
        markdownPath: "/md/javascript/1.md",
    },
    {
        id: 2,
        title: "手写Promise",
        category: ["manual"],
        date: "2025-08-12",
        description: "",
        imageClass: "",
        icon: "",
        markdownPath: "/md/javascript/2.md",
    },
    {
        id: 3,
        title: "函数参数重载",
        category: ["concepts"],
        date: "2025-08-16",
        description: "",
        imageClass: "",
        icon: "",
        markdownPath: "/md/javascript/3.md",
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

// 导航标签配置
export const navTabs = [
    { id: "all", name: "All" },
    { id: "manual", name: "Manual" },
    { id: "concepts", name: "Concepts" },
];
