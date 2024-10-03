<script setup lang="ts">
import { ref } from 'vue'
import { useProductStore, type ProductSearch } from '@/stores/productStore'
import Breadcrumbs from '@/components/NavBreadcrumbs.vue'
import InputSort from '@/components/InputSort.vue'
import ProductCard from '@/components/ProductCard.vue'

const productStore = useProductStore()
productStore.getMaterials()
const productSearch = ref<ProductSearch>({
  material: productStore.materials[0],
  sorting: productStore.sortOptions[0],
})
const changeMaterial = (index: number) => {
  productSearch.value.material = productStore.materials[index]
  productStore.getProducts(productSearch.value)
}
const changeSort = (index: number) => {
  productSearch.value.sorting = productStore.sortOptions[index]
  productStore.sortProducts(productSearch.value.sorting.value)
}
productStore.getProducts(productSearch.value)
</script>

<template>
  <div class="catalog">
    <Breadcrumbs class="catalog__breadcrumbs"></Breadcrumbs>
    <h1 class="catalog__title">Комплекты стеллажных систем</h1>

    <div class="catalog__filters">
      <InputSort label="Материал" :options="productStore.materials" @select="(index) => changeMaterial(index)" />
      <InputSort label="Материал" :options="productStore.sortOptions" @select="(index) => changeSort(index)" />
    </div>

    <div class="products">
      <ProductCard v-for="product of productStore.products" v-bind:key="product.id" :product="product"></ProductCard>
    </div>
  </div>
</template>

<style scoped>
.catalog {
  width: calc(12 * 80px + 11 * 48px + 2 * var(--spacing-xl));
  max-width: 100vw;
  margin: auto;
  padding-top: var(--spacing-xl);
  padding-bottom: var(--spacing-bottom);
  padding-inline: var(--spacing-xl);

  .catalog__breadcrumbs {
    margin-bottom: var(--spacing-xl);
  }

  .catalog__title {
    font-family: var(--font-display);
    font-weight: 600;
    margin-bottom: var(--spacing-xl);
  }

  .catalog__filters {
    display: grid;
    grid-template-columns: repeat(auto-fill, 18rem);
    gap: var(--spacing-lg);
  }

  .products {
    padding-top: var(--spacing-grid-row);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(21rem, 1fr));
    justify-content: start;
    column-gap: var(--spacing-grid-column);
    row-gap: var(--spacing-grid-row);
  }
}

@media (max-width: 1260px) {
  .catalog {
    .products {
      grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    }
  }
}

@media (max-width: 680px) {
  .catalog {
    .catalog__filters {
      grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    }
  }
}
</style>
