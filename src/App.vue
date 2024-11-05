<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { RouterView } from 'vue-router';

import { BusStopsFetchStatus } from '@/store';
import { StoreAction } from '@/store/config';

import NavigationBar from '@/components/NavigationBar.vue';
import MainHeader from '@/components/MainHeader.vue';
import BaseButton from '@/components/BaseButton.vue';

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
        <transition name="fade" mode="out-in">
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
        </transition>
    </div>
</template>

<style lang="scss" scoped>
.app {
    height: 100vh;
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
}
</style>
