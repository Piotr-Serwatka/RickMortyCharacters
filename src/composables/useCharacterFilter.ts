import { computed, type Ref } from 'vue'
import type { Character } from '@/types/Character'
import { useFilterStore } from '@/store/useFilterStore'

export function useCharacterFilter(characters: Ref<Character[]>) {
  const filterStore = useFilterStore()

  const filteredCharacters = computed(() => {
    let result = [...characters.value]

    if (filterStore.name) {
      const searchTerm = filterStore.name.toLowerCase()
      result = result.filter(character =>
        character.name.toLowerCase().includes(searchTerm)
      )
    }

    if (filterStore.gender) {
      result = result.filter(character =>
        character.gender.toLowerCase() === filterStore.gender.toLowerCase()
      )
    }

    if (filterStore.status) {
      result = result.filter(character =>
        character.status.toLowerCase() === filterStore.status.toLowerCase()
      )
    }

    if (filterStore.sortOption) {
      result.sort((a, b) => {
        switch (filterStore.sortOption) {
          case 'name':
            return a.name.localeCompare(b.name)
          case 'created':
            return new Date(a.created).getTime() - new Date(b.created).getTime()
          default:
            return 0
        }
      })
    }

    return result
  })

  return {
    filteredCharacters
  }
}
