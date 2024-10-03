import { defineStore } from "pinia";
import { ref } from "vue";
import productData from '../data/items.json'
import materialData from '../data/materials.json'

enum SortType {
  PriceAscending = 'PriceAscending',
  PriceDescending = 'PriceDescending',
}

type SortOption = {
  id: number
  name: string
  value: SortType
}

type Material = {
  id: number
  name: string
}

export type Product = {
  id: string
  name: string
  code?: string
  price: {
    old_price?: number
    current_price: number
  }
  image: {
    url: string
  }
  material: number
}

export type ProductSearch = {
  material: Material
  sorting: SortOption
}

export const useProductStore = defineStore('productStore', () => {
  const loader = ref(false);
  const products = ref<Product[]>([])
  const materials = ref<Material[]>([])
  const sortOptions: SortOption[] = [
    { id: 1, name: 'Цена по возрастанию', value: SortType.PriceAscending },
    { id: 2, name: 'Цена по убыванию', value: SortType.PriceDescending },
  ];

  const getMaterials = () => {
    materials.value = materialData.map(material => ({ ...material, id: parseInt(material.id) }) as Material)
  }

  const getProducts = (search: ProductSearch) => {
    loader.value = true
    products.value = productData.filter((item) => item.material === search.material!.id) as Product[];
    sortProducts(search.sorting.value)
    loader.value = false;
  }

  const sortProducts = (sorting: SortType) => {
    if (sorting == SortType.PriceAscending) {
      products.value.sort((a: Product, b: Product) => a.price.current_price - b.price.current_price)
    } else {
      products.value.sort((a: Product, b: Product) => b.price.current_price - a.price.current_price)
    }
  }

  return {
    loader,
    sortOptions,
    materials,
    products,
    getMaterials,
    getProducts,
    sortProducts,
  };
});