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

export type LineStopsKey = BusStop['line'];
export type LineStopsValue = BusStop['stop'][];

export type LineStopTimesKey = {
    line: BusStop['line'];
    stop: BusStop['stop'];
};
export type LineStopTimesValue = BusStop['time'][];

export type StoreState = {
    busStops: BusStop[];
    status: BusStopsFetchStatus;
    lineStops: {
        [key in LineStopsKey]: LineStopsValue;
    };
    lineStopTimes: Map<LineStopTimesKey, LineStopTimesValue>;
};
