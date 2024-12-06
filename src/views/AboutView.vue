<template>
  <div class="about">
    <div v-if="userStore?.user" class="user-card">
      <div class="user-card__content">
        <img
          class="user-card__content__avatar"
          :src="userStore?.user?.avatar"
          :alt="userStore?.fullName"
        />
        <div class="user-card__content__details">
          <span class="user-card__content__details__name">{{ userStore?.fullName }}</span>
          <span class="user-card__content__details__email"></span>
          <div class="user-card__content__details__points">
            5 points
            id: {{ userStore.user.id }}
          </div>
          <textarea
            class="user-card__content__details__comment"
            name="comment"
            id="comment"
            cols="30"
            rows="5"
          >
            Call on tuesday
          </textarea>
        </div>
      </div>
      <button class="user-card__button">
        Save
      </button>
    </div>
    <span v-else>Select the user</span>
  </div>
</template>

<script setup>
import { defineProps, onMounted, watch } from 'vue'
import { useUserStore } from '../stores/user'

const props = defineProps({
  userId: {
    type: String,
    required: true
  }
})

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUser(props.userId)
})

watch(() => props.userId, userId => {
  userStore.fetchUser(props.userId)
})
</script>

<style scoped lang="scss">
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.user-card {
  display: flex;
  flex-direction: column;

  &__content {
    display: flex;
    justify-content: space-between;

    &__avatar {
      height: 64px;
      width: 64px;
    }

    &__details {
      display: flex;
      flex-direction: column;

      &__name {
        font-size: 32px;
        font-weight: 700;
      }

      &__email {
        font-size: 24px;
        font-weight: 500;
      }
    }
  }

  &__button {
    color: white;
    background-color: blue;
    width: 128px;
    height: 24px;
  }
}
</style>
