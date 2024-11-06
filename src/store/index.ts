import type { BusStop } from '@/types';
import type { StoreState } from '@/store/config';

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
        lineStops: {},
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
            { line, stops }: { line: BusStop['line']; stops: BusStop['stop'][] }
        ) {
            state.lineStops[line] = stops;
        },
        [StoreMutation.SetLineStopTimes](
            state,
            {
                key,
                times
            }: { key: { line: BusStop['line']; stop: BusStop['stop'] }; times: BusStop['time'][] }
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
            if (line in state.lineStops && typeof state.lineStops[line] === 'object') {
                return state.lineStops[line];
            }

            const stopFullObjects = state.busStops.filter((busStop) => busStop.line === line);
            stopFullObjects.sort(({ order: aOrder }, { order: bOrder }) => aOrder - bOrder);

            const stops = [...new Set(stopFullObjects.map(({ stop }) => stop))];

            commit(StoreMutation.SetLineStops, { line, stops });

            return stops;
        },
        [StoreAction.GetTimesForLineStop](
            { state, commit },
            key: { line: BusStop['line']; stop: BusStop['stop'] }
        ) {
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
    },
    modules: {}
});

export const useStore = () => {
    return baseUseStore(key);
};
