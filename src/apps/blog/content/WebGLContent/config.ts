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
        title: "WebGL 基础：从着色器开始",
        category: ["WebGL", "Shader", "Graphics"],
        date: "Jan 13, 2025",
        description: "深入理解WebGL着色器编程，掌握GPU渲染原理",
        imageClass: "gradient-cyan",
        icon: "🎮",
        markdownPath: "/md/webgl/1.md",
    },
    {
        id: 2,
        title: "WebGL 矩阵变换与坐标系统",
        category: ["WebGL", "Matrix", "Transform"],
        date: "Jan 12, 2025",
        description: "理解WebGL中的矩阵运算和3D坐标变换",
        imageClass: "gradient-indigo",
        icon: "📐",
        markdownPath: "/md/webgl/2.md",
    },
    {
        id: 3,
        title: "WebGL 纹理映射技术",
        category: ["WebGL", "Texture", "Mapping"],
        date: "Jan 11, 2025",
        description: "掌握WebGL纹理贴图的加载、应用和优化技巧",
        imageClass: "gradient-teal",
        icon: "🖼️",
        markdownPath: "/md/webgl/3.md",
    },
    {
        id: 4,
        title: "WebGL 光照模型实现",
        category: ["WebGL", "Lighting", "Rendering"],
        date: "Jan 10, 2025",
        description: "实现各种光照模型，创建逼真的3D渲染效果",
        imageClass: "gradient-lime",
        icon: "💡",
        markdownPath: "/md/webgl/4.md",
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
export const getArticleById = (id: number): WebGLArticle | undefined => {
    return webGLArticles.find((article) => article.id === id);
};
