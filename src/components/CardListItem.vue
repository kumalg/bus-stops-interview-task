<template>
    <li class="card-list-item">
        <button
            :tabindex="selectable ? 0 : -1"
            class="button"
            :class="{ selectable, active: selectable && selectedItem === item }"
            type="button"
            @click="selectable && selectItem()"
        >
            {{ item }}
        </button>
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
    .button {
        display: block;
        width: 100%;
        height: 3.5rem;
        border: none;
        background-color: transparent;
        text-align: left;
        padding: 0 $card-padding;
        color: $color-gray-800;
        font-family: inherit;
        user-select: none;

        @include default-transition('color, background-color');

        &.selectable {
            cursor: pointer;

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
