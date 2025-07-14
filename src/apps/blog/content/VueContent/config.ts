// Vue内容配置 - 统一管理卡片数据和Markdown文件映射
export interface VueArticle {
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
export const vueArticles: VueArticle[] = [
    {
        id: 1,
        title: "加载子瓦片的性能优化方案",
        category: ["Vue.js", "Worker", "Canvas"],
        date: "Jan 10, 2025",
        description: "在地图软件中，当拉近视角时加载子瓦片的性能优化方案",
        imageClass: "gradient-blue",
        icon: "🚀",
        markdownPath: "/md/vue/1.md",
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
export const getArticleById = (id: number): VueArticle | undefined => {
    return vueArticles.find((article) => article.id === id);
};

// 导航标签配置
export const navTabs = [
    { id: "all", name: "All" },
    { id: "css", name: "CSS" },
    { id: "html", name: "HTML" },
    { id: "canvas", name: "Canvas" },
];
