import { useAppStore } from '@/stores/appStore'
import { User } from '@/types/User'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export const useApp = () => {
  const appStore = useAppStore()
  const { user, token } = storeToRefs(appStore)

  const getUser = computed(() => appStore.getUser)
  const getToken = computed(() => appStore.getToken)
  const isAuthenticated = computed(() => !!appStore.getToken)

  function setToken(newToken: string) {
    appStore.setToken(newToken)
  }

  function setUser(newUser: Partial<User>) {
    appStore.setUser(newUser)
  }

  return {
    user,
    token,
    getUser,
    getToken,
    isAuthenticated,
    setToken,
    setUser,
  }
}