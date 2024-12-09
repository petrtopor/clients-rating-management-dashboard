<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import SortingSwitcher from './components/SortingSwitcher.vue'
import { onMounted, ref, computed } from 'vue'
import { useUsersStore } from './stores/users'

const usersStore = useUsersStore()

const sorting = ref("clients")
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
  <header>
    <div class="wrapper">
      <h1>Clients Rating Management Dashboard</h1>

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
        >
          <img
            :src="user.avatar"
            :alt="`${user.first_name} ${user.last_name}`"
            width="50"
            height="50"
            style="border-radius:50%; margin-right:10px;"
          />
          <span>
            {{ user.rating }}
          </span>

          <RouterLink :to="`/about/${user.id}`">
            <strong>{{ user.first_name }} {{ user.last_name }}</strong>
          </RouterLink>
        </li>
      </ul>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
.users-list {
  &__item {
    display: flex;
    padding: 8px 0;

    img {
      height: 32px;
      width: 32px;
    }

    &:not(:first-child) {
      border-top: 1px solid gray;
    }
  }
}

header {
  line-height: 1.5;
  max-height: 100vh;
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
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
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
