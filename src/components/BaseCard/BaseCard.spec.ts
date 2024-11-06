import { flushPromises, shallowMount } from '@vue/test-utils';

import BaseCard from './BaseCard.vue';

const EXAMPLE_CONTENT = 'EXAMPLE_CONTENT';

describe('BaseCard', () => {
    const BaseCardFactory = (
        props: InstanceType<typeof BaseCard>['$props'] = {},
        slotContent: string = EXAMPLE_CONTENT
    ) => {
        return shallowMount(BaseCard, {
            props,
            slots: {
                default: slotContent
            }
        });
    };

    it('renders proper html markup', () => {
        const wrapper = BaseCardFactory({ title: 'TITLE' });

        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders slot conent inside card-body div', () => {
        const wrapper = BaseCardFactory();

        expect(wrapper.find('.card-body').text().trim()).toBe(EXAMPLE_CONTENT);
    });

    describe('header', () => {
        it('should not be rendered when title is not provided', () => {
            const wrapper = BaseCardFactory();

            expect(wrapper.find('.card-header').exists()).toBe(false);
            expect(wrapper.find('h2').exists()).toBe(false);
        });

        it('should be rendered when title is provided', () => {
            const wrapper = BaseCardFactory({ title: 'TITLE' });

            expect(wrapper.find('.card-header').exists()).toBe(true);
            expect(wrapper.find('h2').exists()).toBe(true);
        });
    });

    describe('no-paddings class', () => {
        it('should exist when withoutPaddings prop is true', () => {
            const wrapper = BaseCardFactory({ withoutPaddings: true });

            expect(wrapper.classes().includes('no-paddings')).toBe(true);
        });

        it('should not exist when withoutPaddings prop is false', async () => {
            const wrapper = BaseCardFactory();

            expect(wrapper.classes().includes('no-paddings')).toBe(false);
        });
    });
});
