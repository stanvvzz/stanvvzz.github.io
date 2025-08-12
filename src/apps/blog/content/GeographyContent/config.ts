// WebGL内容配置 - 统一管理卡片数据和Markdown文件映射
export interface GeographyArticle {
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
export const geographyArticle: GeographyArticle[] = [
    {
        id: 1,
        title: "WFS服务",
        category: ["server"],
        date: "2025-07-22",
        description: "",
        imageClass: "",
        icon: "",
        markdownPath: "/md/geography/md/1.md",
    },
];

// 动态加载Markdown内容的工厂函数
export const loadMarkdownContent = async (
    markdownPath: string
): Promise<string> => {
    try {
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
export const getArticleById = (id: number): GeographyArticle | undefined => {
    return geographyArticle.find((article) => article.id === id);
};
