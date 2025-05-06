<script setup>
import { useFilterStore } from '@/store/useFilterStore.ts'
const filterStore = useFilterStore()
</script>

<template>
  <label class="filter-label">
    Name
    <input
      type="text"
      placeholder="Rick Sanchez..."
      v-model="filterStore.name"
      class="filter-input"
    />
  </label>
</template>

<style scoped>
.filter-label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #333;
  font-weight: 500;
  font-size: 0.9em;
}

.filter-input {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9em;
  transition: all 0.2s ease;
  background: white;
  color: #333;
}

.filter-input:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
}

.filter-input::placeholder {
  color: #999;
}

@media (max-width: 480px) {
  .filter-input {
    padding: 12px;
  }
}
</style>
