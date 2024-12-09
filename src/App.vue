<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import SortingSwitcher from './components/SortingSwitcher.vue'
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUsersStore } from './stores/users'

const usersStore = useUsersStore()

const route = useRoute()

const sorting = ref("clients")
const isWrapperCollapsed = ref(false)

const usersLists = computed(() => ({
  clients: usersStore.sortedUsersByLastName,
  rating: usersStore.sortedUsersByRating
}))
const sortedUsersList = computed(() => usersLists.value[sorting.value])

onMounted(() => {
  usersStore.fetchUsers()
})
</script>

<template>
  <header :class="{ '--collapsed': isWrapperCollapsed }">
    <div
      class="collapse-button"
      @click="isWrapperCollapsed = !isWrapperCollapsed"
    >
      {{ isWrapperCollapsed ? '>' : '<' }}
    </div>
    <div class="wrapper">
      <sorting-switcher v-model="sorting" />

      <!-- Show an error message if fetching fails -->
      <p v-if="usersStore.error">Error: {{ usersStore.error }}</p>

      <!-- Display a loading message if users array is empty and no error -->
      <p v-else-if="usersStore.users.length === 0">Loading users...</p>

      <!-- Once users are fetched, display them in a list -->
      <ul v-else class="users-list">
        <li
          v-for="user in sortedUsersList"
          :key="user.id"
          class="users-list__item"
          :class="{ 'users-list__item--active': Number(route.params.userId) === user.id }"
        >
          <img
            v-if="sorting === 'clients'"
            :src="user.avatar"
            :alt="`${user.first_name} ${user.last_name}`"
            width="50"
            height="50"
            style="border-radius:50%; margin-right:10px;"
          />
          <span v-else class="users-list__item__rating">
            {{ user.rating }}
          </span>

          <RouterLink :to="`/about/${user.id}`">
            <strong>{{ user.first_name }} {{ user.last_name }}</strong>
          </RouterLink>
        </li>
      </ul>
    </div>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
$header-width: 270px;
$collapsed-width: 0px;
$transition-duration: 0.3s;
$width-diff: 77px;

.users-list {
  width: 100%;
  padding: 0;

  &__item {
    display: flex;
    align-items: center;
    padding: 8px 0;

    &--active {
      background-color: #ddd;
    }

    img {
      height: 32px;
      width: 32px;
    }

    &:not(:first-child) {
      border-top: 1px solid #ddd;
    }

    &__rating {
      font-size: 36px;
      font-weight: 700;
    }
  }
}

header {
  line-height: 1.5;
  max-height: 100vh;
  width: calc($header-width + $width-diff);
  position: relative;

  transition: width $transition-duration ease-in-out;

  .collapse-button {
    height: 32px;
    width: 16px;
    background-color: #e3f2fd;
    align-content: center;
    cursor: pointer;
    color: #257dca;
    font-weight: 700;

    position: absolute;
    left: $header-width;
  }

  &.--collapsed {
    width: $collapsed-width;

    .collapse-button {
      left: $collapsed-width;
    }

    .wrapper {
      display: none;
    }
  }

  .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
  }
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: flex-start;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
