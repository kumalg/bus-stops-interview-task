import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { ROUTE_PAGE_TITLES, ROUTE_PATHS } from './routes';
import { nextTick } from 'vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: ROUTE_PATHS.BUS_LINES,
        component: () => import('@/pages/BusLinesPage.vue'),
        meta: { title: ROUTE_PAGE_TITLES.BUS_LINES }
    },
    {
        path: ROUTE_PATHS.STOPS,
        component: () => import('@/pages/StopsPage.vue'),
        meta: { title: ROUTE_PAGE_TITLES.STOPS }
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

const DEFAULT_TITLE = 'Timetable';
router.afterEach((to) => {
    nextTick(() => {
        document.title =
            'title' in to.meta && typeof to.meta.title === 'string' && to.meta.title
                ? `${DEFAULT_TITLE} | ${to.meta.title}`
                : DEFAULT_TITLE;
    });
});

export default router;
