import { ref, watch } from 'vue'
import type { Character } from '@/types/Character'

const FAVORITES_KEY = 'rick-and-morty-favorites'
const favorites = ref<number[]>([])

const loadFavorites = () => {
  const stored = localStorage.getItem(FAVORITES_KEY)
  if (stored) {
    favorites.value = JSON.parse(stored)
  }
}

watch(favorites, (newFavorites) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
}, { deep: true })

loadFavorites()

export const useFavorites = () => {
  const toggleFavorite = (character: Character) => {
    const index = favorites.value.indexOf(character.id)
    if (index === -1) {
      favorites.value.push(character.id)
    } else {
      favorites.value.splice(index, 1)
    }
  }

  const isFavorite = (character: Character) => {
    return favorites.value.includes(character.id)
  }

  const getFavoriteCharacters = (characters: Character[]) => {
    return characters.filter(character => isFavorite(character))
  }

  return {
    toggleFavorite,
    isFavorite,
    getFavoriteCharacters
  }
} 