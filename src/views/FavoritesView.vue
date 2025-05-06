<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Character } from '@/types/Character'
import { fetchCharacters } from '@/composables/useCharacters'
import { useCharacterFilter } from '@/composables/useCharacterFilter'
import { useFavorites } from '@/composables/useFavorites'
import Filters from '@/components/Filters.vue'
import CharacterCard from '@/components/CharacterCard.vue'

const allCharacters = ref<Character[]>([])
const isLoading = ref(true)

const { isFavorite, toggleFavorite, getFavoriteCharacters } = useFavorites()

onMounted(async () => {
  try {
    const characters = await fetchCharacters()
    allCharacters.value = characters ?? []
  } catch (error) {
    console.error('Error fetching characters:', error)
  } finally {
    isLoading.value = false
  }
})

const { filteredCharacters } = useCharacterFilter(allCharacters)

const favoriteCharacters = computed(() => {
  return getFavoriteCharacters(filteredCharacters.value)
})

const handleToggleFavorite = (character: Character) => {
  toggleFavorite(character)
}
</script>

<template>
  <div class="favorites">
    <h1>Favorite Characters</h1>
    <Filters />

    <div v-if="isLoading" class="loading">
      Loading characters...
    </div>

    <div v-else-if="favoriteCharacters.length === 0" class="no-results">
      No favorite characters found matching your criteria.
    </div>

    <ul v-else class="character-list">
      <li v-for="character in favoriteCharacters" :key="character.id">
        <CharacterCard
          :character="character"
          :is-favorite="true"
          @toggle-favorite="handleToggleFavorite"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.favorites {
  padding: 20px;
}

.loading, .no-results {
  text-align: center;
  padding: 20px;
  color: #666;
}

.character-list {
  list-style: none;
  padding: 0;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.character-list li {
  list-style: none;
}
</style>
