import type { BusStop } from '@/types';
import type {
    LineStopsKey,
    LineStopsValue,
    LineStopTimesKey,
    LineStopTimesValue,
    StoreState
} from '@/store/config';

import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { InjectionKey } from 'vue';

import { toSorted, toSortedTimes } from '@/assets/sort';
import { validateBusStops } from '@/assets/validator';

import { StoreAction, StoreMutation } from '@/store/config';

import { BusStopsFetchStatus } from '@/types';

export const key: InjectionKey<Store<StoreState>> = Symbol();

export const store = createStore<StoreState>({
    state: {
        busStops: [],
        status: BusStopsFetchStatus.UNFETCHED,
        lineStops: new Map(),
        lineStopTimes: new Map()
    },
    getters: {
        lines: (state) => toSorted(new Set(state.busStops.map(({ line }) => line))),
        stops: (state) => toSorted(new Set(state.busStops.map(({ stop }) => stop)))
    },
    mutations: {
        [StoreMutation.SetBusStops](state, value: BusStop[]) {
            state.busStops = value;
        },
        [StoreMutation.SetStatus](state, value: BusStopsFetchStatus) {
            state.status = value;
        },
        [StoreMutation.SetLineStops](
            state,
            { line, stops }: { line: LineStopsKey; stops: LineStopsValue }
        ) {
            state.lineStops.set(line, stops);
        },
        [StoreMutation.SetLineStopTimes](
            state,
            { key, times }: { key: LineStopTimesKey; times: LineStopTimesValue }
        ) {
            state.lineStopTimes.set(key, times);
        }
    },
    actions: {
        async [StoreAction.FetchBusStops]({ state, commit }) {
            if (state.status === BusStopsFetchStatus.FETCHING) {
                return;
            }

            commit(StoreMutation.SetStatus, BusStopsFetchStatus.FETCHING);

            try {
                const response = await fetch('http://localhost:3000/stops');

                if (!response.ok) {
                    commit(StoreMutation.SetStatus, BusStopsFetchStatus.ERROR);
                }

                const json = await response.json();

                if (!validateBusStops(json)) {
                    commit(StoreMutation.SetStatus, BusStopsFetchStatus.ERROR);
                } else {
                    commit(StoreMutation.SetBusStops, json);
                    commit(StoreMutation.SetStatus, BusStopsFetchStatus.FETCHED);
                }
            } catch {
                commit(StoreMutation.SetStatus, BusStopsFetchStatus.ERROR);
            }
        },
        [StoreAction.GetLineStops]({ state, commit }, line: number) {
            if (state.lineStops.has(line)) {
                return state.lineStops.get(line);
            }

            const stopFullObjects = state.busStops.filter((busStop) => busStop.line === line);
            stopFullObjects.sort(({ order: aOrder }, { order: bOrder }) => aOrder - bOrder);

            const stops = [...new Set(stopFullObjects.map(({ stop }) => stop))];

            commit(StoreMutation.SetLineStops, { line, stops });

            return stops;
        },
        [StoreAction.GetTimesForLineStop]({ state, commit }, key: LineStopTimesKey) {
            if (state.lineStopTimes.has(key)) {
                return state.lineStopTimes.get(key);
            }

            let times;
            try {
                times = toSortedTimes(
                    new Set(
                        state.busStops
                            .filter(({ line, stop }) => line === key.line && stop === key.stop)
                            .map(({ time }) => time)
                    )
                );
            } catch {
                return [];
            }

            commit(StoreMutation.SetLineStopTimes, { key, times });

            return times;
        }
    }
});

export const useStore = () => {
    return baseUseStore(key);
};
