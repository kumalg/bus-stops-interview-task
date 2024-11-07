<template>
    <li class="card-list-item">
        <button
            v-if="selectable"
            class="item selectable"
            tabindex="0"
            type="button"
            :class="{ active: selectable && selectedItem === item }"
            @click="selectable && selectItem()"
        >
            {{ item }}
        </button>
        <div v-else class="item">
            {{ item }}
        </div>
    </li>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (e: 'select-item', value: string): void;
}>();

const props = defineProps<{
    selectable: boolean;
    selectedItem: string | null;
    item: string;
}>();

const selectItem = () => {
    emit('select-item', props.item);
};
</script>

<style lang="scss" scoped>
.card-list-item {
    .item {
        display: flex;
        align-items: center;
        width: 100%;
        height: 3.5rem;
        border: none;
        background-color: transparent;
        text-align: left;
        padding: 0 $card-padding;
        color: $color-gray-800;
        font-family: inherit;

        @include default-transition('color, background-color');

        &.selectable {
            cursor: pointer;
            user-select: none;

            &:hover,
            &.hover {
                background-color: $color-gray-300;
            }

            &:active,
            &.active {
                color: $color-accent;
            }
        }
    }
}
</style>
