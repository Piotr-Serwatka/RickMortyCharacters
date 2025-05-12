<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Character } from '@/types/Character'
import { fetchCharacters } from '@/composables/useCharacters'
import { useCharacterFilter } from '@/composables/useCharacterFilter'
import { useFavorites } from '@/composables/useFavorites'
import { usePagination } from '@/composables/usePagination'
import { useFilterStore } from '@/store/useFilterStore'
import Filters from '@/components/Filters.vue'
import Pagination from '@/components/Pagination.vue'
import CharacterCard from '@/components/CharacterCard.vue'

const allCharacters = ref<Character[]>([])
const isLoading = ref(true)
const itemsPerPage = 12
const filterStore = useFilterStore()

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

const { currentPage, paginatedItems: paginatedFavorites, totalPages, shouldShowPagination } = usePagination(favoriteCharacters, itemsPerPage)

const handleToggleFavorite = (character: Character) => {
  toggleFavorite(character)
}
</script>

<template>
  <div class="favorites">
    <h1 class="title">Favorite Characters</h1>
    
    <div class="filters-container">
      <button class="toggle-filters" @click="filterStore.toggleFiltersInFavorites">
        {{ filterStore.showFiltersInFavorites ? 'Hide filters' : 'Show filters' }}
      </button>

      <Transition name="slide-fade">
        <Filters v-if="filterStore.showFiltersInFavorites" />
      </Transition>
    </div>

    <div v-if="isLoading" class="loading">
      Loading characters...
    </div>

    <div v-else-if="favoriteCharacters.length === 0" class="no-results">
      No favorite characters found matching your criteria.
    </div>

    <template v-else>
      <ul class="character-list">
        <li v-for="character in paginatedFavorites" :key="character.id">
          <CharacterCard
            :character="character"
            :is-favorite="true"
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

<style lang="scss" scoped>
@use '@/assets/styles/_mixins.scss' as *;

@include max-sm {
  .title {
    margin-bottom: 40px;
  }
}
.favorites {
  padding: 20px;
}

.filters-container {
  position: relative;
  margin-bottom: 20px;
}

.toggle-filters {
  position: absolute;
  right: 0;
  top: -32px;
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  color: #666;
  font-size: 0.7em;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 1;
}

.toggle-filters:hover {
  background: #f5f5f5;
  border-color: #ccc;
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

/* Transition styles */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
