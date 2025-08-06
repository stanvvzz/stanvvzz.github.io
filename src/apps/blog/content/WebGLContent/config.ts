// WebGL内容配置 - 统一管理卡片数据和Markdown文件映射
export interface WebGLArticle {
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
export const webGLArticles: WebGLArticle[] = [
    {
        id: 1,
        title: "WebGL点击绘制点",
        category: ["WebGL"],
        date: "2025-07-22",
        description: "",
        imageClass: "/md/webgl/image/webgl-canvas.png",
        icon: "",
        markdownPath: "/md/webgl/1.md",
    },
    {
        id: 2,
        title: "WebGL绘制渐变三角形",
        category: ["WebGL"],
        date: "2025-07-23",
        description: "",
        imageClass: "/md/webgl/image/triangle.png",
        icon: "",
        markdownPath: "/md/webgl/2.md",
    },
    {
        id: 3,
        title: "WebGL简单旋转",
        category: ["WebGL"],
        date: "2025-07-23",
        description: "",
        imageClass: "/md/webgl/image/webgl-rotation.png",
        icon: "",
        markdownPath: "/md/webgl/3.md",
    },
    {
        id: 4,
        title: "WebGL绘制多线",
        category: ["WebGL"],
        date: "2025-08-05",
        description: "",
        imageClass: "/md/webgl/image/6.png",
        icon: "",
        markdownPath: "/md/webgl/4.md",
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
export const getArticleById = (id: number): WebGLArticle | undefined => {
    return webGLArticles.find((article) => article.id === id);
};
