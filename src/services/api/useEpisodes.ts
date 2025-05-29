import { ref } from 'vue'
import axios from 'axios'
import type { Episode } from '@/types/Episode'

export function useEpisodes() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const episodeInfo = ref<Episode | null>(null)

  const fetchEpisode = async (episodeUrl: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await axios.get<Episode>(episodeUrl)
      episodeInfo.value = response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch episode data'
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    episodeInfo,
    fetchEpisode
  }
} 