// C++内容配置 - 统一管理卡片数据和Markdown文件映射
export interface CppArticle {
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
export const cppArticles: CppArticle[] = [
    {
        id: 1,
        title: "C++11/14/17 现代特性指南",
        category: ["C++", "Modern", "STL"],
        date: "Jan 14, 2025",
        description: "掌握现代C++的核心特性，提升代码质量和性能",
        imageClass: "gradient-slate",
        icon: "⚡",
        markdownPath: "/md/cpp/1.md",
    },
    {
        id: 2,
        title: "C++ 内存管理与智能指针",
        category: ["C++", "Memory", "Smart Pointer"],
        date: "Jan 13, 2025",
        description: "深入理解C++内存管理机制和智能指针的使用",
        imageClass: "gradient-zinc",
        icon: "🧠",
        markdownPath: "/md/cpp/2.md",
    },
    {
        id: 3,
        title: "C++ 模板编程进阶",
        category: ["C++", "Template", "Metaprogramming"],
        date: "Jan 12, 2025",
        description: "探索C++模板的高级用法和元编程技术",
        imageClass: "gradient-stone",
        icon: "🔧",
        markdownPath: "/md/cpp/3.md",
    },
    {
        id: 4,
        title: "C++ 并发编程与多线程",
        category: ["C++", "Concurrency", "Threading"],
        date: "Jan 11, 2025",
        description: "掌握C++并发编程，实现高效的多线程应用",
        imageClass: "gradient-gray",
        icon: "🔀",
        markdownPath: "/md/cpp/4.md",
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
export const getArticleById = (id: number): CppArticle | undefined => {
    return cppArticles.find((article) => article.id === id);
};
