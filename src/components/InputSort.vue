<script setup lang="ts">
import { ref } from 'vue'

type InputOption = {
  id: number
  name: string
  value?: any
}

type Props = {
  options: InputOption[]
  label: string
}
const currentOptionIndex = ref<number>(0)

const emit = defineEmits(['select'])

const dropdownValue = ref<HTMLButtonElement | null>(null)
const listDisplayed = ref(false)

const toggleList = () => {
  listDisplayed.value = !listDisplayed.value
  const clickOutside = (e: Event) => {
    if (e.target == dropdownValue.value) return
    listDisplayed.value = false
    document.removeEventListener('click', clickOutside)
  }
  if (listDisplayed.value) {
    document.addEventListener('click', clickOutside)
  }
}
const selectOption = (optionIndex: number) => {
  currentOptionIndex.value = optionIndex
  emit('select', optionIndex)
  listDisplayed.value = false
}

defineProps<Props>()
</script>

<template>
  <div class="dropdown">
    <div class="label">
      {{ label }}
    </div>
    <button ref="dropdownValue" @click="toggleList" class="dropdown__value" :class="listDisplayed ? 'opened' : ''">
      {{ options[currentOptionIndex].name }}
    </button>
    <ul v-if="listDisplayed" ref="dropfownList" class="dropdown__list">
      <button v-for="(option, index) in options" :key="option.id" v-show="index != currentOptionIndex"
        class="dropdown__list__option" @click="selectOption(index)">
        {{ option.name }}
      </button>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  font-size: var(--fs-sm);
  position: relative;

  .label {
    font-size: var(--fs-xs);
    color: var(--color-text-tertiary);
    padding-bottom: var(--spacing-xs);
    padding-left: var(--spacing-md);
  }

  .dropdown__value {
    display: block;
    width: 100%;
    background-color: var(--color-secondary);
    text-align: left;
    line-height: 1.25rem;
    padding-block: var(--spacing-sm);
    padding-left: var(--spacing-md);
    padding-right: calc(var(--spacing-md) * 2 + 1.5rem);

    &::after {
      content: '';
      width: 1.5rem;
      height: 1.5rem;
      position: absolute;
      right: var(--spacing-md);
      background-image: url('/src/assets/icons/arrow.svg');
      background-position: center;
      background-repeat: no-repeat;
    }

    &:hover,
    &:focus-visible {
      background-color: var(--color-secondary-hover);
    }

    &.opened {
      &::after {
        transform: scaleY(-100%);
      }
    }
  }

  .dropdown__list {
    position: absolute;
    z-index: 10;
    width: 100%;
    left: 0;
    right: 0;
    background-color: var(--color-secondary);
    line-height: 1.25rem;

    .dropdown__list__option {
      display: block;
      width: 100%;
      text-align: left;
      padding-inline: var(--spacing-md);
      padding-block: var(--spacing-sm);

      &:hover,
      &:focus-visible {
        background-color: var(--color-secondary-hover);
      }
    }
  }
}
</style>