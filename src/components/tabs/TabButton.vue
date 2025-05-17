<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  tab: string
  label: string
  activeTab: string
  setActiveTab: (tab: string) => void
  isDisabled?: boolean
}>()

const isActive = computed(() => props.activeTab === props.tab)

const handleClick = () => {
  props.setActiveTab(props.tab)
}
</script>

<template>
  <button 
    class="tab-button" 
    :class="{ active: isActive }"
    :disabled="isDisabled"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<style lang="scss" scoped>
.tab-button {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  color: #6b7280;
  cursor: pointer;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;

  &:hover {
    color: #374151;
  }

  &.active {
    color: #1976d2;
    border-bottom-color: #1976d2;
  }
}
</style> 