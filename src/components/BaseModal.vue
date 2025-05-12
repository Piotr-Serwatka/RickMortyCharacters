<script setup lang="ts">
import type { Character } from '@/types/Character'
import DetailItem from './DetailItem.vue'

defineProps<{
  modelValue: boolean
  character: Character
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const closeModal = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <button class="modal-close" @click="closeModal">
            <span class="close-icon">×</span>
          </button>
          <div class="modal-content">
            <div class="character-header">
              <img :src="character.image" :alt="character.name" class="character-avatar" />
              <h2 class="character-name">{{ character.name }}</h2>
            </div>
            <div class="character-details">
              <DetailItem 
                label="Location" 
                :value="character.location.name" 
              />
              <DetailItem 
                label="Origin" 
                :value="character.origin.name" 
              />
              <DetailItem 
                label="Species" 
                :value="character.species" 
              />
            </div>
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/_mixins.scss' as *;

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  padding: 1rem;
}

.modal-container {
  background-color: white;
  border-radius: 0.5rem;
  position: relative;
  width: 100%;
  max-width: 32rem;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content {
  padding: 1.5rem;
}

.character-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}

.character-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 3px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.character-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
}

.character-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
}

.modal-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 32px;
  height: 32px;
  padding: 0;
  color: #6b7280;
  transition: color 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  line-height: 1;
  border-radius: 50%;

  &:hover {
    color: #374151;
    background-color: #f3f4f6;
  }
}

.close-icon {
  display: block;
  font-weight: 300;
}

/* Modal transition animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@include max-md {
  .modal-container {
    max-width: 100%;
    margin: 0.5rem;
  }
  
  .modal-content {
    padding: 1rem;
  }

  .character-avatar {
    width: 100px;
    height: 100px;
  }

  .character-name {
    font-size: 1.25rem;
  }
}
</style> 