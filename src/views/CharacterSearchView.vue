<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import type { Character } from '@/types/Character'
import { fetchCharacters } from '@/composables/useCharacters'
import { useCharacterFilter } from '@/composables/useCharacterFilter'
import Filters from '@/components/Filters.vue'
import Pagination from '@/components/Pagination.vue'

const allCharacters = ref<Character[]>([])
const isLoading = ref(true)
const currentPage = ref(1)
const itemsPerPage = 12

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

const paginatedCharacters = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredCharacters.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredCharacters.value.length / itemsPerPage)
})

watch(filteredCharacters, () => {
  currentPage.value = 1
})
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
        <li v-for="character in paginatedCharacters" :key="character.id" class="character-item">
          <img :src="character.image" :alt="character.name" class="character-image" />
          <div class="character-info">
            <h3>{{ character.name }}</h3>
            <p>Gender: {{ character.gender }}</p>
            <p>Created: {{ new Date(character.created).toLocaleDateString() }}</p>
          </div>
        </li>
      </ul>

      <Pagination
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

.character-item {
  display: flex;
  gap: 15px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: white;
  transition: transform 0.2s;
}

.character-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.character-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.character-info {
  flex: 1;
}

.character-info h3 {
  margin: 0 0 8px 0;
  color: #333;
}

.character-info p {
  margin: 4px 0;
  color: #666;
  font-size: 0.9em;
}
</style>
