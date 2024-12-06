import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    error: null
  }),
  actions: {
    async fetchUser(id) {
      this.error = null
      try {
        const response = await fetch(`https://reqres.in/api/users/${id}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch user with id ${id}: ${response.statusText}`)
        }
        const data = await response.json()
        this.user = data.data ?? null
      } catch (err) {
        console.error(err)
        this.error = err.message
      }
    }
  },
  getters: {
    fullName: (state) => {
      if (!state.user) return ''
      return `${state.user.first_name} ${state.user.last_name}`
    }
  }
})
