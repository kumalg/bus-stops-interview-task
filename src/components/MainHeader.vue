<template>
    <header class="main-header">
        <h1 class="main-header-title">{{ title }}</h1>
    </header>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>

<style lang="scss" scoped>
.main-header {
    padding: 0.25rem 0;

    .main-header-title {
        font-weight: 600;
        font-size: 1.5rem;
        line-height: 2rem;
        margin: 0;
    }
}
</style>
