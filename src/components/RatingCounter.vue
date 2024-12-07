<template>
  <div class="rating-counter">
    <button class="rating-counter__button" @click="ratingChange(-1)">-</button>
    <span class="rating-counter__text">{{ modelValue }}</span>
    <button class="rating-counter__button" @click="ratingChange(1)">+</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// Props and Emits
const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

// Methods
const ratingChange = (amount) => {
  emit('update:modelValue', props.modelValue + amount)
}
</script>

<style scoped lang="scss">
$height: 24px;
$padding: 2px;
$border-radius: 4px;

.rating-counter {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $height;
  background-color: #eeeeee;
  border-radius: $border-radius;
  padding: $padding;

  &__button {
    height: calc($height - 2 * $padding);
    width: calc($height - 2 * $padding);
    border-radius: $border-radius;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  &__text {
    font-weight: 500;
  }
}
</style>
