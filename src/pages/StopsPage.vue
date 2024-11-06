<template>
    <CardList
        :items="stops"
        :subtitle="'Bus Stops'"
        :filterable="true"
        :reversible="true"
        class="stops-page"
    />
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useStore } from '@/store';

import CardList from '@/components/CardList.vue';

const store = useStore();
const stops = computed(() => store.getters.stops);
</script>

<style lang="scss" scoped>
.stops-page {
    max-height: 100%;
}
</style>
