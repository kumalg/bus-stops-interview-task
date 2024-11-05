<template>
  <BaseCard :title="title" :without-paddings="true" class="card-list">
    <div v-if="filterable" class="search-row">
      <SearchInput v-model="userInput" class="search-input" />
    </div>
    <button
      v-if="reversible"
      class="list-title"
      @click="isReversed = !isReversed"
      :tabindex="reversible ? 0 : -1"
      type="button"
    >
      {{ subtitle }}
      <ArrowBottomIcon
        class="order-icon"
        :class="{ flip: isReversed }"
      />
    </button>
    <p v-else class="list-title">
      {{ subtitle }}
    </p>

    
    <transition name="fade" mode="out-in">
      <ul :key="`items_${filteredItems.length}_${isReversed}`" class="list">
        <li
          v-for="item in filteredItems"
          :key="item"
          class="list-item"
        >
          <button :tabindex="selectable ? 0 : -1" class="list-item-button" :class="{ selectable, active: selectable && modelValue === item }" type="button" @click="selectable && selectItem(item)">
            {{ item }}
          </button>
        </li>
      </ul>
    </transition>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ArrowBottomIcon from '@/icons/ArrowBottomIcon.vue';
import BaseCard from './BaseCard.vue';
import SearchInput from './SearchInput.vue';

const emit = defineEmits<{
  (e: 'update:model-value', item: string): void
}>()

const props = withDefaults(defineProps<{
  items: string[],
  subtitle: string,
  title?: string,
  reversible?: boolean,
  selectable?: boolean,
  filterable?: boolean,
  modelValue?: string | null,
}>(), {
  title: '',
  reversible: false,
  selectable: false,
  modelValue: null
})

const userInput = ref('')
const isReversed = ref(false)

const reversedItem = computed(() => {
  const copy = [...props.items]
  copy.reverse()
  return copy
})

const orderedItems = computed(() => {
  return isReversed.value ? reversedItem.value : props.items
})

const filteredItems = computed(() => {
  if (!props.filterable || !userInput.value) {
    return orderedItems.value
  }

  return orderedItems.value.filter(item => item.toLowerCase().includes(userInput.value.trim().toLowerCase()))
})

const selectItem = (item: string) => {
  emit('update:model-value', item)
}
</script>

<style lang="scss" scoped>
.card-list {
  .list-title {
    display: block;
    background-color: transparent;
    border: none;
    width: 100%;
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: 0.025em;
    font-weight: 600;
    display: flex;
    gap: 0.25rem;
    color: $color-gray-800;
    margin: 0;
    padding: $card-padding;
    border-bottom: 1px solid $color-gray-500;

    &:has(.order-icon) {
      cursor: pointer;

      &:hover .order-icon {
        color: $color-gray-800;
      }
    }

    .order-icon {
      color: $color-gray-700;

      @include default-transition('color, transform');

      &.flip {
        transform: rotate(180deg);
      }
    }
  }

  .search-row {
    padding: 0.5rem;

    .search-input {
      width: 18rem;
      max-width: 100%;
    }
  }

  .list {
    overflow: auto;
    list-style: none;
    padding: 0;
    margin: 0;
    min-height: 0;
  }

  .list-item {
    &:not(:last-child) {
      border-bottom: 1px solid $color-gray-400;
    }
  }

  .list-item-button {
    display: block;
    width: 100%;
    height: 3.5rem;
    border: none;
    background-color: transparent;
    text-align: left;
    padding: 0 $card-padding;
    color: $color-gray-800;
    font-family: inherit;
    user-select: none;

    @include default-transition('color, background-color');

    &.selectable {
      cursor: pointer;

      &:hover, &.hover {
        background-color: $color-gray-300;
      }

      &:active, &.active {
        color: $color-accent;
      }
    }
  }
}
</style>