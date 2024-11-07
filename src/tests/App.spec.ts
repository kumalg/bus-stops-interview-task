import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';

import { BusStopsFetchStatus } from '@/types';

import { StoreAction, StoreState } from '@/store/config';
import { key } from '@/store';

import App from '@/App.vue';

describe('App', () => {
    const fetchBusStopsMock = jest.fn();

    const AppFactory = ({
        status = BusStopsFetchStatus.UNFETCHED
    }: {
        status?: BusStopsFetchStatus;
    } = {}) => {
        const state: StoreState = {
            busStops: [],
            status,
            lineStops: new Map(),
            lineStopTimes: new Map()
        };

        const store = createStore({
            state,
            actions: {
                [StoreAction.FetchBusStops]: fetchBusStopsMock
            }
        });

        return shallowMount(App, {
            global: {
                provide: {
                    [key as unknown as string]: store
                }
            }
        });
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders proper html markup', () => {
        const wrapper = AppFactory({
            status: BusStopsFetchStatus.FETCHED
        });

        expect(wrapper.element).toMatchSnapshot();
    });

    it('fetch data function has been called', () => {
        AppFactory();

        expect(fetchBusStopsMock).toHaveBeenCalledTimes(1);
    });

    it('should render app container if status is fetched', () => {
        const wrapper = AppFactory({
            status: BusStopsFetchStatus.FETCHED
        });

        expect(wrapper.find('.dashboard').exists()).toBe(true);
        expect(wrapper.find('.message-loading').exists()).toBe(false);
        expect(wrapper.find('.message-error').exists()).toBe(false);
    });

    it('should render loading message if status is fetching', () => {
        const wrapper = AppFactory({
            status: BusStopsFetchStatus.FETCHING
        });

        expect(wrapper.find('.dashboard').exists()).toBe(false);
        expect(wrapper.find('.message-loading').exists()).toBe(true);
        expect(wrapper.find('.message-error').exists()).toBe(false);
    });

    it('should render error message if status is error', () => {
        const wrapper = AppFactory({
            status: BusStopsFetchStatus.ERROR
        });

        expect(wrapper.find('.dashboard').exists()).toBe(false);
        expect(wrapper.find('.message-loading').exists()).toBe(false);
        expect(wrapper.find('.message-error').exists()).toBe(true);
    });

    it('should render nothing if status is unfetched', () => {
        const wrapper = AppFactory({
            status: BusStopsFetchStatus.UNFETCHED
        });

        expect(wrapper.find('.dashboard').exists()).toBe(false);
        expect(wrapper.find('.message-loading').exists()).toBe(false);
        expect(wrapper.find('.message-error').exists()).toBe(false);
    });
});
