<template>
  <div class="bus-lines-page">
    <BaseCard class="bus-line-select-card" title="Select Bus Line">
      <ul class="bus-lines-list">
        <li v-for="line in lines" :key="line" @click="selectLine(line)">
          <BaseButton type="button" class="line-button" :is-active="selectedLine === line">{{ line }}</BaseButton>
        </li> 
      </ul> 
    </BaseCard>
    
    <BaseCardEmpty
      v-if="!selectedLine"
      message="Please select the bus line first"
    />
    <CardList
      v-else
      :key="selectedLine"
      :title="`Bus Line: ${selectedLine}`"
      :subtitle="'Bus Stops'"
      :items="selectedLineStops"
      :reversible="true"
      :selectable="true"
      :model-value="selectedLineStop"
      @update:model-value="selectLineStop($event)"
    />

    <BaseCardEmpty
      v-if="!selectedLine || !selectedLineStop"
      :message="!selectedLine ? 'Please select the bus line first' : 'Please select the bus stop first'"
    />
    <CardList
      v-else
      :key="selectedLine"
      :title="`Bus Stop: ${selectedLineStop}`"
      :subtitle="'Time'"
      :items="selectedLineStopTimes"
    />
  </div>
</template>

<script setup lang="ts">
import { computed,  ref } from 'vue';
import { useStore } from 'vuex';

import BaseButton from '@/components/BaseButton.vue';
import BaseCard from '@/components/BaseCard.vue'
import BaseCardEmpty from '@/components/BaseCardEmpty.vue';
import CardList from '@/components/CardList.vue';

const store = useStore()

const lines = computed(() => store.getters.lines)
const selectedLine = ref<null | number>(null)

const selectedLineStops = ref<string[]>([])
const selectedLineStop = ref<null | string>(null)

const selectedLineStopTimes = ref<string[]>([])

const selectLine = async (line: number) => {
  selectedLine.value = line
  selectedLineStop.value = null
  selectedLineStops.value = await store.dispatch('getLineStops', line)
}

const selectLineStop = async (stop: string) => {
  selectedLineStop.value = stop
  selectedLineStopTimes.value = await store.dispatch('getTimesForLineStop', { line: selectedLine.value, stop })
}
</script>

<style lang="scss" scoped>
.bus-lines-page {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto 1fr;
  gap: 1rem;
  height: 100%;

  .bus-line-select-card {
    grid-column: 1 / span 2;
  }

  .bus-lines-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .line-button {
    min-width: 3.375rem;
    text-align: center;
    justify-content: center;
  }
}
</style>