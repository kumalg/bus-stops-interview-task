<template>
  <BaseCard>
    Stops
    <ul>
      <li v-for="stop in stops" :key="stop">{{  stop }}</li>
    </ul>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/BaseCard.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const stops = computed(() => store.getters.stops)
</script>

<style scoped>

</style>