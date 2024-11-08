<template>
    <div ref="cardEl" class="base-card-empty-container">
        <BaseCard class="base-card-empty">
            <svg
                class="svg"
                :width="svgSize.width"
                :height="svgSize.height"
                :view-box="`-2 -2 ${svgSize.width} ${svgSize.height}`"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    :width="cardSize.width"
                    :height="cardSize.height"
                    class="svg-rect"
                    x="1"
                    y="1"
                    rx="4"
                    ry="4"
                    fill="transparent"
                    stroke-width="2px"
                    stroke-dasharray="25 30"
                    stroke-linecap="round"
                />
            </svg>
            <Transition name="fade" mode="out-in">
                <p v-if="message" class="message" :key="message">{{ message }}</p>
            </Transition>
        </BaseCard>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

import BaseCard from '@/components/BaseCard/BaseCard.vue';

withDefaults(
    defineProps<{
        message?: string;
    }>(),
    {
        message: ''
    }
);

const cardEl = ref<HTMLDivElement | null>(null);
const cardSize = ref<{ width: number; height: number }>({ width: 0, height: 0 });

const svgSize = computed(() => ({
    width: Math.ceil(cardSize.value.width + 2),
    height: Math.ceil(cardSize.value.height + 2)
}));

const resizeObserver = new ResizeObserver(([entry]) => {
    const { width, height } = entry.contentRect;
    cardSize.value = { width, height };
});

onMounted(() => {
    if (cardEl.value) {
        resizeObserver.observe(cardEl.value);
    }
});

onBeforeUnmount(() => {
    resizeObserver.disconnect();
});
</script>

<style lang="scss" scoped>
.base-card-empty-container {
    display: flex;
}

.base-card-empty {
    flex: 1;
    position: relative;
    overflow: initial;

    .svg {
        position: absolute;
        top: -1px;
        left: -1px;
        user-select: none;
        pointer-events: none;
    }

    .svg-rect {
        stroke: $color-gray-600;
    }

    .message {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-size: 0.875rem;
        line-height: 1.5rem;
        color: $color-gray-700;
        text-align: center;
        margin: 0;
        padding: 0;
    }
}
</style>
