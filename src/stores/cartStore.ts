import { defineStore } from 'pinia'
import { localStorageKey } from '@/helpers/main-config'
import { ref } from 'vue'

type CartItem = {
  id: string,
  count: number,
}

export const useCartStore = defineStore('cart', () => {
  const cart = ref<CartItem[]>(JSON.parse(localStorage.getItem(localStorageKey.cart) || '[]') as CartItem[])
  const favorites = ref<string[]>(JSON.parse(localStorage.getItem(localStorageKey.favorites) || '[]') as string[])

  const addToCart = (productId: string) => {
    const index = cart.value.findIndex(item => item.id == productId)
    if (index === -1) {
      cart.value.push({ id: productId, count: 1 })
    } else {
      cart.value[index].count++
    }
    localStorage.setItem(localStorageKey.cart, JSON.stringify(cart.value))
  }
  const removeFromCart = (productId: string) => {
    const index = cart.value.findIndex(item => item.id == productId)
    if (index === -1) {
      return
    } else {
      cart.value[index].count--
    }
    localStorage.setItem(localStorageKey.cart, JSON.stringify(cart.value))
  }
  const clearCard = () => {
    cart.value = []
    localStorage.setItem(localStorageKey.cart, JSON.stringify(cart.value))
  }

  const toggleFavorite = (productId: string) => {
    if (favorites.value.includes(productId)) {
      favorites.value = favorites.value.filter(id => id !== productId);
    } else {
      favorites.value.push(productId)
    }
    localStorage.setItem(localStorageKey.favorites, JSON.stringify(favorites.value));
  }
  const clearFavorites = () => {
    favorites.value = []
    localStorage.setItem(localStorageKey.favorites, JSON.stringify(favorites.value))
  }

  return {
    cart,
    favorites,
    addToCart,
    removeFromCart,
    clearCard,
    toggleFavorite,
    clearFavorites,
  }
})
