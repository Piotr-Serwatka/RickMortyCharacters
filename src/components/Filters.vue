<script setup>
import NameField from '@/components/NameField.vue'
import GenderSelect from '@/components/GenderSelect.vue'
import SortSelect from '@/components/SortSelect.vue'
</script>

<template>
  <form class="filters">
    <div class="filters-container">
      <div class="filter-group">
        <NameField />
      </div>
      <div class="filter-group">
        <GenderSelect />
      </div>
      <div class="filter-group">
        <SortSelect />
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.filters {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.filters-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

/* Responsive styles */
@media (max-width: 768px) {
  .filters-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .filters {
    padding: 15px;
  }

  .filters-container {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
