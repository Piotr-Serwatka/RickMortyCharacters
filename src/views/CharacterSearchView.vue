<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Character } from '@/types/Character'
import { fetchCharacters } from '@/composables/useCharacters'
import { useCharacterFilter } from '@/composables/useCharacterFilter'
import { useFavorites } from '@/composables/useFavorites'
import { usePagination } from '@/composables/usePagination'
import Filters from '@/components/Filters.vue'
import Pagination from '@/components/Pagination.vue'
import CharacterCard from '@/components/CharacterCard.vue'

const allCharacters = ref<Character[]>([])
const isLoading = ref(true)
const itemsPerPage = 12

const { isFavorite, toggleFavorite } = useFavorites()

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

const { currentPage, paginatedItems: paginatedCharacters, totalPages, shouldShowPagination } = usePagination(filteredCharacters, itemsPerPage)

const handleToggleFavorite = (character: Character) => {
  toggleFavorite(character)
}
</script>

<template>
  <div class="character-search">
    <h1>Character Search</h1>
    <Filters />

    <div v-if="isLoading" class="loading">
      Loading characters...
    </div>

    <div v-else-if="filteredCharacters.length === 0" class="no-results">
      No characters found matching your criteria.
    </div>

    <template v-else>
      <ul class="character-list">
        <li v-for="character in paginatedCharacters" :key="character.id">
          <CharacterCard
            :character="character"
            :is-favorite="isFavorite(character)"
            @toggle-favorite="handleToggleFavorite"
          />
        </li>
      </ul>

      <Pagination
        v-if="shouldShowPagination"
        v-model:currentPage="currentPage"
        :totalPages="totalPages"
      />
    </template>
  </div>
</template>

<style scoped>
.character-search {
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
