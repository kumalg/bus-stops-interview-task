import type { BusStop } from '@/types';

import { BusStopField } from '@/types';

import { TIME_REGEX } from '@/configs/time';

const BUS_STOP_FIELDS = Object.values(BusStopField);

const hasRequiredFields = (value: object): value is { [key in BusStopField]: unknown } => {
    const keys = Object.keys(value);
    return BUS_STOP_FIELDS.every((field) => keys.includes(field));
};

export const validateBusStop = (value: unknown): value is BusStop => {
    if (typeof value !== 'object' || !value || !hasRequiredFields(value)) {
        return false;
    }

    if (typeof value.line !== 'number') {
        return false;
    }
    if (typeof value.stop !== 'string') {
        return false;
    }
    if (typeof value.order !== 'number' || value.order < 0) {
        return false;
    }
    if (typeof value.time !== 'string' || !value.time.match(TIME_REGEX)) {
        return false;
    }

    return true;
};

export const validateBusStops = (value: unknown): value is BusStop[] => {
    return !!value && Array.isArray(value) && value.every(validateBusStop);
};
