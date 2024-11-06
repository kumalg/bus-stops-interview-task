import { flushPromises, mount } from '@vue/test-utils';

import BaseCardEmpty from './BaseCardEmpty.vue';

const EXAMPLE_MESSAGE = 'EXAMPLE_MESSAGE';

const EXAMPLE_RECT_HEIGHT = 400;
const EXAMPLE_RECT_WIDTH = 600;

describe('BaseCardEmpty', () => {
    const BaseCardEmptyFactory = (props: InstanceType<typeof BaseCardEmpty>['$props'] = {}) => {
        return mount(BaseCardEmpty, {
            props
        });
    };
    let observe: jest.Mock;
    let unobserve: jest.Mock;
    let disconnect: jest.Mock;

    beforeEach(() => {
        observe = jest.fn();
        unobserve = jest.fn();
        disconnect = jest.fn();

        // globalThis.ResizeObserver = jest.fn().mockImplementation(() => ({
        //     observe,
        //     unobserve,
        //     disconnect
        // }));
        globalThis.ResizeObserver = class MockedResizeObserver {
            constructor(cb: ResizeObserverCallback) {
                setTimeout(() => {
                    cb(
                        [
                            {
                                contentRect: {
                                    height: EXAMPLE_RECT_HEIGHT,
                                    width: EXAMPLE_RECT_WIDTH
                                }
                            }
                        ] as ResizeObserverEntry[],
                        this
                    );
                }, 150);
            }

            observe = observe;
            unobserve = unobserve;
            disconnect = disconnect;
        };
    });

    it('renders proper html markup', () => {
        const wrapper = BaseCardEmptyFactory({ message: EXAMPLE_MESSAGE });

        expect(wrapper.element).toMatchSnapshot();
    });

    describe('ResizeObserver', () => {
        it('observe is called after mount', () => {
            BaseCardEmptyFactory({ message: EXAMPLE_MESSAGE });

            expect(observe).toHaveBeenCalledTimes(1);
        });

        it('disconnect is called after removing component from DOM', async () => {
            const wrapper = mount({
                template: `<div><BaseCardEmpty v-if="showCard" /></div>`,
                components: {
                    BaseCardEmpty
                },
                data() {
                    return {
                        showCard: true
                    };
                }
            });

            expect(disconnect).toHaveBeenCalledTimes(0);

            wrapper.setData({ showCard: false });

            await flushPromises();

            expect(disconnect).toHaveBeenCalledTimes(1);
        });
    });

    it('set proper sizing to svg and rect elements from ResizeObserver', async () => {
        globalThis.ResizeObserver = jest.fn().mockImplementation((cb) => {
            cb([
                {
                    contentRect: {
                        height: EXAMPLE_RECT_HEIGHT,
                        width: EXAMPLE_RECT_WIDTH
                    }
                }
            ] as ResizeObserverEntry[]);

            return {
                observe,
                unobserve,
                disconnect
            };
        });

        const wrapper = BaseCardEmptyFactory({ message: EXAMPLE_MESSAGE });
        const svgElement = wrapper.find('.svg').element as SVGElement;
        const svgRectElement = wrapper.find('.svg-rect').element as SVGRectElement;

        expect(svgElement.getAttribute('height')).toBe((EXAMPLE_RECT_HEIGHT + 2).toString());
        expect(svgElement.getAttribute('width')).toBe((EXAMPLE_RECT_WIDTH + 2).toString());
        expect(svgElement.getAttribute('view-box')).toBe(
            `-2 -2 ${EXAMPLE_RECT_WIDTH + 2} ${EXAMPLE_RECT_HEIGHT + 2}`
        );

        expect(svgRectElement.getAttribute('height')).toBe(EXAMPLE_RECT_HEIGHT.toString());
        expect(svgRectElement.getAttribute('width')).toBe(EXAMPLE_RECT_WIDTH.toString());
    });
});
