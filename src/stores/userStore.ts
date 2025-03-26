import { defineStore } from 'pinia'
import { User } from '@/app/modules/users/domain/user'
import { 
  getUsers as getUsersUseCase,
  createUser as createUserUseCase,
  updateUser as updateUserUseCase,
  deleteUser as deleteUserUseCase
} from '@/app/modules/users/UserRepository'
import { PageFilters } from '@/app/network/domain/interfaces/FetchPage'

interface UserStoreState {
  users: User[]
}

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => ({
    users: [],
  }),
  actions: {
    setUsers(users: User[]) {
      this.users = users
    },

    // FETCH API
    async fetchUsers(filters: PageFilters) {
      const action = await getUsersUseCase(filters)
        .then((response) => {
          this.setUsers(response.data)
          return response
        })
        .catch((error) => {
          throw error
        })
      return action
    },


    async createUser(user: Partial<User>) {
      const action = await createUserUseCase(user)
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw error
        })
      return action
    },

    async updateUser(userId: string, user: Partial<User>) {
      const action = await updateUserUseCase(userId, user)
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw error
        })
      return action
    },

    async deleteUser(userId: string) {
      const action = await deleteUserUseCase(userId)
        .then((response) => {
          return response
        })
        .catch((error) => {
          throw error
        })
      return action
    },
  },
  getters: {
    getUsers(): User[] {
      return this.users
    },
  },
})
