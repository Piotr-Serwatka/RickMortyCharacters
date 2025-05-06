<script setup>
import { useFilterStore } from '@/store/useFilterStore.js'
const filterStore = useFilterStore()
</script>
<template>
  <label>
    Name
    <input
      type="text"
      placeholder="Rick Sanchez..."
      v-model="filterStore.name"
    />
  </label>
</template>
sa
