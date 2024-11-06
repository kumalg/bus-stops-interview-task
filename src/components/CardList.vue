<template>
    <BaseCard :title="title" :without-paddings="true" class="card-list">
        <div v-if="filterable" class="search-row">
            <SearchInput v-model="userInput" class="search-input" />
        </div>
        <button
            v-if="reversible"
            class="list-title"
            :class="{ 'has-items': filteredItems.length }"
            @click="isReversed = !isReversed"
            :tabindex="reversible ? 0 : -1"
            type="button"
        >
            {{ subtitle }}
            <ArrowBottomIcon class="order-icon" :class="{ flip: isReversed }" />
        </button>
        <p v-else class="list-title">
            {{ subtitle }}
        </p>

        <Transition name="fade" mode="out-in">
            <ul
                v-if="filteredItems.length"
                :key="`items_${filteredItems.length}_${isReversed}`"
                class="list"
            >
                <CardListItem
                    v-for="item in filteredItems"
                    :key="item"
                    :item="item"
                    :selectable="selectable"
                    :selectedItem="modelValue"
                    @select-item="selectItem(item)"
                    class="list-item"
                />
            </ul>
            <p v-else-if="items.length" class="message">No items found</p>
        </Transition>
    </BaseCard>
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue';

import ArrowBottomIcon from '@/icons/ArrowBottomIcon.vue';

import { useFilteredList } from '@/composables/useFilteredList';

import BaseCard from '@/components/BaseCard/BaseCard.vue';
import SearchInput from '@/components/SearchInput/SearchInput.vue';
import CardListItem from '@/components/CardListItem.vue';

const emit = defineEmits<{
    (e: 'update:model-value', item: string): void;
}>();

const props = withDefaults(
    defineProps<{
        items: string[];
        subtitle: string;
        title?: string;
        reversible?: boolean;
        selectable?: boolean;
        filterable?: boolean;
        modelValue?: string | null;
    }>(),
    {
        title: '',
        reversible: false,
        selectable: false,
        filterable: false,
        modelValue: null
    }
);

const userInput = ref('');
const isReversed = ref(false);

const { filteredItems } = useFilteredList({
    isReversed,
    userInput,
    filterable: toRef(props, 'filterable'),
    items: toRef(props, 'items')
});

const selectItem = (item: string) => {
    emit('update:model-value', item);
};
</script>

<style lang="scss" scoped>
.card-list {
    .list-title {
        display: block;
        background-color: transparent;
        border: none;
        width: 100%;
        font-size: 0.75rem;
        line-height: 1rem;
        letter-spacing: 0.025em;
        font-weight: 600;
        display: flex;
        gap: 0.25rem;
        color: $color-gray-800;
        margin: 0;
        padding: $card-padding;
        border-bottom: 1px solid $color-gray-500;

        &:has(.order-icon) {
            cursor: pointer;

            &:hover .order-icon {
                color: $color-gray-800;
            }
        }

        .order-icon {
            color: $color-gray-700;

            @include default-transition('color, transform');

            &.flip {
                transform: rotate(180deg);
            }
        }
    }

    .search-row {
        padding: 0.5rem;

        .search-input {
            width: 18rem;
            max-width: 100%;
        }
    }

    .list {
        overflow: auto;
        list-style: none;
        padding: 0;
        margin: 0;
        min-height: 0;
    }

    .list-item {
        &:not(:last-child) {
            border-bottom: 1px solid $color-gray-400;
        }
    }

    .message {
        font-size: 0.875rem;
        line-height: 1.5rem;
        color: $color-gray-700;
        margin: $card-padding;
        padding: 0;
    }
}
</style>
