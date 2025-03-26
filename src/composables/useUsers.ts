import { User } from '@/app/modules/users/domain/user'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

export const useUsers = () => {
  const userStore = useUserStore()
  const { users, getUsers } = storeToRefs(userStore)

  // Functions
  const fetchUsers = () => {
    return userStore.fetchUsers()
  }

  const createUser = (user: User) => {
    return userStore.createUser(user)
  }

  const updateUser = (user: User) => {
    return userStore.updateUser(user)
  }

  return { 
    users,
    getUsers,
    fetchUsers,
    createUser,
    updateUser,
  }
}
