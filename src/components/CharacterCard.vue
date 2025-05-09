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

const getStatusColor = (status: string) => {
  return status.toLowerCase() === 'alive' ? '#4caf50' : '#f44336'
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
        <span class="status-dot" :style="{ backgroundColor: getStatusColor(character.status) }"></span>
        <span class="status-text">{{ character.status }}</span>
      <p>Gender: {{ character.gender }}</p>
      <p>Created: {{ new Date(character.created).toLocaleDateString() }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/_mixins.scss';

.character-card {
  display: flex;
  gap: 15px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  background: white;
  transition: all 0.2s ease;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.character-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.character-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.character-info {
  flex: 1;
  min-width: 0; /* Prevents text overflow */
}

.character-info h3 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 1.1em;
  font-weight: 500;
}

.character-info p {
  margin: 4px 0;
  color: #666;
  font-size: 0.9em;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.status-text {
  color: #666;
  font-size: 0.9em;
  text-transform: capitalize;
  margin-left: 5px;
}

.favorite-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 1;
}

.favorite-button:hover {
  transform: scale(1.1);
}

.favorite-button .star-icon {
  width: 24px;
  height: 24px;
  color: #ccc;
  transition: color 0.2s ease;
}

.favorite-button.is-favorite .star-icon {
  color: #1976d2;
}

.favorite-button:hover .star-icon {
  color: #1976d2;
}

@include max-md {
  .character-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
  }

  .character-image {
    width: 100px;
    height: 100px;
  }

  .character-info {
    width: 100%;
  }

  .status-container {
    justify-content: center;
  }

  .favorite-button {
    top: 15px;
    right: 15px;
  }
}

@include max-sm {
  .character-card {
    padding: 15px;
  }

  .character-image {
    width: 80px;
    height: 80px;
  }

  .character-info h3 {
    font-size: 1em;
  }

  .character-info p {
    font-size: 0.85em;
  }
}
</style> 