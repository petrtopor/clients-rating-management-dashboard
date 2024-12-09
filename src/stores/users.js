import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
  state: () => ({
    page: null,
    per_page: null,
    total: null,
    total_pages: null,
    users: [],
    support: null,
    error: null
  }),
  actions: {
    async fetchUsers(page = 1) {
      try {
        this.error = null
        const response = await fetch(`https://reqres.in/api/users?page=${page}`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`)
        }
        
        const data = await response.json()
        
        // Extract and assign values from the response
        this.page = data.page ?? null
        this.per_page = data.per_page ?? null
        this.total = data.total ?? null
        this.total_pages = data.total_pages ?? null

        this.users = Array.isArray(data.data) ?
          [...data.data.map(user => {
            const localData = JSON.parse(localStorage.getItem(`user_${user.id}`))

            return {
              ...user,
              rating: localData?.rating ?? 0,
              comment: localData?.comment ?? ''
            }
          })] :
          []
        this.support = data.support ?? null
      } catch (error) {
        console.error('Error fetching users:', error)
        this.error = error.message
      }
    },
    setUser(id, user) {
      const userIndex = this.users.findIndex(user => user.id === Number(id))
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...user
      }
    }
  },
  getters: {
    // Example: Sorted users by last_name for convenience
    sortedUsersByLastName: (state) => {
      return [...state.users].sort((a, b) => a.last_name.localeCompare(b.last_name))
    },
    sortedUsersByRating: (state) => {
      return [...state.users].sort((a, b) => b.rating - a.rating)
    }
  }
})
