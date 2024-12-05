<template>
  <div class="about">
    <h1>The About View</h1>
    <h2>userID: {{ userId }}</h2>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  userId: {
    type: String,
    required: true
  }
})
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
