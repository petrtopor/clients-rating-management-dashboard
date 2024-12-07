<template>
  <div class="sorting-switcher">
    <button
      class="sorting-switcher__button"
      :class="{ active: modelValue === 'clients' }"
      @click="setModel('clients')"
    >
      Clients
    </button>
    <button
      class="sorting-switcher__button"
      :class="{ active: modelValue === 'rating' }"
      @click="setModel('rating')"
    >
      Rating
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// Props and Emits
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    validator: (value) => ['clients', 'rating'].includes(value),
  }
})

const emit = defineEmits(['update:modelValue'])

// Methods
const setModel = (modelValue) => {
  emit('update:modelValue', modelValue)
}
</script>

<style scoped lang="scss">
$height: 32px;
$padding: 4px;
$border-radius: 4px;

.sorting-switcher {
  width: 100%;
  display: flex;
  height: $height;
  background-color: #d4e0ea;
  border-radius: $border-radius;
  padding: $padding;

  &__button {
    height: calc($height - 2 * $padding);
    width: calc($height - 2 * $padding);
    border-radius: $border-radius;
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    cursor: pointer;

    background-color: #d4e0ea;

    &.active {
      background-color: white;
    }
  }
}
</style>
