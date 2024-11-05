<template>
  <div class="bus-lines-page">
    <BaseCard class="bus-line-select-card" title="Select Bus Line">
      <ul class="bus-lines-list">
        <li class="bus-line-list-item">
          <BaseButton type="button">128</BaseButton>
        </li>
        <li class="bus-line-list-item">
          <BaseButton type="button">128</BaseButton>
        </li>
        <li class="bus-line-list-item">
          <BaseButton type="button">128</BaseButton>
        </li>     
      </ul> 
    </BaseCard>
    <BaseCard>
      Bus Lines
    </BaseCard>
    <BaseCard>
      Bus Lines
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BaseCard from '@/components/BaseCard.vue'
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
  }
}
</style>