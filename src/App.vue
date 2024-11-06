<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { RouterView } from 'vue-router';

import { StoreAction } from '@/store/config';

import { BusStopsFetchStatus } from '@/types';

import NavigationBar from '@/components/NavigationBar/NavigationBar.vue';
import MainHeader from '@/components/MainHeader/MainHeader.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';

const store = useStore();

const status = computed<BusStopsFetchStatus>(() => store.state.status);

const fetchData = () => {
    store.dispatch(StoreAction.FetchBusStops);
};

onBeforeMount(() => {
    fetchData();
});
</script>

<template>
    <div class="app">
        <Transition name="fade" mode="out-in">
            <div v-if="status === BusStopsFetchStatus.FETCHED" class="app-container">
                <MainHeader title="Timetable" class="main-header" />

                <NavigationBar />

                <main class="main-content">
                    <RouterView v-slot="{ Component }">
                        <Transition name="fade" mode="out-in">
                            <component :is="Component" />
                        </Transition>
                    </RouterView>
                </main>
            </div>
            <div v-else-if="status === BusStopsFetchStatus.FETCHING">Loading</div>
            <div v-else-if="status === BusStopsFetchStatus.ERROR" class="error">
                Error
                <BaseButton @click="fetchData()">Fetch again</BaseButton>
            </div>
        </Transition>
    </div>
</template>

<style lang="scss" scoped>
.app {
    padding: 2.5rem 2rem;

    .app-container {
        max-width: 1376px;
        margin: 0 auto;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .main-header {
        margin-bottom: 0.5rem;
    }

    .main-content {
        flex: 1;
        min-height: 0;
    }

    @include desktop {
        height: 100vh;
    }
}
</style>
