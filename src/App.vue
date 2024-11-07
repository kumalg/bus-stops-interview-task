<template>
    <div class="app">
        <Transition name="fade" mode="out-in">
            <Dashboard v-if="status === BusStopsFetchStatus.FETCHED" class="dashboard" />
            <div v-else-if="status === BusStopsFetchStatus.FETCHING" class="message-loading">
                Loading data
            </div>
            <div v-else-if="status === BusStopsFetchStatus.ERROR" class="message-error">
                Error occurred while loading data
                <BaseButton @click="fetchData()">Fetch again</BaseButton>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';

import { StoreAction } from '@/store/config';
import { useStore } from '@/store';

import { BusStopsFetchStatus } from '@/types';

import BaseButton from '@/components/BaseButton/BaseButton.vue';
import Dashboard from './components/Dashboard/Dashboard.vue';

const store = useStore();
const status = computed(() => store.state.status);

const fetchData = () => {
    store.dispatch(StoreAction.FetchBusStops);
};

onBeforeMount(() => {
    fetchData();
});
</script>

<style lang="scss" scoped>
.app {
    padding: 2.5rem 2rem;

    .message-loading,
    .message-error {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1rem;
        gap: 1rem;
    }

    @include desktop {
        height: 100vh;
        min-height: 640px;
    }
}
</style>
