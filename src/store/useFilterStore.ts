import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filters', () => {
  const name = ref('')
  const gender = ref('')
  const status = ref('')
  const sortOption = ref('')
  const showFiltersInSearch = ref(true)
  const showFiltersInFavorites = ref(true)

  function resetFilters() {
    name.value = ''
    gender.value = ''
    status.value = ''
    sortOption.value = ''
  }

  function toggleFiltersInSearch() {
    showFiltersInSearch.value = !showFiltersInSearch.value
  }

  function toggleFiltersInFavorites() {
    showFiltersInFavorites.value = !showFiltersInFavorites.value
  }

  return {
    name,
    gender,
    status,
    sortOption,
    showFiltersInSearch,
    showFiltersInFavorites,
    resetFilters,
    toggleFiltersInSearch,
    toggleFiltersInFavorites,
  }
}) 