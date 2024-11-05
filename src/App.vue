<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue';
import MainHeader from './components/MainHeader.vue';
import { useStore } from 'vuex';
import { onMounted } from 'vue';

const store = useStore()

onMounted(() => {
    store.dispatch('fetchBusStops')
})
</script>

<template>
    <div class="app">
        <div class="app-container">
            <MainHeader title="Timetable" class="main-header" />

            <NavigationBar />

            <main class="main-content">
                <RouterView />
            </main>
        </div>
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
        // margin-top: 1rem;
    }
}
</style>