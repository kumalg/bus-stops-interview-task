<template>
  <div class="card" :class="{ dotted, 'no-paddings': withoutPaddings }">
    <div v-if="title" class="card-header">
      <h2>{{ title }}</h2>
    </div>
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  dotted?: boolean;
  withoutPaddings?: boolean,
  title?: string
}>(), {
  dotted: false,
  withoutPaddings: false,
  title: ''
})
</script>

<style lang="scss" scoped>
.card {
  background-color: $color-gray-000;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &.dotted {
    border: 2px solid red;
  }

  .card-header {
    padding: $card-padding $card-padding 0.5rem $card-padding;
  }

  .card-body {
    min-height: 0;
    display: flex;
    flex-direction: column;
  }

  &:not(.no-paddings) {
    .card-body {
      padding: $card-padding;
      flex: 1;
    }
  }
}
</style>
