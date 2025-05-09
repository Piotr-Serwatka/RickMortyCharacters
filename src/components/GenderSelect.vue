<script setup>
import { useFilterStore } from '@/store/useFilterStore.ts'
const filterStore = useFilterStore()
</script>

<template>
  <label class="filter-label">
    Gender
    <select
      v-model="filterStore.gender"
      class="filter-select"
    >
      <option value="" class="filter-option">Any Gender</option>
      <option value="female" class="filter-option">Female</option>
      <option value="male" class="filter-option">Male</option>
      <option value="genderless" class="filter-option">Genderless</option>
      <option value="unknown" class="filter-option">Unknown</option>
    </select>
  </label>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/_mixins.scss';

.filter-label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #333;
  font-weight: 500;
  font-size: 0.9em;
}

.filter-select {
  padding: 10px 12px;
  padding-right: 32px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9em;
  transition: all 0.2s ease;
  background: white;
  color: #333;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
}

.filter-select:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
}

.filter-option {
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  border-radius: 4px;
  margin: 4px;
  transition: all 0.2s ease;
}

.filter-option:hover {
  background: rgba(25, 118, 210, 0.1);
}

.filter-option:checked {
  background: rgba(25, 118, 210, 0.2);
}

@include max-sm {
  .filter-select {
    padding: 8px;
  }

  .filter-option {
    padding: 6px 10px;
    font-size: 0.9em;
  }
}
</style>
