<template>
  <CardList
    :items="stops"
    :subtitle="'Bus Stops'"
    :filterable="true"
    :reversible="true"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

import CardList from '@/components/CardList.vue';

const store = useStore()
const stops = computed(() => store.getters.stops)
</script>

<style scoped>

</style>