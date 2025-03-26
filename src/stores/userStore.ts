import { defineStore } from 'pinia'
import { User } from '@/app/modules/users/domain/user'

interface UserStoreState {
  users: User[]
}

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => ({
    users: [],
  }),
  actions: {
    async fetchUsers() {
      return this.users
    },
    setUsers(users: User[]) {
      this.users = users
    },

    async createUser(user: User) {
      this.users.push(user)
      return true
    },

    async updateUser(user: User) {
      const index = this.users.findIndex(u => u.id === user.id)
      if (index !== -1) {
        this.users[index] = user
        return true
      }
      return false
    },
  },
  getters: {
    getUsers(): User[] {
      return this.users
    },
  },
})
