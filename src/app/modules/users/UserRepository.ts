import Http from '@/app/network/Http'
import Routes from '@/app/shared/routes'
import type { User } from './domain/user'
import { type Response } from '@/app/network/domain/interfaces'
import type { PageFilters } from '@/app/network/domain/interfaces/FetchPage'
import env from '@/app/shared/env'

const http = new Http()

export const getUsers = async (filters: PageFilters): Promise<Response<User[]>> => {
  const url = Routes.getUsers(env.apiBase)
  const response = await http.get<PageFilters, User[]>(url, { params: filters })
  return response
}

export const getUser = async (userId: string): Promise<Response<User>> => {
  const url = Routes.getUser(env.apiBase, userId)
  const response = await http.get<string, User>(url)
  return response
}

export const createUser = async (payload: Partial<User>): Promise<Response<User>> => {
  const url = Routes.createUser(env.apiBase)
  const response = await http.post<Partial<User>, User>(url, { data: payload })
  return response
}

export const updateUser = async (userId: string, user: Partial<User>): Promise<Response<User>> => {
  const url = Routes.updateUser(env.apiBase, userId)
  const response = await http.put<Partial<User>, User>(url, { data: user })
  return response
}

export const deleteUser = async (userId: string): Promise<Response<User>> => {
  const url = Routes.deleteUser(env.apiBase, userId)
  const response = await http.delete<string, User>(url)
  return response
}