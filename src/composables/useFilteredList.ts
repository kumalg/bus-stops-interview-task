import type { Ref } from 'vue';

import { computed } from 'vue';

export type UseFilteredListProps = {
    isReversed: Ref<boolean>;
    filterable: Ref<boolean>;
    userInput: Ref<string>;
    items: Ref<Array<string>>;
};

const normalizeValue = (value: string) => value.toLowerCase().trim();

export const useFilteredList = ({
    isReversed,
    filterable,
    userInput,
    items
}: UseFilteredListProps) => {
    const reversedItems = computed(() => {
        const copy = [...items.value];
        copy.reverse();
        return copy;
    });

    const orderedItems = computed(() => {
        return isReversed.value ? reversedItems.value : items.value;
    });

    const filteredItems = computed(() => {
        if (!filterable.value || !userInput.value) {
            return orderedItems.value;
        }

        return orderedItems.value.filter((item) =>
            normalizeValue(item).includes(normalizeValue(userInput.value))
        );
    });

    return {
        filteredItems
    };
};
