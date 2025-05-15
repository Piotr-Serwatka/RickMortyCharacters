<script setup lang="ts">
import type { Character } from '@/types/Character'

defineProps<{
  character: Character
}>()
</script>

<template>
  <div class="episodes-info">
  </div>
</template>

<style lang="scss" scoped>
.episodes-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style> 