<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cartStore';
import { type Product } from '@/stores/productStore'
import SvgIcon from '@/components/SvgIcon.vue'

type Props = {
  product: Product
}

const cartStore = useCartStore()

const props = defineProps<Props>()
const inCart = computed(() => cartStore.cart.findIndex(el => el.id == props.product.id) !== -1)
const inFavorites = computed(() => cartStore.favorites.includes(props.product.id))
</script>

<template>
  <router-link to="" class="product-card">
    <div v-if="product.price.old_price !== null" class="product-card__plate-sale">Скидка</div>
    <img class="product-card__img" :src="product.image.url" :alt="product.name">
    <div class="product-card__info">
      <div class="product-card__code">
        {{ product.code }}
      </div>
      <div class="product-card__name">
        {{ product.name }}
      </div>
      <div class="product-card__price">
        <div v-if="product.price.old_price !== null" class="product-card__price-old">
          {{ Math.ceil(product.price.old_price!) }}₽
        </div>
        <div class="product-card__price-current">
          {{ Math.ceil(product.price.current_price) }}₽
        </div>
      </div>
    </div>
    <div class="product-card__actions">
      <button @click="cartStore.addToCart(product.id)" class="icon-btn btn--cart"
        :class="inCart ? 'btn--cart-added' : ''">
        <SvgIcon :name="inCart ? 'check' : 'cart'" fill="var(--color-icon)" />
      </button>
      <button @click="cartStore.toggleFavorite(product.id)" class="icon-btn btn--favorite"
        :class="inFavorites ? 'btn--favorite-added' : ''">
        <SvgIcon :name="inFavorites ? 'heart-filled' : 'heart'" fill="var(--color-icon)" />
      </button>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.product-card {
  position: relative;
  padding-block: var(--spacing-xs);
  padding-inline: var(--spacing-sm);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);

  .product-card__plate-sale {
    position: absolute;
    top: var(--spacing-xs);
    left: 0;
    z-index: 1;
    padding-block: var(--spacing-xxs);
    padding-inline: var(--spacing-md);
    line-height: 1rem;
    background-color: var(--color-attention);
    color: var(--color-white);
    font-size: var(--fs-sm);
    font-family: var(--font-display);
  }

  .product-card__img {
    object-fit: contain;
    width: 15rem;
    height: 15rem;
  }

  .product-card__info {
    width: 100%;

    .product-card__code {
      font-size: var(--fs-xxs);
      margin-bottom: var(--spacing-xxs);
    }

    .product-card__name {
      line-height: 140%;
      font-weight: 500;
    }

    .product-card__price {
      margin-top: var(--spacing-xs);
      height: 1.25rem;
      display: flex;
      gap: var(--spacing-xs);

      .product-card__price-old {
        color: var(--color-text-secondary);
        text-decoration: line-through;
      }
    }
  }

  .product-card__actions {
    position: absolute;
    right: var(--spacing-sm);
    bottom: var(--spacing-xxs);
    display: flex;
    gap: var(--spacing-sm);

    .icon-btn {
      width: 2.25rem;
      height: 2.25rem;
      background-position: center;
      background-repeat: no-repeat;
    }

    .btn--cart {
      --color-icon: var(--color-black);

      &:hover {
        --color-icon: var(--color-success);
      }

      &.btn--cart-added {
        --color-icon: var(--color-success);
      }
    }

    .btn--favorite {
      --color-icon: var(--color-black);

      &:hover {
        --color-icon: var(--color-attention);
      }

      &.btn--favorite-added {
        --color-icon: var(--color-attention);
      }
    }

  }

  &:hover {
    border-color: var(--color-border-hover);

    .product-card__img {
      scale: 1.02;
    }
  }
}
</style>