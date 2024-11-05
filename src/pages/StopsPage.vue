<template>
  <BaseCard>
    Stops
    <ul>
      <li v-for="stop in stops" :key="stop">{{  stop }}</li>
    </ul>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

import BaseCard from '@/components/BaseCard.vue';

const store = useStore()
const stops = computed(() => store.getters.stops)
</script>

<style scoped>

</style>