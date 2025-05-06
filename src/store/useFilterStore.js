import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filters', () => {
  const name = ref('')
  const gender = ref('')
  const sortOption = ref('')

  // Można dodać też akcje/methods, np. resetowanie
  function resetFilters() {
    name.value = ''
    gender.value = ''
    sortOption.value = ''
  }

  // Eksportuj wszystko co chcesz udostępnić
  return {
    name,
    gender,
    sortOption,
    resetFilters,
  }
})
