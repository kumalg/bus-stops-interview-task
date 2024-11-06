import { flushPromises, shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';

import { BusStopsFetchStatus } from '@/types';

import { StoreAction, StoreState } from '@/store/config';
import { key } from '@/store';

import BusLinesPage from '@/pages/BusLinesPage.vue';

const pushMock = jest.fn();

jest.mock('vue-router', () => ({
    useRouter: jest.fn(() => ({
        push: pushMock,
        currentRoute: {
            value: {
                fullPath: '/',
                query: {}
            }
        }
    }))
}));

const BaseCardStub = {
    template: '<div class="base-card-stub"><slot/></div>'
};

const BaseButtonStub = {
    template: '<button class="base-button-stub"><slot/></button>'
};

const BaseCardEmptyStub = {
    template: '<div class="base-card-empty-stub">{{ message }}</div>',
    props: {
        message: String
    }
};

const CardListStub = {
    template: '<div class="card-list-stub" />'
};

describe('BusLinesPage', () => {
    const LINES = [101, 102, 103] as const;
    const LINE_STOPS: { [key in (typeof LINES)[number]]: string[] } = {
        101: ['stop1', 'stop2', 'stop3'],
        102: ['stop4', 'stop5', 'stop6'],
        103: ['stop7', 'stop8', 'stop9']
    };
    const LINE_STOP_TIMES: StoreState['lineStopTimes'] = new Map();
    LINE_STOP_TIMES.set({ line: 101, stop: LINE_STOPS[101][0] }, ['9:10', '9:15', '9:20']);
    LINE_STOP_TIMES.set({ line: 102, stop: LINE_STOPS[102][0] }, ['10:10', '10:15', '10:20']);
    LINE_STOP_TIMES.set({ line: 103, stop: LINE_STOPS[103][0] }, ['11:10', '11:15', '11:20']);

    const BusLinesPageFactory = () => {
        const state: StoreState = {
            busStops: [],
            status: BusStopsFetchStatus.UNFETCHED,
            lineStops: LINE_STOPS,
            lineStopTimes: LINE_STOP_TIMES
        };

        const store = createStore({
            state,
            getters: {
                lines: () => LINES
            },
            actions: {
                [StoreAction.GetLineStops]() {
                    return LINE_STOPS[101];
                },
                [StoreAction.GetTimesForLineStop]() {
                    return LINE_STOP_TIMES.get({ line: 101, stop: LINE_STOPS[101][0] });
                }
            }
        });
        return shallowMount(BusLinesPage, {
            global: {
                provide: {
                    [key as unknown as string]: store
                },
                stubs: {
                    BaseCard: BaseCardStub,
                    BaseButton: BaseButtonStub,
                    BaseCardEmpty: BaseCardEmptyStub,
                    CardList: CardListStub
                }
            }
        });
    };

    it('renders proper html markup', () => {
        const wrapper = BusLinesPageFactory();

        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders proper html markup when line and stop selected', async () => {
        const wrapper = BusLinesPageFactory();

        await wrapper.findAll('.line-button')[0]?.trigger('click');

        wrapper
            .findAllComponents(CardListStub)[0]
            .vm.$emit('update:model-value', LINE_STOPS[101][0]);

        await flushPromises();

        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders correct lines list', () => {
        const wrapper = BusLinesPageFactory();

        const linesElements = wrapper.findAll('.line-button').map((line) => line.text());

        expect(linesElements).toEqual(LINES.map((line) => line.toString()));
    });

    it('renders lines list with empty stops and times if no line selected', () => {
        const wrapper = BusLinesPageFactory();

        expect(wrapper.find('.bus-lines-card').exists()).toBe(true);

        expect(wrapper.find('.bus-stops-empty-card').exists()).toBe(true);
        expect(wrapper.find('.bus-stops-empty-card').text()).toBe(
            'Please select the bus line first'
        );
        expect(wrapper.find('.bus-stops-card').exists()).toBe(false);

        expect(wrapper.find('.bus-times-empty-card').exists()).toBe(true);
        expect(wrapper.find('.bus-times-empty-card').text()).toBe(
            'Please select the bus line first'
        );
        expect(wrapper.find('.bus-times-card').exists()).toBe(false);
    });

    it('renders lines list with stops and empty times if line selected and no stop', async () => {
        const wrapper = BusLinesPageFactory();

        expect(wrapper.find('.bus-lines-card').exists()).toBe(true);

        await wrapper.findAll('.line-button')[0]?.trigger('click');

        expect(wrapper.find('.bus-stops-empty-card').exists()).toBe(false);
        expect(wrapper.find('.bus-stops-card').exists()).toBe(true);

        expect(wrapper.find('.bus-times-empty-card').exists()).toBe(true);
        expect(wrapper.find('.bus-times-empty-card').text()).toBe(
            'Please select the bus stop first'
        );
        expect(wrapper.find('.bus-times-card').exists()).toBe(false);
    });

    it('renders lines list with stops and times if line and stop selected', async () => {
        const wrapper = BusLinesPageFactory();

        expect(wrapper.find('.bus-lines-card').exists()).toBe(true);

        await wrapper.findAll('.line-button')[0]?.trigger('click');

        expect(wrapper.find('.bus-stops-empty-card').exists()).toBe(false);
        expect(wrapper.find('.bus-stops-card').exists()).toBe(true);

        wrapper
            .findAllComponents(CardListStub)[0]
            .vm.$emit('update:model-value', LINE_STOPS[101][0]);

        await flushPromises();

        expect(wrapper.find('.bus-times-empty-card').exists()).toBe(false);
        expect(wrapper.find('.bus-times-card').exists()).toBe(true);
    });
});
