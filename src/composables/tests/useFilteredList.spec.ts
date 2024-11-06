import { ref } from 'vue';

import { useFilteredList } from '@/composables/useFilteredList';

const ITEMS = ['item1', 'item2', 'item3', 'utem4'];
const ITEMS_REVERSED = ['utem4', 'item3', 'item2', 'item1'];
const ITEMS_FILTERED = ['item1', 'item2', 'item3'];
const ITEMS_FILTERED_REVERSED = ['item3', 'item2', 'item1'];
const USER_INPUT = 'item';

describe('useFilteredList', () => {
    it('', () => {
        const isReversed = ref(false);
        const filterable = ref(false);
        const userInput = ref('');
        const items = ref(ITEMS);

        const { filteredItems } = useFilteredList({
            isReversed,
            filterable,
            userInput,
            items
        });

        expect(filteredItems.value).toEqual(ITEMS);

        isReversed.value = true;
        expect(filteredItems.value).toEqual(ITEMS_REVERSED);

        isReversed.value = false;
        userInput.value = USER_INPUT;
        expect(filteredItems.value).toEqual(ITEMS);

        filterable.value = true;
        expect(filteredItems.value).toEqual(ITEMS_FILTERED);

        isReversed.value = true;
        expect(filteredItems.value).toEqual(ITEMS_FILTERED_REVERSED);
    });
});
