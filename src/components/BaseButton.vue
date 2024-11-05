<template>
  <button :class="classes">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export type BUTTON_THEME = 'primary'

const props = withDefaults(defineProps<{
  theme?: BUTTON_THEME
  isActive?: boolean
}>(), {
  theme: 'primary',
  isActive: false
})

const classes = computed(() => {
  return ['base-button', `theme-${props.theme}`, { 'active': props.isActive }]
})
</script>

<style lang="scss" scoped>
.base-button {
  height: 2rem;
  padding: 0 1rem;
  display: inline-flex;
  align-items: center;
  font-size: 0.75rem;
  line-height: 1rem;
  user-select: none;
  border: none;
  border-radius: 0.25rem;
  font-family: inherit;
  
  @include default-transition('background-color, color');

  &:not(:disabled),
  &:not(.disabled) {
    cursor: pointer;
  }

  &.theme-primary {
    color: $color-gray-000;
    background-color: $color-accent;
  }

  &:hover, &.hover {
    &.theme-primary {
      background-color: $color-accent-2;
    }
  }

  &:active, &.active {
    &.theme-primary {
      background-color: $color-accent-3;
    }
  }
}
</style>