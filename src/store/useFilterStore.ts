import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filters', () => {
  const name = ref('')
  const gender = ref('')
  const sortOption = ref('')

  function resetFilters() {
    name.value = ''
    gender.value = ''
    sortOption.value = ''
  }

  return {
    name,
    gender,
    sortOption,
    resetFilters,
  }
}) 