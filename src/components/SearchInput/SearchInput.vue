<template>
    <div class="search-input" :class="additionalClasses">
        <label class="labelled-container">
            <span class="placeholder">{{ placeholder }}</span>
            <input
                class="input"
                type="text"
                :value="internalValue"
                @input="handleInput($event)"
                @focus="setFocus(true)"
                @blur="setFocus(false)"
            />
            <SearchIcon class="search-icon" />
        </label>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { debounce } from '@/assets/debounce';

import SearchIcon from '@/icons/SearchIcon.vue';

const emit = defineEmits<{
    (e: 'update:model-value', value: string): void;
}>();

const props = withDefaults(
    defineProps<{
        modelValue: string;
        placeholder?: string;
        debounce?: number;
    }>(),
    {
        placeholder: 'Search',
        debounce: 250
    }
);

const focused = ref(false);
const internalValue = ref(props.modelValue);

const additionalClasses = computed(() => ({
    focused: focused.value,
    filled: !!internalValue.value
}));

const emitModelUpdate = debounce((value: string) => {
    emit('update:model-value', value);
}, props.debounce);

const handleInput = (event: Event) => {
    const el = event.target as HTMLInputElement;
    const value = el.value.trim();
    internalValue.value = value;
    emitModelUpdate(value);
};

const setFocus = (value: boolean) => {
    focused.value = value;
};
</script>

<style lang="scss" scoped>
.search-input {
    .labelled-container {
        position: relative;
        display: block;
    }

    .placeholder,
    .search-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        user-select: none;
        pointer-events: none;
    }

    .placeholder {
        left: 0.75rem;
        color: $color-gray-700;
        background-color: $color-gray-000;
        padding: 0 0.25rem;

        @include default-transition('font-size, top');
    }

    .search-icon {
        right: 1rem;
        color: $color-gray-600;
        visibility: visible;

        @include default-transition('visibility, opacity');
    }

    .input {
        border: 1px solid $color-gray-500;
        border-radius: 0.25rem;
        height: 2.5rem;
        padding: 0 2.5rem 0 1rem;
        display: inline-flex;
        font-family: inherit;
        color: $color-gray-900;
        background-color: $color-gray-000;
        width: 100%;

        @include default-transition('border-color');

        &:hover {
            outline: none;
            border-color: $color-gray-600;
        }

        &:focus {
            outline: none;
            border-color: $color-accent;
        }
    }

    .placeholder,
    .input {
        font-size: 0.75rem;
        line-height: 1rem;
    }

    &.focused,
    &.filled {
        .placeholder {
            top: 0;
            font-size: 0.625rem;
        }

        .search-icon {
            opacity: 0;
            visibility: hidden;
        }

        .input {
            padding-right: 1rem;
        }
    }
}
</style>
