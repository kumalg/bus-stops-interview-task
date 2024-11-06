import { flushPromises, shallowMount } from '@vue/test-utils';

import BaseButton from './BaseButton.vue';

const EXAMPLE_NAME = 'EXAMPLE_NAME';

describe('BaseButton', () => {
    const BaseButtonFactory = (
        props: InstanceType<typeof BaseButton>['$props'] = {},
        slotContent: string = EXAMPLE_NAME
    ) => {
        return shallowMount(BaseButton, {
            props,
            slots: {
                default: slotContent
            }
        });
    };

    it('renders proper html markup', () => {
        const wrapper = BaseButtonFactory();

        expect(wrapper.element).toMatchSnapshot();
    });

    it('shows slot text', () => {
        const wrapper = BaseButtonFactory();

        expect(wrapper.text().trim()).toBe(EXAMPLE_NAME);
    });

    it('shows html markup inside', () => {
        const EXAMPLE_HTML = '<span class="test-span">TEST</span>';
        const wrapper = BaseButtonFactory({}, EXAMPLE_HTML);

        expect(wrapper.find('.test-span').exists()).toBe(true);
    });

    it('have theme primary class when no theme prop provided', () => {
        const wrapper = BaseButtonFactory();

        expect(wrapper.classes().includes('theme-primary')).toBe(true);
    });

    it('have theme primary class when theme prop is provided', () => {
        const wrapper = BaseButtonFactory({ theme: 'primary' });

        expect(wrapper.classes().includes('theme-primary')).toBe(true);
    });

    it('have active class when isActive is provided', async () => {
        const wrapper = BaseButtonFactory({ isActive: true });

        expect(wrapper.classes().includes('active')).toBe(true);

        wrapper.setProps({
            isActive: false
        });

        await flushPromises();

        expect(wrapper.classes().includes('active')).toBe(false);
    });
});
