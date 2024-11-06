import { shallowMount } from '@vue/test-utils';

import MainHeader from './MainHeader.vue';

const EXAMPLE_TITLE = 'EXAMPLE_TITLE';

describe('MainHeader', () => {
    const MainHeaderFactory = (props: InstanceType<typeof MainHeader>['$props']) => {
        return shallowMount(MainHeader, {
            props
        });
    };

    it('renders proper html markup', () => {
        const wrapper = MainHeaderFactory({ title: EXAMPLE_TITLE });

        expect(wrapper.element).toMatchSnapshot();
    });

    it('shows proper title', () => {
        const wrapper = MainHeaderFactory({ title: EXAMPLE_TITLE });

        expect(wrapper.find('.main-header-title').text().trim()).toBe(EXAMPLE_TITLE);
    });
});
