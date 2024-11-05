<template>
    <BaseCard :without-paddings="true">
        <nav class="navigation-bar">
            <RouterLink
                v-for="route in ROUTE_KEYS"
                :key="route"
                :to="ROUTE_PATHS[route]"
                class="navigation-item"
            >
                {{ ROUTE_PAGE_TITLES[route] }}
            </RouterLink>
        </nav>
    </BaseCard>
</template>

<script setup lang="ts">
import { ROUTE_PATHS, ROUTE_PAGE_TITLES, ROUTE_KEYS } from '@/router/routes'

import BaseCard from '@/components/BaseCard.vue'
</script>

<style lang="scss" scoped>
.navigation-bar {
    padding: 0 1.5rem;
    height: 4rem;
    display: flex;

    .navigation-item {
        padding: 0 1.5rem;
        display: flex;
        align-items: center;
        border-bottom: 2px solid transparent;
        text-decoration: none;
        font-size: 0.875rem;
        line-height: 1.5rem;
        color: $color-gray-600;
        transition-property: border-bottom-color, color;
        transition-duration: .2s;
        transition-timing-function: ease;

        &:hover {
            color: $color-gray-700;
        }

        &.router-link-active {
            border-bottom-color: $color-accent;
            color: $color-gray-800;
        }
    }
}
</style>