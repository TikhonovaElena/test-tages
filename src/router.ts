import { createRouter, createWebHistory } from 'vue-router'
import ProductListView from './views/ProductListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ProductList',
      component: ProductListView,
    },
  ],
})


export default router
