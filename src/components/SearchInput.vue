<template>
  <div>
    <input type="text" :value="modelValue" @input="handleInput($event)"/>
  </div>
</template>

<script setup lang="ts">
import { debounce } from '@/assets/debounce';

const emit = defineEmits<{
  (e: 'update:model-value', value: string): void
}>()

const props = defineProps<{
  modelValue: string
}>()

const handleInput = debounce((event: Event) => {
  const el = event.target as HTMLInputElement
  emit('update:model-value', el.value)
}, 250)
</script>

<style scoped>

</style>