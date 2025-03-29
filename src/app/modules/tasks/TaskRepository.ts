import Http from '@/app/network/Http'
import Routes from '@/app/shared/routes'
import type { CreateTask, Task } from './domain/task'
import { type Response } from '@/app/network/domain/interfaces'
import type { PageFilters } from '@/app/network/domain/interfaces/FetchPage'
import env from '@/app/shared/env'

const http = new Http()

export const getTasks = async (filters: PageFilters): Promise<Response<Task[]>> => {
  const url = Routes.getTasks(env.apiBase)
  const response = await http.get<PageFilters, Task[]>(url, { params: filters })
  return response
}

export const getTask = async (taskId: string): Promise<Response<Task>> => {
  const url = Routes.getTask(env.apiBase, taskId)
  const response = await http.get<string, Task>(url)
  return response
}

export const createTask = async (payload: CreateTask): Promise<Response<Task>> => {
  const url = Routes.createTask(env.apiBase)
  const response = await http.post<CreateTask, Task>(url, { data: payload })
  return response
}

export const updateTask = async (taskId: string, task: Partial<Task>): Promise<Response<Task>> => {
  const url = Routes.updateTask(env.apiBase, taskId)
  const response = await http.put<Partial<Task>, Task>(url, { data: task })
  return response
}

export const deleteTask = async (taskId: string): Promise<Response<Task>> => {
  const url = Routes.deleteTask(env.apiBase, taskId)
  const response = await http.delete<string, Task>(url)
  return response
}