import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, // User data fetched from the API
    rating: null, // User rating
    comment: '', // User comment
    error: null // Error handling
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

        // Load rating and comment from localStorage if they exist
        const localData = JSON.parse(localStorage.getItem(`user_${id}`))
        if (localData) {
          this.rating = localData.rating
          this.comment = localData.comment
        } else {
          this.rating = 5
          this.comment = ''
        }
      } catch (err) {
        console.error(err)
        this.error = err.message
      }
    },
    saveUserData(id, rating, comment) {
      // Persist rating and comment to localStorage
      localStorage.setItem(
        `user_${id}`,
        JSON.stringify({
          rating: rating,
          comment: comment
        })
      )
    }
  },
  getters: {
    fullName: (state) => {
      if (!state.user) return ''
      return `${state.user.first_name} ${state.user.last_name}`
    }
  }
})
