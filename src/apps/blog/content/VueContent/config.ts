// Vue内容配置 - 统一管理卡片数据和组件映射
export interface VueArticle {
    id: number;
    title: string;
    category: string;
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
        title: "Vue 3 Composition API 深度解析",
        category: "Tutorial",
        date: "Dec 15, 2024",
        description:
            "深入了解Vue 3 Composition API的核心概念，包括reactive、ref、computed等响应式系统的实现原理。",
        imageClass: "gradient-blue",
        icon: "🔧",
        component: "CompositionApiDetail",
    },
    {
        id: 2,
        title: "Vue Router 4.0 最佳实践",
        category: "Ecosystem",
        date: "Nov 28, 2024",
        description:
            "探索Vue Router 4.0的新特性，包括路由懒加载、动态路由、路由守卫等高级用法。",
        imageClass: "gradient-purple",
        icon: "🛤️",
        component: "VueRouterDetail",
    },
    {
        id: 3,
        title: "Pinia 状态管理完全指南",
        category: "Ecosystem",
        date: "Nov 20, 2024",
        description:
            "Pinia作为Vue 3推荐的状态管理库，提供了更简洁的API和更好的TypeScript支持。",
        imageClass: "gradient-green",
        icon: "🗃️",
        component: "PiniaDetail", // 待创建
    },
    {
        id: 4,
        title: "Vue 3 性能优化技巧",
        category: "Advanced",
        date: "Nov 12, 2024",
        description:
            "掌握Vue 3应用性能优化的各种技巧，包括虚拟列表、懒加载、Tree-shaking等。",
        imageClass: "gradient-orange",
        icon: "⚡",
        component: "PerformanceDetail", // 待创建
    },
    {
        id: 5,
        title: "Vue DevTools 调试指南",
        category: "Tools",
        date: "Oct 30, 2024",
        description:
            "学习如何使用Vue DevTools进行高效调试，包括组件检查、时间旅行调试等功能。",
        imageClass: "gradient-red",
        icon: "🔍",
        component: "DevToolsDetail", // 待创建
    },
    {
        id: 6,
        title: "Vue 3 + TypeScript 项目实战",
        category: "Best Practices",
        date: "Oct 25, 2024",
        description:
            "从零开始构建一个Vue 3 + TypeScript项目，涵盖项目结构、类型定义、最佳实践等。",
        imageClass: "gradient-cyan",
        icon: "🏗️",
        component: "TypeScriptDetail", // 待创建
    },
    {
        id: 7,
        title: "Vue 3 响应式系统原理",
        category: "Advanced",
        date: "Oct 18, 2024",
        description:
            "深入解析Vue 3响应式系统的内部实现，包括Proxy、依赖收集、更新调度等核心机制。",
        imageClass: "gradient-blue",
        icon: "🔄",
        component: "ReactivityDetail", // 待创建
    },
    {
        id: 8,
        title: "Vue 3 自定义指令开发",
        category: "Tutorial",
        date: "Oct 10, 2024",
        description:
            "学习如何开发Vue 3自定义指令，包括生命周期、参数处理、DOM操作等实用技巧。",
        imageClass: "gradient-purple",
        icon: "🎯",
        component: "DirectiveDetail", // 待创建
    },
    {
        id: 9,
        title: "Vite 构建工具深度使用",
        category: "Tools",
        date: "Oct 5, 2024",
        description:
            "掌握Vite构建工具的高级用法，包括插件开发、构建优化、开发服务器配置等。",
        imageClass: "gradient-green",
        icon: "⚙️",
        component: "ViteDetail", // 待创建
    },
    {
        id: 10,
        title: "Vue 3 组件设计模式",
        category: "Best Practices",
        date: "Sep 28, 2024",
        description:
            "探索Vue 3组件设计的最佳实践，包括组件组合、props设计、事件处理等。",
        imageClass: "gradient-orange",
        icon: "🧩",
        component: "ComponentPatternsDetail", // 待创建
    },
    {
        id: 11,
        title: "Vue 3 国际化解决方案",
        category: "Ecosystem",
        date: "Sep 20, 2024",
        description:
            "实现Vue 3应用的国际化，包括vue-i18n配置、多语言切换、本地化最佳实践。",
        imageClass: "gradient-red",
        icon: "🌍",
        component: "I18nDetail", // 待创建
    },
    {
        id: 12,
        title: "Vue 3 动画与过渡效果",
        category: "Tutorial",
        date: "Sep 15, 2024",
        description:
            "学习Vue 3中的动画和过渡效果，包括Transition组件、CSS动画、JS动画等。",
        imageClass: "gradient-cyan",
        icon: "🎬",
        component: "AnimationDetail", // 待创建
    },
    {
        id: 13,
        title: "Vue 3 服务端渲染 (SSR)",
        category: "Advanced",
        date: "Sep 8, 2024",
        description:
            "掌握Vue 3服务端渲染的实现，包括Nuxt.js、性能优化、SEO优化等。",
        imageClass: "gradient-blue",
        icon: "🖥️",
        component: "SSRDetail", // 待创建
    },
    {
        id: 14,
        title: "Vue 3 单元测试实践",
        category: "Best Practices",
        date: "Sep 1, 2024",
        description:
            "学习Vue 3组件的单元测试，包括Vue Test Utils、Jest配置、测试策略等。",
        imageClass: "gradient-purple",
        icon: "🧪",
        component: "TestingDetail", // 待创建
    },
    {
        id: 15,
        title: "Vue 3 微前端架构",
        category: "Advanced",
        date: "Aug 25, 2024",
        description:
            "探索Vue 3在微前端架构中的应用，包括模块联邦、组件共享、状态管理等。",
        imageClass: "gradient-green",
        icon: "🏗️",
        component: "MicrofrontendDetail", // 待创建
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
    { id: "tutorial", name: "Tutorial" },
    { id: "ecosystem", name: "Ecosystem" },
    { id: "practices", name: "Best Practices" },
    { id: "advanced", name: "Advanced" },
    { id: "tools", name: "Tools" },
];
