<script setup lang="ts">
import SvgIcon from './SvgIcon.vue';

type Props = {
  name: string
  count: number
}

defineProps<Props>()
</script>

<template>
  <button class="header-btn" :data-count="count">
    <SvgIcon :name="name" fill="var(--color-icon)" />
  </button>
</template>

<style lang="scss" scoped>
.header-btn {
  width: 2rem;
  height: 2rem;
  background-color: var(--color-white);
  border-radius: 50%;

  &:hover {
    --color-icon: var(--color-attention);
  }

  &::before {
    content: attr(data-count);
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    height: 1rem;
    min-width: 1rem;
    padding-inline: 4px;
    line-height: 1rem;
    border-radius: 50%;
    font-size: var(--fs-xs);
    color: var(--color-white);
    background-color: var(--color-attention);
  }
}
</style>
