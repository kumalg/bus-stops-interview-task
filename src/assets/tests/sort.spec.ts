import { compareItems, toSorted, toSortedTimes } from '@/assets/sort';

describe('sort functions', () => {
    describe('compareItems', () => {
        it('works with numbers', () => {
            expect(compareItems(10, 20)).toBe(-1);
            expect(compareItems(20, 10)).toBe(1);
            expect(compareItems(10, 10)).toBe(0);

            expect(compareItems(10, 20, true)).toBe(-1);
            expect(compareItems(20, 10, true)).toBe(1);
            expect(compareItems(10, 10, true)).toBe(0);

            expect(compareItems(10, 20, false)).toBe(1);
            expect(compareItems(20, 10, false)).toBe(-1);
            expect(compareItems(10, 10, false)).toBe(0);
        });

        it('works with strings', () => {
            expect(compareItems('aaa', 'bbb')).toBe(-1);
            expect(compareItems('bbb', 'aaa')).toBe(1);
            expect(compareItems('aaa', 'aaa')).toBe(0);

            expect(compareItems('aaa', 'bbb', true)).toBe(-1);
            expect(compareItems('bbb', 'aaa', true)).toBe(1);
            expect(compareItems('aaa', 'aaa', true)).toBe(0);

            expect(compareItems('aaa', 'bbb', false)).toBe(1);
            expect(compareItems('bbb', 'aaa', false)).toBe(-1);
            expect(compareItems('aaa', 'aaa', false)).toBe(0);
        });

        it('works with dates', () => {
            const smallerDate = () => new Date('1970.01.01');
            const biggerDate = () => new Date('1970.01.02');

            expect(compareItems(smallerDate(), biggerDate())).toBe(-1);
            expect(compareItems(biggerDate(), smallerDate())).toBe(1);
            expect(compareItems(smallerDate(), smallerDate())).toBe(0);

            expect(compareItems(smallerDate(), biggerDate(), true)).toBe(-1);
            expect(compareItems(biggerDate(), smallerDate(), true)).toBe(1);
            expect(compareItems(smallerDate(), smallerDate(), true)).toBe(0);

            expect(compareItems(smallerDate(), biggerDate(), false)).toBe(1);
            expect(compareItems(biggerDate(), smallerDate(), false)).toBe(-1);
            expect(compareItems(smallerDate(), smallerDate(), false)).toBe(0);
        });

        it('is case insensitive on strings', () => {
            expect(compareItems('aaa', 'bbb')).toBe(-1);
            expect(compareItems('AAA', 'bbb')).toBe(-1);
            expect(compareItems('aaa', 'BBB')).toBe(-1);
            expect(compareItems('AAA', 'BBB')).toBe(-1);

            expect(compareItems('bbb', 'aaa')).toBe(1);
            expect(compareItems('BBB', 'aaa')).toBe(1);
            expect(compareItems('bbb', 'AAA')).toBe(1);
            expect(compareItems('BBB', 'AAA')).toBe(1);

            expect(compareItems('aaa', 'aaa')).toBe(0);
            expect(compareItems('aaa', 'AAA')).toBe(0);
            expect(compareItems('AAA', 'aaa')).toBe(0);
            expect(compareItems('AAA', 'AAA')).toBe(0);
        });
    });

    describe('toSorted', () => {
        it('not modify original list', () => {
            const getOriginalOrder = () => [5, 2, 1, 3, 4];
            const validOrder = [1, 2, 3, 4, 5];

            const original = getOriginalOrder();
            const result = toSorted(original);

            expect(original).toEqual(getOriginalOrder());
            expect(result).toEqual(validOrder);
        });

        it('works on numbers', () => {
            expect(toSorted([5, 2, 4, 1, 3])).toEqual([1, 2, 3, 4, 5]);
            expect(toSorted([5, 2, 4, 1, 3], 'asc')).toEqual([1, 2, 3, 4, 5]);
            expect(toSorted([5, 2, 4, 1, 3], 'desc')).toEqual([5, 4, 3, 2, 1]);
        });

        it('works on strings', () => {
            expect(toSorted(['5', '2', '4', '1', '3'])).toEqual(['1', '2', '3', '4', '5']);
            expect(toSorted(['5', '2', '4', '1', '3'], 'asc')).toEqual(['1', '2', '3', '4', '5']);
            expect(toSorted(['5', '2', '4', '1', '3'], 'desc')).toEqual(['5', '4', '3', '2', '1']);
        });
    });

    describe('toSortedTimes', () => {
        it('works on correct data', () => {
            const getArray = () => ['1:15', '8:55', '01:25', '11:45', '4:30'];
            const ordered = ['1:15', '01:25', '4:30', '8:55', '11:45'];
            const orderedDesc = ['11:45', '8:55', '4:30', '01:25', '1:15'];

            expect(toSortedTimes(getArray())).toEqual(ordered);
            expect(toSortedTimes(getArray(), 'asc')).toEqual(ordered);
            expect(toSortedTimes(getArray(), 'desc')).toEqual(orderedDesc);
        });

        it('throw error if data is invalid', () => {
            expect(() => toSortedTimes(['8:55', '1:15', '01:25', '11:45', '4:30'])).not.toThrow();

            expect(() => toSortedTimes(['8:55', 'inval1:15', '01:25', '11:45', '4:30'])).toThrow();
            expect(() => toSortedTimes(['8:55', ':15', '01:25', '11:45', '4:30'])).toThrow();
            expect(() => toSortedTimes(['8:55', 'dw:15', '01:25', '11:45', '4:30'])).toThrow();
            expect(() => toSortedTimes(['8:55', '000:15', '01:25', '11:45', '4:30'])).toThrow();
        });
    });
});
