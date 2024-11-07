import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';

import { key } from '@/store';

import StopsPage from '@/pages/StopsPage.vue';
import CardList from '@/components/CardList/CardList.vue';

describe('StopsPage', () => {
    const STOPS = ['stop1', 'stop2', 'stop3'];

    const StopsPageFactory = () => {
        const store = createStore({
            getters: {
                stops: () => STOPS
            }
        });
        return shallowMount(StopsPage, {
            global: {
                provide: {
                    [key as unknown as string]: store
                }
            }
        });
    };

    it('renders proper html markup', () => {
        const wrapper = StopsPageFactory();

        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders correct stops list', () => {
        const wrapper = StopsPageFactory();

        expect(wrapper.findComponent(CardList).props()['items']).toEqual(STOPS);
    });
});
