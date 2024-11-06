<template>
    <div class="card" :class="{ 'no-paddings': withoutPaddings }">
        <div v-if="title" class="card-header">
            <h2>{{ title }}</h2>
        </div>
        <div class="card-body">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        withoutPaddings?: boolean;
        title?: string;
    }>(),
    {
        withoutPaddings: false,
        title: ''
    }
);
</script>

<style lang="scss" scoped>
.card {
    background-color: $color-gray-000;
    border-radius: 0.25rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .card-header {
        padding: $card-padding $card-padding 0.5rem $card-padding;
    }

    .card-body {
        min-height: 0;
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    &:not(.no-paddings) {
        .card-body {
            padding: $card-padding;
        }
    }
}
</style>
