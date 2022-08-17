import { defineStore } from 'pinia'
import { instance } from '../helper/instance'

export const useUsersStore = defineStore('user', {
  state: () => ({
    users: [],
    page: 1,
    allUsers: 0,
    isLoading: true,
    token: null
  }),
  getters: {
    usersList: state => state.users,
    allUserLoaded: state => state.users.length === state.allUsers,
    loading: state => state.isLoading
  },
  actions: {
    async loadToken() {
      const res = await instance.get('/token')
      this.token = res.data.token
    },
    async loadUsers(count = 6) {
      this.isLoading = true
      const res = await instance.get(`/users?page=${this.page}&count=${count}`)
      this.allUsers = res.data.total_users
      this.page++
      this.users.push(...res.data.users)
      this.isLoading = false
    },
    async createUser(formData) {
      await this.loadToken()
      try {
        await instance.post('/users', formData, {
          headers: {
            'Token': this.token,
            'Content-Type': 'form/multipart'
          }
        })
        this.users = []
        this.page = 1
        this.allUsers = 0
          await this.loadUsers()
      } catch (err) {
        throw err.response.data.message
      }
    }
  }
})
