<script setup>
import { computed } from 'vue'
import NameField from '@/components/NameField.vue'
import GenderSelect from '@/components/GenderSelect.vue'
import StatusSelect from '@/components/StatusSelect.vue'
import SortSelect from '@/components/SortSelect.vue'
import { useFilterStore } from '@/store/useFilterStore'

const filterStore = useFilterStore()

const hasActiveFilters = computed(() => {
  return filterStore.name || filterStore.gender || filterStore.status || filterStore.sortOption
})
</script>

<template>
  <form class="filters">
    <div class="filters-container">
      <div class="filter-group">
        <NameField />
      </div>
      <div class="filter-group">
        <GenderSelect />
      </div>
      <div class="filter-group">
        <StatusSelect />
      </div>
      <div class="filter-group">
        <SortSelect />
      </div>
    </div>
    <div class="filters-actions">
      <button
        v-if="hasActiveFilters"
        type="button"
        class="clear-filters-button"
        @click="filterStore.resetFilters"
      >
        <span class="clear-icon">×</span>
        Clear
      </button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/_mixins.scss' as *;

.filters {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
}

.filters-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filters-actions {
  position: absolute;
  top: 8px;
  right: 12px;
}

.clear-filters-button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  color: #666;
  font-size: 0.6em;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #f5f5f5;
    border-color: #ccc;
  }

  &:active {
    background: #eee;
  }
}

.clear-icon {
  color: #dc3545;
  font-size: 1.1em;
  font-weight: bold;
  line-height: 1;
}

@include max-lg {
  .filters-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}

@include max-sm {
  .filters {
    padding: 15px;
  }

  .filters-container {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .filters-actions {
    display: none;
  }
}
</style>
