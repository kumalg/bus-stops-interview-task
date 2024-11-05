<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue';
import MainHeader from './components/MainHeader.vue';
</script>

<template>
    <div class="app">
        <div class="app-container">
            <MainHeader title="Timetable" />

            <div class="main-container">
                <NavigationBar />

                <main class="main-content">
                    <RouterView />
                </main>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.app {
    min-height: 100vh;
    padding: 2.5rem 2rem;

    .app-container {
        max-width: 1400px;
        margin: 0 auto;
    }

    .main-container {
        margin-top: 1.5rem;
    }

    .main-content {
        margin-top: 1rem;
    }
}
</style>