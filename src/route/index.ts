import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/earth",
        name: "web-earth",
        component: () => import("@/apps/web-earth/index.vue"),
        children: [
            {
                path: "",
                name: "layout",
                component: () => import("@/apps/web-earth/layout/index.vue"),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
