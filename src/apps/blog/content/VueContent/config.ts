// Vue内容配置 - 统一管理卡片数据和组件映射
export interface VueArticle {
    id: number;
    title: string;
    category: Array<string>;
    date: string;
    description: string;
    imageClass: string;
    icon: string;
    component?: string; // 对应的详细内容组件名
}

// 卡片数据配置
export const vueArticles: VueArticle[] = [
    {
        id: 1,
        title: "基于滚动的Logo动画切换",
        category: ["Vue.js", "CSS", "HTML"],
        date: "Jan 10, 2025",
        description: "",
        imageClass: "gradient-blue",
        icon: "🎯",
        component: "Article1",
    },
];

// 动态导入组件的工厂函数
export const loadArticleComponent = async (componentName: string) => {
    try {
        const component = await import(`./articles/${componentName}/index.vue`);
        return component.default;
    } catch (error) {
        console.warn(`Failed to load component: ${componentName}`, error);
        // 返回默认的错误组件或占位符
        return null;
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
];
