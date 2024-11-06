import { flushPromises, shallowMount } from '@vue/test-utils';

import SearchInput from './SearchInput.vue';

describe('SearchInput', () => {
    const SearchInputFactory = (
        props: Partial<InstanceType<typeof SearchInput>['$props']> = {}
    ) => {
        return shallowMount(SearchInput, {
            props: {
                modelValue: '',
                ...props
            }
        });
    };

    it('renders proper html markup', () => {
        const wrapper = SearchInputFactory();

        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders native input element', () => {
        const wrapper = SearchInputFactory();

        expect(wrapper.find('input').exists()).toBe(true);
    });

    it('update model on input event inside native input element', async () => {
        const TEST_INPUT = 'test_input';
        const wrapper = SearchInputFactory({ debounce: 0 });
        const inputEl = wrapper.find('input');

        inputEl.setValue(TEST_INPUT);

        await flushPromises();

        expect(wrapper.emitted('update:model-value')?.[0]).toEqual([TEST_INPUT]);
    });

    it('not update model on input event with debounce before debounce defined time', async () => {
        const TEST_INPUT = 'test_input';
        const DEBOUNCE = 250;

        const wrapper = SearchInputFactory({ debounce: DEBOUNCE });
        const inputEl = wrapper.find('input');

        inputEl.setValue(TEST_INPUT);

        await flushPromises();

        expect(wrapper.emitted('update:model-value')).not.toBeDefined();
    });

    it('update model on input event with debounce after debounce defined time', (done) => {
        const TEST_INPUT = 'test_input';
        const DEBOUNCE = 250;

        const wrapper = SearchInputFactory({ debounce: DEBOUNCE });
        const inputEl = wrapper.find('input');

        inputEl.setValue(TEST_INPUT);

        expect(wrapper.emitted('update:model-value')).not.toBeDefined();

        setTimeout(() => {
            expect(wrapper.emitted('update:model-value')?.[0]).toEqual([TEST_INPUT]);
            done();
        }, DEBOUNCE);
    });

    describe('has additional classes', () => {
        it('focused class on focus', async () => {
            const wrapper = SearchInputFactory();
            const inputEl = wrapper.find('input');

            expect(wrapper.classes()).not.toContain('focused');

            await inputEl.trigger('focus');
            expect(wrapper.classes()).toContain('focused');

            await inputEl.trigger('blur');
            expect(wrapper.classes()).not.toContain('focused');
        });

        it('filled class when input has value', async () => {
            const wrapper = SearchInputFactory();
            const inputEl = wrapper.find('input');

            expect(wrapper.classes()).not.toContain('filled');

            await inputEl.setValue('example');
            expect(wrapper.classes()).toContain('filled');

            await inputEl.setValue('');
            expect(wrapper.classes()).not.toContain('filled');
        });
    });

    describe('placeholder', () => {
        it('render default when none provided in prop', () => {
            const wrapper = SearchInputFactory();

            expect(wrapper.find('.placeholder').text()).toBe('Search');
        });

        it('render custom when provided in prop', () => {
            const EXAMPLE_PLACEHOLDER = 'example-placeholder';
            const wrapper = SearchInputFactory({
                modelValue: '',
                placeholder: EXAMPLE_PLACEHOLDER
            });

            expect(wrapper.find('.placeholder').text()).toBe(EXAMPLE_PLACEHOLDER);
        });
    });
});
