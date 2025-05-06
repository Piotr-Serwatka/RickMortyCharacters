<script setup>
import { useFilterStore } from '@/store/useFilterStore.js'
const filterStore = useFilterStore()
</script>
<template>
  <label>
    Gender
    <select
      v-model="filterStore.gender"
    >
      <option value="">Any Gender</option>
      <option value="female">Female</option>
      <option value="male">Male</option>
      <option value="genderless">Genderless</option>
      <option value="unknown">Unknown</option>
    </select>
  </label>
</template>
