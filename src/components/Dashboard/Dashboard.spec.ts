import { shallowMount } from '@vue/test-utils';

import Dashboard from '@/components/Dashboard/Dashboard.vue';
import MainHeader from '@/components/MainHeader/MainHeader.vue';

describe('Dashboard', () => {
    const DashboardFactory = () => {
        return shallowMount(Dashboard);
    };

    it('renders proper html markup', () => {
        const wrapper = DashboardFactory();

        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders Timetable title', () => {
        const wrapper = DashboardFactory();

        expect(wrapper.findComponent(MainHeader).props()['title']).toBe('Timetable');
    });
});
