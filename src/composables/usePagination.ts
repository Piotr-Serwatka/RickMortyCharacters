import { ref, computed, watch, type ComputedRef, isRef } from 'vue'

export function usePagination<T>(items: T[] | ComputedRef<T[]>, itemsPerPage: number = 12) {
  const currentPage = ref(1)

  const paginatedItems = computed(() => {
    const itemsArray = isRef(items) ? items.value : items
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return itemsArray.slice(start, end)
  })

  const totalPages = computed(() => {
    const itemsArray = isRef(items) ? items.value : items
    return Math.ceil(itemsArray.length / itemsPerPage)
  })

  const shouldShowPagination = computed(() => {
    return totalPages.value > 1
  })

  watch(items, (newItems, oldItems) => {
    const newItemsArray = isRef(newItems) ? newItems.value : newItems
    const oldItemsArray = isRef(oldItems) ? oldItems.value : oldItems
    
    if (newItemsArray.length < oldItemsArray.length) {
      const itemsOnCurrentPage = newItemsArray.length - ((currentPage.value - 1) * itemsPerPage)
      if (itemsOnCurrentPage <= 0 && currentPage.value > 1) {
        currentPage.value = currentPage.value - 1
      }
    }
  })

  return {
    currentPage,
    paginatedItems,
    totalPages,
    shouldShowPagination
  }
} 