import { validateBusStop, validateBusStops } from '../validator';

const VALID_OBJECT1 = { line: 101, stop: 'bus stop', order: 1, time: '3:15' };
const VALID_OBJECT2 = { line: 102, stop: 'bus stop 2', order: 2, time: '3:25' };
const VALID_OBJECT3 = { line: 103, stop: 'bus stop 3', order: 3, time: '3:35' };

describe('validator', () => {
    describe('validateBusStop', () => {
        it('correctly validate data', () => {
            // invalid type
            expect(validateBusStop(null)).toBe(false);
            expect(validateBusStop(undefined)).toBe(false);
            expect(validateBusStop({})).toBe(false);
            expect(validateBusStop(10)).toBe(false);
            expect(validateBusStop('string')).toBe(false);

            // missing fields
            expect(validateBusStop({ line: 10 })).toBe(false);
            expect(validateBusStop({ line: 10, stop: 'stop' })).toBe(false);
            expect(validateBusStop({ line: 10, stop: 'stop', order: 10 })).toBe(false);

            // all good
            expect(validateBusStop(VALID_OBJECT1)).toBe(true);

            // invalid prop types
            expect(validateBusStop({ ...VALID_OBJECT1, line: '10' })).toBe(false);
            expect(validateBusStop({ ...VALID_OBJECT1, stop: 10 })).toBe(false);
            expect(validateBusStop({ ...VALID_OBJECT1, order: '10' })).toBe(false);
            expect(validateBusStop({ ...VALID_OBJECT1, order: -10 })).toBe(false);
            expect(validateBusStop({ ...VALID_OBJECT1, time: 10 })).toBe(false);
            expect(validateBusStop({ ...VALID_OBJECT1, time: 'invalid12:35' })).toBe(false);
        });
    });

    describe('validateBusStop', () => {
        it('correctly validate data', () => {
            // invalid type
            expect(validateBusStops(null)).toBe(false);
            expect(validateBusStops(undefined)).toBe(false);
            expect(validateBusStops({})).toBe(false);
            expect(validateBusStops(10)).toBe(false);
            expect(validateBusStops('string')).toBe(false);
            expect(validateBusStops(VALID_OBJECT1)).toBe(false);

            // all good
            expect(validateBusStops([VALID_OBJECT1, VALID_OBJECT2, VALID_OBJECT3])).toBe(true);

            // invalid one of the items
            expect(
                validateBusStops([VALID_OBJECT1, { ...VALID_OBJECT2, line: 'fake' }, VALID_OBJECT3])
            ).toBe(false);
        });
    });
});
