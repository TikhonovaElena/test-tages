<script setup lang="ts">
const routes = [{
  to: '',
  text: 'Главная',
}, {
  to: '',
  text: 'Системы хранения',
}, {
  to: '',
  text: 'Комплекты стеллажных систем',
}]
</script>

<template>
  <ol class="breadcrumbs">
    <li class="breadcrumbs__item" v-for="item in routes" v-bind:key="item.text">
      <RouterLink class="link" :to="item.to">{{ item.text }}</RouterLink>
      <span class="delimiter">/</span>
    </li>
  </ol>
</template>

<style lang="scss" scoped>
.breadcrumbs {
  color: var(--color-text-secondary);
  display: flex;
  flex-wrap: wrap;

  .breadcrumbs__item {
    .link {

      &:hover,
      &:focus-visible {
        color: var(--color-text);
      }
    }

    .delimiter {
      padding-inline: 1em;
    }

    &:last-of-type {
      .link {
        color: var(--color-text);
      }

      .delimiter {
        display: none;
      }
    }
  }
}
</style>