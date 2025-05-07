import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filters', () => {
  const name = ref('')
  const gender = ref('')
  const status = ref('')
  const sortOption = ref('')

  function resetFilters() {
    name.value = ''
    gender.value = ''
    status.value = ''
    sortOption.value = ''
  }

  return {
    name,
    gender,
    status,
    sortOption,
    resetFilters,
  }
}) 