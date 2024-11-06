import type { BusStop, BusStopsFetchStatus } from '@/types';

export enum StoreMutation {
    SetBusStops = 'SET_BUS_STOPS',
    SetStatus = 'SET_STATUS',
    SetLineStops = 'SET_LINE_STOPS',
    SetLineStopTimes = 'SET_LINE_STOP_TIMES'
}

export enum StoreAction {
    FetchBusStops = 'fetchBusStops',
    GetLineStops = 'getLineStops',
    GetTimesForLineStop = 'getTimesForLineStop'
}

export type StoreState = {
    busStops: BusStop[];
    status: BusStopsFetchStatus;
    lineStops: {
        [key in number]: BusStop['stop'][];
    };
    lineStopTimes: Map<{ line: BusStop['line']; stop: BusStop['stop'] }, BusStop['time'][]>;
};
