import { User } from '@/app/modules/users/domain/user'
import { PageFilters } from '@/app/network/domain/interfaces/FetchPage'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

export const useUsers = () => {
  const userStore = useUserStore()
  const { users, getUsers } = storeToRefs(userStore)

  // Functions
  const fetchUsers = (filters: PageFilters) => {
    return userStore.fetchUsers(filters)
  }

  const createUser = (user: Partial<User>) => {
    return userStore.createUser(user)
  }

  const updateUser = (userId: string, user: Partial<User>) => {
    return userStore.updateUser(userId, user)
  }

  const deleteUser = (userId: string) => {
    return userStore.deleteUser(userId)
  }

  return { 
    users,
    getUsers,
    fetchUsers,
    createUser,
    updateUser, 
    deleteUser
  }
}
