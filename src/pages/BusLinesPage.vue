<template>
  <div class="bus-lines-page">
    <BaseCard class="bus-line-select-card" title="Select Bus Line">
      <ul class="bus-lines-list">
        <li v-for="line in lines" :key="line" class="bus-line-list-item" @click="selectLine(line)">
          <BaseButton type="button" :is-active="selectedLine === line">{{ line }}</BaseButton>
        </li> 
      </ul> 
    </BaseCard>
    
    <BaseCardEmpty
      v-if="!selectedLine"
      message="Please select the bus line first"
    />
    <BaseCard v-else :title="`Bus Line: ${selectedLine}`" :without-paddings="true">
      <p class="list-title">
        Bus Stops
        <ArrowBottomIcon
          class="order-icon"
          :class="{flip: selectedLineStopsOrder === 'desc' }"
          @click="toggleStopsOrder()"
        />
      </p>
      <ul class="list">
        <li v-for="stop in orderedStops" :key="stop" @click="selectLineStop(stop)">
          {{ stop }}
        </li>
      </ul>
    </BaseCard>

    <BaseCardEmpty
      v-if="!selectedLine || !selectedLineStop"
      :message="!selectedLine ? 'Please select the bus line first' : 'Please select the bus stop first'"
    />
    <BaseCard v-else :title="`Bus Stop: ${selectedLineStop}`" :without-paddings="true">
      <p class="list-title">Time</p>
      <ul class="list">
        <li v-for="time in selectedLineStopTimes" :key="time">{{ time }}</li>
      </ul>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import type { Order } from '@/types';

import { computed,  ref } from 'vue';
import { useStore } from 'vuex';

import { toSorted } from '@/assets/sort';

import BaseButton from '@/components/BaseButton.vue';
import BaseCard from '@/components/BaseCard.vue'
import BaseCardEmpty from '@/components/BaseCardEmpty.vue';

import ArrowBottomIcon from '@/components/ArrowBottomIcon.vue'

const store = useStore()
const lines = computed(() => store.getters.lines)

const selectedLine = ref<null | number>(null)
const selectedLineStops = ref<string[]>([])
const selectedLineStopsOrder = ref<Order>('asc')
const selectedLineStop = ref<null | string>(null)
const selectedLineStopTimes = ref<string[]>([])

const orderedStops = computed(() => toSorted(selectedLineStops.value, selectedLineStopsOrder.value))

const selectLine = async (line: number) => {
  selectedLine.value = line
  selectedLineStop.value = null
  selectedLineStops.value = await store.dispatch('getLineStops', line)
}

const selectLineStop = async (stop: string) => {
  selectedLineStop.value = stop
  selectedLineStopTimes.value = await store.dispatch('getTimesForLineStop', { line: selectedLine.value, stop })
}

const toggleStopsOrder = () => {
  selectedLineStopsOrder.value = selectedLineStopsOrder.value === 'asc' ? 'desc' : 'asc'
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

  .list-title {
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: 0.025em;
    font-weight: 600;
    display: flex;
    gap: 0.25rem;
    color: $color-gray-4;
    margin: 0;
    padding: $card-padding;
    border-bottom: 1px solid $color-gray-15;
  }

  .order-icon {
    color: $color-gray-3;
    cursor: pointer;

    @include default-transition('color, transform');

    &:hover {
      color: $color-gray-4;
    }

    &.flip {
      transform: rotate(180deg);
    }
  }

  .list {
    overflow: auto;
  }
}
</style>