import Http from '@/app/network/Http'
import Routes from '@/app/shared/routes'
import type { Department } from './domain/department'
import type { Response } from '@/app/network/domain/interfaces'
import { PageFilters } from '@/app/network/domain/interfaces/FetchPage'
import env from '@/app/shared/env'

const http = new Http()

export const getDepartments = async (filters: PageFilters): Promise<Response<Department[]>> => {
  const url = Routes.getDepartments(env.apiBase)
  const response = await http.get<PageFilters, Department[]>(url, { params: filters })
  return response
}

export const getDepartment = async (departmentId: string): Promise<Response<Department>> => {
  const url = Routes.getDepartment(env.apiBase, departmentId)
  const response = await http.get<string, Department>(url)
  return response
}

export const createDepartment = async (department: Partial<Department>): Promise<Response<Department>> => {
  const url = Routes.createDepartment(env.apiBase)
  const response = await http.post<Partial<Department>, Department>(url, { data: department })
  return response
}

export const updateDepartment = async (departmentId: string, department: Partial<Department>): Promise<Response<Department>> => {
  const url = Routes.updateDepartment(env.apiBase, departmentId)
  const response = await http.put<Partial<Department>, Department>(url, { data: department })
  return response
}

export const deleteDepartment = async (departmentId: string): Promise<Response<Department>> => {
  const url = Routes.deleteDepartment(env.apiBase, departmentId)
  const response = await http.delete<string, Department>(url)
  return response
}