import type { Order } from '@/types';

import { TIME_REGEX } from '@/configs/time';

type ComparableItem = string | number | Date;

export const compareItems = (a: ComparableItem, b: ComparableItem, asc = true) => {
    const formattedA = typeof a === 'string' ? a.toLowerCase() : a;
    const formattedB = typeof b === 'string' ? b.toLowerCase() : b;

    if (formattedA > formattedB) {
        return asc ? 1 : -1;
    }
    if (formattedA < formattedB) {
        return asc ? -1 : 1;
    }
    return 0;
};

const timeErrorMessage = (value: string) => `value ${value} is in incorrect format, ex. 21:37`;

export const toSortedTimes = (list: string[] | Set<string>, order: Order = 'asc') => {
    const copy = [...list];
    const asc = order === 'asc';

    copy.sort((a, b) => {
        if (!a.match(TIME_REGEX)) {
            throw new Error(timeErrorMessage(a));
        }
        if (!b.match(TIME_REGEX)) {
            throw new Error(timeErrorMessage(b));
        }

        const aDate = new Date(`1970/01/01 ${a}`);
        const bDate = new Date(`1970/01/01 ${b}`);

        return compareItems(aDate, bDate, asc);
    });

    return copy;
};

export const toSorted = <T extends string | number>(list: T[] | Set<T>, order: Order = 'asc') => {
    const copy = [...list];
    const asc = order === 'asc';

    copy.sort((a, b) => {
        return compareItems(a, b, asc);
    });

    return copy;
};
