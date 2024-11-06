export enum BusStopField {
    LINE = 'line',
    STOP = 'stop',
    ORDER = 'order',
    TIME = 'time'
}

export enum BusStopsFetchStatus {
    UNFETCHED = 'UNFETCHED',
    FETCHING = 'FETCHING',
    FETCHED = 'FETCHED',
    ERROR = 'ERROR'
}

export type BusStop = {
    [BusStopField.LINE]: number;
    [BusStopField.STOP]: string;
    [BusStopField.ORDER]: number;
    [BusStopField.TIME]: string;
};

export type Order = 'asc' | 'desc';
