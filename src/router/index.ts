import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { ROUTE_PATHS } from './routes';

const routes: Array<RouteRecordRaw> = [
    {
        path: ROUTE_PATHS.BUS_LINES,
        component: () => import('@/pages/BusLinesPage.vue')
    },
    {
        path: ROUTE_PATHS.STOPS,
        component: () => import('@/pages/StopsPage.vue')
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
