<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  activeTab: string
}>()

const emit = defineEmits<{
  (e: 'update:activeTab', value: string): void
}>()

const setActiveTab = (tab: string) => {
  emit('update:activeTab', tab)
}
</script>

<template>
  <div class="tabs">
    <div class="tab-buttons">
      <slot name="buttons" :setActiveTab="setActiveTab"></slot>
    </div>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tab-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.tab-content {
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
}
</style> 