<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <nav class="tabs">
      <RouterLink to="/search" class="tab">Character Search</RouterLink>
      <RouterLink to="/favorites" class="tab">Favorites</RouterLink>
    </nav>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.tabs {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.tab {
  text-decoration: none;
  color: #333;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.tab:hover {
  background-color: #f5f5f5;
}

.tab.router-link-active {
  background-color: #e3f2fd;
  color: #1976d2;
}
</style>
