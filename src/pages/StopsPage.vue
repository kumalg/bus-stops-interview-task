<template>
  <div>
    Stops
    <ul>
      <li v-for="stop in stops" :key="stop">{{  stop }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const stops = computed(() => store.getters.stops)
</script>

<style scoped>

</style>