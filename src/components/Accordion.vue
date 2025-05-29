<script setup lang="ts">
import { ref } from 'vue'
import DetailItem from './DetailItem.vue'
import type { Episode } from '@/types/Episode'

const props = defineProps<{
  data: DataInsideAccordion[]
  title: string;
}>()

interface DataInsideAccordion {
  label: string
  value: string
}

const isOpen = ref(false)
</script>

<template>
  <div class="accordion">
    <button 
      class="accordion-header"
      @click="isOpen = !isOpen"
      :aria-expanded="isOpen"
    >
      <span class="title">{{ title }}</span>
      <svg 
        class="arrow" 
        :class="{ 'is-open': isOpen }"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
    <div 
      v-show="isOpen"
      class="accordion-content"
    >
      <DetailItem v-for="item in data" :key="item.label" :label="item.label" :value="item.value" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.accordion {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 8px;
}

.accordion-header {
  width: 100%;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9fafb;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f3f4f6;
  }

  .title {
    font-weight: 500;
    color: #374151;
  }

  .arrow {
    width: 20px;
    height: 20px;
    transition: transform 0.2s ease;
    color: #6b7280;

    &.is-open {
      transform: rotate(180deg);
    }
  }
}

.accordion-content {
  padding: 16px;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style> 