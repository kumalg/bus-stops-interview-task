export enum ROUTE_KEY {
    BUS_LINES = 'BUS_LINES',
    STOPS = 'STOPS'
}

export const ROUTE_PATHS: { [key in ROUTE_KEY]: string } = {
    [ROUTE_KEY.BUS_LINES]: '/',
    [ROUTE_KEY.STOPS]: '/stops'
};

export const ROUTE_PAGE_TITLES: { [key in ROUTE_KEY]: string } = {
    [ROUTE_KEY.BUS_LINES]: 'Bus Lines',
    [ROUTE_KEY.STOPS]: 'Stops'
};

export const ROUTE_KEYS = Object.values(ROUTE_KEY);
