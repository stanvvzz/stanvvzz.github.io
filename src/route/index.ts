import {
    createRouter,
    type RouteRecordRaw,
    createWebHashHistory,
} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/earth",
        name: "web-earth",
        component: () => import("@/apps/web-earth/index.vue"),
        children: [
            {
                path: "",
                name: "earth-layout",
                component: () => import("@/apps/web-earth/layout/index.vue"),
            },
        ],
    },
    {
        path: "/",
        name: "blog",
        component: () => import("@/apps/blog/index.vue"),
        children: [
            {
                path: "",
                name: "blog-layout",
                component: () => import("@/apps/blog/layout/index.vue"),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
