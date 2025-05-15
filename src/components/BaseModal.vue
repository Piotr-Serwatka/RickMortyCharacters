<script setup lang="ts">
import type { Character } from '@/types/Character'
import { ref } from 'vue'
import Tabs from './tabs/Tabs.vue'
import TabButton from './tabs/TabButton.vue'
import BasicInfoTab from './tabs/BasicInfoTab.vue'
import LocationTab from './tabs/LocationTab.vue'
import EpisodesTab from './tabs/EpisodesTab.vue'

const modelValue = defineModel<boolean>()
const expandedModal = ref(false)
const activeTab = ref('basic')

const closeModal = () => {
  modelValue.value = false
  expandedModal.value = false
}

const toggleExpand = () => {
  expandedModal.value = !expandedModal.value
}

defineProps<{
  character: Character
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-overlay" @click="closeModal">
        <div class="modal-container" :class="{ 'expanded': expandedModal }" @click.stop>
          <div class="modal-header">
            <button class="modal-expand" @click="toggleExpand">
              <span class="expand-icon">{{ expandedModal ? '−' : '+' }}</span>
            </button>
            <button class="modal-close" @click="closeModal">
              <span class="close-icon">×</span>
            </button>
          </div>
          <div class="modal-content">
            <div class="character-header">
              <img :src="character.image" :alt="character.name" class="character-avatar" />
              <h2 class="character-name">{{ character.name }}</h2>
            </div>
            <div v-if="!expandedModal" class="character-details">
              <BasicInfoTab :character="character" />
            </div>
            <div v-if="expandedModal" class="expanded-content">
              <Tabs v-model:activeTab="activeTab">
                <template #buttons="{ setActiveTab }">
                  <TabButton 
                    tab="basic" 
                    label="Basic Info" 
                    :activeTab="activeTab"
                    :setActiveTab="setActiveTab"
                    :isDisabled="false"
                  />
                  <TabButton 
                    tab="location" 
                    label="Location (coming soon)" 
                    :activeTab="activeTab"
                    :setActiveTab="setActiveTab"
                    :isDisabled="true"
                  />
                  
                  <TabButton 
                    tab="episodes" 
                    label="Episodes (comming soon)" 
                    :activeTab="activeTab"
                    :setActiveTab="setActiveTab"
                    :isDisabled="true"
                  />
                </template>
                <template v-if="activeTab === 'basic'">
                  <BasicInfoTab :character="character" />
                </template>
                <template v-if="activeTab === 'location'">
                  <LocationTab :character="character" />
                </template>
                <template v-if="activeTab === 'episodes'">
                  <EpisodesTab :character="character" />
                </template>
              </Tabs>
            </div>
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
  height: min(90vh, 600px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s ease;

  &.expanded {
    max-width: 64rem;
    height: min(90vh, 800px);
  }
}

.modal-header {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.5rem;
  z-index: 1;
  @include max-sm {
    .modal-expand {
      display: none;
    }
  
}
}


.modal-content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.character-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
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
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  overflow-y: auto;
}

.modal-close,
.modal-expand {
  width: 32px;
  height: 32px;
  padding: 0;
  color: #6b7280;
  transition: all 0.2s;
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

.close-icon,
.expand-icon {
  display: block;
  font-weight: 300;
}

.expanded-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  justify-content: center;
}

.tab-button {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  color: #6b7280;
  cursor: pointer;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;

  &:hover {
    color: #374151;
  }

  &.active {
    color: #1976d2;
    border-bottom-color: #1976d2;
  }
}

.tab-content {
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
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