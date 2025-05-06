<script setup lang="ts">
import type { Character } from '@/types/Character'

const props = defineProps<{
  character: Character
  isFavorite?: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleFavorite', character: Character): void
}>()

const handleToggleFavorite = () => {
  emit('toggleFavorite', props.character)
}
</script>

<template>
  <div class="character-card">
    <button 
      class="favorite-button"
      @click="handleToggleFavorite"
      :class="{ 'is-favorite': isFavorite }"
      :title="isFavorite ? 'Remove from Favorites' : 'Add to Favorites'"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        class="star-icon"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    </button>
    <img :src="character.image" :alt="character.name" class="character-image" />
    <div class="character-info">
      <h3>{{ character.name }}</h3>
      <p>Gender: {{ character.gender }}</p>
      <p>Created: {{ new Date(character.created).toLocaleDateString() }}</p>
    </div>
  </div>
</template>

<style scoped>
.character-card {
  display: flex;
  gap: 15px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: white;
  transition: transform 0.2s;
  position: relative;
}

.character-card:hover {
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

.favorite-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
  z-index: 1;
}

.favorite-button:hover {
  transform: scale(1.1);
}

.favorite-button .star-icon {
  width: 24px;
  height: 24px;
  color: #ccc;
  transition: color 0.2s;
}

.favorite-button.is-favorite .star-icon {
  color: #ffd700;
}

.favorite-button:hover .star-icon {
  color: #ffd700;
}
</style> 