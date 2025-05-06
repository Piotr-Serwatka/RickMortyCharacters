<script setup>
import { useFilterStore } from '@/store/useFilterStore.js'
const filterStore = useFilterStore()
</script>
<template>
  <label>
    Sort by
    <select
      class="border h-7 mt-1"
      v-model="filterStore.sortOption"
    >
      <option value="">Initial</option>
      <option value="name">Name</option>
      <option value="created">Created Date</option>
    </select>
  </label>
</template>
