import { shallowMount } from '@vue/test-utils';

import MainHeader from './MainHeader.vue';

const EXAMPLE_TITLE = 'EXAMPLE_TITLE';

describe('MainHeader', () => {
    const MainHeaderFactory = (
        props: InstanceType<typeof MainHeader>['$props'] = { title: EXAMPLE_TITLE }
    ) => {
        return shallowMount(MainHeader, {
            props
        });
    };

    it('renders proper html markup', () => {
        const wrapper = MainHeaderFactory();

        expect(wrapper.element).toMatchSnapshot();
    });

    it('shows proper title', () => {
        const wrapper = MainHeaderFactory();

        expect(wrapper.find('.main-header-title').text().trim()).toBe(EXAMPLE_TITLE);
    });
});
