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
          <rating-counter
            class="user-card__content__details__rating-counter"
            v-model="rating"
          />
          <textarea
            class="user-card__content__details__comment"
            name="comment"
            id="comment"
            cols="30"
            rows="5"
            v-model="comment"
          />
        </div>
      </div>
      <button class="user-card__button" @click="onSubmitClick">
        Save
      </button>
    </div>
    <span v-else>Select the user</span>
  </div>
</template>

<script setup>
import { defineProps, onMounted, watch, ref } from 'vue'
import { useUserStore } from '../stores/user'
import RatingCounter from '../components/RatingCounter.vue'

const props = defineProps({
  userId: {
    type: String,
    required: true
  }
})

const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchUser(props.userId)
  rating.value = userStore.rating
  comment.value = userStore.comment
})

const rating = ref(userStore.rating)
const comment = ref(userStore.comment)

const onSubmitClick = async () => {
  userStore.saveUserData(props.userId, rating.value, comment.value)
}

watch(() => props.userId, async () => {
  await userStore.fetchUser(props.userId)
  rating.value = userStore.rating
  comment.value = userStore.comment
})
</script>

<style scoped lang="scss">
@media (min-width: 1024px) {
  .about {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #e1e1e1;
  }
}

.user-card {
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;

  padding: 16px;

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    &__avatar {
      height: 128px;
      width: 128px;
      border-radius: 8px;
      margin-right: 16px;
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

      &__comment {
        margin-top: 16px;
      }
    }
  }

  &__button {
    color: white;
    background-color: #027bff;
    border: none;
    border-radius: 2px;
    width: 128px;
    height: 24px;
  }
}
</style>
