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
