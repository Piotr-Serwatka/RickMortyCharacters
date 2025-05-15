<script setup lang="ts">
import type { Character } from '@/types/Character'
import DetailItem from '../DetailItem.vue'

const props = defineProps<{
  character: Character
}>()

const basicInfo = [
  { label: 'Location', value: props.character.location.name },
  { label: 'Origin', value: props.character.origin.name },
  { label: 'Species', value: props.character.species },
  { label: 'Gender', value: props.character.gender },
  { label: 'Status', value: props.character.status },
  { label: 'Created', value: props.character.created },
  
]
</script>

<template>
  <div class="basic-info">
    <DetailItem 
      v-for="{ label, value } in basicInfo"
      :key="label"
      :label="label"
      :value="value"
    />
  </div>
</template>

<style lang="scss" scoped>
.basic-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style> 