import axios from 'axios';
import { ref, computed } from 'vue';
import type { Character } from '@/types/Character';

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface LocationInfo {
  label: string;
  value: string;
}

export async function fetchLocation(locationURL: string): Promise<Location | null> {
  try {
    const response = await axios.get<Location>(locationURL);
    return response.data;
  } catch (error) {
    console.error('Error fetching location:', error);
    return null;
  }
}

export function useLocationInfo(character: Character) {
  const location = ref<Location | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const locationInfos = computed(() => [
    { label: 'Name', value: character.location.name },
    { label: 'Residents', value: location.value?.residents?.length.toString() || '0' },
    { label: 'Type', value: location.value?.type || 'Unknown' },
    { label: 'Dimension', value: location.value?.dimension || 'Unknown' },
    { label: 'Created', value: location.value?.created ? new Date(location.value.created).toLocaleDateString() : 'Unknown' }
  ]);

  const loadLocationDetails = async () => {
    if (!character.location.url) return;
    
    isLoading.value = true;
    error.value = null;
    
    try {
      location.value = await fetchLocation(character.location.url);
    } catch (err) {
      error.value = 'Failed to load location details';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    locationInfos,
    isLoading,
    error,
    loadLocationDetails
  };
}
