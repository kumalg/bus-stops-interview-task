<template>
  <div class="bus-lines-page">
    <BaseCard class="bus-line-select-card" title="Select Bus Line">
      <ul class="bus-lines-list">
        <li v-for="line in lines" :key="line" class="bus-line-list-item" @click="selectLine(line)">
          <BaseButton type="button" :is-active="selectedLine === line">{{ line }}</BaseButton>
        </li> 
      </ul> 
    </BaseCard>
    
    <BaseCard v-if="!selectedLine">
      Please select the bus line first
    </BaseCard>
    <BaseCard v-else :title="`Bus Line: ${selectedLine}`">
      <ul>
        <li v-for="stop in selectedLineStops" :key="stop" @click="selectLineStop(stop)">
          {{ stop }}
        </li>
      </ul>
    </BaseCard>
    
    <BaseCard v-if="!selectedLine">
      Please select the bus line first
    </BaseCard>
    <BaseCard v-else-if="!selectedLineStop">
      Please select the bus stop first
    </BaseCard>
    <BaseCard v-else>
      Times for {{ selectedLineStopTimes }}
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BaseCard from '@/components/BaseCard.vue'
import { computed,  ref } from 'vue';
import { useStore } from 'vuex';

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

const selectLineStop = async(stop: string) => {
  selectedLineStop.value = stop

  selectedLineStopTimes.value = await store.dispatch('getTimesForLineStop', { line: selectedLine.value, stop })
}
</script>

<style lang="scss" scoped>
.bus-lines-page {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

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
}
</style>