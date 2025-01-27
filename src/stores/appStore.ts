import { defineStore } from 'pinia'
import { User } from '@/types/User'
import { RemovableRef, useLocalStorage } from '@vueuse/core'

interface AppState {
  token: RemovableRef<string>
  user: RemovableRef<Partial<User>>
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    token: useLocalStorage('pmp_token', ''),
    user: useLocalStorage('pmp_user', {
      id: '',
      name: '',
      email: '',
    }),
  }),
  actions: {
    setToken(newToken: string) {
      // @ts-ignore
      this.token = newToken
    },
    setUser(newUser: Partial<User>) {
      // @ts-ignore
      this.user = newUser
    },
  },
  getters: {
    getToken(): RemovableRef<string> {
      return this.token
    },
    getUser(): RemovableRef<Partial<User>> {
      return this.user
    },
  },
})