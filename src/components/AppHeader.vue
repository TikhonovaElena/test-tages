<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import HeaderButton from './HeaderButton.vue'

const cartStore = useCartStore()
const inCartCount = computed(() => cartStore.cart.reduce((acc, el) => acc + el.count, 0))
const inFavoritesCount = computed(() => cartStore.favorites.length)
</script>

<template>
  <div class="header">
    <HeaderButton @click="cartStore.clearCard" v-if="inCartCount" class="header__btn" name="cart" :count="inCartCount"
      title="Очистить корзину" />
    <HeaderButton @click="cartStore.clearFavorites" v-if="inFavoritesCount" class="header__btn" name="heart"
      :count="inFavoritesCount" title="Удалить избранное" />
  </div>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);

  .header__btn {
    position: relative;
  }
}
</style>
