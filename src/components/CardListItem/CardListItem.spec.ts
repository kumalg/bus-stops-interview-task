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

        const buttonEl = wrapper.find('button.button');

        expect(buttonEl.classes()).not.toContain('selectable');
        expect(buttonEl.attributes()['tabindex']).toBe('-1');

        await wrapper.setProps({
            selectable: true
        });

        expect(buttonEl.classes()).toContain('selectable');
        expect(buttonEl.attributes()['tabindex']).toBe('0');
    });

    it('add active class if selectedItem matches item', async () => {
        const wrapper = CardListItemFactory({
            item: EXAMPLE_ITEM_1,
            selectable: false,
            selectedItem: EXAMPLE_ITEM_1
        });

        const buttonEl = wrapper.find('button.button');

        expect(buttonEl.classes()).not.toContain('active');

        await wrapper.setProps({
            selectable: true
        });

        expect(buttonEl.classes()).toContain('active');
    });

    it('triggers event if selectable is true', async () => {
        const wrapper = CardListItemFactory({
            item: EXAMPLE_ITEM_1,
            selectable: false,
            selectedItem: EXAMPLE_ITEM_2
        });

        const buttonEl = wrapper.find('button.button');
        await buttonEl.trigger('click');

        expect(wrapper.emitted('select-item')).toBe(undefined);

        await wrapper.setProps({
            selectable: true
        });

        await buttonEl.trigger('click');
        expect(wrapper.emitted('select-item')?.length).toBe(1);
    });
});
