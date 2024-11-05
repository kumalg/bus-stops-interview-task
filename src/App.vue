<script setup lang="ts">
import { ROUTE_PATHS, ROUTE_PAGE_TITLES, ROUTE_KEYS } from '@/router/routes'
</script>

<template>
    <div class="app">
        <header class="main-header">
            <h1 class="main-header-title">Timetable</h1>
        </header>
        <div class="main-container">
            <nav class="navigation-bar">
                <RouterLink
                    v-for="route in ROUTE_KEYS"
                    :key="route"
                    :to="ROUTE_PATHS[route]"
                >
                    {{ ROUTE_PAGE_TITLES[route] }}
                </RouterLink>
            </nav>

            <main class="main-content">
                <RouterView />
            </main>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.app {
    min-height: 100vh;
    padding: 2.5rem 2rem;

    .main-header {
        padding: 0.25rem 0;
        margin-bottom: 1.5rem;
    }

    .main-header-title {
        font-weight: 600;
        font-size: 1.5rem;
        line-height: 2rem;
    }

    .navigation-bar {
        background-color: $color-gray-0;
        padding: 0 1.5rem;
        height: 4rem;
        border-radius: 0.25rem;
    }
}
</style>