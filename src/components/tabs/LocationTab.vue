<script setup lang="ts">
import type { Character } from '@/types/Character'
import { onMounted } from 'vue'
import DetailItem from '../DetailItem.vue'
import { useLocationInfo } from '@/services/api/useLocations'

const props = defineProps<{
  character: Character
}>()

const { locationInfos, isLoading, error, loadLocationDetails } = useLocationInfo(props.character)

onMounted(() => {
  loadLocationDetails()
})
</script>

<template>
  <div class="location-info">
    <div v-if="isLoading" class="loading">
      Loading location details...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <template v-else>
      <DetailItem 
        v-for="{ label, value } in locationInfos"
        :key="label"
        :label="label"
        :value="value"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.location-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.loading,
.error {
  padding: 1rem;
  text-align: center;
  color: #6b7280;
}

.error {
  color: #ef4444;
}
</style> 