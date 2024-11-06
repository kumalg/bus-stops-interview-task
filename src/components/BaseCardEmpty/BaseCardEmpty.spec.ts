import { flushPromises, mount } from '@vue/test-utils';

import BaseCardEmpty from './BaseCardEmpty.vue';

const EXAMPLE_MESSAGE = 'EXAMPLE_MESSAGE';

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

        globalThis.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe,
            unobserve,
            disconnect
        }));
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
});
