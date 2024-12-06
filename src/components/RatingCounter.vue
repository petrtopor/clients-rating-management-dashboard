<template>
  <div class="rating-counter">
    <button class="rating-counter__button" @click="ratingChange(-1)">-</button>
    <span class="rating-counter__text">{{ rating }}</span>
    <button class="rating-counter__button" @click="ratingChange(1)">+</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const rating = ref(5)
const ratingChange = (amount) => {
  rating.value += amount
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
  }

  &__text {
    font-weight: 500;
  }
}
</style>
