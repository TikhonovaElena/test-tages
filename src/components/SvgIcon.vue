<script setup lang="ts">
type Props = {
  name: string
  iconClass?: string
}

defineProps<Props>()
</script>

<template>
  <svg :class="['icon', iconClass]" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 24 24"
    fill="currentColor">
    <use :xlink:href="`#${name}`"></use>
  </svg>
</template>

<style lang="scss" scoped>
.icon {
  width: 24px;
  height: 24px;
  display: inline-block;
}
</style>
