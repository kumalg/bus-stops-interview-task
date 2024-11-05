<template>
  <BaseCard class="empty-card">
    <transition name="fade" mode="out-in">
      <p v-if="message" class="message" :key="message">{{ message }}</p>
    </transition>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from './BaseCard.vue';

withDefaults(
  defineProps<{
    message?: string
  }>(),
  {
    message: ''
  }
)
</script>

<style lang="scss" scoped>
.empty-card {

  .message {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 0.875rem;
    line-height: 1.5rem;
    color: $color-gray-700;
    text-align: center;
    margin: 0;
    padding: 0;
  }
}
</style>