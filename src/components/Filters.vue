<script setup>
import NameField from '@/components/NameField.vue'
import GenderSelect from '@/components/GenderSelect.vue'
import SortSelect from '@/components/SortSelect.vue'
</script>

<template>
  <form>
    <NameField />
    <GenderSelect />
    <SortSelect />
  </form>
</template>

<style lang="scss">
form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  label {
    margin-bottom: 10px;
  }
}
</style>
