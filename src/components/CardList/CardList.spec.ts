import { flushPromises, mount, VueWrapper } from '@vue/test-utils';

import CardList from './CardList.vue';
import CardListItem from '../CardListItem/CardListItem.vue';

const EXAMPLE_ITEMS = () => ['firstValue', 'secondValue', 'thirdValue', 'differentName'];
const EXAMPLE_ITEMS_REVERSED = () => ['differentName', 'thirdValue', 'secondValue', 'firstValue'];

const EXAMPLE_USER_INPUT = 'val';
const EXAMPLE_ITEMS_FILTERED = () => ['firstValue', 'secondValue', 'thirdValue'];
const EXAMPLE_ITEMS_FILTERED_REVERSED = () => ['thirdValue', 'secondValue', 'firstValue'];

const EXAMPLE_SUBTITLE = 'EXAMPLE_SUBTITLE';
const NO_ITEMS_FOUND_MESSAGE = 'No items found';

describe('CardList', () => {
    const SearchInputStup = {
        template: '<div search-input-stub />'
    };
    const ArrowBottomIconStub = {
        template: '<svg arrow-bottom-icon-stub />'
    };

    const CardListFactory = (props: Partial<InstanceType<typeof CardList>['$props']> = {}) => {
        return mount(CardList, {
            props: {
                items: EXAMPLE_ITEMS(),
                subtitle: EXAMPLE_SUBTITLE,
                ...props
            },
            global: {
                stubs: {
                    SearchInput: SearchInputStup,
                    ArrowBottomIcon: ArrowBottomIconStub
                }
            }
        });
    };

    it('renders proper html markup with only required props', () => {
        const wrapper = CardListFactory({});

        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders proper html markup with opional props', () => {
        const wrapper = CardListFactory({
            filterable: true,
            reversible: true,
            selectable: true
        });

        expect(wrapper.element).toMatchSnapshot();
    });

    describe('search input', () => {
        it('hide if filterable is false', async () => {
            const wrapper = CardListFactory();

            expect(wrapper.findComponent(SearchInputStup).exists()).toBe(false);

            await wrapper.setProps({ filterable: false });

            expect(wrapper.findComponent(SearchInputStup).exists()).toBe(false);
        });

        it('show if filterable is true', () => {
            const wrapper = CardListFactory({
                filterable: true
            });

            expect(wrapper.findComponent(SearchInputStup).exists()).toBe(true);
        });
    });

    it('list title contains subtitle text', () => {
        const wrapper = CardListFactory({
            reversible: false
        });

        expect(wrapper.find('p.list-title').text()).toBe(EXAMPLE_SUBTITLE);
    });

    describe('reverse button', () => {
        it('hide if reversible is false', async () => {
            const wrapper = CardListFactory();

            expect(wrapper.find('button.list-title').exists()).toBe(false);
            expect(wrapper.find('p.list-title').exists()).toBe(true);

            await wrapper.setProps({ reversible: false });

            expect(wrapper.find('button.list-title').exists()).toBe(false);
            expect(wrapper.find('p.list-title').exists()).toBe(true);
        });

        it('show if reversible is true', () => {
            const wrapper = CardListFactory({
                reversible: true
            });

            expect(wrapper.find('button.list-title').exists()).toBe(true);
            expect(wrapper.find('p.list-title').exists()).toBe(false);
        });

        it('contains subtitle text', () => {
            const wrapper = CardListFactory({
                reversible: true
            });

            expect(wrapper.find('button.list-title').text()).toBe(EXAMPLE_SUBTITLE);
        });

        describe('after click', () => {
            it('should reverse arrow icon', async () => {
                const wrapper = CardListFactory({
                    reversible: true
                });

                const iconComponent = wrapper.findComponent(ArrowBottomIconStub);

                expect(iconComponent.classes()).not.toContain('flip');

                await wrapper.find('button.list-title').trigger('click');

                expect(iconComponent.classes()).toContain('flip');
            });
        });
    });

    describe('list items', () => {
        it('should reverse on reverse button click', async () => {
            const wrapper = CardListFactory({
                reversible: true
            });

            expect(wrapper.findAllComponents(CardListItem).map((item) => item.text())).toEqual(
                EXAMPLE_ITEMS()
            );

            await wrapper.find('button.list-title').trigger('click');

            expect(wrapper.findAllComponents(CardListItem).map((item) => item.text())).toEqual(
                EXAMPLE_ITEMS_REVERSED()
            );
        });

        it('should filter items on user input', async () => {
            const wrapper = CardListFactory({
                filterable: true
            });

            expect(wrapper.findAllComponents(CardListItem).map((item) => item.text())).toEqual(
                EXAMPLE_ITEMS()
            );

            wrapper
                .findComponent(SearchInputStup)
                .vm.$emit('update:model-value', EXAMPLE_USER_INPUT);

            await flushPromises();

            expect(wrapper.findAllComponents(CardListItem).map((item) => item.text())).toEqual(
                EXAMPLE_ITEMS_FILTERED()
            );
        });

        it('show correct items when filtered and reversed', async () => {
            const wrapper = CardListFactory({
                filterable: true,
                reversible: true
            });

            expect(wrapper.findAllComponents(CardListItem).map((item) => item.text())).toEqual(
                EXAMPLE_ITEMS()
            );

            await wrapper.find('button.list-title').trigger('click');

            wrapper
                .findComponent(SearchInputStup)
                .vm.$emit('update:model-value', EXAMPLE_USER_INPUT);

            await flushPromises();

            expect(wrapper.findAllComponents(CardListItem).map((item) => item.text())).toEqual(
                EXAMPLE_ITEMS_FILTERED_REVERSED()
            );
        });
    });

    describe('default message', () => {
        const getList = (wrapper: VueWrapper) => {
            return wrapper.find('ul.list');
        };
        const getMessage = (wrapper: VueWrapper) => {
            return wrapper.find('p.message');
        };

        it('hide if no items are passed', () => {
            const wrapper = CardListFactory({
                items: []
            });

            const messageEl = getMessage(wrapper as VueWrapper);

            expect(getList(wrapper as VueWrapper).exists()).toBe(false);
            expect(messageEl.exists()).toBe(false);
        });

        it('hide if items are passed but no items match user input', async () => {
            const wrapper = CardListFactory({
                filterable: true
            });

            wrapper
                .findComponent(SearchInputStup)
                .vm.$emit('update:model-value', 'not existed value');

            await flushPromises();

            const messageEl = getMessage(wrapper as VueWrapper);

            expect(getList(wrapper as VueWrapper).exists()).toBe(false);
            expect(messageEl.exists()).toBe(true);
            expect(messageEl.text()).toBe(NO_ITEMS_FOUND_MESSAGE);
        });
    });
});
