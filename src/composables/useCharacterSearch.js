import { ref, watch } from 'vue'

export function useCharacterSearch(name, gender) {
  const characters = ref([])
  let debounceTimeout = null

  watch([name, gender], async () => {
    clearTimeout(debounceTimeout)

    debounceTimeout = setTimeout(async () => {
      if (!name.value && !gender.value) {
        characters.value = []
        return
      }

      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${name.value}&gender=${gender.value}`
        )
        const data = await response.json()
        characters.value = data.results || []
      } catch (error) {
        console.error('Error fetching characters:', error)
        characters.value = []
      }
    }, 450)
  })

  return characters
}
