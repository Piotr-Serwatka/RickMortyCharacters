<script setup lang="ts">
import type { Character } from '@/types/Character'
import { ref } from 'vue'
import { useEpisodes } from '@/services/api/useEpisodes'
import Accordion from '@/components/Accordion.vue'

const props = defineProps<{
  character: Character
}>()

const episodeCache = ref<Map<string, any>>(new Map())
const loadingEpisodes = ref<Set<string>>(new Set())
const { fetchEpisode, error, episodeInfo } = useEpisodes()

const getEpisodeNumber = (url: string) => {
  return url.split('/').pop();
}

const handleGetInfo = async (url: string) => {
  if (episodeCache.value.has(url)) return

  loadingEpisodes.value.add(url)
  await fetchEpisode(url)
  if (episodeInfo.value) {
    episodeCache.value.set(url, episodeInfo.value)
  }
  loadingEpisodes.value.delete(url)
}

const getDataForAccordion = (episodeUrl: string) => {
  const episode = episodeCache.value.get(episodeUrl)
  if (episode) {
    return [
      { label: "Air Date", value: new Date(episode.air_date).toLocaleDateString() },
      { label: "Episode", value: episode.episode },
      { label: "Characters", value: `${episode.characters.length} characters` },
      { label: "Created", value: new Date(episode.created).toLocaleString() }
    ]
  }
}
</script>

<template>
  <div class="episodes-info">
    <div v-for="episodeUrl in character.episode" :key="episodeUrl" class="episode-item">
      <div class="episode-header">
        <span class="episode-number">Episode {{ getEpisodeNumber(episodeUrl) }}</span>
        <button v-if="!episodeCache.has(episodeUrl)" class="get-info-button" @click="handleGetInfo(episodeUrl)"
          :disabled="loadingEpisodes.has(episodeUrl) || episodeCache.has(episodeUrl)">
          {{ loadingEpisodes.has(episodeUrl) ? 'Loading...' : 'Get info' }}
        </button>
      </div>

      <Accordion v-if="episodeCache.has(episodeUrl)" :data="getDataForAccordion(episodeUrl) || []" :title="episodeCache.get(episodeUrl).name" />
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.episodes-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.episode-item {
  display: flex;
  flex-direction: column;
  padding: 12px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.episode-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.episode-number {
  font-weight: 500;
  color: #374151;
}

.get-info-button {
  padding: 6px 12px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
}

.error-message {
  padding: 12px;
  background-color: #fee2e2;
  color: #dc2626;
  border-radius: 4px;
  font-size: 0.875rem;
}
</style>