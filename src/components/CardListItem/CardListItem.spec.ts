import { shallowMount } from '@vue/test-utils';

import CardListItem from './CardListItem.vue';

const EXAMPLE_ITEM_1 = 'example item';
const EXAMPLE_ITEM_2 = 'example item 2';

describe('CardListItem', () => {
    const CardListItemFactory = (props: InstanceType<typeof CardListItem>['$props']) => {
        return shallowMount(CardListItem, {
            props
        });
    };

    it('renders proper html markup', () => {
        const wrapper = CardListItemFactory({
            item: EXAMPLE_ITEM_1,
            selectable: true,
            selectedItem: EXAMPLE_ITEM_2
        });

        expect(wrapper.element).toMatchSnapshot();
    });

    it('add selectable class if selectable is true', async () => {
        const wrapper = CardListItemFactory({
            item: EXAMPLE_ITEM_1,
            selectable: false,
            selectedItem: EXAMPLE_ITEM_2
        });

        expect(wrapper.find('div.item').exists()).toBe(true);
        expect(wrapper.find('button.item').exists()).toBe(false);

        await wrapper.setProps({
            selectable: true
        });

        expect(wrapper.find('div.item').exists()).toBe(false);
        expect(wrapper.find('button.item').exists()).toBe(true);
    });

    it('add active class if selectedItem matches item', async () => {
        const wrapper = CardListItemFactory({
            item: EXAMPLE_ITEM_1,
            selectable: false,
            selectedItem: EXAMPLE_ITEM_1
        });

        expect(wrapper.find('.item').classes()).not.toContain('active');

        await wrapper.setProps({
            selectable: true
        });

        expect(wrapper.find('.item').classes()).toContain('active');
    });

    it('triggers event if selectable is true', async () => {
        const wrapper = CardListItemFactory({
            item: EXAMPLE_ITEM_1,
            selectable: false,
            selectedItem: EXAMPLE_ITEM_2
        });

        await wrapper.find('.item').trigger('click');
        expect(wrapper.emitted('select-item')).toBe(undefined);

        await wrapper.setProps({
            selectable: true
        });

        await wrapper.find('.item').trigger('click');
        expect(wrapper.emitted('select-item')?.length).toBe(1);
    });
});
