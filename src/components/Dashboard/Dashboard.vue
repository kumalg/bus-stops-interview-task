<template>
    <div class="dashboard">
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
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

import MainHeader from '@/components//MainHeader/MainHeader.vue';
import NavigationBar from '@/components/NavigationBar/NavigationBar.vue';
</script>

<style lang="scss" scoped>
.dashboard {
    max-width: 1376px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .main-header {
        margin-bottom: 0.5rem;
    }

    .main-content {
        flex: 1;
        min-height: 0;
    }
}
</style>
