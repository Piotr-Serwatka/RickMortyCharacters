<script setup lang="ts">
import type { Character } from '@/types/Character'
import DetailItem from '../DetailItem.vue'

defineProps<{
  character: Character
}>()
</script>

<template>
  <div class="location-info">
    <DetailItem 
      label="Name" 
      :value="character.location.name" 
    />
    <DetailItem 
      label="URL" 
      :value="character.location.url" 
    />
  </div>
</template>

<style lang="scss" scoped>
.location-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style> 